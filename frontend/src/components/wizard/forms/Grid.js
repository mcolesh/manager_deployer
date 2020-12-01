import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { get, cloneDeep, set, map, omit, isEqual } from 'lodash/fp';
import styled from 'styled-components';
import {
	DataGridEnterprise,
	Dialog,
	FormLayout,
	Button,
	AppToolbar,
	Label,
	Hyperlink
} from '@nokia-csf-uxr/csfWidgets';
import AddIcon from '@nokia-csf-uxr/csfWidgets/images/ic_add_circle_outline.svg';
import EditIcon from '@nokia-csf-uxr/csfWidgets/images/ic_edit.svg';
import DeleteIcon from '@nokia-csf-uxr/csfWidgets/images/ic_delete.svg';

import {
	getFieldComponent,
	getFieldNormalizedProps,
	getFieldValidators,
	getFieldDefaultValue,
	getDuplicatedColumns
} from 'utils/wizard';
import * as CAPTIONS from 'constants/app-captions';
import PropTypes from 'prop-types';
import { GRID_FILTER_TYPES } from 'constants/grid-filter-types';
import { FIELD_TYPES } from 'constants/field-types';
import ErrorLabel from 'components/wizard/ErrorLabel';
import { AG_GRID_ENTERPRISE_LICENSE } from '../../../constants/app-constants';

const GridDiv = styled.div`
	height: ${({ height }) => (height ? `${height}px;` : `auto;`)};
`;

const FieldContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const operationToImage = {
	Edit: EditIcon,
	Delete: DeleteIcon
};

const tempFieldsModel = 'tempFields.fields';
const tempFieldsModelForm = 'tempFieldsForm.fields';

class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addRow: false,

			iconButtonsConfig: [
				{
					eventData: { identifier: 'new-row-button' },
					icon: AddIcon,
					onClick: () => {
						this.onClickNewRow();
					},
					text: '',
					tooltip: {
						text: CAPTIONS.ADD
					}
				}
			],
			uniqueError: ''
		};
	}

	UNSAFE_componentWillMount() {
		this.initGrid();
	}

	componentDidUpdate(prevProps) {
		const { columns } = this.props;
		if (!isEqual(columns, prevProps.columns)) {
			this.initGrid();
		}
	}

	onGridReady = (params) => {
		this.api = params.value.api;
		this.api.sizeColumnsToFit();
	};

	getColumnFilterValue = (column) => {
		let columnFilter;
		switch (get('type', column)) {
			case FIELD_TYPES.TEXT:
				columnFilter = GRID_FILTER_TYPES.textFilter;
				break;
			case FIELD_TYPES.NUMBER:
				columnFilter = GRID_FILTER_TYPES.numberFilter;
				break;
			case 'date': // this is not one of field types, the date is only for column type grid
				columnFilter = GRID_FILTER_TYPES.dateFilter;
				break;
			case FIELD_TYPES.SELECT:
			case FIELD_TYPES.IP:
			case FIELD_TYPES.BOOLEAN:
				columnFilter = GRID_FILTER_TYPES.setFilter;
				break;
			default:
				columnFilter = false; // disable filter on any different case like password type
				break;
		}
		return columnFilter;
	};

	initGrid = () => {
		const columnDefs = [];
		const newOperations = [];
		const menuTabs = ['filterMenuTab'];
		const { columns, operations, emptyGridDisplay, newItemDisplay, editItemDisplay } = this.props;
		columns.forEach((col) => {
			let cellRenderer = null;
			if (col.type === 'password') {
				cellRenderer = this.PasswordCellRenderer;
			} else if (col.type === 'hyperlink') {
				cellRenderer = this.UrlCellRenderer;
			}
			columnDefs.push({
				headerName: col.display,
				field: col.name,
				width: 150,
				filter: this.getColumnFilterValue(col),
				menuTabs,
				cellRendererFramework: cellRenderer
			});
		});

		Object.keys(operations).forEach((key) => {
			const val = operations[key];

			if (val) {
				if (key !== CAPTIONS.ADD) {
					newOperations.push({ name: key, icon: operationToImage[key] });
				} else {
					this.setState({ addRow: true });
				}
			}
		});

		const noRowsToshowString = emptyGridDisplay || ' ';
		const addNewRowString = newItemDisplay || 'Add new';
		const editRowString = editItemDisplay || 'Edit';
		const columnToProperties = [];
		columns.forEach((column) => {
			const normalizedProps = getFieldNormalizedProps(column);
			const validators = getFieldValidators(column);
			const FieldComponent = getFieldComponent(column.type);
			const model = `tempFields.fields.${column.name}`;
			columnToProperties[column.name] = {
				normalizedProps,
				validators,
				FieldComponent,
				model
			};
		});
		this.setState({
			gridOptions: {
				columnDefs,
				rowAction: {
					types: newOperations,
					callback: this.gridHandlers
				},
				isExternalFilterPresent: this.applyFilter,
				doesExternalFilterPass: this.gridFilter,
				noRowsToShow: noRowsToshowString
			},
			addNewRowString,
			editRowString,
			columnToProperties
		});
	};

	applyFilter = () => {
		return true;
	};

	gridFilter = (node) => {
		// https://stackoverflow.com/questions/44844214/ag-grid-hiding-rows
		// https://www.ag-grid.com/javascript-grid-filter-external/
		return node.data.action !== 'deleted' && node.data.action !== 'newDeleted';
	};

	onClose = () => {
		const { reset } = this.props;
		this.setState({
			dialog: false,
			edit: false,
			uniqueError: ''
		});
		reset(tempFieldsModel);
	};

	onAddConfirm = () => {
		const { rowData, model, form, push, reset, dialogRow, uniqueColumns } = this.props;
		const errorFields = getDuplicatedColumns(uniqueColumns, rowData, dialogRow);

		if (errorFields.length && errorFields.length === uniqueColumns.length) {
			this.setState({ uniqueError: CAPTIONS.DUPLICATE_KEY_ERROR });
		} else {
			this.setState(
				{
					dialog: false,
					uniqueError: ''
				},
				() => {
					// New row
					const newItem = cloneDeep(dialogRow);

					newItem.action = 'new';
					newItem.key = rowData.length;
					push(model, newItem, {
						form
					});
					reset(tempFieldsModel);
				}
			);
		}
	};

	onEditConfirm = () => {
		const {
			rowData,
			dialogRow,
			isDataSource,
			form,
			change,
			model,
			reset,
			uniqueColumns
		} = this.props;

		const errorFields = getDuplicatedColumns(uniqueColumns, rowData, dialogRow, true);

		if (errorFields.length && errorFields.length === uniqueColumns.length) {
			this.setState({ uniqueError: CAPTIONS.DUPLICATE_KEY_ERROR });
		} else {
			this.setState({
				dialog: false,
				edit: false,
				uniqueError: ''
			});
			const newItem = cloneDeep(dialogRow);

			// user can add new row - and then edit - need to check if this edit is for new row or for row from the server.
			const rowFromServer = rowData.find((event) => event.key === get('key', dialogRow));
			if (rowFromServer) {
				newItem.originRow = rowFromServer;
				newItem.originRow = omit(['key', 'action'], newItem.originRow);
				newItem.action = 'modified';
			}

			Object.keys(newItem).forEach((property) => {
				change(`${model}.${newItem.key}.${property}`, newItem[property], {
					form,
					isDataSource
				});
			});

			reset(tempFieldsModel);
		}
	};

	onDelete = (data) => {
		const { rowData, model, form, change } = this.props;
		// We won't use remove action from RRF, because we need to send the deleted row to the server
		const rowFromServer = rowData.find((event) => event.key === data.key);
		if (rowFromServer) {
			change(`${model}.${data.key}`, rowFromServer, {
				form
			});
			change(`${model}.${data.key}.action`, 'deleted', {
				form
			});
		} else {
			change(`${model}.${data.key}.action`, 'newDeleted', {
				form
			});
		}
	};

	onClickNewRow = () => {
		const { columns } = this.props;
		this.initTempFieldForm(columns);
		this.setState({
			dialog: true,
			uniqueError: ''
		});
	};

	onEditRow = (params) => {
		const { change } = this.props;
		const editedRow = cloneDeep(params);
		change(tempFieldsModel, editedRow);
		this.setState({
			dialog: true,
			edit: true,
			uniqueError: ''
		});
	};

	gridHandlers = (params) => {
		switch (params.value.name) {
			case 'Delete': {
				this.onDelete(params.value.items[0].data);
				break;
			}
			case 'Edit': {
				this.onEditRow(params.value.items[0].data);
				break;
			}
			default: {
				console.error('unsupported action');
			}
		}
	};

	/*
  We are using React-Redux-Forms to host the grid data for the dialog, in order to:
  1. validate it
  2. Save it when moving between sections
  * */
	initTempFieldForm = (fields) => {
		const { setErrors, change } = this.props;
		let initialData = {};
		fields.forEach((field) => {
			initialData = set(field.name, getFieldDefaultValue(field), initialData);
		});
		change(tempFieldsModel, initialData);

		fields.forEach((field) => {
			const validators = getFieldValidators(field);
			const executedValidators = map(
				(validator) => validator(field, getFieldDefaultValue(field)),
				validators
			);

			setErrors(`${tempFieldsModel}.${field.name}`, executedValidators);
		});
	};

	PasswordCellRenderer = () => {
		return <div> ****** </div>;
	};

	UrlCellRenderer = (url) => {
		return (
			<div>
				<Hyperlink id={`${url.value}_hperlink`} href={url.value} text={url.value} newTab />
			</div>
		);
	};

	renderDialog() {
		const { edit, columnToProperties, editRowString, addNewRowString, uniqueError } = this.state;

		const { columns, tempFieldsFormValid, name } = this.props;
		return (
			<Dialog
				id={`${name && name.replace(/:/g, '_')}-dialog`}
				title={edit ? editRowString : addNewRowString}
				theme='black'
				height={450}
				width={500}
				header
				scroll
				onClick={this.onClose}
				onClose={this.onClose}
				escapeExits
				close
				trapFocus={false}
				renderFooter={() => (
					<div>
						<Button text='Close' onClick={this.onClose} />
						<Button
							text='Apply'
							id={`${name && name.replace(/:/g, '_')}-apply-btn`}
							onClick={edit ? this.onEditConfirm : this.onAddConfirm}
							disabled={!tempFieldsFormValid}
						/>
					</div>
				)}>
				<FormLayout>
					{columns.map((column) => {
						const properties = columnToProperties[column.name];
						const { FieldComponent } = properties;
						return (
							<FieldContainer key={column.name}>
								<Label text={column.display} className='center-align' />
								<FieldComponent
									key={column.name}
									validators={properties.validators}
									display={column.display}
									model={properties.model}
									path={column.name}
									form={tempFieldsModel}
									preForm={tempFieldsModel}
									preFormModel={tempFieldsModelForm}
									{...properties.normalizedProps}
								/>
							</FieldContainer>
						);
					})}
					{uniqueError && <ErrorLabel classes='unique-error' text={uniqueError} />}
				</FormLayout>
			</Dialog>
		);
	}

	renderGrid = () => {
		const { rowData, height, name } = this.props;
		const { dialog, gridOptions } = this.state;
		// due to: https://github.com/ag-grid/ag-grid-react/issues/81
		const cloneRowData = cloneDeep(rowData);

		return (
			<div>
				<GridDiv height={height}>
					<DataGridEnterprise
						id={`${name && name.replace(/:/g, '_')}`}
						domLayout={!height ? 'autoHeight' : null}
						onGridReady={this.onGridReady}
						gridOptions={gridOptions}
						rowData={cloneRowData}
						licenseKey={AG_GRID_ENTERPRISE_LICENSE}
						getRowNodeId={(data) => data.key.toString()}
					/>
				</GridDiv>
				{dialog && this.renderDialog()}
			</div>
		);
	};

	render() {
		const { addRow, iconButtonsConfig } = this.state;
		return (
			<div>
				{addRow ? <AppToolbar iconButtons={iconButtonsConfig} /> : null}
				{this.renderGrid()}
			</div>
		);
	}
}

const mapStateToProps = (
	state,
	{ path, preFormModel = 'dynamicForm.content', preForm = 'dynamic.content' }
) => ({
	formModel: get(`${preFormModel}.${path}`, state),
	form: get(`${preForm}`, state),
	rowData: get(`${preForm}.${path}`, state),
	dialogRow: get(tempFieldsModel, state),
	tempFieldsFormValid: get(`${tempFieldsModelForm}.$form.valid`, state)
});

Grid.propTypes = {
	columns: PropTypes.instanceOf(Array),
	default: PropTypes.instanceOf(Array),
	editItemDisplay: PropTypes.string,
	newItemDisplay: PropTypes.string,
	emptyGridDisplay: PropTypes.string,
	operations: PropTypes.shape({}),
	rowData: PropTypes.instanceOf(Array),
	change: PropTypes.func,
	push: PropTypes.func,
	remove: PropTypes.func,
	setErrors: PropTypes.func,
	reset: PropTypes.func,
	dialogRow: PropTypes.shape({}),
	isDataSource: PropTypes.bool,
	form: PropTypes.shape({}),
	model: PropTypes.string,
	height: PropTypes.string,
	tempFieldsFormValid: PropTypes.bool,
	name: PropTypes.string,
	uniqueColumns: PropTypes.instanceOf(Array)
};

export default connect(mapStateToProps, {
	change: actions.change,
	push: actions.push,
	remove: actions.remove,
	setErrors: actions.setErrors,
	reset: actions.reset
})(Grid);

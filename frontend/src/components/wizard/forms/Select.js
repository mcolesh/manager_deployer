import React, { Component } from 'react';
import styled from 'styled-components';
import { get, map } from 'lodash/fp';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import {
	addNewValueToFieldExtendedValues as addNewValueToFieldExtendedValuesRef,
	showResetAllocationsWarning as showResetAllocationsWarningRef
} from 'actions/wizard';
import Select from 'antd/es/select';
import 'antd/lib/select/style/css';
import ErrorLabel from 'components/wizard/ErrorLabel';
import { getFieldErrorMessages } from 'utils/wizard';
import { SelectItem } from '@nokia-csf-uxr/csfWidgets';
import { doAllocationsExist as doAllocationsExistRef } from 'selectors/ipmi';
import { STORAGE } from 'constants/ipmi-sub-section';

import './FieldsStyle.css';
import PropTypes from 'prop-types';

const { Option } = Select;

const SelectContainer = styled.div`
	${({ valid }) => (valid ? 'border: none' : 'border: 1px solid red')};
	display: inline-block;
`;

class CustomSelectField extends Component {
	componentDidMount() {
		this.getSelectOptions();
		const { newDefault } = this.props;
		if (this.getSelectOptions() === undefined) {
			if (newDefault) {
				this.handleChange({ type: 'onChange', value: newDefault });
			}
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { allowCreate, newDefault, dependencyParentFullPath, form, selectedItem } = this.props;
		const isParentValueChanged =
			nextProps.dependencyParentFullPath &&
			get(dependencyParentFullPath, form) !==
				get(nextProps.dependencyParentFullPath, nextProps.form);
		const isChildValueChanged = nextProps.newDefault && nextProps.newDefault !== newDefault;

		if (isChildValueChanged || isParentValueChanged) {
			if (this.getSelectOptions() === undefined) {
				this.handleChange({ type: 'onChange', value: nextProps.newDefault });
			}
		}
		// Addable select can receive any new value on import.
		if (
			allowCreate &&
			nextProps.selectedItem !== selectedItem &&
			!nextProps.data.some((option) => option.value === nextProps.selectedItem)
		) {
			this.handleChange({
				type: 'onAdd',
				value: { value: nextProps.selectedItem, label: nextProps.selectedItem }
			});
		}
	}

	setValidity(value) {
		const { model, validators } = this.props;
		const newvalidators = map((validator) => validator(this.props, value), validators);
		this.props.setErrors(model, newvalidators);
	}

	handleChange = (option) => {
		const { data, model, form, change, name, addNewValueToFieldExtendedValues } = this.props;
		switch (option.type) {
			case 'onChange':
				// CSF BUG : Backspace triggers onChange with null value.
				if (option.value === null) {
					return;
				}
				change(model, option.value, { form });
				break;
			case 'onAdd':
				if (!data.some((d) => d.value === option.value.value)) {
					addNewValueToFieldExtendedValues(name, option.value);
					change(model, option.value.value, {
						form,
						isDataSource: this.props.hasOwnProperty('dataSource')
					});
				}
				break;
			default:
				break;
		}

		this.setValidity(option.value);
	};

	handleMultipleChange = (selectedItems) => {
		const {
			ipmiFactor,
			change,
			selectedItem,
			model,
			form,
			validators,
			allocationsExist,
			showResetAllocationsWarning
		} = this.props;

		if (
			ipmiFactor &&
			allocationsExist &&
			(selectedItem
				.map((item) => {
					return item.toLowerCase();
				})
				.includes(STORAGE) ||
				selectedItems
					.map((item) => {
						return item.toLowerCase();
					})
					.includes(STORAGE))
		) {
			const action = { operation: 'change', model, value: selectedItems, validators };
			showResetAllocationsWarning(true, action);
		} else {
			change(model, selectedItems, { form, isDataSource: this.props.hasOwnProperty('dataSource') });
			this.setValidity(selectedItems);
		}
	};

	getSelectOptions = () => {
		const { data, selectedItem } = this.props;
		return data.find((d) => d.value !== selectedItem);
	};

	render() {
		const {
			name,
			data,
			formModel,
			multiple = false,
			selectedItem,
			readonly = false,
			allowCreate,
			className
		} = this.props;

		const valid =
			get('valid', formModel) !== undefined
				? get('valid', formModel)
				: get('$form.valid', formModel);
		const errorMessages =
			get('errors', formModel) !== undefined
				? get('errors', formModel)
				: get('$form.errors', formModel);

		return multiple === true ? (
			<SelectContainer valid={valid}>
				<Select
					id={name}
					name={name}
					disabled={readonly}
					mode='multiple'
					style={{ width: 400 }}
					onChange={this.handleMultipleChange}
					dropdownMatchSelectWidth={false}
					value={selectedItem}
					data-testid={name}
					showSearch
					optionFilterProp='children'
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}>
					{data.map((d) => (
						<Option key={d.label} value={d.value}>
							{d.value}
						</Option>
					))}
				</Select>
				{valid ? null : <ErrorLabel text={getFieldErrorMessages(errorMessages)} />}
			</SelectContainer>
		) : (
			<div className={className}>
				<SelectItem
					dataTest={name}
					id={`selectItem-${name && name.replace(/:/g, '_')}`}
					options={data.filter((d) => (d.label = d.label.toString()))}
					isDisabled={readonly}
					selectedItem={selectedItem}
					onChange={this.handleChange}
					allowCreate={allowCreate}
					searchable
					errorMsg={valid ? null : getFieldErrorMessages(errorMessages)}
					maxWidth={500}
					minWidth={50}
					width={400}
				/>
			</div>
		);
	}
}

CustomSelectField.propTypes = {
	formModel: PropTypes.shape({}),
	selectedItem: PropTypes.string,
	form: PropTypes.shape({}),
	allocationsExist: PropTypes.bool,
	name: PropTypes.string,
	data: PropTypes.instanceOf(Array),
	allowCreate: PropTypes.bool,
	className: PropTypes.string,
	multiple: PropTypes.bool,
	readonly: PropTypes.bool,
	ipmiFactor: PropTypes.bool,
	change: PropTypes.func,
	dependencyParentFullPath: PropTypes.string,
	newDefault: PropTypes.string,
	values: PropTypes.instanceOf(Array),
	model: PropTypes.string,
	validators: PropTypes.instanceOf(Array),
	addNewValueToFieldExtendedValues: PropTypes.func,
	showResetAllocationsWarning: PropTypes.func
};
const mapStateToProps = (
	state,
	{ path, preFormModel = 'dynamicForm.content', preForm = 'dynamic.content' }
) => ({
	formModel: get(`${preFormModel}.${path}`, state),
	selectedItem: get(`${preForm}.${path}`, state),
	form: get(`${preForm}`, state),
	allocationsExist: doAllocationsExistRef(state)
});

export default connect(mapStateToProps, {
	change: actions.change,
	setErrors: actions.setErrors,
	addNewValueToFieldExtendedValues: addNewValueToFieldExtendedValuesRef,
	showResetAllocationsWarning: showResetAllocationsWarningRef
})(CustomSelectField);

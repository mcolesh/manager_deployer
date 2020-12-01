import React, { Component } from 'react';
import { get, getOr } from 'lodash/fp';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { Button, TextInput, Spinner } from '@nokia-csf-uxr/csfWidgets';
import styled from 'styled-components';
import './FieldsStyle.css';
import { DEFAULT_DEBOUNCE_SUSPEND } from 'constants/app-constants';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import * as CAPTIONS from 'constants/app-captions';
import PropTypes from 'prop-types';

const RangeContainer = styled.div`
	display: flex;
	margin-top: 1em;
	flex-wrap: wrap;
`;

const RangePortsContainer = styled.div`
	display: flex;
	border: 1px solid;
	padding: 0.5rem 0.5rem;
	${({ valid }) => (valid ? 'border-color: #eceeef' : 'border-color: #FF0000')};
`;

const SubRowContainer = styled.div`
	flex: 1;
`;

const RemoveButtonConatiner = styled.div`
	border: 1px solid #eceeef;
	border-right: unset;
	display: flex;
	align-items: center;
`;

class CustomGenericRangeField extends Component {
	constructor(props) {
		super(props);
		this.state = { removedRangeIndex: -1, newRangeAdded: -1 };
	}

	componentDidUpdate(prevProps, prevState) {
		const { model, genericRangeValue, setErrors } = this.props;
		const { removedRangeIndex, newRangeAdded } = this.state;
		if (removedRangeIndex !== -1 && prevState.removedRangeIndex === -1) {
			const vlanValues = get(`genericRangeValue.${removedRangeIndex}.value`, this.props);
			this.checkRangesValidity(
				vlanValues,
				`${model}.${removedRangeIndex}.value`,
				removedRangeIndex
			);
			this.setState({ removedRangeIndex: -1 });
		}

		if (newRangeAdded !== -1 && prevState.newRangeAdded === -1) {
			// a new range row was just added
			const rangeIndex = get(`${newRangeAdded}.value.length`, genericRangeValue);
			setErrors(`${model}.${newRangeAdded}.value.${rangeIndex - 1}`, [
				`${CAPTIONS.REQUIRED_ERROR}`
			]); // error for component
			this.setState({ newRangeAdded: -1 });
		}
	}

	setValidityDebounced = AwesomeDebouncePromise(
		this.setValidity.bind(this),
		DEFAULT_DEBOUNCE_SUSPEND,
		{ key: () => '' }
	);

	setValidity(path, value, modelName, rowIndex) {
		const { restrictions, form, setErrors } = this.props;
		//  We need to validate that the start is not bigger than the end value
		let start;
		let end;
		const min = getOr(Number.MIN_VALUE, 'min', restrictions);
		const max = getOr(Number.MAX_VALUE, 'max', restrictions);

		// In the below line, 16 is the length of 'dynamic.content.'
		const genericPath = path.slice(16, path.lastIndexOf('.'));
		const rowPath = path.slice(0, path.lastIndexOf('.'));

		if (modelName === 'start') {
			start = value;
			end = get(`${genericPath}.end`, form);
		} else {
			end = value;
			start = get(`${genericPath}.start`, form);
		}

		if (start === '' || end === '') {
			setErrors(rowPath, [`${CAPTIONS.REQUIRED_ERROR}`]);
		} else if (start < min || end < min) {
			setErrors(rowPath, [`${CAPTIONS.MIN_ERROR}`]); // error for component
		} else if (end > max || start > max) {
			setErrors(rowPath, [`${CAPTIONS.MAX_ERROR}`]); // error for component
		} else if (end < start) {
			setErrors(rowPath, [`${CAPTIONS.WRONG_RANGES_ERROR}`]); // error for component
		} else if (end >= start) {
			setErrors(rowPath, []);
			const vlanPath = genericPath.slice(0, genericPath.indexOf(rowIndex));
			const vlanValues = get(`${vlanPath}${rowIndex}.value`, form);
			if (vlanValues && vlanValues.length > 1) {
				this.checkRangesValidity(vlanValues, rowPath.slice(0, rowPath.lastIndexOf('.')), rowIndex);
			}
		} else {
			setErrors(rowPath, [true]); // error for component
		}
	}

	handleRangeChange = async ({ value }, rowIndex, rangeIndex, modelName) => {
		const { model, form, change } = this.props;
		if (value !== undefined && !/[a-zA-Z]/.test(value)) {
			const path = `${model}.${rowIndex}.value.${rangeIndex}.${modelName}`;
			change(path, value, { form });

			await this.setValidityDebounced(path, value, modelName, rowIndex);
		}
	};

	checkRangesValidity = (vlanValues, rowPath, rowIndex) => {
		const { formModel, setErrors } = this.props;
		vlanValues.forEach((_item, idx) => {
			const valid = get(`${rowIndex}.value.${idx}.$form.valid`, formModel);
			const error = get(`${rowIndex}.value.${idx}.$form.errors.0`, formModel);
			if (!valid && error === CAPTIONS.OVERLAPPED_RANGES_ERROR) {
				setErrors(`${rowPath}.${idx}`, []); // clear errors
			}
		});
		let start;
		let end;
		let start2;
		let end2;
		Object.entries(vlanValues).forEach(([index, value]) => {
			start = value.start;
			end = value.end;
			Object.entries(vlanValues).forEach(([index2, value2]) => {
				start2 = value2.start;
				end2 = value2.end;
				const error = get(`${rowIndex}.value.${index}.$form.errors.0`, formModel);
				const error2 = get(`${rowIndex}.value.${index2}.$form.errors.0`, formModel);
				if (
					index2 !== index &&
					this.checkErrorType(error) &&
					this.checkErrorType(error2) &&
					((start >= start2 && start <= end2) ||
						(end >= start2 && end <= end2) ||
						(start <= start2 && end >= end2) ||
						(start >= start2 && end <= end2))
				) {
					setErrors(`${rowPath}.${index}`, [`${CAPTIONS.OVERLAPPED_RANGES_ERROR}`]); // error for component
				}
			});
		});
	};

	setValidityAllRows = (rowIndex, rangeIndex) => {
		let allRowsValid = true;

		const { genericRangeValue, setErrors, model } = this.props;

		for (let i = 0; i < genericRangeValue.length; i += 1) {
			// if all row deleted - we should not validate it
			// because it's not updated yet in the store
			if (rangeIndex === undefined) {
				continue;
			}

			const rangeRows = get(`${i}.value`, genericRangeValue);
			for (let j = 0; j < rangeRows.length; j += 1) {
				// If row with a specific range deleted - don't check it
				// because it's not updated yet in the store
				if (rowIndex === i && rangeIndex === j) {
					continue;
				}

				const start = get(`${i}.value.${j}.start`, genericRangeValue);
				const end = get(`${i}.value.${j}.end`, genericRangeValue);

				if (end < start) {
					allRowsValid = false;
					break;
				}
			}

			if (!allRowsValid) {
				break;
			}
		}

		if (allRowsValid) {
			setErrors(model, []);
		}
	};

	onAddRangePorts = (rowIndex) => () => {
		const { push, model } = this.props;
		push(`${model}.${rowIndex}.value`, {
			end: '',
			isRange: true,
			start: ''
		});
		this.setState({ newRangeAdded: rowIndex });
	};

	onRemoveRangePorts = (rowIndex, rangeIndex) => () => {
		const { remove, model, form } = this.props;
		remove(`${model}.${rowIndex}.value`, rangeIndex, {
			form
		});

		this.setValidityAllRows(rowIndex, rangeIndex);
		this.setState({ removedRangeIndex: rowIndex });
	};

	onRowNameChange = (rowIndex) => ({ value }) => {
		const { change, model, form } = this.props;
		change(`${model}.${rowIndex}.name`, value, {
			form
		});
	};

	onRemoveRangeRow = (rowIndex) => () => {
		const { remove, model, form } = this.props;
		remove(`${model}`, rowIndex, {
			form
		});

		this.setValidityAllRows(rowIndex);
	};

	onNewRangeRow = () => {
		const { push, model, form } = this.props;
		push(
			`${model}`,
			{
				name: '',
				value: []
			},
			{ form }
		);
	};

	checkErrorType = (error) => {
		switch (error) {
			case CAPTIONS.REQUIRED_ERROR:
			case CAPTIONS.WRONG_RANGES_ERROR:
			case CAPTIONS.MIN_ERROR:
			case CAPTIONS.MAX_ERROR:
				return false;
			default:
				return true;
		}
	};

	renderRowName = (name, rowIndex) => {
		const { onlyRangeEnable } = this.props;
		return (
			<div className='generic-field-input'>
				<TextInput
					id={`${name}_${rowIndex}`}
					name={`${name}_${rowIndex}`}
					text={name}
					readOnly={onlyRangeEnable}
					disabled={onlyRangeEnable}
					onChange={this.onRowNameChange(rowIndex)}
					placeholder='Name'
				/>
			</div>
		);
	};

	renderRemoveRow = (rowIndex) => (
		<RemoveButtonConatiner>
			<Button text='x' onClick={this.onRemoveRangeRow(rowIndex)} />
		</RemoveButtonConatiner>
	);

	renderRange(name, start, end, rowIndex, subRowIndex, required, portRangesLength) {
		const { restrictions, formModel } = this.props;
		const min = getOr(Number.MIN_VALUE, 'min', restrictions);
		const max = getOr(Number.MAX_VALUE, 'max', restrictions);
		const valid = get(`${rowIndex}.value.${subRowIndex}.$form.valid`, formModel);
		let error = null;
		let errorMsg = null;
		if (!valid) {
			error = get(`${rowIndex}.value.${subRowIndex}.$form.errors.0`, formModel);
			switch (error) {
				case CAPTIONS.REQUIRED_ERROR:
				case CAPTIONS.WRONG_RANGES_ERROR:
				case CAPTIONS.OVERLAPPED_RANGES_ERROR:
					errorMsg = error;
					break;
				case CAPTIONS.MIN_ERROR:
					errorMsg = `${CAPTIONS.MIN_ERROR_MESSAGE} ${min}`;
					break;
				case CAPTIONS.MAX_ERROR:
					errorMsg = `${CAPTIONS.MAX_ERROR_MESSAGE} ${max}`;
					break;
				default:
					break;
			}
		}

		return (
			<RangePortsContainer
				key={`${name}_${rowIndex}_${subRowIndex}`}
				className='range-fields'
				valid={valid}>
				<Spinner
					id={`${name}_from_${rowIndex}_${subRowIndex}`}
					hasOutline
					step={1}
					min={min}
					max={max}
					value={start}
					onChange={(val) => this.handleRangeChange(val, rowIndex, subRowIndex, 'start')}
					error={!valid}
					errorMsg={errorMsg}
				/>
				-
				<Spinner
					id={`${name}_to_${rowIndex}_${subRowIndex}`}
					hasOutline
					step={1}
					min={min}
					max={max}
					value={end}
					onChange={(val) => this.handleRangeChange(val, rowIndex, subRowIndex, 'end')}
				/>
				<div className='remove-range-button'>
					<Button
						disabled={portRangesLength <= 1 && required}
						text='x'
						onClick={this.onRemoveRangePorts(rowIndex, subRowIndex)}
					/>
				</div>
			</RangePortsContainer>
		);
	}

	render() {
		const { genericRangeValue, onlyRangeEnable, required } = this.props;

		return (
			<div>
				{genericRangeValue.map((range, rowIndex) => {
					const { name, value: portRanges } = range;

					return (
						<RangeContainer key={`${name}_${rowIndex}`}>
							{!onlyRangeEnable && this.renderRemoveRow(rowIndex)}
							{this.renderRowName(name, rowIndex)}
							<SubRowContainer>
								{portRanges.map(({ start, end }, subRowIndex) =>
									this.renderRange(
										name,
										start,
										end,
										rowIndex,
										subRowIndex,
										required,
										portRanges.length
									)
								)}
							</SubRowContainer>

							<div className='add-range-field-button'>
								<Button isCallToAction text='Add Range' onClick={this.onAddRangePorts(rowIndex)} />
							</div>
						</RangeContainer>
					);
				})}

				{!onlyRangeEnable && (
					<Button id='add-item-btn' isCallToAction text='Add Item' onClick={this.onNewRangeRow} />
				)}
			</div>
		);
	}
}

const mapStateToProps = (
	state,
	{ path, preFormModel = 'dynamicForm.content', preForm = 'dynamic.content' }
) => ({
	genericRangeValue: get(`${preForm}.${path}`, state),
	form: get(`${preForm}`, state),
	formModel: get(`${preFormModel}.${path}`, state)
});

CustomGenericRangeField.propTypes = {
	genericRangeValue: PropTypes.instanceOf(Array),
	model: PropTypes.string,
	setErrors: PropTypes.func,
	restrictions: PropTypes.instanceOf(Object),
	form: PropTypes.instanceOf(Object),
	change: PropTypes.func,
	formModel: PropTypes.instanceOf(Object),
	push: PropTypes.func,
	remove: PropTypes.func,
	onlyRangeEnable: PropTypes.bool,
	required: PropTypes.bool
};

export default connect(mapStateToProps, {
	push: actions.push,
	remove: actions.remove,
	change: actions.change,
	setErrors: actions.setErrors
})(CustomGenericRangeField);

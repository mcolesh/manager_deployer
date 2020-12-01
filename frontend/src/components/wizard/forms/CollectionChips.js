import React, { Component } from 'react';
import { Chips, TextInput, Button, Tooltip } from '@nokia-csf-uxr/csfWidgets';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { get, map, filter } from 'lodash/fp';
import styled from 'styled-components';
import { getFieldErrorMessages, filterDuplicatesValues } from 'utils/wizard';
import * as wizardActions from 'actions/wizard';
import './FieldsStyle.css';
import { PropTypes } from 'prop-types';

const CollectionChipsContainer = styled.div`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
`;

const ChipsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	align-items: flex-start;
	max-width: 81%;
	${({ isReadOnly }) => (isReadOnly ? 'pointer-events: none' : 'pointer-events: visible')};
`;

const ChipContainer = styled.div`
	margin-bottom: 4px;
`;

const ButtonContainer = styled.div`
	margin-left: 10px;
	margin-bottom: 5px;
`;

const TextInputContainer = styled.div`
	margin-bottom: 6px;
`;

// TODO: Validation of: is ip already exist
class CollectionChipsField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newFieldData: undefined,
			newFieldValid: { isValid: true, validMessage: '' }
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { addCollectionChipsStatus } = this.props;
		const { addCollectionChipsValue } = nextProps;
		const { newFieldData } = this.state;
		if (
			!addCollectionChipsStatus &&
			nextProps.addCollectionChipsStatus &&
			addCollectionChipsValue !== '' &&
			addCollectionChipsValue === newFieldData
		) {
			this.onAddingNewItem();
		}
	}

	componentDidUpdate(prevProps) {
		const { text } = this.props;
		if (
			(prevProps.text.length > 0 && text.length) === 0 ||
			(prevProps.text.length === 0 && text.length > 0)
		) {
			this.setValidity(text.length > 0 ? text[0] : text);
		}
	}

	onAddingNewItem() {
		const { allDisallowedFields, change, model, form, text, addCollectionChip } = this.props;
		const { newFieldValid, newFieldData } = this.state;
		if (newFieldValid.isValid && newFieldData !== undefined && newFieldData !== '') {
			change(model, [...text, newFieldData], {
				form
			});
			allDisallowedFields && allDisallowedFields.length && this.validateDisallowedField();
			this.resetNewFieldState();
		}
		addCollectionChip(false, '');
	}

	getCurrentFieldDisplay = (fieldPath) => {
		const { wizardSections } = this.props;
		const splittedPath = fieldPath.split('.');
		const currentSection = filter((item) => item.name === splittedPath[0], wizardSections);
		const currentSubsections = filter(
			(item) => item.name === splittedPath[1],
			currentSection[0].subSections
		);
		const currentField = filter(
			(item) => item.name === splittedPath[2],
			currentSubsections[0].fields
		);
		return currentField[0].display;
	};

	onChangingNewItem = ({ value }) => {
		const newFieldValid = this.isItemValid(value);
		this.setState({ newFieldData: value, newFieldValid });
	};

	setValidity(value) {
		const { validators, model, setErrors } = this.props;
		const validatorsRef = map((validator) => validator(this.props, value), validators);

		setErrors(model, validatorsRef);
	}

	updateFormData = (filteredData, path) => {
		const { change, dynamicForm } = this.props;
		const model = `dynamic.content.${path}`;
		change(model, filteredData || [], {
			form: dynamicForm
		});
	};

	validateDisallowedField = () => {
		const { allDisallowedFields, path, text, form } = this.props;
		const { newFieldData } = this.state;
		allDisallowedFields &&
			allDisallowedFields.length &&
			allDisallowedFields.forEach((field) => {
				if (field.items && field.items.includes(path)) {
					let filteredValues = get(field.disallowFieldPath, form);
					filteredValues = filterDuplicatesValues(filteredValues, [...text, newFieldData]);
					this.updateFormData(filteredValues, field.disallowFieldPath);
				}
			});
	};

	onRemoveChip = (element, index) => {
		if (index === -1) {
			return;
		}
		const { change, model, text, form } = element.props;
		change(
			model,
			text.filter((_, i) => i !== index),
			{ form }
		);
	};

	checkDisallowDuplicates(value) {
		const { disallowDuplicates, form } = this.props;
		let duplicatedFieldPath = '';
		disallowDuplicates.some((fieldPath) => {
			const disallowDuplicatesValues = get(fieldPath, form);
			if (disallowDuplicatesValues && disallowDuplicatesValues.includes(value)) {
				duplicatedFieldPath = fieldPath;
				return true;
			}
			return false;
		});
		return duplicatedFieldPath;
	}

	isItemValid(value) {
		// We don't need to check REQUIRE in the input field
		const { validators, text, disallowDuplicates } = this.props;
		const someValidators = [];
		validators.forEach((validator) => {
			if (validator.name !== 'requiredValidator') {
				someValidators.push(validator(this.props, value, text, false));
			}
		});

		// TODO: refactor the below with lodash
		const valid = { isValid: true, validMessage: '' };
		someValidators.forEach((item) => {
			if (item !== false) {
				valid.isValid = false;
				valid.validMessage = `${valid.validMessage.concat(item)}, `;
			}
		});

		// Remove last comma
		if (valid.validMessage.length) {
			valid.validMessage = valid.validMessage.substr(0, valid.validMessage.length - 2);
		}

		// Incase we have disallowDuplicates prop, Will validate
		// if the current value doesn't duplicated with one of related fields.
		if (disallowDuplicates) {
			const duplicatedField = this.checkDisallowDuplicates(value);
			if (duplicatedField) {
				const newInvalidMsg = `Already exist in ${this.getCurrentFieldDisplay(duplicatedField)}`;
				valid.isValid = false;
				valid.validMessage = `${valid.validMessage.concat(newInvalidMsg)}`;
			}
		}

		return valid;
	}

	resetNewFieldState() {
		this.setState({
			newFieldData: undefined,
			newFieldValid: { isValid: true, validMessage: '' }
		});
	}

	renderChips() {
		const { readonly, text, filterItems = [], showOnlyItems, display, name } = this.props;
		let Ips;
		Array.isArray(text) ? (Ips = text) : (Ips = text.split(','));
		return (
			<ChipsContainer isReadOnly={readonly} id={`${name}-chips`}>
				{Ips.map((ip, index) => {
					const chipContainerKey = `${display}_${ip}_${index}`;
					if (showOnlyItems && showOnlyItems.length > 0) {
						return showOnlyItems.indexOf(ip) === -1 ? null : (
							<ChipContainer key={chipContainerKey}>
								<Chips
									id={`${display}_${index}`}
									text={ip}
									showCloseButton={!readonly}
									internalIcon='ic_add_circle'
									closeInternalIcon='ic_close_circle'
									editable={false}
									onCloseClick={() => this.onRemoveChip(this, index)}
								/>
								<Tooltip text={ip} id='tooltipID' target={`#${display}_${index}`} />
							</ChipContainer>
						);
					}
					return filterItems.indexOf(ip) > -1 ? null : (
						<ChipContainer key={chipContainerKey}>
							<Chips
								id={`${display}_${index}`}
								text={ip}
								showCloseButton={!readonly}
								internalIcon='ic_add_circle'
								closeInternalIcon='ic_close_circle'
								editable={false}
								onCloseClick={() => this.onRemoveChip(this, index)}
							/>
							<Tooltip text={ip} id='tooltipID' target={`#${display}_${index}`} />
						</ChipContainer>
					);
				})}
			</ChipsContainer>
		);
	}

	render() {
		const { formModel, readonly, name } = this.props;
		const { newFieldValid } = this.state;
		const { newFieldData } = this.state;
		const valid = get('valid', formModel) ? get('valid', formModel) : get('$form.valid', formModel);
		const errorMessages = get('errors', formModel)
			? get('errors', formModel)
			: get('$form.errors', formModel);

		return (
			<CollectionChipsContainer>
				{!readonly && (
					<TextInputContainer>
						<TextInput
							onChange={this.onChangingNewItem}
							text={newFieldData}
							id={`${name}-collectionChipsInput`}
							readOnly={readonly}
							width={150}
							error={!valid || !newFieldValid.isValid}
							errorMsg={
								newFieldValid.validMessage ||
								(errorMessages && getFieldErrorMessages(errorMessages))
							}
						/>
					</TextInputContainer>
				)}
				{!readonly && (
					<ButtonContainer>
						<Button
							text='Add'
							isCallToAction
							onClick={() => this.onAddingNewItem(newFieldData)}
							disabled={!newFieldValid.isValid || newFieldData === undefined || newFieldData === ''}
							id={`${name}-collectionChipsInput-ADD`}
						/>
					</ButtonContainer>
				)}
				{this.renderChips()}
			</CollectionChipsContainer>
		);
	}
}

CollectionChipsField.propTypes = {
	name: PropTypes.string,
	path: PropTypes.string,
	addCollectionChipsValue: PropTypes.string,
	model: PropTypes.string,
	display: PropTypes.string,
	addCollectionChipsStatus: PropTypes.bool,
	readonly: PropTypes.bool,
	formModel: PropTypes.shape({}),
	form: PropTypes.shape({}),
	dynamicForm: PropTypes.shape({}),
	text: PropTypes.instanceOf(Array),
	wizardSections: PropTypes.instanceOf(Array),
	allDisallowedFields: PropTypes.instanceOf(Array),
	validators: PropTypes.instanceOf(Array),
	disallowDuplicates: PropTypes.instanceOf(Array),
	filterItems: PropTypes.instanceOf(Array),
	showOnlyItems: PropTypes.instanceOf(Array),
	change: PropTypes.func,
	addCollectionChip: PropTypes.func,
	setErrors: PropTypes.func
};

const mapStateToProps = (
	state,
	{ path, preFormModel = 'dynamicForm.content', preForm = 'dynamic.content' }
) => ({
	formModel: get(`${preFormModel}.${path}`, state),
	dynamicForm: get(`${preForm}`, state),
	text: get(`${preForm}.${path}`, state),
	form: get(`${preForm}`, state),
	addCollectionChipsStatus: get('wizard.addCollectionChipsStatus', state),
	addCollectionChipsValue: get('wizard.addCollectionChipsValue', state),
	wizardSections: get(`wizard.sections`, state),
	allDisallowedFields: get(`wizard.allDisallowedFields`, state)
});

export default connect(mapStateToProps, {
	change: actions.change,
	setErrors: actions.setErrors,
	addCollectionChip: wizardActions.addCollectionChip
})(CollectionChipsField);

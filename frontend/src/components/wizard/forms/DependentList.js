import React, { Component } from 'react';
import { Chips, TextInput, Button, Tooltip } from '@nokia-csf-uxr/csfWidgets';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { get, map, cloneDeep } from 'lodash/fp';
import styled from 'styled-components';
import { getFieldErrorMessages } from 'utils/wizard';
import './FieldsStyle.css';
import { PropTypes } from 'prop-types';
import { SelectItem } from '@nokia-csf-uxr/csfWidgets';
import { addCollectionChip as addCollectionChipRef } from 'actions/wizard';

const DependentListContainer = styled.div`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	flex-direction: column;
`;

const DynamicListContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 10px;
`;

const ChipsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	align-items: flex-start;
	${({ isReadOnly }) =>
		isReadOnly
			? 'pointer-events: none; max-width: 100%;'
			: 'pointer-events: visible; max-width: 81%;'};
`;

const ChipContainer = styled.div`
	margin-bottom: 4px;
`;

const ButtonContainer = styled.div`
	margin-left: 10px;
	margin-bottom: 5px;
`;

const SelectContainter = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 10px;
`;

const TextInputContainer = styled.div`
	margin-bottom: 6px;
`;

class DependentList extends Component {
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

	onChangingText = ({ value }) => {
		const newFieldValid = this.isItemValid(value);
		this.setState({ newFieldData: value, newFieldValid });
	};

	onAddingNewItem() {
		const { newFieldValid, newFieldData } = this.state;
		const { addCollectionChip } = this.props;
		if (newFieldValid.isValid && newFieldData !== undefined && newFieldData !== '') {
			this.addNewChip(newFieldData);
			this.resetNewFieldState();
		}
		addCollectionChip(false, '');
	}

	setTextValidity(text) {
		const { validators, setErrors, model } = this.props;
		const listErrors = map((validator) => validator(this.props, text), validators);
		setErrors(`${model}.collection`, listErrors);
	}

	setSelectValidity(option) {
		const { validators, setErrors, model } = this.props;
		const selectErros = map((validator) => validator(this.props, option), validators);
		setErrors(`${model}.value`, selectErros);
	}

	getElementErrorMessages(element) {
		const { formModel } = this.props;
		return get('errors', formModel[element])
			? get('errors', formModel[element])
			: get('$form.errors', formModel[element]);
	}

	addNewChip = (ip) => {
		const { change, model, text, form, selectedItem } = this.props;
		const newDependentList = {
			value: selectedItem,
			collection: [...text, ip]
		};

		change(model, newDependentList, { form });
		this.setTextValidity([...text, ip]);
	};

	onRemoveChip = (element, index) => {
		const { change, model, text, form, selectedItem } = element.props;
		const newText = text.filter((_, i) => i !== index);
		const newDependentList = {
			value: selectedItem,
			collection: newText
		};

		change(model, newDependentList, { form });
		element.setTextValidity(newText);
	};

	onSelectChange = (option) => {
		const { data, change, model, text, selectedItem, form } = this.props;
		const prevSelectedItem = selectedItem;

		if (option.value === null || prevSelectedItem === option.value) {
			return;
		}

		const itemsToRemove = data.optionsToListItemsMap[prevSelectedItem]
			? data.optionsToListItemsMap[prevSelectedItem]
			: [];
		const itemsToAdd = data.optionsToListItemsMap[option.value]
			? data.optionsToListItemsMap[option.value]
			: [];

		const newChips = cloneDeep(text)
			.filter((chip) => itemsToRemove.indexOf(chip) === -1)
			.concat(itemsToAdd.filter((chip) => text.indexOf(chip) === -1));

		const newDependentList = {
			value: option.value,
			collection: newChips
		};

		change(model, newDependentList, { form });
		this.setSelectValidity(option.value);
		this.setTextValidity(newChips);
	};

	resetNewFieldState() {
		this.setState({
			newFieldData: undefined,
			newFieldValid: { isValid: true, validMessage: '' }
		});
	}

	isElementValid(element) {
		const { formModel } = this.props;
		return get('valid', formModel[element])
			? get('valid', formModel[element])
			: get('$form.valid', formModel[element]);
	}

	isItemValid(value) {
		// We don't need to check REQUIRE in the input field
		const { validators, text } = this.props;
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

		return valid;
	}

	renderChips() {
		const { readonly, text, display } = this.props;
		let Ips;
		Array.isArray(text) ? (Ips = text) : (Ips = text.split(','));
		return (
			<ChipsContainer isReadOnly={readonly}>
				{Ips.map((ip, index) => {
					return (
						<ChipContainer key={`${display}_${ip}_${index}`}>
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
		const { selectedItem, readonly, name, data, textPlaceholder, path } = this.props;
		const { newFieldData, newFieldValid } = this.state;

		const isSelectValid = this.isElementValid('value');
		const selectErrorMessages = this.getElementErrorMessages('value');
		const isListValid = this.isElementValid('collection');
		const listErrorMessages = this.getElementErrorMessages('collection');

		return (
			<DependentListContainer>
				<SelectContainter>
					<SelectItem
						id={`selectItem-${name && name.replace(/:/g, '_')}`}
						options={data.options.filter((d) => (d.label = d.label.toString()))}
						isDisabled={readonly}
						selectedItem={selectedItem}
						onChange={this.onSelectChange}
						searchable
						errorMsg={isSelectValid ? null : getFieldErrorMessages(selectErrorMessages)}
						maxWidth={500}
						minWidth={50}
						width={400}
					/>
				</SelectContainter>
				<DynamicListContainer>
					<TextInputContainer>
						{!readonly && (
							<TextInput
								onChange={this.onChangingText}
								text={newFieldData}
								id={`${path}-collectionChipsInput`}
								readOnly={readonly}
								width={150}
								error={!isListValid || !newFieldValid.isValid}
								errorMsg={
									newFieldValid.validMessage ||
									(listErrorMessages && getFieldErrorMessages(listErrorMessages))
								}
								placeholder={textPlaceholder}
							/>
						)}
					</TextInputContainer>
					{!readonly && (
						<ButtonContainer>
							<Button
								text='Add'
								isCallToAction
								onClick={() => this.onAddingNewItem(newFieldData)}
								disabled={
									!newFieldValid.isValid || newFieldData === undefined || newFieldData === ''
								}
							/>
						</ButtonContainer>
					)}
					{this.renderChips()}
				</DynamicListContainer>
			</DependentListContainer>
		);
	}
}

DependentList.propTypes = {
	addCollectionChipsValue: PropTypes.string,
	path: PropTypes.string,
	model: PropTypes.string,
	selectedItem: PropTypes.string,
	display: PropTypes.string,
	name: PropTypes.string,
	textPlaceholder: PropTypes.string,
	addCollectionChipsStatus: PropTypes.bool,
	readonly: PropTypes.bool,
	formModel: PropTypes.shape({}),
	form: PropTypes.shape({}),
	data: PropTypes.shape({
		options: PropTypes.instanceOf(Array),
		optionsToListItemsMap: PropTypes.shape({})
	}),
	validators: PropTypes.instanceOf(Array),
	text: PropTypes.instanceOf(Array),
	addCollectionChip: PropTypes.func,
	setErrors: PropTypes.func,
	change: PropTypes.func
};

const mapStateToProps = (
	state,
	{ path, preFormModel = 'dynamicForm.content', preForm = 'dynamic.content' }
) => ({
	formModel: get(`${preFormModel}.${path}`, state),
	form: get(`${preForm}`, state),
	text: get(`${preForm}.${path}.collection`, state),
	selectedItem: get(`${preForm}.${path}.value`, state),
	addCollectionChipsStatus: get('wizard.addCollectionChipsStatus', state),
	addCollectionChipsValue: get('wizard.addCollectionChipsValue', state)
});

export default connect(mapStateToProps, {
	change: actions.change,
	push: actions.push,
	setErrors: actions.setErrors,
	addCollectionChip: addCollectionChipRef
})(DependentList);

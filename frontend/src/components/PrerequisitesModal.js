import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get, isEqual, map } from 'lodash/fp';
import { Label, Dialog, Button, Tooltip } from '@nokia-csf-uxr/csfWidgets';
import { actions } from 'react-redux-form';

import * as uiActions from 'actions/ui';
import * as wizardAction from 'actions/wizard';
import * as APP_CONSTANTS from 'constants/app-constants';
import { clearWizardKeepCategories as clearWizardKeepCategoriesRef } from 'actions/wizard';
import {
	getFieldComponent,
	getFieldNormalizedProps,
	getFieldValidators,
	prerequisitesInitialState,
	updateFieldsVisability
} from 'utils/wizard';

const FieldContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 7px;
`;

const LabelContainer = styled.div``;

class PrerequisitesModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showTooltip: true
		};
	}

	UNSAFE_componentWillReceiveProps = (nextProps) => {
		const { prerequisitesMap, lastChangedField } = nextProps;
		const {
			change,
			prerequisites,
			prerequisitesFields,
			setErrors,
			clearLastChangedField,
			showIfDependancyMap,
			updatePrerequisitesVisability
		} = this.props;
		if (
			nextProps.prerequisitesFields.length > 0 &&
			!isEqual(nextProps.prerequisitesFields, prerequisitesFields)
		) {
			const initialForm = prerequisitesInitialState(nextProps.prerequisitesFields);
			change('prerequisites', initialForm);
		}

		if (
			Object.keys(nextProps.prerequisites).length !== Object.keys(prerequisites).length &&
			Object.keys(nextProps.prerequisites).length !== 0
		) {
			nextProps.prerequisitesFields.forEach((item) => {
				if (prerequisitesMap.get(item.name).visible) {
					const formField = get(`prerequisites.${item.name}`, nextProps);
					const validators = this.getValidators(item, formField);
					setErrors(`prerequisites.${item.name}`, validators);
				}
			});
		}

		if (lastChangedField !== '') {
			clearLastChangedField();

			const prerequisitesMapNew = updateFieldsVisability(
				prerequisitesMap,
				showIfDependancyMap,
				nextProps.prerequisites,
				lastChangedField
			);
			updatePrerequisitesVisability(prerequisitesMapNew);

			// validate nested showIf dependent fields
			if (showIfDependancyMap.has(lastChangedField)) {
				const fieldsNamesToValidate = showIfDependancyMap.get(lastChangedField);
				fieldsNamesToValidate.forEach((fieldName) => {
					if (prerequisitesMapNew.get(fieldName).visible) {
						const formField = get(fieldName, nextProps.prerequisites);
						const validators = this.getValidators(prerequisitesMapNew.get(fieldName), formField);
						setErrors(`prerequisites.${fieldName}`, validators);
					} else {
						setErrors(`prerequisites.${fieldName}`, []);
					}
				});
			}
		}
	};

	getValidators = (field, value) => {
		const validators = map((validator) => validator(field, value), getFieldValidators(field));
		return validators;
	};

	onClose = () => {
		const { clearWizardKeepCategories, hidePrequisiteModal } = this.props;
		clearWizardKeepCategories();
		hidePrequisiteModal();
	};

	onConfirm = () => {
		const { prerequisitesFormValid, onModalConfirm, hidePrequisiteModal } = this.props;
		if (prerequisitesFormValid) {
			onModalConfirm();
			hidePrequisiteModal();
		}
	};

	mouseOut = () => {
		this.setState({ showTooltip: true });
	};

	mouseOver(e) {
		const el = e.target;
		if (el.offsetWidth >= el.scrollWidth) {
			this.setState({ showTooltip: false });
		}
	}

	renderField = (field) => {
		const { showTooltip } = this.state;
		const FieldComponent = getFieldComponent(field.type);
		const validators = getFieldValidators(field);
		const normalizedProps = getFieldNormalizedProps(field);

		return (
			<FieldContainer key={field.name}>
				<div className='input-align-label'>
					<LabelContainer
						id='label-text-value'
						onMouseOver={(e) => this.mouseOver(e)}
						onFocus={() => null}
						onMouseOut={this.mouseOut}
						onBlur={() => null}>
						<Label text={field.display} className='center-align' />
					</LabelContainer>
				</div>
				{showTooltip && <Tooltip text={field.display} balloon target='#label-text-value' />}
				<div>
					<FieldComponent
						name={field.name}
						key={field.name}
						model={`prerequisites.${field.name}`}
						path={field.name}
						preFormModel='prerequisitesForm'
						preForm='prerequisites'
						validators={validators}
						display={field.display}
						{...normalizedProps}
					/>
				</div>
			</FieldContainer>
		);
	};

	renderFooter = () => {
		const { prerequisitesFormValid } = this.props;
		return (
			<Button
				data-testid='CONTINUE'
				text={APP_CONSTANTS.CONTINUE}
				isCallToAction
				onClick={this.onConfirm}
				disabled={!prerequisitesFormValid}
			/>
		);
	};

	render() {
		const { showModal, prerequisitesTitle, prerequisitesFields, prerequisitesMap } = this.props;

		return (
			<div>
				{prerequisitesFields.length > 0 && showModal && (
					<Dialog
						width={520}
						height={
							prerequisitesFields.length <= 5 ? 230 + 60 * (prerequisitesFields.length - 1) : 400
						}
						title={prerequisitesTitle}
						theme='black'
						escapeExits
						close
						onClose={this.onClose}
						renderFooter={this.renderFooter}
						scroll
						header>
						<div>
							{prerequisitesFields &&
								prerequisitesFields.map((field) => {
									if (prerequisitesMap.get(field.name).visible) {
										return this.renderField(field);
									}
									return true;
								})}
						</div>
					</Dialog>
				)}
			</div>
		);
	}
}

PrerequisitesModal.propTypes = {
	showModal: PropTypes.bool,
	prerequisitesFormValid: PropTypes.bool,
	prerequisitesTitle: PropTypes.string,
	prerequisites: PropTypes.shape({}),
	showIfDependancyMap: PropTypes.shape({ get: PropTypes.func }),
	prerequisitesMap: PropTypes.shape({ get: PropTypes.func }),
	prerequisitesFields: PropTypes.instanceOf(Array),
	onModalConfirm: PropTypes.func.isRequired,
	change: PropTypes.func,
	hidePrequisiteModal: PropTypes.func,
	clearWizardKeepCategories: PropTypes.func,
	setErrors: PropTypes.func,
	clearLastChangedField: PropTypes.func,
	updatePrerequisitesVisability: PropTypes.func
};

const mapStateToProps = (state) => ({
	showModal: state.ui.showPrerequisiteModal,
	prerequisitesTitle: state.wizard.prerequisitesTitle,
	prerequisitesFields: state.wizard.prerequisitesFields,
	prerequisitesFormValid: get('prerequisitesForm.$form.valid', state),
	prerequisites: get('prerequisites', state),
	prerequisitesForm: get('prerequisitesForm', state),
	prerequisitesMap: get('wizard.prerequisitesMap', state),
	lastChangedField: get('wizard.lastChangedField', state),
	showIfDependancyMap: state.wizard.showIfDependancyMap
});

export default connect(mapStateToProps, {
	hidePrequisiteModal: uiActions.hidePrequisiteModal,
	clearLastChangedField: wizardAction.clearLastChangedField,
	updatePrerequisitesVisability: wizardAction.updatePrerequisitesVisability,
	clearWizardKeepCategories: clearWizardKeepCategoriesRef,
	change: actions.change,
	setErrors: actions.setErrors
})(PrerequisitesModal);

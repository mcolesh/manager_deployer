import React, { lazy, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { push as pushRef } from 'connected-react-router';
import styled from 'styled-components';
import { isEmpty, get, filter, getOr } from 'lodash/fp';
import * as wizardAction from 'actions/wizard';
import {
	getSectionComponent,
	getNormalizedInitialWizardState,
	clearAssignedFieldsAfterDelete,
	validateForm,
	updateFieldsVisability,
	updateSubsectionsVisability
} from 'utils/wizard';
import { exportWizard } from 'utils/import-export-data';
import WizardSteps from 'components/wizard/WizardSteps';
import Loader from 'components/Loader';
import { wizardToDeploy as wizardToDeployRef } from 'selectors/wizard';
import { AppToolbar, Label, Button } from '@nokia-csf-uxr/csfWidgets';
import DeploySection from 'components/custom-sections/deploy-section/DeploySection';
import Search from 'components/wizard/Search';
import * as CONSTANTS from 'constants/app-constants';
import * as CAPTIONS from 'constants/app-captions';
import 'components/DashboardStyles.css';
import { DescriptionLabel, WizardLoaderContainer } from 'components/StyledComponents';
import ImportUploader from 'components/wizard/ImportUploader';
import useComponentWillMount from 'hooks/useComponentWillMount';
import useUnmount from 'hooks/useUnmount';
import useMount from 'hooks/useMount';
import AlertDialog from './AlertDialog';

const DashboardConfirmationDialog = lazy(() => import('components/DashboardConfirmationDialog'));
const ResetAllocationsWarningDialog = lazy(() =>
	import('components/custom-sections/ipmi-section/ResetAllocationsWarningComponent')
);

const WizardSubContainer = styled.div`
	display: flex;
	height: calc(100vh - 125px);
`;

const WizardStepsContainer = styled.div`
	width: 330px;
	min-width: 330px;
	border-right: 1px solid #d4d4d4;
	overflow: auto;
	height: calc(100vh - 184px);
`;

const WizardContainer = styled.div`
	background-color: #e8e8e8;
`;

export const OverlayPanelContent = styled.div`
	margin: 2em;
`;

export const WizardContentContainer = styled.div`
	${({ helpVisible }) => (helpVisible ? 'width: calc(100% - 657px)' : 'width: 100%')};
	padding-bottom: 24px;
	height: calc(100% - 56px);
	overflow: auto;
	position: relative;
`;

const Wizard = (props) => {
	const {
		currentStep,
		initialized,
		push,
		requestToImportWizard,
		showIfDependancyMap,
		allFieldsMap,
		sections,
		change,
		resetAfterchangingDynamicSubSection,
		assignedFieldsArray,
		dynamicForm,
		addedNewSection,
		deletedDynamicSubSection,
		deletedSubSectionName,
		addedSubsectionFieldsMap,
		showHelpFields,
		debug,
		showFieldDescriptionInTooltip,
		showDeployJson,
		resetWizard,
		wizardName,
		wizardToDeploy,
		cbisVersion,
		showDashboardConfirmationDialog,
		defaultSections,
		form,
		setFieldsErrors,
		name,
		helpMsg,
		isExampleCard,
		showAllocationsWarningDialog,
		categories,
		selectedCategoryIndex,
		importWarning,
		clearWizard,
		importError,
		deleteSubSectionAlert,
		addSubSectionDialog,
		wizardStepSections,
		lastChangedField,
		clearLastChangedField,
		subsectionsMap,
		updateFormVisability
	} = props;

	const importClickedHandler = () => {
		requestToImportWizard(true);
	};

	const resetClicked = () => {
		resetWizard(true);
	};

	const exportClicked = () => {
		exportWizard(wizardName, wizardToDeploy, cbisVersion);
	};

	const deployIconClicked = () => {
		showDeployJson(true);
	};

	const [iconButtonsName, setIconButtonsName] = useState('');

	const updateIconButtons = (icon) => {
		setIconButtonsName(icon);
	};

	const appIconButtonsVar = [
		{
			name: CAPTIONS.IMPORT_ICON_LABEL,
			icon: 'ic_import',
			onClick: () => updateIconButtons(CAPTIONS.IMPORT_ICON_LABEL),
			tooltip: { text: CAPTIONS.IMPORT_TOOLTIP }
		},
		{
			name: CAPTIONS.EXPORT_ICON_LABEL,
			icon: 'ic_export',
			onClick: () => updateIconButtons(CAPTIONS.EXPORT_ICON_LABEL),
			tooltip: { text: CAPTIONS.EXPORT_LABEL }
		},
		{
			name: CAPTIONS.RESET_ICON_LABEL,
			icon: 'ic_reset',
			onClick: () => updateIconButtons(CAPTIONS.RESET_ICON_LABEL),
			tooltip: { text: CAPTIONS.RESET_TOOLTIP }
		}
	];

	const [helpVisible, setHelpVisible] = useState(false);
	const [validatingAllFields, setValidatingAllFields] = useState(false);
	const [validatingSomeFields, setValidatingSomeFields] = useState(false);
	const [blockWizardUI, setBlockWizardUI] = useState(true);
	const [validateAllFieldsTimeout, setValidateAllFieldsTimeout] = useState(NaN);
	const [validateSomeFieldsTimeout, setValidateSomeFieldsTimeout] = useState(NaN);
	const [enableCallValidation, setEnableCallValidation] = useState(false);
	const [wizardInitialState, setWizardInitialState] = useState(dynamicForm);
	const [appIconButtons, setAppIconButtons] = useState(appIconButtonsVar);

	const contentContainerInstance = useRef(null);

	const deployIconButton = {
		name: CAPTIONS.DEPLOY_ICON_LABEL,
		icon: 'ic_log',
		onClick: () => updateIconButtons(CAPTIONS.DEPLOY_ICON_LABEL),
		tooltip: { text: CAPTIONS.DEPLOY_BUTTON_TOOLTIP }
	};

	const addRemoveValidators = (field, fieldsErrorsMap) => {
		// TODO: Handle collection chips and generic range validations
		if (field.visible && field.type !== 'generic-range') {
			// add validators
			validateForm(field, fieldsErrorsMap, form, dynamicForm);
		} else {
			// remove validators
			get(`${field.path}.$form`, form) !== undefined
				? fieldsErrorsMap.set(`${field.path}.$form`, [])
				: fieldsErrorsMap.set(field.path, []);
		}
	};

	const validateWizardFormsWithTimeout = (fieldsMap, timeout) => {
		return setTimeout(() => {
			if (isEmpty(form)) {
				return;
			}
			let isAllFieldsValidated = false;
			const fieldsErrorsMap2 = new Map();
			if (fieldsMap === undefined) {
				isAllFieldsValidated = true;
				allFieldsMap.forEach((field) => addRemoveValidators(field, fieldsErrorsMap2));
			} else {
				fieldsMap.forEach((field) => addRemoveValidators(field, fieldsErrorsMap2));
			}
			setFieldsErrors(fieldsErrorsMap2);

			isAllFieldsValidated ? setValidatingAllFields(false) : setValidatingSomeFields(false);
		}, timeout);
	};

	const validateWizardForms = (fieldsMap, shouldBlockWizardUI = true) => {
		shouldBlockWizardUI && setBlockWizardUI(true);
		if (fieldsMap === undefined) {
			setValidatingAllFields(true);
			clearTimeout(validateAllFieldsTimeout);
			setValidateAllFieldsTimeout(validateWizardFormsWithTimeout(undefined, 300));
		} else {
			setValidatingSomeFields(true);
			clearTimeout(validateSomeFieldsTimeout);
			setValidateSomeFieldsTimeout(validateWizardFormsWithTimeout(fieldsMap, 0));
		}
	};

	const handleTooltipContent = (e) => {
		if (e.ctrlKey && e.altKey && e.keyCode === CONSTANTS.N_ASCII_CODE && debug) {
			showFieldDescriptionInTooltip();
		}
	};

	const resetWizardValues = () => {
		const wizardInitialStateValue = getNormalizedInitialWizardState(defaultSections, false);
		change('dynamic.content', wizardInitialStateValue);
	};

	const releaseUiIfNeeded = () => {
		if (validatingAllFields === false && validatingSomeFields === false) {
			setBlockWizardUI(false);
		}
	};

	useComponentWillMount(() => {
		if (initialized) {
			const wizardInitialStateValue = getNormalizedInitialWizardState(sections, false);
			change('dynamic.content', wizardInitialStateValue);
		} else {
			clearWizard();
			push('/dashboard');
		}
	});

	useMount(() => {
		setEnableCallValidation(true);
		debug && setAppIconButtons([...appIconButtons, deployIconButton]);
	});

	useUnmount(() => {
		clearTimeout(validateSomeFieldsTimeout);
		clearTimeout(validateAllFieldsTimeout);
		document.removeEventListener('keydown', handleTooltipContent);
		change('dynamic.content', {});
	});

	useEffect(() => {
		// Run validators on all form - first time
		// We can't do it foreach field in the componentDidMount, because there
		// are components in other sections, that not rendered yet on screen,
		// therefore it won't validate them
		// TODO: show progress bar until it finish
		validateWizardForms();
		document.addEventListener('keydown', handleTooltipContent);
	}, [enableCallValidation]);

	useEffect(() => {
		if (iconButtonsName) {
			switch (iconButtonsName) {
				case CAPTIONS.EXPORT_ICON_LABEL:
					exportClicked();
					break;
				case CAPTIONS.IMPORT_ICON_LABEL:
					importClickedHandler();
					break;
				case CAPTIONS.RESET_ICON_LABEL:
					resetClicked();
					break;
				case CAPTIONS.DEPLOY_ICON_LABEL:
					deployIconClicked();
					break;
				default:
					break;
			}
			setIconButtonsName('');
		}
	}, [iconButtonsName]);

	useEffect(() => {
		// Scroll to the top of the page
		contentContainerInstance.current.scrollTop = 0;
	}, [currentStep]);

	useEffect(() => {
		if (!initialized) push('/dashboard');
	}, [initialized]);

	useEffect(() => {
		// (1) update fields and subsections visability according to lastChangedFiled new value
		// (2) re-validate lastChangedField's nested children fields
		if (lastChangedField !== '') {
			clearLastChangedField();

			const allFieldsMapNew = updateFieldsVisability(
				allFieldsMap,
				showIfDependancyMap,
				dynamicForm,
				lastChangedField
			);
			const subsectionsMapNew = updateSubsectionsVisability(
				subsectionsMap,
				allFieldsMapNew,
				dynamicForm
			);
			updateFormVisability(allFieldsMapNew, subsectionsMapNew);

			// validate nested showIf dependent fields
			if (showIfDependancyMap.has(lastChangedField)) {
				const fieldsNamesToValidate = showIfDependancyMap.get(lastChangedField);
				const dependentFieldsMap = new Map();
				fieldsNamesToValidate.forEach((fieldName) => {
					dependentFieldsMap.set(fieldName, allFieldsMap.get(fieldName));
				});
				validateWizardForms(dependentFieldsMap, false);
			}
		}
	}, [lastChangedField]);

	useEffect(() => {
		if (addedNewSection || deletedDynamicSubSection) {
			const wizardInitialStateNew = getNormalizedInitialWizardState(sections, dynamicForm);
			setWizardInitialState(wizardInitialStateNew);
			change('dynamic.content', wizardInitialStateNew);
			resetAfterchangingDynamicSubSection();
			const fieldsToCheckAfterAddOrRemove = new Map();
			allFieldsMap.forEach((field) => {
				field.dataSource && fieldsToCheckAfterAddOrRemove.set(field.name, field);
				field.type === 'subsections-tuple' && fieldsToCheckAfterAddOrRemove.set(field.name, field);
			});

			validateWizardForms(fieldsToCheckAfterAddOrRemove);
		}
	}, [sections]);

	useEffect(() => {
		if (deletedDynamicSubSection) {
			const newDynamicForm = clearAssignedFieldsAfterDelete(
				assignedFieldsArray,
				wizardInitialState,
				deletedSubSectionName
			);
			change('dynamic.content', newDynamicForm);
		}
	}, [deletedDynamicSubSection]);

	useEffect(() => {
		validateWizardForms(addedSubsectionFieldsMap);
	}, [addedNewSection]);

	useEffect(() => {
		if (!validatingAllFields || validatingSomeFields) releaseUiIfNeeded();
	}, [validatingAllFields, validatingSomeFields]);

	const onToggle = ({ value }) => {
		setHelpVisible(value);
		showHelpFields(value);
	};

	const getCurrentSection = () =>
		sections.map((section) => {
			const SectionComponent = getSectionComponent(section);

			return (
				section.display === currentStep && <SectionComponent key={section.name} {...section} />
			);
		});

	const allCategories = categories && categories.length;
	const page = name && allCategories && filter({ name }, categories[selectedCategoryIndex].pages);
	const breadcrumbs = {
		isCompact: true,
		items: [
			{
				title: getOr('', '0.display', page),
				subTitle: getOr('', '0.description', page),
				tooltip: {
					text: `${getOr('', '0.display', page)} \n ${getOr('', '0.description', page)}`
				}
			}
		],
		renderBackButton: (itemProps) => (
			<Button
				icon='ic_arrow_back'
				{...itemProps}
				onClick={() => {
					if (isExampleCard) {
						clearWizard();
						push('/dashboard');
					} else {
						showDashboardConfirmationDialog(true);
					}
				}}
			/>
		)
	};

	return (
		<WizardContainer>
			{blockWizardUI && (
				<WizardLoaderContainer>
					<Loader wholePage size='xxlarge' />
				</WizardLoaderContainer>
			)}
			<Search isExampleCard={isExampleCard} />
			<AppToolbar
				id='application-toolbar'
				breadcrumbs={breadcrumbs}
				overlayPanel={{
					toggleButtonTooltip: {
						text: CAPTIONS.SHOW_HELP_TOOLTIP,
						displayOnFocus: true
					},
					content: (
						<OverlayPanelContent>
							<Label text={CAPTIONS.HELP} />
							{helpMsg === '' ? (
								<DescriptionLabel>{CAPTIONS.HELP_DESCRIPTION}</DescriptionLabel>
							) : (
								<DescriptionLabel>{helpMsg}</DescriptionLabel>
							)}
						</OverlayPanelContent>
					),
					toggleButtonIcon: 'ic_help',
					onToggle
				}}
				iconButtons={!isExampleCard ? appIconButtons : undefined}
			/>

			{importWarning && <AlertDialog caption={CAPTIONS.IMPORT_WARNING} />}
			{importError && <AlertDialog caption={CAPTIONS.IMPORT_ERROR_LABEL} />}
			{deleteSubSectionAlert && <AlertDialog caption={CAPTIONS.DELETE_SUBSECTION_WARNING} />}
			{addSubSectionDialog && <AlertDialog caption={CAPTIONS.ADD_SUBSECTION_DIALOG} />}
			<DashboardConfirmationDialog />
			{showAllocationsWarningDialog && <ResetAllocationsWarningDialog />}
			<ImportUploader
				resetWizardValues={resetWizardValues}
				validateWizardForms={validateWizardForms}
			/>
			<WizardSubContainer>
				<WizardStepsContainer>
					<WizardSteps sections={wizardStepSections} formContent={dynamicForm} />
				</WizardStepsContainer>
				<WizardContentContainer helpVisible={helpVisible} ref={contentContainerInstance}>
					{getCurrentSection()}
				</WizardContentContainer>
			</WizardSubContainer>
			{!isExampleCard && <DeploySection />}
		</WizardContainer>
	);
};

Wizard.propTypes = {
	initialized: PropTypes.bool,
	debug: PropTypes.bool,
	isExampleCard: PropTypes.bool,
	addedNewSection: PropTypes.bool,
	deletedDynamicSubSection: PropTypes.bool,
	showAllocationsWarningDialog: PropTypes.bool,
	importWarning: PropTypes.bool,
	importError: PropTypes.bool,
	deleteSubSectionAlert: PropTypes.bool,
	addSubSectionDialog: PropTypes.bool,
	currentStep: PropTypes.string,
	deletedSubSectionName: PropTypes.string,
	wizardName: PropTypes.string,
	name: PropTypes.string,
	cbisVersion: PropTypes.string,
	helpMsg: PropTypes.string,
	wizardToDeploy: PropTypes.shape({}),
	showIfDependancyMap: PropTypes.shape({}),
	allFieldsMap: PropTypes.shape({}),
	dynamicForm: PropTypes.shape({}),
	form: PropTypes.shape({}),
	addedSubsectionFieldsMap: PropTypes.shape({}),
	deleteSubsectionRequestInfo: PropTypes.shape({
		sectionName: PropTypes.string,
		subsectionName: PropTypes.string
	}),
	addSubsectionRequestInfo: PropTypes.shape({
		regexExpression: PropTypes.string,
		sectionName: PropTypes.string
	}),
	lastChangedField: PropTypes.string,
	prerequisites: PropTypes.shape({}),
	sectionToFieldsMap: PropTypes.shape({}),
	categories: PropTypes.instanceOf(Array),
	assignedFieldsArray: PropTypes.instanceOf(Array),
	defaultSections: PropTypes.instanceOf(Array),
	wizardStepSections: PropTypes.instanceOf(Array),
	sections: PropTypes.instanceOf(Array),
	importedFileSections: PropTypes.instanceOf(Array),
	subsectionsMap: PropTypes.shape({}),
	selectedCategoryIndex: PropTypes.number,
	change: PropTypes.func,
	push: PropTypes.func,
	clearWizard: PropTypes.func,
	requestToImportWizard: PropTypes.func,
	resetAfterchangingDynamicSubSection: PropTypes.func,
	showHelpFields: PropTypes.func,
	showFieldDescriptionInTooltip: PropTypes.func,
	showDeployJson: PropTypes.func,
	resetWizard: PropTypes.func,
	showDashboardConfirmationDialog: PropTypes.func,
	setFieldsErrors: PropTypes.func,
	updateFormVisability: PropTypes.func,
	clearLastChangedField: PropTypes.func
};

const mapStateToProps = (state) => ({
	name: state.wizard.name,
	sections: state.wizard.sections,
	defaultSections: state.wizard.defaults.sections,
	currentStep: state.wizard.currentStep,
	initialized: state.wizard.initialized,
	allFieldsMap: state.wizard.allFieldsMap,
	sectionToFieldsMap: state.wizard.sectionToFieldsMap,
	form: get(`content`, state.dynamicForm),
	dynamicForm: get(`content`, state.dynamic),
	importError: state.wizard.importError,
	wizardToDeploy: wizardToDeployRef(state, true),
	helpMsg: state.wizard.helpMsg,
	wizardName: state.wizard.name,
	wizardStepSections: state.wizard.wizardStepSections,
	debug: state.pagesData.debug,
	pages: state.pagesData.pages,
	categories: state.pagesData.categories,
	selectedCategoryIndex: state.pagesData.selectedCategoryIndex,
	showIfDependancyMap: state.wizard.showIfDependancyMap,
	isExampleCard: state.wizard.isExampleCard,
	deletedDynamicSubSection: state.wizard.deletedDynamicSubSection,
	addedNewSection: state.wizard.addedNewSection,
	deleteSubSectionAlert: state.wizard.deleteSubSectionAlert,
	addSubSectionDialog: state.wizard.addSubSectionDialog,
	cbisVersion: state.pagesData.cbisVersion,
	importWarning: state.wizard.importWarning,
	deletedSubSectionName: state.wizard.deletedSubSectionName,
	addedSubsectionFieldsMap: state.wizard.addedSubsectionFieldsMap,
	assignedFieldsArray: state.wizard.assignedFieldsArray,
	showAllocationsWarningDialog: state.wizard.showAllocationsWarningDialog,
	importBlackList: state.wizard.importBlackList,
	lastChangedField: state.wizard.lastChangedField,
	subsectionsMap: state.wizard.subsectionsMap
});

export default connect(mapStateToProps, {
	setCurrentStep: wizardAction.setCurrentWizardStep,
	change: actions.change,
	push: pushRef,
	clearWizard: wizardAction.clearWizard,
	resetWizard: wizardAction.resetWizard,
	requestToImportWizard: wizardAction.requestToImportWizard,
	showHelpFields: wizardAction.showHelpFields,
	showDeployJson: wizardAction.showDeployJson,
	showDashboardConfirmationDialog: wizardAction.showDashboardConfirmationDialog,
	resetAfterchangingDynamicSubSection: wizardAction.resetAfterchangingDynamicSubSection,
	showFieldDescriptionInTooltip: wizardAction.showFieldDescriptionInTooltip,
	setFieldsErrors: wizardAction.setFieldsErrors,
	disableReset: wizardAction.disableReset,
	deleteSubsection: wizardAction.deleteSubsection,
	hideDeleteSubsectionDialog: wizardAction.hideDeleteSubsectionDialog,
	hideFetchWizardWarningDialog: wizardAction.hideFetchWizardWarningDialog,
	updateFormVisability: wizardAction.updateFormVisability,
	clearLastChangedField: wizardAction.clearLastChangedField
})(Wizard);

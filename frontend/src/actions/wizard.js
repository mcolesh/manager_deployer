import * as AT from 'constants/action-types';
import * as API from 'constants/api-urls';
import * as API_CONFIG from 'constants/api-config';

export const fetchWizardPrerequisite = (name) => {
	const url = `/api/${name}/initial_page`;

	return {
		type: AT.API_REQUEST,
		payload: {
			url,
			nextActionType: AT.FETCH_WIZARD_PREREQUISITES
		}
	};
};

export const fetchWizard = (data, name, debug, warningIgnored) => {
	const defaultUrl = `/api/${name}/main`;
	const overrideUrl = `/api/${name}/status`;

	return {
		type: AT.MULTIPLE_API_REQUEST,
		meta: {
			method: 'POST',
			body: JSON.stringify(data),
			debug,
			warningIgnored
		},
		payload: {
			urls: [defaultUrl, overrideUrl],
			nextActionType: AT.FETCH_WIZARD
		}
	};
};
export const assignWizardData = () => ({
	type: AT.ASSIGN_WIZARD_DATA,
	payload: {}
});

export const setCurrentWizardStep = (stepDisplayName, stepName) => ({
	type: AT.SET_WIZARD_STEP,
	payload: {
		stepDisplayName,
		stepName
	}
});

export const deploy = (url, data) => {
	return {
		type: AT.API_REQUEST,
		meta: {
			method: 'POST',
			data
		},
		payload: {
			url,
			nextActionType: AT.DEPLOY
		}
	};
};

export const clearWizard = () => ({
	type: AT.CLEAR_WIZARD,
	payload: {}
});

export const changeCollapseMap = (key) => ({
	type: AT.CHANGE_COLLAPSE_MAP,
	payload: { key }
});

export const hideFetchWizardErrorDialog = () => ({
	type: AT.HIDE_WIZARD_ERROR_DIALOG,
	payload: {}
});
export const hideFetchWizardWarningDialog = () => ({
	type: AT.HIDE_FETCH_WIZARD_WARNING_DIALOG,
	payload: {}
});

export const showHostGroupAssignDialog = (visible, name) => ({
	type: AT.SHOW_HOST_GROUP_ASSIGN_DIALOG,
	payload: { visible, name }
});

export const setSelectedAssignHostGroupAvailabilityZone = (zone) => ({
	type: AT.SET_SELECTED_ASSIGN_HOST_GROUP_AVAILABILITY_ZONE,
	payload: { zone }
});

export const setSelectedAssignHostGroupPool = (pool) => ({
	type: AT.SET_SELECTED_ASSIGN_HOST_GROUP_POOL,
	payload: { pool }
});

export const hideDeploymentErrorDialog = () => ({
	type: AT.HIDE_DEPLOYMENT_ERROR_DIALOG,
	payload: {}
});

export const resetWizard = (resetWizardToggle) => ({
	type: AT.RESET_WIZARD,
	payload: { resetWizardToggle }
});

export const mapFormsFromFile = (fileData, warningIgnored, importedPrerequisites) => ({
	type: AT.MAP_FORMS_FROM_FILE,
	payload: { fileData, warningIgnored, importedPrerequisites }
});

export const finishedImportingFile = (importFileToWizardToggle) => ({
	type: AT.FINISHED_IMPORTING_FILE,
	payload: { importFileToWizardToggle }
});

export const importErrorReceived = (errorMessage) => ({
	type: AT.ON_IMPORT_ERROR,
	payload: { errorMessage }
});

export const requestToImportWizard = (enable) => ({
	type: AT.REQUEST_TO_IMPORT_WIZARD,
	payload: { enable }
});

export const hideErrorDialog = () => ({
	type: AT.HIDE_ERROR_DIALOG,
	payload: {}
});

export const clearWizardAfterReset = () => ({
	type: AT.CLEAR_WIZARD_AFTER_RESET,
	payload: {}
});

export const setFieldHelpVisibility = (fieldName) => ({
	type: AT.SET_FIELD_HELP_VISIBILITY,
	payload: { fieldName }
});

export const uploadWizardFile = (file, fieldName, pageName) => {
	return {
		type: AT.API_REQUEST,
		meta: {
			method: API_CONFIG.METHOD.POST,
			data: file,
			onUploadProgress: true,
			fieldName,
			headers: {
				'Content-type': file.type,
				'X-FILENAME': file.name,
				'X-FIELD': fieldName,
				'X-PAGE': pageName
			}
		},
		payload: {
			url: API.UPLOAD_FILE_URL,
			nextActionType: AT.UPLOAD_WIZARD_FILE
		}
	};
};

export const updateFileUploadStatus = (fieldName, data) => ({
	type: AT.UPDATE_FILE_UPLOAD_STATUS,
	payload: {
		fieldName,
		data
	}
});

export const showHelpMessage = (value) => ({
	type: AT.SHOW_HELP_MESSAGE,
	payload: { value }
});

export const showHelpFields = (value) => ({
	type: AT.SHOW_HELP_FIELDS,
	payload: { value }
});

export const showDeployJson = (value) => ({
	type: AT.SHOW_DEPLOY_JSON,
	payload: { value }
});

export const mergeCategories = (newCategories) => ({
	type: AT.SET_CATEGORIES,
	payload: { newCategories }
});

export const disableReset = () => ({
	type: AT.DISABLE_RESET,
	payload: {}
});

export const clearWizardKeepCategories = () => ({
	type: AT.CLEAR_WIZARD_KEEP_CATEGORIES,
	payload: {}
});

export const search = (text) => ({
	type: AT.SEARCH_TEXT,
	payload: { text }
});

export const changeCollapseMapStatus = () => ({
	type: AT.CHANGE_COLLAPSE_MAP_STATUS,
	payload: {}
});

export const changeCollapseMapInSearch = (key) => ({
	type: AT.CHANGE_COLLAPSE_MAP_IN_SEARCH,
	payload: { key }
});

export const showDashboardConfirmationDialog = (value) => ({
	type: AT.SHOW_DASHBOARD_CONFIRMATION_DIALOG,
	payload: { value }
});

export const addCollectionChip = (status, value) => ({
	type: AT.ADD_COLLECTION_CHIP,
	payload: { status, value }
});

export const isWizardActive = (wizardName) => {
	return {
		type: AT.API_REQUEST,
		payload: {
			url: `api/${wizardName}/isActive`,
			nextActionType: AT.IS_WIZARD_ACTIVE
		}
	};
};

export const setExamplesCategory = (data) => ({
	type: AT.SET_EXAMPLES_CATEGORY,
	payload: { data }
});

export const addNewSubSection = (sectionName, subSectionName) => ({
	type: AT.ADD_NEW_SUBSECTION,
	payload: { sectionName, subSectionName }
});

export const deleteSubsection = (sectionName, subSectionName) => ({
	type: AT.DELETE_SUBSECTION,
	payload: { sectionName, subSectionName }
});

export const resetAfterchangingDynamicSubSection = () => ({
	type: AT.RESET_AFTER_CHANGING_DYNAMIC_SUBSECTION,
	payload: {}
});

export const checkLimitOfSubSections = (value) => ({
	type: AT.CHECK_LIMIT_OF_SUBSECTIONS,
	payload: { value }
});

export const checkWizardDependencies = (name) => {
	return {
		type: AT.API_REQUEST,
		payload: {
			url: `/api/${name}/is_page_dependencies_ready`,
			nextActionType: AT.FETCH_WIZARD_DEPENDENCIES_STATE
		}
	};
};

export const resetWizardDependenciesParameters = () => ({
	type: AT.RESET_WIZARD_DEPENDENCIES_PARAMS,
	payload: {}
});

export const getRunningProcesses = () => {
	return {
		type: AT.API_REQUEST,
		payload: {
			url: `/api/get_processes_running`,
			nextActionType: AT.GET_RUNNING_PROCESSES
		}
	};
};

export const closeRestartServertDialog = () => ({
	type: AT.CLOSE_RESTART_SERVER_DIALOG,
	payload: {}
});

export const restartServerServices = () => {
	return {
		type: AT.API_REQUEST,
		meta: {
			method: 'POST',
			data: {}
		},
		payload: {
			url: '/api/restart',
			nextActionType: AT.RESTART_SERVER_SERVICES
		}
	};
};

export const restartServerServicesFinished = () => ({
	type: AT.RESTART_SERVER_SERVICES_FINISHED,
	payload: {}
});

export const addNewValueToFieldExtendedValues = (fieldName, newValue) => ({
	type: AT.ADD_NEW_VALUE_TO_FIELD_EXTENDED_VALUES,
	payload: { fieldName, newValue }
});

export const setSelectedAssignHostGroupRack = (rack) => ({
	type: AT.SET_SELECTED_ASSIGN_HOST_GROUP_RACK,
	payload: { rack }
});

export const changeRackSwitchStatus = (value) => ({
	type: AT.ON_CHANGE_RACK_SWITCH_STATUS,
	payload: { value }
});

export const showFieldDescriptionInTooltip = () => ({
	type: AT.SHOW_FIELD_DESCRIPTION_IN_TOOLTIP,
	payload: {}
});

export const hideDeleteSubsectionDialog = () => ({
	type: AT.HIDE_DELETE_SUBSECTION_DIALOG,
	payload: {}
});

export const hideAddSubsectionDialog = () => ({
	type: AT.HIDE_ADD_SUBSECTION_DIALOG,
	payload: {}
});

export const handleDeleteSubsectionClick = (sectionName, subsectionName) => ({
	type: AT.HANDLE_DELETE_SUBSECTION_CLICK,
	payload: { sectionName, subsectionName }
});

export const handleAddNewSubSectionClicked = (sectionName, regexExpression) => ({
	type: AT.HANDLE_ADD_SUBSECTION_CLICK,
	payload: { sectionName, regexExpression }
});

export const showResetAllocationsWarning = (value, actionToPerform) => ({
	type: AT.SHOW_RESET_ALLOCATIONS_WARNING,
	payload: { value, actionToPerform }
});

export const setIpRangeEditMode = (value) => ({
	type: AT.SET_IP_RANGE_EDIT_MODE,
	payload: { value }
});

export const openRestartServerDialog = () => ({
	type: AT.OPEN_RESTART_SERVER_DIALOG,
	payload: {}
});

export const setFieldsErrors = (fieldPathToErrorsMap) => {
	return {
		type: AT.SET_FIELDS_ERRORS,
		payload: { fieldPathToErrorsMap }
	};
};

export const updateFormVisability = (allFieldsMapNew, subsectionsMapNew) => {
	return {
		type: AT.UPDATE_FORM_VISABILITY,
		payload: { allFieldsMapNew, subsectionsMapNew }
	};
};

export const updatePrerequisitesVisability = (prerequisitesMapNew) => {
	return {
		type: AT.UPDATE_PREREQUISITES_VISABILITY,
		payload: { prerequisitesMapNew }
	};
};

export const clearLastChangedField = () => {
	return {
		type: AT.CLEAR_LAST_CHANGED_FIELD,
		payload: {}
	};
};

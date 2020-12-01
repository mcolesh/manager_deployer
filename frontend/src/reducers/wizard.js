import { handleActions } from 'redux-actions';
import { set, get, reject, cloneDeep, filter, getOr } from 'lodash/fp';
import * as AT from 'constants/action-types';
import * as CONSTANTS from 'constants/app-constants';
import * as CAPTIONS from 'constants/app-captions';
import * as SERVER_RESPONSE_CODE from 'constants/server-response-code';
import {
	mergeWizardData,
	createAllFieldsMap,
	createSubsectionsMap,
	createShowIfDependancyMap,
	validateFieldsVisibility,
	initialFieldsCollapse,
	updateAllFieldsHelpVisibility,
	createUploadFilesMap,
	createSearchMap,
	createPrerequisiteFieldsMap,
	initializeWizardData,
	createExtendableSubsectionsMap,
	addNewSubsection,
	validateFieldsVisibilityAfterUpdate,
	createNewSubsectionFieldsMap,
	checkForNewSections,
	setDataSourcesFields,
	createExtendedFieldValuesMap,
	checkMergedData,
	updateAssignedFieldsArrayAfterChange,
	updateAssignedFieldsArray,
	populateWizardSections
} from 'utils/wizard';
import {
	createSectionsFromImportedFile,
	updateAssignedFieldsArrayAfterImport
} from 'utils/import-export-data';
import * as FILE_UPLOAD_STATUS from 'constants/fileUploadStatus';

const initialState = {
	name: '',
	sections: [],
	defaults: { name: '', sections: [] },
	currentStep: '',
	deployStatus: '',
	initialized: false,
	allFieldsMap: new Map(),
	subsectionsMap: new Map(),
	showIfDependancyMap: new Map(),
	collapseMap: new Map(),
	showFetchWizardErrorDialog: false,
	errorMessage: '',
	showDeploymentErrorDialog: false,
	hostGroupAssignDialogVisible: false,
	selectedAssignedHostGroup: '',
	selectedAssignHostGroupAavailabilityZone: '',
	selectedAssignHostGroupPool: '',
	selectedAssignHostGroupRack: '',
	resetWizardToggle: false,
	finishedResetWizard: false,
	hasInitialPage: false,
	initialPageStatus: CONSTANTS.REQUEST_STATUS.UNDEFINED,
	importWizardToggle: false,
	importedFileSections: [],
	importError: false,
	importRequestEnabled: false,
	deployWarningMessage: '',
	startDeploymentConfirmationMessage: '',
	isActiveWizardURL: '',
	deployURL: '',
	defaultZones: [],
	defaultPools: [],
	defaultDisks: [],
	defaultRacks: [],
	defaultAllocations: [],
	prerequisitesTitle: '',
	prerequisitesFields: [],
	uploadFiles: new Map(),
	showHelp: false,
	helpMsg: '',
	wizardStepSections: [],
	showDeploymentJson: false,
	newCategories: new Map(),
	searchWordsMap: new Map(),
	searchText: '',
	currentStepName: '',
	collapseMapChanged: false,
	showDashboardDialog: false,
	prerequisitesMap: new Map(),
	addCollectionChipsStatus: false,
	addCollectionChipsValue: '',
	isActive: false,
	isExampleCard: false,
	extendableSubsectionsMap: new Map(),
	deletedDynamicSubSection: false,
	addedSubsectionFieldsMap: new Map(),
	addedNewSection: false,
	wizardDependenciesStatus: CONSTANTS.REQUEST_STATUS.UNDEFINED,
	wizardDependenciesServerMsg: '',
	runningProcesses: [],
	showRestartModal: false,
	areServerServicesRestarting: false,
	allDisallowedFields: [],
	extendedFieldValuesMap: new Map(),
	isRackSwitchEnabled: false,
	debug: false,
	isFieldDescriptionInTooltipVisible: false,
	extendableSectionFieldsDependencyMap: new Map(),
	sectionDependentFields: undefined,
	deleteSubSectionAlert: false,
	deleteSubsectionRequestInfo: undefined,
	addSubSectionDialog: false,
	addSubsectionRequestInfo: undefined,
	showFetchWizardWarningDialog: false,
	warningMsg: '',
	mergedData: null,
	importedNewSection: null,
	deletedSubSectionName: null,
	assignedFieldsArray: [],
	importBlackList: [],
	importedPrerequisites: {},
	showAllocationsWarningDialog: false,
	resetAllocationsAction: {},
	ipRangeEditMode: false,
	deployButtonDisabled: false,
	showWarningExpectedValue: true,
	uploadSource: null,
	lastChangedField: ''
};

const wizardsReducer = handleActions(
	{
		[AT.FETCH_WIZARD.PENDING]: (state) => {
			return { ...state, initialized: false };
		},
		[AT.ASSIGN_WIZARD_DATA]: (state) => {
			let merged, name, currentStep, currentStepName;

			name = get('name', state);
			currentStep = get('currentStep', state);
			currentStepName = get('currentStepName', state);
			merged = get('mergedData', state);
			const [
				updatedSections,
				extendableSubsectionsMap,
				allFieldsMap,
				subsectionsMap,
				showIfDependancyMap,
				collapseMap,
				uploadFiles,
				allDisallowedFields,
				extendedFieldValuesMap,
				extendableSectionFieldsDependencyMap
			] = initializeWizardData(merged);
			const deloyIndex = updatedSections.findIndex((item) => item.type === 'deploy');
			const deloyButtonIndex = updatedSections[deloyIndex].subSections.findIndex(
				(item) => item.type === 'actions'
			);

			const deployButtonTextIndex = updatedSections[deloyIndex].subSections[
				deloyButtonIndex
			].buttons.findIndex((item) => item.role === 'submit');

			// in case of enfore multi pools, we need to know the default pools &
			// zones, because the user can't change them
			let defaultZones = [];
			let defaultPools = [];
			let defaultDisks = [];
			let defaultRacks = [];
			let defaultAllocations = [];

			const ipmiSection = filter({ name: 'ipmi_ips' }, updatedSections);
			if (ipmiSection.length) {
				defaultZones = get('0.defineZones.zones', ipmiSection);
				if (!defaultZones) {
					const zoneSection = filter({ name: 'defineZones' }, get('0.subSections', ipmiSection));
					defaultZones = get('0.default.zones', zoneSection);
				}
				const poolSection = filter({ name: 'pools' }, get('0.subSections', ipmiSection));
				defaultPools = get('0.default', poolSection);

				const diskSection = filter({ name: 'disks' }, get('0.subSections', ipmiSection));
				defaultDisks = get('0.default', diskSection);

				const rackSection = filter({ name: 'racks' }, get('0.subSections', ipmiSection));
				defaultRacks = get('0.default', rackSection);
				if (
					defaultRacks &&
					defaultRacks.length === 0 &&
					get('0.racks', ipmiSection) &&
					get('0.racks.racks', ipmiSection)
				) {
					defaultRacks = get('0.racks.racks', ipmiSection);
				}

				const allocations = get('0.allocations', ipmiSection);
				if (defaultRacks && defaultRacks.length !== 0 && allocations && allocations.length !== 0) {
					allocations.forEach((hg) => {
						if (hg.host_group === 'Storage' && hg.rack_location) {
							defaultAllocations.push(hg);
						}
					});
				}
			}

			const wizardStepSections = cloneDeep(updatedSections).filter(
				(section) => section.type !== 'deploy'
			);
			wizardStepSections.forEach((section) => {
				if (section.isExtendable) {
					section.existingDynamicSections = extendableSubsectionsMap.get(
						section.name
					).subSectionsNamesArray.length;
				}
			});

			const defaults = {
				name: name,
				sections: cloneDeep(updatedSections)
			};
			return {
				...state,
				initialized: true,
				name: name,
				sections: updatedSections,
				currentStep: currentStep,
				currentStepName: currentStepName,
				showIfDependancyMap,
				allFieldsMap,
				subsectionsMap,
				defaults,
				collapseMap,
				uploadFiles,
				deployWarningMessage: get(
					`sections.${deloyIndex}.subSections.${deloyButtonIndex}.showWarning.message`,
					merged
				),
				showWarningExpectedValue: get(
					`sections.${deloyIndex}.subSections.${deloyButtonIndex}.showWarning.expectedReturnValue`,
					merged
				),
				startDeploymentConfirmationMessage: get(
					`sections.${deloyIndex}.subSections.${deloyButtonIndex}.buttons.${deployButtonTextIndex}.beforeSend.confirm`,
					merged
				),
				deployButtonDisabled: get(
					`sections.${deloyIndex}.subSections.${deloyButtonIndex}.buttons.${deployButtonTextIndex}.disabled`,
					merged
				),
				deployURL: get(
					`sections.${deloyIndex}.subSections.${deloyButtonIndex}.buttons.${deployButtonTextIndex}.url.url`,
					merged
				),
				defaultZones,
				defaultPools,
				defaultDisks,
				defaultAllocations,
				wizardStepSections,
				isExampleCard: false,
				extendableSubsectionsMap,
				allDisallowedFields,
				extendedFieldValuesMap,
				defaultRacks,
				isRackSwitchEnabled: get('0.force_racks', ipmiSection),
				extendableSectionFieldsDependencyMap
			};
		},
		[AT.FETCH_WIZARD.SUCCESS]: (state, action) => {
			let merged, name, currentStep, currentStepName, newSections;

			name = get('payload.0.name', action);
			currentStep = get('payload.0.sections.0.display', action);
			currentStepName = get('payload.0.sections.0.name', action);
			let debug = get('meta.debug', action);

			// Remove log section
			action.payload[0].sections = reject({ type: 'log' }, action.payload[0].sections);

			if (action.payload[1].status !== null) {
				newSections = checkForNewSections(
					action.payload[0].sections,
					action.payload[1].status.content
				);
				newSections = populateWizardSections(newSections);
				merged = mergeWizardData(
					action.payload[0].name,
					newSections,
					action.payload[1].status.content
				);
			} else {
				newSections = populateWizardSections(action.payload[0].sections);
				merged = {
					name: action.payload[0].name,
					sections: newSections
				};
			}
			let checkOutput = checkMergedData(merged);
			let jsonErrorWarningMessage = checkOutput.error ? checkOutput.errorMessage : '';
			if (debug) {
				return {
					...state,
					mergedData: merged,
					showFetchWizardWarningDialog: checkOutput.error,
					jsonErrorWarningMessage,
					name: name,
					currentStep: currentStep,
					currentStepName: currentStepName,
					debug: true
				};
			} else {
				return {
					...state,
					mergedData: merged,
					name: name,
					currentStep: currentStep,
					currentStepName: currentStepName,
					debug: false,
					jsonErrorWarningMessage
				};
			}
		},
		[AT.FETCH_WIZARD.FAILURE]: (state, action) => {
			return {
				...state,
				initialized: false,
				showFetchWizardErrorDialog: true,
				errorMessage: action.error ? `${action.error}` : CAPTIONS.GENERAL_ERROR,
				errorDetailsMessage:
					action.urls && action.error
						? `Error while trying to request from: ${get('urls.0', action)}`
						: CAPTIONS.GENERAL_ERROR,
				prerequisitesTitle: '',
				prerequisitesFields: []
			};
		},
		[AT.UPLOAD_WIZARD_FILE.PENDING]: (state, action) => {
			const fieldName = get('meta.fieldName', action);

			const map = new Map(state.uploadFiles);
			const files = map.get(fieldName);
			const file = getOr({}, '0', files);

			file.status = FILE_UPLOAD_STATUS.UPLOADING;
			file.uploadedPercent = 0;

			map.set(fieldName, [file]);

			return { ...state, uploadFiles: map };
		},
		[AT.UPLOAD_WIZARD_FILE.EVENT]: (state, action) => {
			const fieldName = get('meta.fieldName', action);
			const uploadSource = cloneDeep(get('payload.source', action));
			const map = new Map(state.uploadFiles);
			const files = map.get(fieldName);
			const file = getOr({}, '0', files);

			file.uploadedPercent = get('payload.percentCompleted', action);

			map.set(fieldName, [file]);

			return { ...state, uploadFiles: map, uploadSource };
		},
		[AT.UPLOAD_WIZARD_FILE.SUCCESS]: (state, action) => {
			const fieldName = get('meta.fieldName', action);

			const map = new Map(state.uploadFiles);
			const files = map.get(fieldName);
			const file = getOr({}, '0', files);

			file.status = FILE_UPLOAD_STATUS.COMPLETE;

			map.set(fieldName, [file]);

			return { ...state, uploadFiles: map };
		},
		[AT.UPLOAD_WIZARD_FILE.FAILURE]: (state, action) => {
			const fieldName = get('meta.fieldName', action);
			const map = new Map(state.uploadFiles);

			const files = map.get(fieldName);
			const file = getOr({}, '0', files);

			file.status = FILE_UPLOAD_STATUS.ERROR;

			map.set(fieldName, [file]);

			return { ...state, uploadFiles: map };
		},

		[AT.UPDATE_FILE_UPLOAD_STATUS]: (state, action) => {
			const fieldName = get('payload.fieldName', action);
			const data = get('payload.data', action);

			const map = new Map(state.uploadFiles);
			map.set(fieldName, data);

			return { ...state, uploadFiles: map };
		},
		[AT.RESET_WIZARD]: (state, action) => {
			const clonedStateDefaults = cloneDeep(state.defaults);
			let allFieldsMap = createAllFieldsMap(clonedStateDefaults.sections);
			// check which fields should be visible for the first time wizard shows
			validateFieldsVisibility(allFieldsMap);
			// check which subsection should be visible for the first time wizard shows
			const subsectionsMap = createSubsectionsMap(clonedStateDefaults.sections, allFieldsMap);
			// key: parent, value: all nested children
			const showIfDependancyMap = createShowIfDependancyMap(
				clonedStateDefaults.sections,
				allFieldsMap
			);
			const uploadFiles = createUploadFilesMap(clonedStateDefaults.sections);
			const collapseMap = initialFieldsCollapse(clonedStateDefaults.sections);
			const extendableSubsectionsMap = createExtendableSubsectionsMap(clonedStateDefaults.sections);
			const extendedFieldValuesMap = createExtendedFieldValuesMap(allFieldsMap);
			const ipmiSection = filter({ name: 'ipmi_ips' }, get('sections', clonedStateDefaults));

			return {
				...state,
				defaults: clonedStateDefaults,
				sections: clonedStateDefaults.sections,
				allFieldsMap,
				uploadFiles,
				collapseMap,
				subsectionsMap,
				showIfDependancyMap,
				extendableSubsectionsMap,
				resetWizardToggle: action.payload.resetWizardToggle,
				finishedResetWizard: true,
				isExampleCard: false,
				extendedFieldValuesMap,
				isRackSwitchEnabled: get('0.force_racks', ipmiSection)
			};
		},
		[AT.MAP_FORMS_FROM_FILE]: (state, action) => {
			let importedFileSections,
				extendableSubsectionsMap,
				newSections,
				jsonErrorWarningMessage = '';
			let warningIgnored = get('payload.warningIgnored', action);
			let importedPrerequisites = get('payload.importedPrerequisites', action);

			if (!warningIgnored) {
				newSections = checkForNewSections(state.sections, get('payload.fileData', action), true);

				extendableSubsectionsMap = createExtendableSubsectionsMap(newSections);
				//add values to Data-sources
				newSections = setDataSourcesFields(newSections, extendableSubsectionsMap);
				importedFileSections = createSectionsFromImportedFile(action.payload.fileData, newSections);
				let checkOutput = checkMergedData({ sections: importedFileSections });
				jsonErrorWarningMessage = checkOutput.errorMessage;
				if (state.debug) {
					if (checkOutput.error) {
						return {
							...state,
							importWizardToggle: false,
							importWarning: checkOutput.error,
							jsonErrorWarningMessage,
							importedFileSections,
							extendableSubsectionsMap,
							importedNewSection: newSections,
							importedPrerequisites
						};
					}
				}
			} else {
				importedFileSections = state.importedFileSections;
				extendableSubsectionsMap = state.extendableSubsectionsMap;
				newSections = state.importedNewSection;
				jsonErrorWarningMessage = state.jsonErrorWarningMessage;
			}

			let newImportedFileSections = cloneDeep(importedFileSections);
			let allFieldsMap = createAllFieldsMap(newImportedFileSections);

			// check which fields should be visible for the first time wizard shows
			validateFieldsVisibility(allFieldsMap);

			const subsectionsMap = createSubsectionsMap(importedFileSections, allFieldsMap);

			const showIfDependancyMap = createShowIfDependancyMap(importedFileSections, allFieldsMap);

			const collapseMap = initialFieldsCollapse(importedFileSections);

			const wizardStepSections = cloneDeep(newSections).filter(
				(section) => section.type !== 'deploy'
			);
			wizardStepSections.forEach((section) => {
				if (section.isExtendable) {
					section.existingDynamicSections = extendableSubsectionsMap.get(
						section.name
					).subSectionsNamesArray.length;
				}
			});

			const ipmiSection = filter({ name: 'ipmi_ips' }, importedFileSections);
			let assignedFieldsArray = updateAssignedFieldsArrayAfterImport(
				allFieldsMap,
				state.assignedFieldsArray
			);
			return {
				...state,
				sections: newSections,
				allFieldsMap,
				collapseMap,
				subsectionsMap,
				showIfDependancyMap,
				extendableSubsectionsMap,
				wizardStepSections,
				importedFileSections: importedFileSections,
				importWizardToggle: true,
				importWarning: false,
				isRackSwitchEnabled: get('0.force_racks', ipmiSection),
				assignedFieldsArray,
				jsonErrorWarningMessage,
				importedPrerequisites
			};
		},
		[AT.FINISHED_IMPORTING_FILE]: (state, action) => {
			return {
				...state,
				importWizardToggle: action.payload.importFileToWizardToggle
			};
		},
		[AT.FETCH_WIZARD_PREREQUISITES.FAILURE]: (state, action) => {
			return {
				...state,
				initialPageStatus: CONSTANTS.REQUEST_STATUS.SERVER_ERROR,
				showFetchWizardErrorDialog: true,
				errorMessage: getOr(CAPTIONS.GENERAL_ERROR, `error.error_message`, action),
				errorDetailsMessage: CAPTIONS.FETCH_PREREQUISITES_ERROR_MSG
			};
		},
		[AT.FETCH_WIZARD_PREREQUISITES.PENDING]: (state) => {
			return {
				...state,
				initialPageStatus: CONSTANTS.REQUEST_STATUS.PENDING
			};
		},
		[AT.FETCH_WIZARD_PREREQUISITES.SUCCESS]: (state, action) => {
			const prerequisitesTitle = get('payload.display', action);
			const prerequisitesFields = get('payload.fields', action);
			const importBlackList = getOr([], 'payload.importBlackList', action);

			const prerequisitesMap = createPrerequisiteFieldsMap(prerequisitesFields);
			validateFieldsVisibility(prerequisitesMap);
			const showIfDependancyMap = createShowIfDependancyMap(prerequisitesFields, prerequisitesMap);
			return {
				...state,
				hasInitialPage: true,
				initialPageStatus: CONSTANTS.REQUEST_STATUS.READY,
				prerequisitesTitle,
				prerequisitesFields,
				prerequisitesMap,
				showIfDependancyMap,
				importBlackList
			};
		},
		[AT.SET_WIZARD_STEP]: (state, action) => {
			const sectionDependentFields = state.extendableSectionFieldsDependencyMap.has(
				action.payload.stepName
			)
				? state.extendableSectionFieldsDependencyMap.get(action.payload.stepName).toString()
				: undefined;

			return {
				...state,
				currentStep: get('payload.stepDisplayName', action),
				currentStepName: get('payload.stepName', action),
				sectionDependentFields: sectionDependentFields
			};
		},
		[AT.DEPLOY.PENDING]: (state) => {
			return { ...state, deployStatus: CONSTANTS.PENDING };
		},
		[AT.DEPLOY.SUCCESS]: (state, action) => {
			if (action.payload.error) {
				return {
					...state,
					deployStatus: CONSTANTS.ERROR,
					showDeploymentErrorDialog: true,
					errorMessage: get(`payload.error.error_message`, action)
				};
			}
			return { ...state, deployStatus: CONSTANTS.SUCCESS };
		},
		[AT.DEPLOY.FAILURE]: (state, action) => {
			return {
				...state,
				deployStatus: CONSTANTS.ERROR,
				showDeploymentErrorDialog: true,
				errorMessage: get(`error.error_message`, action)
			};
		},
		[AT.CLEAR_WIZARD]: () => {
			return { ...initialState };
		},
		[AT.CLEAR_WIZARD_KEEP_CATEGORIES]: (state) => {
			return {
				...initialState,
				newCategories: state.newCategories
			};
		},
		'rrf/change': (state, action) => {
			// showIf - update prerequisitesModal about field change so it can re-evaluate dependent fields visibility
			if (state.prerequisitesMap.size > 0 && action.model.startsWith('prerequisites')) {
				const fieldName = action.model.substring(action.model.lastIndexOf('.') + 1);
				return {
					...state,
					lastChangedField: fieldName
				};
			}
			// handle field change:
			// 1. showIf - update wizard component about field change so it can re-evaluate dependent fields visibility
			// 2. save dataSource (subscribed) fields new value in the assigned field array
			// note: exclude tempFields changes since its related to grid rows and not main form
			if (!action.model.startsWith('prerequisites') && action.model !== 'dynamic.content') {
				let newAssignedFieldsArray = state.assignedFieldsArray;
				const lastIndex = action.model.lastIndexOf('.');
				const fieldName = action.model.substring(lastIndex + 1);
				if (!action.model.startsWith('tempFields') && action.isDataSource) {
					newAssignedFieldsArray = updateAssignedFieldsArrayAfterChange(
						action.value,
						action.model,
						state.allFieldsMap,
						newAssignedFieldsArray
					);
				}
				return {
					...state,
					lastChangedField: fieldName,
					assignedFieldsArray: newAssignedFieldsArray
				};
			}

			return { ...state };
		},
		[AT.CHANGE_COLLAPSE_MAP]: (state, action) => {
			state.collapseMap.set(action.payload.key, !state.collapseMap.get(action.payload.key));
			return { ...state };
		},
		[AT.CHANGE_COLLAPSE_MAP_IN_SEARCH]: (state, action) => {
			state.collapseMap.set(action.payload.key, !state.collapseMap.get(action.payload.key));
			return { ...state, collapseMapChanged: true };
		},
		[AT.HIDE_WIZARD_ERROR_DIALOG]: (state) => {
			return { ...state, showFetchWizardErrorDialog: false, errorMessage: '' };
		},
		[AT.HIDE_FETCH_WIZARD_WARNING_DIALOG]: (state) => {
			return {
				...state,
				showFetchWizardWarningDialog: false,
				jsonErrorWarningMessage: '',
				importWarning: false
			};
		},
		[AT.HIDE_DEPLOYMENT_ERROR_DIALOG]: (state) => {
			return { ...state, showDeploymentErrorDialog: false, errorMessage: '' };
		},
		[AT.SHOW_HOST_GROUP_ASSIGN_DIALOG]: (state, action) => {
			return {
				...state,
				hostGroupAssignDialogVisible: action.payload.visible,
				selectedAssignedHostGroup: action.payload.name
			};
		},
		[AT.SET_SELECTED_ASSIGN_HOST_GROUP_AVAILABILITY_ZONE]: (state, action) => {
			return {
				...state,
				selectedAssignHostGroupAavailabilityZone: action.payload.zone
			};
		},
		[AT.SET_SELECTED_ASSIGN_HOST_GROUP_POOL]: (state, action) => {
			return {
				...state,
				selectedAssignHostGroupPool: action.payload.pool
			};
		},
		[AT.ON_IMPORT_ERROR]: (state, action) => {
			return {
				...state,
				importError: true,
				errorMessage: get(`payload.errorMessage`, action)
			};
		},
		[AT.REQUEST_TO_IMPORT_WIZARD]: (state, action) => {
			return {
				...state,
				importRequestEnabled: action.payload.enable
			};
		},
		[AT.HIDE_ERROR_DIALOG]: (state) => {
			return {
				...state,
				importError: false,
				errorMessage: ''
			};
		},
		[AT.CLEAR_WIZARD_AFTER_RESET]: (state) => {
			return {
				...state,
				finishedResetWizard: false
			};
		},
		[AT.SET_FIELD_HELP_VISIBILITY]: (state, action) => {
			return {
				...state,
				allFieldsMap: updateAllFieldsHelpVisibility(state.allFieldsMap, action.payload.fieldName)
			};
		},
		[AT.SHOW_HELP_FIELDS]: (state, action) => {
			return {
				...state,
				showHelp: action.payload.value,
				helpMsg: ''
			};
		},
		[AT.SHOW_HELP_MESSAGE]: (state, action) => {
			return {
				...state,
				helpMsg: action.payload.value
			};
		},
		[AT.SHOW_DEPLOY_JSON]: (state, action) => {
			return {
				...state,
				showDeploymentJson: action.payload.value
			};
		},
		[AT.DISABLE_RESET]: (state) => {
			return {
				...state,
				resetWizardToggle: false
			};
		},
		[AT.SEARCH_TEXT]: (state, action) => {
			const searchText = get('payload.text', action);
			let searchWordsMap;
			if (searchText !== '') {
				if (
					state.searchWordsMap.size > 0 &&
					searchText.length > state.searchText.length &&
					searchText.includes(state.searchText)
				) {
					searchWordsMap = createSearchMap(
						state.searchWordsMap,
						state.subsectionsMap,
						searchText.toLowerCase(),
						false
					);
				} else {
					searchWordsMap = createSearchMap(
						state.allFieldsMap,
						state.subsectionsMap,
						searchText.toLowerCase(),
						true
					);
				}
			}
			return {
				...state,
				searchWordsMap: searchText === '' ? new Map() : searchWordsMap,
				searchText
			};
		},
		[AT.CHANGE_COLLAPSE_MAP_STATUS]: (state) => {
			return {
				...state,
				collapseMapChanged: false
			};
		},
		[AT.SHOW_DASHBOARD_CONFIRMATION_DIALOG]: (state, action) => {
			return {
				...state,
				showDashboardDialog: action.payload.value
			};
		},
		[AT.ADD_COLLECTION_CHIP]: (state, action) => {
			return {
				...state,
				addCollectionChipsStatus: get('payload.status', action),
				addCollectionChipsValue: get('payload.value', action)
			};
		},
		[AT.IS_WIZARD_ACTIVE.SUCCESS]: (state, action) => {
			return {
				...state,
				isActive: get(`payload.active`, action)
			};
		},
		[AT.SET_EXAMPLES_CATEGORY]: (state, action) => {
			const wizardData = {
				name: get(`payload.data.name`, action),
				sections: populateWizardSections(get(`payload.data.sections`, action))
			};

			const [
				updatedSections,
				extendableSubsectionsMap,
				allFieldsMap,
				subsectionsMap,
				showIfDependancyMap,
				collapseMap,
				uploadFiles,
				allDisallowedFields,
				extendedFieldValuesMap,
				extendableSectionFieldsDependencyMap
			] = initializeWizardData(wizardData);

			const wizardStepSections = cloneDeep(updatedSections).filter(
				(section) => section.type !== 'deploy'
			);
			wizardStepSections.forEach((section) => {
				if (section.isExtendable) {
					section.existingDynamicSections = extendableSubsectionsMap.get(
						section.name
					).subSectionsNamesArray.length;
				}
			});

			return {
				...state,
				initialized: true,
				name: get('name', wizardData),
				sections: updatedSections,
				currentStep: get('sections.0.display', wizardData),
				currentStepName: get('sections.0.name', wizardData),
				showIfDependancyMap,
				allFieldsMap,
				subsectionsMap,
				collapseMap,
				uploadFiles,
				wizardStepSections,
				isExampleCard: true,
				extendableSubsectionsMap,
				allDisallowedFields,
				extendedFieldValuesMap,
				extendableSectionFieldsDependencyMap
			};
		},
		[AT.RESET_AFTER_CHANGING_DYNAMIC_SUBSECTION]: (state) => {
			return {
				...state,
				addedNewSection: false,
				deletedDynamicSubSection: false
			};
		},
		[AT.ADD_NEW_SUBSECTION]: (state, action) => {
			const sectionName = get('payload.sectionName', action);
			const subSectionName = get('payload.subSectionName', action);
			let [newSections, newExtendableSubsectionsMap, newSectionName] = addNewSubsection(
				state.sections,
				sectionName,
				state.extendableSubsectionsMap,
				subSectionName
			);

			const addedSubsectionFieldsMap = createNewSubsectionFieldsMap(
				cloneDeep(state.extendableSubsectionsMap),
				newSectionName,
				sectionName
			);

			//update allFieldsMap
			const allFieldsMap = new Map([...state.allFieldsMap, ...addedSubsectionFieldsMap]);

			//update dataSources
			newSections = setDataSourcesFields(newSections, newExtendableSubsectionsMap);

			// check which fields should be visible after update
			validateFieldsVisibilityAfterUpdate(allFieldsMap, newSectionName);

			const subsectionsMap = createSubsectionsMap(newSections, allFieldsMap);
			const showIfDependancyMap = createShowIfDependancyMap(newSections, allFieldsMap);
			const wizardStepSections = cloneDeep(newSections).filter(
				(section) => section.type !== 'deploy'
			);
			wizardStepSections.forEach((section) => {
				if (section.isExtendable) {
					section.existingDynamicSections = newExtendableSubsectionsMap.get(
						section.name
					).subSectionsNamesArray.length;
				}
			});

			return {
				...state,
				sections: newSections,
				extendableSubsectionsMap: newExtendableSubsectionsMap,
				allFieldsMap,
				subsectionsMap,
				showIfDependancyMap,
				wizardStepSections,
				addedSubsectionFieldsMap,
				addedNewSection: true
			};
		},
		[AT.DELETE_SUBSECTION]: (state, action) => {
			const sectionName = get('payload.sectionName', action, state.sections);
			const subSectionName = get('payload.subSectionName', action, state.sections);
			const sectionsIndex = state.sections.map((item) => item.name).indexOf(sectionName);
			const sectionsDeleteIndex = state.sections[sectionsIndex].subSections
				.map((obj) => obj.name)
				.indexOf(subSectionName);
			const allFieldsMapUpdated = cloneDeep(state.allFieldsMap);
			const collapseMapUpdated = cloneDeep(state.collapseMap);
			let updatedSections = cloneDeep(state.sections);
			const subSectionsMapUpdated = cloneDeep(state.subsectionsMap);
			const updatedSubSections = [
				...state.sections[sectionsIndex].subSections.slice(0, sectionsDeleteIndex),
				...state.sections[sectionsIndex].subSections.slice(1 + sectionsDeleteIndex)
			];
			const updatedExtendableMap = cloneDeep(state.extendableSubsectionsMap);
			const updatedWizardStepSections = cloneDeep(state.wizardStepSections);
			updatedSections[sectionsIndex].subSections = updatedSubSections;

			updatedExtendableMap.get(sectionName).subSectionsNamesArray = updatedExtendableMap
				.get(sectionName)
				.subSectionsNamesArray.filter((item) => item !== subSectionName);

			//update dataSources
			updatedSections = setDataSourcesFields(cloneDeep(updatedSections), updatedExtendableMap);

			allFieldsMapUpdated.forEach((field, index) => {
				if (field.subSectionName === subSectionName) {
					allFieldsMapUpdated.delete(index);
				}
			});

			collapseMapUpdated.forEach((name, idx) => {
				if (idx === `${sectionName}_${subSectionName}`) {
					collapseMapUpdated.delete(idx);
				}
			});

			subSectionsMapUpdated.forEach((name, idx) => {
				if (idx === subSectionName) {
					subSectionsMapUpdated.delete(idx);
				}
			});

			updatedWizardStepSections.forEach((section) => {
				if (sectionName === section.name) {
					section.existingDynamicSections = updatedExtendableMap.get(
						sectionName
					).subSectionsNamesArray.length;
				}
			});
			//clear all assigned field of deleted subsecion from the assginedFieldArray
			let newAssignedFieldsArray = state.assignedFieldsArray;
			state.assignedFieldsArray.forEach((assignedField) => {
				newAssignedFieldsArray = updateAssignedFieldsArray(
					{
						clear: true,
						subSectionName,
						dataSource: assignedField.dataSource,
						model: assignedField.model
					},
					newAssignedFieldsArray
				);
			});

			return {
				...state,
				sections: updatedSections,
				allFieldsMap: allFieldsMapUpdated,
				collapseMap: collapseMapUpdated,
				subsectionsMap: subSectionsMapUpdated,
				extendableSubsectionsMap: updatedExtendableMap,
				wizardStepSections: updatedWizardStepSections,
				deletedDynamicSubSection: true,
				deleteSubsectionRequestInfo: undefined,
				deleteSubSectionAlert: false,
				deletedSubSectionName: subSectionName,
				assignedFieldsArray: newAssignedFieldsArray
			};
		},
		[AT.FETCH_WIZARD_DEPENDENCIES_STATE.SUCCESS]: (state, action) => {
			return {
				...state,
				wizardDependenciesStatus: get('payload.ready', action)
					? CONSTANTS.REQUEST_STATUS.READY
					: CONSTANTS.REQUEST_STATUS.SERVER_ERROR,
				wizardDependenciesServerMsg: get('payload.error.error_message', action)
			};
		},
		[AT.FETCH_WIZARD_DEPENDENCIES_STATE.PENDING]: (state, action) => {
			return {
				...state,
				wizardDependenciesStatus: CONSTANTS.REQUEST_STATUS.PENDING
			};
		},
		[AT.FETCH_WIZARD_DEPENDENCIES_STATE.FAILURE]: (state, action) => {
			return {
				...state,
				wizardDependenciesStatus: CONSTANTS.REQUEST_STATUS.SERVER_ERROR,
				wizardDependenciesServerMsg: get('error.error_message', action)
			};
		},
		[AT.RESET_WIZARD_DEPENDENCIES_PARAMS]: (state) => {
			return {
				...state,
				wizardDependenciesStatus: CONSTANTS.REQUEST_STATUS.UNDEFINED,
				wizardDependenciesServerMsg: ''
			};
		},
		[AT.GET_RUNNING_PROCESSES.SUCCESS]: (state, action) => {
			return {
				...state,
				runningProcesses: get(`payload`, action),
				showRestartModal: true
			};
		},
		[AT.GET_RUNNING_PROCESSES.FAILURE]: (state) => {
			return {
				...state,
				showFetchWizardErrorDialog: true,
				errorMessage: CAPTIONS.GENERAL_ERROR,
				errorDetailsMessage: CAPTIONS.GET_RUNNING_PROCCESSES_ERROR_MSG
			};
		},
		[AT.CLOSE_RESTART_SERVER_DIALOG]: (state) => {
			return {
				...state,
				runningProcesses: [],
				showRestartModal: false
			};
		},
		[AT.OPEN_RESTART_SERVER_DIALOG]: (state) => {
			return {
				...state,
				showRestartModal: true
			};
		},
		[AT.RESTART_SERVER_SERVICES.SUCCESS]: (state, action) => {
			return {
				...state,
				areServerServicesRestarting:
					get(`payload.1`, action) === SERVER_RESPONSE_CODE.SUCCESS_STATUS ? true : false
			};
		},
		[AT.RESTART_SERVER_SERVICES.PENDING]: (state) => {
			return {
				...state
			};
		},
		[AT.RESTART_SERVER_SERVICES.FAILURE]: (state) => {
			return {
				...state,
				showFetchWizardErrorDialog: true,
				errorMessage: CAPTIONS.GENERAL_ERROR,
				errorDetailsMessage: CAPTIONS.RESTART_SERVER_ERROR_MSG
			};
		},
		[AT.RESTART_SERVER_SERVICES_FINISHED]: (state) => {
			return {
				...state,
				areServerServicesRestarting: false
			};
		},
		[AT.SET_SELECTED_ASSIGN_HOST_GROUP_RACK]: (state, action) => {
			return {
				...state,
				selectedAssignHostGroupRack: get(`payload.rack`, action)
			};
		},
		[AT.ON_CHANGE_RACK_SWITCH_STATUS]: (state, action) => {
			return {
				...state,
				isRackSwitchEnabled: get(`payload.value`, action)
			};
		},
		[AT.SET_CATEGORIES]: (state, action) =>
			set('newCategories', action.payload.newCategories, state),
		'@@router/LOCATION_CHANGE': (state, action) => {
			if (get('payload.location.pathname', action) === '/dashboard') {
				return { ...initialState };
			}
			return { ...state };
		},
		[AT.ADD_NEW_VALUE_TO_FIELD_EXTENDED_VALUES]: (state, action) => {
			const newExtendedFieldValuesMap = cloneDeep(state.extendedFieldValuesMap);
			newExtendedFieldValuesMap.set(action.payload.fieldName, [
				...newExtendedFieldValuesMap.get(action.payload.fieldName),
				action.payload.newValue
			]);
			return {
				...state,
				extendedFieldValuesMap: newExtendedFieldValuesMap
			};
		},
		[AT.SHOW_FIELD_DESCRIPTION_IN_TOOLTIP]: (state) => {
			return {
				...state,
				isFieldDescriptionInTooltipVisible: !state.isFieldDescriptionInTooltipVisible
			};
		},
		[AT.HANDLE_DELETE_SUBSECTION_CLICK]: (state, action) => {
			const deleteSubsectionRequestInfo = {
				sectionName: action.payload.sectionName,
				subsectionName: action.payload.subsectionName
			};

			return {
				...state,
				deleteSubsectionRequestInfo: deleteSubsectionRequestInfo,
				deleteSubSectionAlert: true
			};
		},
		[AT.HANDLE_ADD_SUBSECTION_CLICK]: (state, action) => {
			const addSubsectionRequestInfo = {
				sectionName: action.payload.sectionName,
				regexExpression: action.payload.regexExpression
			};

			return {
				...state,
				addSubsectionRequestInfo: addSubsectionRequestInfo,
				addSubSectionDialog: true
			};
		},
		[AT.HIDE_DELETE_SUBSECTION_DIALOG]: (state) => {
			return {
				...state,
				deleteSubsectionRequestInfo: undefined,
				deleteSubSectionAlert: false
			};
		},
		[AT.HIDE_ADD_SUBSECTION_DIALOG]: (state) => {
			return {
				...state,
				addSubsectionRequestInfo: undefined,
				addSubSectionDialog: false
			};
		},
		[AT.SHOW_RESET_ALLOCATIONS_WARNING]: (state, action) => {
			return {
				...state,
				showAllocationsWarningDialog: get(`payload.value`, action),
				resetAllocationsAction: get(`payload.actionToPerform`, action)
			};
		},
		[AT.SET_IP_RANGE_EDIT_MODE]: (state, action) => {
			return {
				...state,
				ipRangeEditMode: get(`payload.value`, action)
			};
		},
		[AT.UPDATE_FORM_VISABILITY]: (state, action) => {
			return {
				...state,
				allFieldsMap: get(`payload.allFieldsMapNew`, action),
				subsectionsMap: get(`payload.subsectionsMapNew`, action)
			};
		},
		[AT.UPDATE_PREREQUISITES_VISABILITY]: (state, action) => {
			return {
				...state,
				prerequisitesMap: get(`payload.prerequisitesMapNew`, action)
			};
		},
		[AT.CLEAR_LAST_CHANGED_FIELD]: (state) => {
			return {
				...state,
				lastChangedField: ''
			};
		}
	},
	initialState
);

export default wizardsReducer;

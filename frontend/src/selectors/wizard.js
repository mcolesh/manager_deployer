import { createSelector } from 'reselect';
import { some, omit, get, isEmpty, set, cloneDeep, map, remove } from 'lodash/fp';

import * as FILE_UPLOAD_STATUS from 'constants/fileUploadStatus';
import { FIELD_TYPES } from 'constants/field-types';

export const getForm = (state, name) => get(['dynamicForm', 'content', name], state);

export const getForms = (state) => get(['dynamicForm', 'content'], state);

export const getWizard = (state) => get(['wizard'], state);

export const getPrerequisites = (state) => {
	return isEmpty(get(['wizard', 'importedPrerequisites'], state))
		? get(['prerequisites'], state)
		: get(['wizard', 'importedPrerequisites'], state);
};

export const getLogs = (state) => get(['wizard', 'jsonErrorWarningMessage'], state);

export const getFormsContent = (state) => get(['dynamic', 'content'], state);

export const getImportFlag = (state, fromImport) => {
	return fromImport;
};

export const isFormInvalid = createSelector(getForm, getWizard, (form, wizard) => {
	// Clean form (not created yet)
	if (!form) {
		return true;
	}

	// In order to validate IPMI section, we need to have at least 1 allocation
	if (get('name.value', form) === 'ipmi_ips') {
		return get('allocations[0]', form) === undefined;
	}

	const formFields = {};
	for (const key in form) {
		if (key === '$form') {
			continue;
		}
		let v = form[key];
		v = omit(['$form'], v);

		Object.getOwnPropertyNames(v).forEach(function (val) {
			typeof v[val].$form !== 'undefined'
				? (formFields[val] = v[val].$form)
				: (formFields[val] = v[val]);
		});
	}

	// remove from formFields the un-visible fields
	const filterKeys = [];
	for (const key of Object.keys(formFields)) {
		if (!wizard.allFieldsMap.has(key)) {
			filterKeys.push(key);
		} else if (!wizard.allFieldsMap.get(key).visible) {
			filterKeys.push(key);
		} else {
			// field can be visible, but its subsection can be un-visible
			if (!wizard.subsectionsMap.get(wizard.allFieldsMap.get(key).subSectionName).visible) {
				filterKeys.push(key);
			}
		}
	}
	filterKeys.forEach((k) => {
		delete formFields[k];
	});
	// remove from formFields the un-visible fields

	// if some fields are valid === false the form is invalid
	return some(['valid', false], formFields);
});

export const isWizardValid = createSelector(getWizard, getForms, (wizard, forms) => {
	let ipmiValid = true;

	if (get('ipmi_ips', forms) !== undefined) {
		ipmiValid = get('ipmi_ips.allocations[0]', forms) !== undefined;
	}

	// Validate visible fields
	let allFieldsValid = true;
	wizard.sections.forEach((section) => {
		section.subSections.forEach((subSection) => {
			if (wizard.subsectionsMap.get(subSection.name).visible)
				if (subSection.fields) {
					subSection.fields.forEach((field) => {
						const fieldData = wizard.allFieldsMap.get(field.name);
						if (fieldData && fieldData.visible) {
							const fieldInForm = get(fieldData.path, forms);
							const valid =
								get('valid', fieldInForm) !== undefined
									? get('valid', fieldInForm)
									: get('$form.valid', fieldInForm);

							if (!valid) {
								allFieldsValid = false;
							}
						}
					});
				}
		});
	});

	return ipmiValid && allFieldsValid;
});

// Create JSON for deploy (without validators, and without showIf)
export const wizardToDeploy = createSelector(
	getWizard,
	getPrerequisites,
	getForms,
	getFormsContent,
	getLogs,
	getImportFlag,
	(wizard, prerequisites, forms, formsContent, uiLogs, fromImport) => {
		let parsedForm = {
			content: { ...formsContent }
		};

		if (!isEmpty(prerequisites)) {
			parsedForm.prerequisites = prerequisites;
		}
		if (!isEmpty(uiLogs)) {
			const regex = /⦿/gi;
			parsedForm.log = uiLogs.replace(regex, '\n - ');
		}

		// If subsection is not visible - remove all its content
		wizard.subsectionsMap.forEach((v, k) => {
			if (!v.visible) {
				wizard.sections.forEach((section) => {
					const removePath = `${section.name}.${k}`;
					parsedForm.content = omit(removePath, parsedForm.content);
				});
			}
		});

		wizard.allFieldsMap.forEach((field) => {
			if (
				!field.visible ||
				field.type === 'message' ||
				field.type === FIELD_TYPES.HYPERLINK ||
				(field.type === FIELD_TYPES.NUMBER &&
					!fromImport &&
					!get('required', field) &&
					get(`content.${field.path}`, parsedForm) === '')
			) {
				parsedForm.content = omit(field.path, parsedForm.content);
			} else if (field.type === 'grid') {
				// clone grid
				let cloneGrid = cloneDeep(get(`content.${field.path}`, parsedForm));

				// omit the key column
				const gridWithoutKeys = map((entry) => {
					return omit('key', entry);
				}, cloneGrid);
				parsedForm = set(`content.${field.path}`, gridWithoutKeys, parsedForm);

				// remove new rows that was deleted in the client -
				// was added to prevent key mismatch in the grid
				cloneGrid = cloneDeep(get(`content.${field.path}`, parsedForm));
				const gridWithoutNewDeleted = remove((row) => {
					return row.action === 'newDeleted';
				}, cloneGrid);
				parsedForm = set(`content.${field.path}`, gridWithoutNewDeleted, parsedForm);
			}
		});

		// Remove some fields from the IPMI section
		if (parsedForm.content.ipmi_ips) {
			parsedForm.content.ipmi_ips = omit(
				['display', 'name', 'subSections', 'supported_hw_pools', 'type'],
				parsedForm.content.ipmi_ips
			);
		}

		return parsedForm;
	}
);

export const areAllFilesFinishUpload = createSelector(getWizard, (wizard) => {
	let valid = true;

	wizard.allFieldsMap.forEach((field) => {
		if (field.type === 'file_upload') {
			const uploadedFile = wizard.uploadFiles.get(field.name);
			const status = get('0.status', uploadedFile);

			if (field.required === true && status !== undefined) {
				if (status !== FILE_UPLOAD_STATUS.COMPLETE) {
					valid = false;
				}
			} else if (status === FILE_UPLOAD_STATUS.UPLOADING) {
				valid = false;
			}
		}
	});

	return valid;
});

export const prerequisitesToSendToServer = createSelector(
	getWizard,
	getPrerequisites,
	(wizard, prerequisites) => {
		const prerequisitesToSendToServerObject = {};
		wizard.prerequisitesMap.forEach((field) => {
			const name = get('name', field);
			if (get('visible', field)) {
				prerequisitesToSendToServerObject[name] = prerequisites[name];
			}
		});

		return prerequisitesToSendToServerObject;
	}
);

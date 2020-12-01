import { get, isEqual, cloneDeep, isEmpty } from 'lodash/fp';
import { updateAssignedFieldsArray, ipmiObj } from './wizard';

export const createSectionsFromImportedFile = (importedFile, sections) => {
	const importedFileSections = cloneDeep(sections);
	importedFileSections.forEach((section) => {
		if (section.name !== 'ipmi_ips') {
			section.subSections.forEach((subSection) => {
				if (subSection.fields) {
					subSection.fields.forEach((field) => {
						if (field.type !== 'file_upload' && !field.readonly) {
							const newValue = get(
								`${section.name}.${subSection.name}.${field.name}`,
								importedFile
							);
							if (
								(field.default !== undefined ||
									(field.default === undefined && newValue !== null)) &&
								!isEqual(newValue, field.default) &&
								newValue !== undefined
							) {
								field.default = newValue;
							}
						}
					});
				}
			});
		} else {
			Object.keys(ipmiObj).forEach((key) => {
				if (key !== 'supported_hw_pools') {
					section[key] = importedFile[section.name][key];
				}
			});
		}
	});
	return importedFileSections;
};

export const updateAssignedFieldsArrayAfterImport = (allFieldsMap, assignedFieldsArray) => {
	let newAssignedFieldsArray = assignedFieldsArray;
	allFieldsMap.forEach((field) => {
		if (field.type === 'grid') {
			if (field.hasOwnProperty('isDataSource')) {
				field.columns.forEach((col) => {
					if (col.hasOwnProperty('dataSource')) {
						const colName = col.name;
						field.default.forEach((row, index) => {
							if (!isEmpty(row[colName])) {
								const selectedItem = {
									dataSource: col.dataSource,
									fieldDefault: col.multiple === true ? [] : '',
									model: `dynamic.content.${field.path}.${index}.${colName}`,
									selectedItems: col.multiple === true ? row[colName] : [row[colName]],
									fieldName: colName
								};
								newAssignedFieldsArray = updateAssignedFieldsArray(
									selectedItem,
									newAssignedFieldsArray
								);
							}
						});
					}
				});
			}
		} else if (field.hasOwnProperty('dataSource')) {
			if (!isEmpty(field.default)) {
				const selectedItem = {
					dataSource: field.dataSource,
					fieldDefault: field.multiple === true ? [] : '',
					model: `dynamic.content.${field.path}`,
					selectedItems: field.multiple === true ? field.default : [field.default],
					fieldName: field.name
				};
				newAssignedFieldsArray = updateAssignedFieldsArray(selectedItem, newAssignedFieldsArray);
			}
		}
	});
	return newAssignedFieldsArray;
};

export const exportWizard = (name, wizardToDeploy, cbisVersion) => {
	try {
		const payload = wizardToDeploy;
		payload.version = cbisVersion;
		payload.name = name;
		const FileSaver = require('file-saver');
		const json = JSON.stringify(payload, null, 2);
		const blob = new Blob([json], { type: 'octet/stream' });
		FileSaver.saveAs(blob, `cbis-manager-${name}.json`);
	} catch (err) {
		console.error(
			`%c Error while trying to stringify the JSON before exporting file `,
			'background: #222; color: #FF0000'
		);
	}
};

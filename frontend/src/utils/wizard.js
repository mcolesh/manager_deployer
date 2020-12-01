/* eslint-disable no-restricted-syntax */
import React from 'react';
import {
	map,
	omitBy,
	values,
	set,
	get,
	merge,
	cloneDeep,
	filter,
	getOr,
	uniq,
	intersection,
	remove,
	isNumber,
	isEmpty,
	findIndex,
	isEqual
} from 'lodash/fp';

import styled from 'styled-components';
import compileExpression from 'utils/expressionParser/filtrex';
import FormSection from 'components/wizard/FormSection';
import Switch from 'components/wizard/forms/Switch';
import IpmiSection from 'components/custom-sections/ipmi-section/IpmiSection';
import CustomTextField from 'components/wizard/forms/TextField';
import TextAreaComponent from 'components/wizard/forms/TextAreaComponent';
import CollectionChipsField from 'components/wizard/forms/CollectionChips';
import DependentList from 'components/wizard/forms/DependentList';
import Select from 'components/wizard/forms/Select';
import CustomNumber from 'components/wizard/forms/Number';
import GenericRange from 'components/wizard/forms/GenericRange';
import GenericSelect from 'components/wizard/forms/GenericSelect';
import Grid from 'components/wizard/forms/Grid';
import FileUpload from 'components/wizard/forms/FileUpload';
import Message from 'components/wizard/forms/Message';
import Novl from 'components/wizard/forms/Novl';
import Editor from 'components/wizard/forms/Editor';
import Slider from 'components/wizard/forms/Slider';
import HyperLink from 'components/wizard/forms/HyperLink';
import SubsectionsTuple from 'components/wizard/forms/SubsectionsTuple';
import { FIELD_TYPES } from 'constants/field-types';
import { timezones, TIMEZONE } from 'constants/timezones';
import { IPMI } from 'constants/section-types';

import { regexValidator } from 'utils/validators/regex';
import { requiredValidator } from 'utils/validators/required';
import { ipValidator } from 'utils/validators/ip';
import { cidrValidator } from 'utils/validators/cidr';
import { ipExistsValidator } from 'utils/validators/ip-exists';
import { maxValidator } from 'utils/validators/max';
import { minValidator } from 'utils/validators/min';
import { urlValidator } from 'utils/validators/url';

import * as CAPTIONS from 'constants/app-captions';

const ComponentNotSupported = ({ type }) => <div>Component not supported : {type}</div>;

export const getFieldComponent = (type) => {
	switch (type) {
		case FIELD_TYPES.CIDR:
		case FIELD_TYPES.IP:
		case FIELD_TYPES.PASSWORD:
		case FIELD_TYPES.TEXT:
			return CustomTextField;

		// TODO: normalized props
		case FIELD_TYPES.HOST_LIST:
		case FIELD_TYPES.IP_LIST:
			return CollectionChipsField;

		case FIELD_TYPES.DEPENDENT_LIST:
			return DependentList;

		case FIELD_TYPES.SELECT:
		case FIELD_TYPES.TIMEZONE: {
			return Select;
		}

		case FIELD_TYPES.BOOLEAN:
			return Switch;

		case FIELD_TYPES.NUMBER:
			return CustomNumber;

		case FIELD_TYPES.GENERIC_RANGE:
			return GenericRange;

		case FIELD_TYPES.GENERIC_SELECT:
			return GenericSelect;

		case FIELD_TYPES.MESSAGE:
			return Message;

		case FIELD_TYPES.FILE_UPLOAD:
			return FileUpload;

		case FIELD_TYPES.GRID:
			return Grid;

		case FIELD_TYPES.NOVL:
			return Novl;

		case FIELD_TYPES.EDITOR:
			return Editor;

		case FIELD_TYPES.SLIDER:
			return Slider;

		case FIELD_TYPES.HYPERLINK:
			return HyperLink;

		case FIELD_TYPES.TEXTAREA:
			return TextAreaComponent;

		case FIELD_TYPES.SUBSECTIONS_TUPLE:
			return SubsectionsTuple;

		default:
			return ComponentNotSupported;
	}
};

export const getFieldNormalizedProps = (
	field,
	parentFieldDefaultValue = '',
	extendedFieldValues = []
) => {
	switch (field.type) {
		case TIMEZONE:
			return {
				searchable: true,
				data: timezones,
				selectValue: field.default,
				...field
			};
		case FIELD_TYPES.SELECT:
			let data = !field.allowCreate
				? map((value) => ({ value, label: value }), field.values)
				: extendedFieldValues;
			if (field.default) {
				if (field.multiple === true && Array.isArray(field.default) && field.default.length > 0) {
					data = map(
						(value) => ({
							...value,
							selected: field.default.filter((item) => item === value.value).length > 0
						}),
						data
					);
				}
				if (field.allowCreate && !field.values.includes(field.default)) {
					data = [...data, { value: field.default, label: field.default }];
				}
			}
			if (field.parentChildDependencyMap) {
				const { newValues, newDefault } = checkParentChildDependency(
					field,
					parentFieldDefaultValue
				);
				data =
					newValues && newValues.length && map((value) => ({ value, label: value }), newValues);
				return {
					data,
					newDefault,
					...field
				};
			}
			return {
				data,
				...field
			};
		case FIELD_TYPES.GENERIC_SELECT:
			return {
				data: map((value) => ({ value, label: value }), field.values),
				...field
			};
		case FIELD_TYPES.NOVL:
			const selectData = map((value) => ({ value, label: value }), field.condition.values);
			const isSelectReadonly = get(`condition.readonly`, field);
			return {
				selectData,
				isSelectReadonly,
				...field
			};

		case FIELD_TYPES.SLIDER:
			const range = {
				min: field.range && field.range.min ? field.range.min : 0,
				max: field.range && field.range.max ? field.range.max : 100
			};
			return {
				range,
				...field
			};

		case FIELD_TYPES.DEPENDENT_LIST:
			let values = field.values !== undefined ? field.values : {};
			let options = map((value) => ({ value, label: value }), Object.keys(values));
			let optionsToListItemsMap = cloneDeep(values);
			Object.keys(optionsToListItemsMap).forEach((option) => {
				if (!Array.isArray(optionsToListItemsMap[option])) {
					optionsToListItemsMap[option] = optionsToListItemsMap[option].split(',');
				}
			});

			data = { options: options, optionsToListItemsMap: optionsToListItemsMap };
			return {
				data,
				...field
			};

		case FIELD_TYPES.GRID: {
			const columns = field.columns.map((column) => {
				if (column.type === 'hyperlink') {
					const normelizedColumn = cloneDeep(column);
					normelizedColumn.editable = true;
					return normelizedColumn;
				}
				return column;
			});
			return {
				...field,
				columns
			};
		}
		default:
			return field;
	}
};

export const getFieldValidators = (field) => {
	const validators = [];

	if (field.validation) {
		validators.push(regexValidator);
	}

	if (field.required) {
		validators.push(requiredValidator);
	}

	if (field.type === FIELD_TYPES.IP || field.type === FIELD_TYPES.IP_LIST) {
		validators.push(ipValidator);
	}

	if (field.type === FIELD_TYPES.CIDR) {
		validators.push(cidrValidator);
	}

	if (
		(field.type === FIELD_TYPES.IP_LIST ||
			field.type === FIELD_TYPES.HOST_LIST ||
			field.type === FIELD_TYPES.DEPENDENT_LIST) &&
		field.unique !== false
	) {
		validators.push(ipExistsValidator);
	}

	if (field.restrictions) {
		if (isNumber(field.restrictions.max)) {
			validators.push(maxValidator);
		}
		if (isNumber(field.restrictions.min)) {
			validators.push(minValidator);
		}
	}

	if (field.type === FIELD_TYPES.HYPERLINK && field.editable) {
		validators.push(urlValidator);
	}

	return validators;
};

export const getFieldErrorMessages = (errors) => {
	const errorMessages = omitBy((error) => !error, errors);
	return values(errorMessages).join(', ');
};

const EmptySection = styled.div``;

export const getSectionComponent = (section) => {
	if (section.type) {
		switch (section.type) {
			case IPMI:
				return IpmiSection;

			default:
				return EmptySection;
		}
	}

	return FormSection;
};

export const getFieldDefaultValue = (field) => {
	let value;

	if (field.default === undefined) {
		switch (field.type) {
			case 'boolean':
				value = false;
				break;
			case 'number':
				value = '';
				break;
			case 'ip-list':
			case 'host-list':
				value = [];
				break;
			case 'dependent-list':
				value = {
					collection: [],
					value: ''
				};
				break;
			case 'ip':
			case 'text':
			case 'message':
			case 'editor':
			case 'hyperlink':
			case 'textarea':
				value = '';
				break;
			case 'select':
				value = field.multiple ? [] : '';
				break;
			case 'novl':
				value = {
					condition: getOr('', 'condition.default', field),
					fieldValue: getOr('', 'fieldValue.default', field)
				};
				break;
			case 'slider':
				if (field.range) {
					const range = {
						min: field.range.min ? field.range.min : 0,
						max: field.range.max ? field.range.max : 100
					};
					value = (range.min + range.max) / 2;
				} else {
					value = 50;
				}
				break;
			default:
				value = undefined;
				break;
		}
	} else {
		const defaultValue = get('default', field);
		switch (field.type) {
			case 'ip-list':
			case 'host-list':
				value = Array.isArray(defaultValue) ? defaultValue : defaultValue.split(',');
				break;
			case 'dependent-list':
				value = {};
				let collection = get('collection', defaultValue);
				let selectedItem = get('value', defaultValue);

				if (collection) {
					value.collection = Array.isArray(collection)
						? cloneDeep(collection)
						: collection.split(',');
				} else {
					value.collection = [];
				}
				if (field.values && field.values[selectedItem]) {
					let selectedItemValues = Array.isArray(field.values[selectedItem])
						? field.values[selectedItem]
						: field.values[selectedItem].split(',');
					selectedItemValues.forEach((selectedItemValue) => {
						if (value.collection.indexOf(selectedItemValue) === -1) {
							value.collection.push(selectedItemValue);
						}
					});
					value.value = selectedItem;
				} else {
					value.value = '';
				}
				break;
			case 'select':
				if (!Array.isArray(defaultValue)) {
					if (field.allowCreate) {
						return defaultValue;
					} else {
						for (let val of get('values', field)) {
							if (val === defaultValue) {
								return !field.multiple ? defaultValue : [defaultValue];
							}
						}
					}
				} else {
					return defaultValue.filter((element) => get('values', field).includes(element));
				}
				return field.multiple ? [] : '';
			case 'grid':
				value = cloneDeep(field.default);
				value.forEach((row, idx) => {
					if (row.action === undefined) {
						row.action = 'initial';
					}
					if (row.key === undefined) {
						row.key = idx;
					}
				});
				break;
			default:
				value = defaultValue;
				break;
		}
	}

	return value;
};

export const ipmiObj = {
	supported_hw_pools: false,
	allocations: [],
	defineZones: {
		zones: [],
		zonePool: {}
	},
	disks: {
		disks: []
	},
	ipmiAdd: {
		computed: [],
		raw: ''
	},
	pools: {
		pools: [],
		enabledPools: false
	},
	racks: {
		racks: []
	},
	force_racks: false
};

const getInitTuples = (field, sections) => {
	let initTuples = {};
	const { tuple, useFirstAsDefault } = field;
	const defaultValue = get('default', field) ? get('default', field) : {};
	const itemsSection = sections.filter((section) => section.name === tuple.items)[0];
	const valuesSection = sections.filter((section) => section.name === tuple.values)[0];

	const items = map((item) => item.name, itemsSection.subSections);
	const values = map((value) => value.name, valuesSection.subSections);

	let defaultOption = useFirstAsDefault ? values[0] : '';

	items.forEach((item) => {
		if (defaultValue[item] && values.includes(defaultValue[item])) {
			initTuples[item] = defaultValue[item];
		} else {
			initTuples[item] = defaultOption;
		}
	});
	return initTuples;
};

const getUdatedTuples = (field, fieldValue, sections) => {
	let updatedTuples = cloneDeep(fieldValue);
	let updatedTuplesKeys = Object.keys(updatedTuples);
	const { tuple, useFirstAsDefault } = field;
	const itemsSection = sections.filter((section) => section.name === tuple.items)[0];
	const valuesSection = sections.filter((section) => section.name === tuple.values)[0];

	const items = map((item) => item.name, itemsSection.subSections);
	const values = map((value) => value.name, valuesSection.subSections);

	let defaultOption = useFirstAsDefault ? values[0] : '';

	// remove tuples of deleted items
	updatedTuplesKeys.forEach((item) => {
		if (!items.includes(item)) {
			delete updatedTuples[item];
		}
	});

	// 1.add tuples of new items and set their value according to defaultOption
	// 2.set tuples with values of deleted subsections to defaultOption
	items.forEach((item) => {
		if (!updatedTuplesKeys.includes(item)) {
			updatedTuples[item] = defaultOption;
		} else {
			if (!values.includes(updatedTuples[item])) {
				updatedTuples[item] = defaultOption;
			}
		}
	});

	return updatedTuples;
};

export const prerequisitesInitialState = (fields) => {
	let initialData = {};

	fields.forEach((field) => {
		if (
			field.type === 'select' &&
			field.values.filter((value) => value === field.default).length === 0
		) {
			initialData = set(field.name, '', initialData);
		} else {
			initialData = set(field.name, getFieldDefaultValue(field), initialData);
		}
	});

	return initialData;
};

const getSubsectionTupleErrorMessage = (field, itemsSectionExists, valuesSectionExists) => {
	let errorMessages = [];
	if (!field.tuple) {
		errorMessages.push(`field must have a tuple property\n`);
	} else {
		if (!itemsSectionExists) {
			if (field.tuple.items) {
				errorMessages.push(`there is no section with the name ${field.tuple.items}\n`);
			} else {
				errorMessages.push(`please add tuple->items property\n`);
			}
		}
		if (!valuesSectionExists) {
			if (field.tuple.values) {
				errorMessages.push(`there is no section with the name ${field.tuple.values}\n`);
			} else {
				errorMessages.push(`please add tuple->values property\n`);
			}
		}
	}
	return `⦿ Field ${field.name} is invalid:\n${errorMessages.toString()}`;
};

export const getNormalizedInitialWizardState = (sections, dynamicForm) => {
	let initialData = {};
	sections.forEach((section) => {
		if (section.name === 'ipmi_ips') {
			if (dynamicForm !== false) {
				initialData['ipmi_ips'] = merge(initialData[section.name], dynamicForm['ipmi_ips']);

				// allocations - update IPMI allocations section according to hostGroup datasource changes
				// i.e. if it's dynamic-section (dataSource) get extended/reduced allocations will be updated accordingly.
				const assignNodeSection = filter({ name: 'assignNodes' }, section.subSections);
				const defaultHostGroups = getOr([], '0.fields.0.values', assignNodeSection).map(
					(hostGroupItem) => hostGroupItem.name
				);

				if (dynamicForm[section.name]['allocations']) {
					initialData.ipmi_ips.allocations = dynamicForm[section.name][
						'allocations'
					].filter((allocation) => defaultHostGroups.includes(allocation.host_group));
				}
			} else {
				initialData = set(['ipmi_ips'], ipmiObj, initialData);
				initialData[section.name] = merge(initialData[section.name], section);

				// pools
				const poolsSection = filter({ name: 'pools' }, initialData.ipmi_ips.subSections);
				const defaultPools = getOr([], '0.default', poolsSection);
				initialData.ipmi_ips.pools.pools = values(
					merge(initialData.ipmi_ips.pools.pools, defaultPools)
				);

				// disks
				const disksSection = filter({ name: 'disks' }, initialData.ipmi_ips.subSections);
				const defaultDisks = getOr([], '0.default', disksSection);
				initialData.ipmi_ips.disks.disks = values(
					merge(initialData.ipmi_ips.disks.disks, defaultDisks)
				);

				// zone pools
				const zonesSection = filter({ name: 'defineZones' }, initialData.ipmi_ips.subSections);
				const defaultZonePool = getOr({}, '0.default.zonePool', zonesSection);
				initialData.ipmi_ips.defineZones.zonePool = merge(
					initialData.ipmi_ips.defineZones.zonePool,
					defaultZonePool
				);
				const defaultZones = getOr([], '0.default.zones', zonesSection);
				initialData.ipmi_ips.defineZones.zones = values(
					merge(initialData.ipmi_ips.defineZones.zones, defaultZones)
				);

				// racks
				const racksSection = filter({ name: 'racks' }, initialData.ipmi_ips.subSections);
				const defaultRacks = getOr([], '0.default', racksSection);
				initialData.ipmi_ips.racks.racks = values(
					merge(initialData.ipmi_ips.racks.racks, defaultRacks)
				);
			}
		} else {
			if (section.subSections.length === 0) {
				initialData = set([section.name], {}, initialData);
			}
			section.subSections.forEach((subSection) => {
				if (subSection.fields && !dynamicForm) {
					subSection.fields.forEach((field) => {
						if (field.type === 'subsections-tuple') {
							initialData = set(
								[section.name, subSection.name, field.name],
								getInitTuples(field, sections),
								initialData
							);
						} else {
							initialData = set(
								[section.name, subSection.name, field.name],
								getFieldDefaultValue(field, sections),
								initialData
							);
						}
					});
				} else if (subSection.fields && dynamicForm) {
					const subSectionName = subSection.name;
					subSection.fields.forEach((field) => {
						const fieldName = field.name;
						const fieldValues = field.dataSource && field.values;
						if (dynamicForm[section.name][subSectionName]) {
							let fieldValue = dynamicForm[section.name][subSectionName][fieldName];
							if (
								fieldValues &&
								!fieldValues.includes(fieldValue) &&
								field.type === 'select' &&
								field.multiple
							) {
								fieldValue = intersection(fieldValues, fieldValue);
							} else if (
								fieldValues &&
								!fieldValues.includes(fieldValue) &&
								field.type === 'select' &&
								!field.multiple
							) {
								fieldValue = [];
							} else if (field.type === 'subsections-tuple') {
								fieldValue = getUdatedTuples(field, fieldValue, sections);
							}
							initialData = set(
								[section.name, subSection.name, field.name],
								fieldValue,
								initialData
							);
						} else {
							initialData = set(
								[section.name, subSection.name, field.name],
								getFieldDefaultValue(field),
								initialData
							);
						}
					});
				}
			});
		}
	});
	return initialData;
};

export const mergeWizardData = (name, defaults, override) => {
	let merged = {
		name: name,
		sections: defaults
	};

	try {
		// create map indexes
		let tmpMap = new Map();

		merged.sections.forEach((section, idx) => {
			tmpMap.set(section.name, idx);
			if (section.subSections !== undefined) {
				section.subSections.forEach((subSection, idx2) => {
					tmpMap.set(`${section.name}_${subSection.name}`, idx2);
					if (subSection.fields) {
						subSection.fields.forEach((field, idx3) => {
							tmpMap.set(`${section.name}_${subSection.name}_${field.name}`, idx3);
						});
					}
				});
			}
		});

		// Build the merge object (defaults + override)
		for (var section in override) {
			if (override.hasOwnProperty(section)) {
				for (var subSection in override[section]) {
					for (var field in override[section][subSection]) {
						let idx1 = tmpMap.get(section);
						let idx2 = tmpMap.get(`${section}_${subSection}`);
						let idx3 = tmpMap.get(`${section}_${subSection}_${field}`);
						if (idx3 === undefined || idx2 === undefined) {
							// IPMI
							merged.sections[idx1] = {
								...merged.sections[idx1],
								...override[section]
							};
						} else {
							if (merged.sections[idx1].isExtendable) {
								//dynamic Subsections
								merged.sections[idx1] = {
									...merged.sections[idx1],
									...override[section]
								};
							}
							if (!merged.sections[idx1].subSections[idx2].fields[idx3].readonly) {
								merged.sections[idx1].subSections[idx2].fields[idx3].default =
									override[section][subSection][field];
							} else {
								console.log(
									`Not overriding the value of field "${merged.sections[idx1].subSections[idx2].fields[idx3].name}" because it's readonly`
								);
							}
						}
					}
				}
			}
		}
	} catch (e) {
		console.error(e, 'Error while trying to parse override JSON');
	}
	return merged;
};

const getNormalizedParentValue = (field, value = field.default) => {
	if (value === undefined) {
		return undefined;
	}

	let normalizedValue;
	switch (field.type) {
		case 'dependent-list':
			normalizedValue = value.value;
			break;
		default:
			normalizedValue = value;
			break;
	}
	return normalizedValue;
};

export const extractParentsNamesFromShowIfCustomFunction = (customExpression) => {
	const parentsNames = [
		...new Set(
			customExpression.match(/\{{.*?\}}/g).map((fieldRaw) => {
				return fieldRaw.replace('{{', '').replace('}}', '');
			})
		)
	];
	return parentsNames;
};

export const validateCustomShowIfExpression = ({ rawExpression, parentsFields }) => {
	if (typeof rawExpression !== 'string') {
		return false;
	}
	let expression = rawExpression;
	parentsFields.forEach((parentField) => {
		switch (parentField.type) {
			// falling under this category all arrays types - host-list, ip-list, dependent-list (after normalization), multiple-select
			case FIELD_TYPES.HOST_LIST:
			case FIELD_TYPES.IP_LIST:
			case FIELD_TYPES.DEPENDENT_LIST:
				expression = expression.replaceAll(`{{${parentField.name}}}`, '(a,b,c)');
				break;
			case FIELD_TYPES.SELECT:
				if (parentField.multiple) {
					expression = expression.replaceAll(`{{${parentField.name}}}`, '(a,b,c)');
				} else {
					expression = expression.replaceAll(`{{${parentField.name}}}`, 'a');
				}
				break;
			case FIELD_TYPES.BOOLEAN:
				expression = expression.replaceAll(`{{${parentField.name}}}`, 'true');
				break;
			// falling under this category all integer types - number, slider
			case FIELD_TYPES.NUMBER:
			case FIELD_TYPES.SLIDER:
				expression = expression.replaceAll(`{{${parentField.name}}}`, '5');
				break;
			// falling under this category all string types - text,textarea, password, ip, timezone
			default:
				expression = expression.replaceAll(`{{${parentField.name}}}`, 'a');
		}
	});

	// try compiling expression, if not valid return compilation error
	try {
		compileExpression(expression);
		return { valid: true, error: '' };
	} catch (e) {
		return { valid: false, error: e };
	}
};

export const executeCustomShowIfExpression = ({
	firstExecution = false,
	rawExpression,
	parentsNames,
	allFieldsMap,
	dynamicForm
}) => {
	let expression = rawExpression;
	// processing expression:
	// + replace list type values (['x','y','z']) with type string (('x','y','z')) to match the _in_ comparison operand
	// + remove {{}} from fields names (for expression compilation to succeed)
	// + create parentName to value object to feed the compiled expression on execution
	const parentsNamesToValuesObject = {};
	parentsNames.forEach((parentName) => {
		const parent = allFieldsMap.get(parentName);
		let parentValue = getNormalizedParentValue(
			parent,
			!firstExecution ? get(parent.path, dynamicForm) : getFieldDefaultValue(parent)
		);
		let parentStringValue;
		if (parentValue instanceof Array && !parentValue.length) {
			// hack alert:
			// empty array parse to '()' which is equivalent to empty parentheses, result in compilation error
			// solution: adding an harmless placeholder to given array, result in ('placeholder_string'), logic stay intact, success.
			parentValue = ['placeholder_string'];
		}
		switch (parent.type) {
			// falling under this category all arrays types
			case FIELD_TYPES.HOST_LIST:
			case FIELD_TYPES.IP_LIST:
			case FIELD_TYPES.DEPENDENT_LIST:
			case FIELD_TYPES.GENERIC_SELECT:
				parentStringValue = `(${parentValue.map((x) => `"${x}"`).join(',')})`;
				expression = expression.replaceAll(`{{${parentName}}}`, parentStringValue);
				break;
			case FIELD_TYPES.SELECT:
				if (parent.multiple) {
					parentStringValue = `(${parentValue.map((x) => `"${x}"`).join(',')})`;
					expression = expression.replaceAll(`{{${parentName}}}`, parentStringValue);
				} else {
					expression = expression.replaceAll(`{{${parentName}}}`, parentName);
					parentsNamesToValuesObject[parentName] = parentValue;
				}
				break;
			// falling under this category all string or integer types
			default:
				expression = expression.replaceAll(`{{${parentName}}}`, parentName);
				parentsNamesToValuesObject[parentName] = parentValue;
		}
	});

	try {
		// compileExpression
		const compiledExpression = compileExpression(expression);
		// executeExpression
		const result = compiledExpression(parentsNamesToValuesObject);
		return result === 1 || result === true;
	} catch (e) {
		return false;
	}
};

export const checkMergedData = (merged) => {
	let error = false;
	let errorMessage = '';
	let checkOutput;
	try {
		merged.sections.forEach((section) => {
			if (
				section.isExtendable !== true &&
				(section.subSections === undefined ||
					!(Array.isArray(section.subSections) && section.subSections.length > 0))
			) {
				const missingSubsectionException = {
					error: true,
					errorMessage: `Section "${section.name}" must have subsections \n`
				};
				throw missingSubsectionException;
			}
			if (section.name !== 'ipmi_ips') {
				if (section.validation !== undefined) {
					try {
						new RegExp(section.validation);
					} catch (e) {
						error = true;
						errorMessage = '⦿ section "' + section.name + '" has invalid Regex pattern \n';
						return;
					}
				}
				section.subSections &&
					section.subSections.forEach((subSection) => {
						if (subSection.fields) {
							subSection.fields.forEach((field) => {
								checkOutput = checkWizardDataAfterMerge(field);
								error = error || checkOutput.wizardDataError;
								errorMessage += checkOutput.wizardDataMessage;
								let parentExists = false;
								let parentsNames = [];
								let validateShowIfExpression = {};
								let fieldIsParentOfItself = false;

								if (field.showIf && field.showIf.customExpression) {
									parentsNames = extractParentsNamesFromShowIfCustomFunction(
										field.showIf.customExpression
									);
									validateShowIfExpression.rawExpression = field.showIf.customExpression;
									validateShowIfExpression.parentsFields = [];
									validateShowIfExpression.notExistingParents = cloneDeep(parentsNames);

									if (parentsNames.includes(field.name)) {
										fieldIsParentOfItself = true;
									}
								}
								let fieldNameDuplicates = 0;
								let [itemsSectionExists, valuesSectionExists] = [false, false];
								merged.sections.forEach((InnerSection) => {
									if (InnerSection.name !== 'ipmi_ips') {
										if (field.type === 'subsections-tuple' && field.tuple) {
											if (InnerSection.name === field.tuple.items) {
												itemsSectionExists = true;
											}
											if (InnerSection.name === field.tuple.values) {
												valuesSectionExists = true;
											}
										}
										InnerSection.subSections &&
											InnerSection.subSections.forEach((innerSubSection) => {
												if (innerSubSection.fields) {
													if (field.showIf !== undefined) {
														if (field.showIf.parentName) {
															parentExists =
																parentExists ||
																innerSubSection.fields.some(
																	(innerField) => innerField.name === field.showIf.parentName
																);
														} else if (field.showIf.customExpression) {
															parentsNames.forEach((parentName) => {
																if (
																	innerSubSection.fields.some(
																		(innerField) => innerField.name === parentName
																	)
																) {
																	validateShowIfExpression.notExistingParents.splice(
																		validateShowIfExpression.notExistingParents.indexOf(parentName),
																		1
																	);
																	const parentField = innerSubSection.fields.filter(
																		(innerField) => innerField.name === parentName
																	)[0];
																	validateShowIfExpression.parentsFields.push(parentField);
																}
															});
														}
													}
													innerSubSection.fields.some((innerField) => {
														if (innerField.name === field.name) {
															fieldNameDuplicates++;
														}
														return null;
													});
												}
											});
									}
								});

								if (
									field.showIf && field.showIf.customExpression &&
									validateShowIfExpression.notExistingParents.length === 0 && 
									!fieldIsParentOfItself
								) {
									validateShowIfExpression = {...validateShowIfExpression, ...validateCustomShowIfExpression(validateShowIfExpression)};
								}

								if (field.showIf) {
									if (field.showIf.parentName && !parentExists) {
										error = true;
										errorMessage = `⦿ Parent of "${field.name}" doesn't exist\n`;
									} else if (
										field.showIf.customExpression &&
										validateShowIfExpression.notExistingParents.length > 0
									) {
										error = true;
										errorMessage = `⦿ Parent/s "${parentsNames}" of field "${field.name}" do not exist\n`;
									} else if (field.showIf.customExpression && fieldIsParentOfItself) {
										error = true;
										errorMessage = `⦿ Field "${field.name}" can't be parent of itself\n`;
									} else if (field.showIf.customExpression && !validateShowIfExpression.valid) {
										error = true;
										errorMessage = `⦿ Field "${field.name}" showIf custom expression is not valid\n error: ${validateShowIfExpression.error}`;
									}
								}

								if (fieldNameDuplicates > 1) {
									error = true;
									errorMessage = '⦿ Duplicate field name "' + field.name + '" \n';
								}

								if (
									field.type === 'subsections-tuple' &&
									(!itemsSectionExists || !valuesSectionExists)
								) {
									error = true;
									errorMessage = getSubsectionTupleErrorMessage(
										field,
										itemsSectionExists,
										valuesSectionExists
									);
								}
							});
						}
					});
			}
		});
	} catch (e) {
		return { error: e.error, errorMessage: e.errorMessage };
	}
	return { error, errorMessage };
};
export const checkWizardDataAfterMerge = (field) => {
	let fieldREGX;
	if (field.validation !== undefined) {
		try {
			fieldREGX = new RegExp(field.validation);
		} catch (e) {
			return {
				wizardDataError: true,
				wizardDataMessage: '⦿ "' + field.name + '" has invalid Regex pattern \n'
			};
		}
	}
	if (Object.values(FIELD_TYPES).indexOf(field.type) === -1) {
		return {
			wizardDataError: true,
			wizardDataMessage: '⦿ "' + field.name + '" has unsupported field type "' + field.type + '"\n'
		};
	}
	if (field.default !== undefined && field.default !== null) {
		let wizardDataMessage = '';
		switch (field.type) {
			case 'password':
			case 'text':
			case 'timezone':
			case 'cidr':
			case 'message':
			case 'hyperlink':
			case 'textarea':
				if (typeof field.default !== 'string') {
					return {
						wizardDataError: true,
						wizardDataMessage:
							'⦿ Expected string value in "' +
							field.name +
							'" but found "' +
							typeof field.default +
							'"\n'
					};
				}

				if (field.default !== '' && field.validation !== undefined) {
					if (!fieldREGX.test(field.default.toString())) {
						return {
							wizardDataError: true,
							wizardDataMessage: '⦿ Invalid value at field "' + field.name + '"\n'
						};
					}
				}

				break;
			case 'ip':
				if (typeof field.default !== 'string') {
					return {
						wizardDataError: true,
						wizardDataMessage:
							'⦿ Expected string value in "' +
							field.name +
							'" but found "' +
							typeof field.default +
							'"\n'
					};
				} else if (
					field.default !== '' &&
					ipValidator({}, field.default, null, false) === 'IP Invalid'
				) {
					return {
						wizardDataError: true,
						wizardDataMessage: '⦿ Invalid value at field "' + field.name + '"\n'
					};
				}

				break;
			case 'boolean':
				if (typeof field.default !== 'boolean') {
					return {
						wizardDataError: true,
						wizardDataMessage:
							'⦿ Expected boolean value in "' +
							field.name +
							'" but found "' +
							typeof field.default +
							'"\n'
					};
				}
				break;
			case 'number':
				if (typeof field.default !== 'number' && typeof field.default !== 'string') {
					return {
						wizardDataError: true,
						wizardDataMessage:
							'⦿ Expected number value in "' +
							field.name +
							'" but found "' +
							typeof field.default +
							'"\n'
					};
				} else if (
					field.restrictions &&
					field.restrictions.min !== undefined &&
					field.restrictions.max !== undefined &&
					field.restrictions.min !== null &&
					field.restrictions.max !== null
				) {
					if (field.default > field.restrictions.max || field.default < field.restrictions.min) {
						return {
							wizardDataError: true,
							wizardDataMessage: '⦿ Value out of range in field "' + field.name + '"  \n'
						};
					}
				}
				break;
			case 'slider':
				if (typeof field.default !== 'number') {
					return {
						wizardDataError: true,
						wizardDataMessage:
							'⦿ Expected number value in "' +
							field.name +
							'" but found "' +
							typeof field.default +
							'"\n'
					};
				}
				if (field.range) {
					if (
						field.range.min === undefined ||
						field.range.max === undefined ||
						field.range.min === null ||
						field.range.max === null
					) {
						let missingValue = field.range.min ? 'Max ' : 'Min ';
						return {
							wizardDataError: true,
							wizardDataMessage:
								'⦿ Missing "' + missingValue + '" value in "' + field.name + '"  \n'
						};
					} else if (field.default > field.range.max || field.default < field.range.min) {
						return {
							wizardDataError: true,
							wizardDataMessage: '⦿ Value out of range in field "' + field.name + '"  \n'
						};
					}
				}
				break;
			case 'generic-range':
			case 'generic-select':
				if (!Array.isArray(field.default)) {
					return {
						wizardDataError: true,
						wizardDataMessage: `⦿ Expected Array in "${
							field.name
						}" but found "${typeof field.default}"\n`
					};
				} else if (field.validation !== undefined) {
					let valid = true;
					field.default.forEach((innerField) => {
						if (!fieldREGX.test(innerField.name.toString()) && innerField.name !== '') {
							valid = false;
						}
					});
					if (!valid) {
						return {
							wizardDataError: true,
							wizardDataMessage: `⦿ Invalid value at field "${field.name}"\n`
						};
					}
				}
				break;
			case 'grid':
				if (!Array.isArray(field.default)) {
					return {
						wizardDataError: true,
						wizardDataMessage: `⦿ Expected Array in "${
							field.name
						}" but found "${typeof field.default}"\n`
					};
				} else if (field.columns !== null && field.columns !== undefined) {
					let valid = true;
					let validUniqueCol = 0;
					let valueArr;
					const columnNames = [];
					if (field.uniqueColumns && field.uniqueColumns.length) {
						field.columns.forEach((item) => {
							columnNames.push(item.name);
						});
						field.uniqueColumns.forEach((col) => {
							valueArr = field.default.map((item) => {
								return item[col];
							});
							if (
								columnNames &&
								columnNames.includes(col) &&
								new Set(valueArr).size !== valueArr.length
							) {
								validUniqueCol += 1;
							}
						});

						valid = !(field.uniqueColumns && field.uniqueColumns.length === validUniqueCol);
						if (!valid) {
							wizardDataMessage = wizardDataMessage.concat(
								`⦿ Expected Column/s "${field.uniqueColumns.join(', ')}" to be unique in grid "${
									field.name
								}"\n`
							);
						}
					}
					for (const innerField of field.default) {
						for (let [key, value] of Object.entries(innerField)) {
							const fieldColumn = field.columns.find((obj) => {
								return obj.name === key;
							});
							if (fieldColumn && fieldColumn.validation !== undefined) {
								fieldREGX = new RegExp(fieldColumn.validation);
								if (!fieldREGX.test(value.toString()) && value !== '') {
									valid = false;
									wizardDataMessage = wizardDataMessage.concat(
										'⦿ expression "' +
											value +
											'" of column "' +
											fieldColumn.name +
											'" of grid "' +
											field.name +
											'" is not  valid by regex exprettion "' +
											fieldColumn.validation +
											'"\n'
									);
								}
							}
							if (fieldColumn && fieldColumn.type === FIELD_TYPES.HYPERLINK) {
								try {
									new URL(value);
								} catch (e) {
									valid = false;
									wizardDataMessage = wizardDataMessage.concat(
										'⦿ url "' +
											value +
											'" of column "' +
											fieldColumn.name +
											'" of grid "' +
											field.name +
											'" is invalid' +
											'"\n'
									);
								}
							}
						}
					}

					if (!valid) {
						if (wizardDataMessage !== '') {
							return {
								wizardDataError: true,
								wizardDataMessage
							};
						} else {
							return {
								wizardDataError: true,
								wizardDataMessage: '⦿ Invalid value at field "' + field.name + '"\n'
							};
						}
					}
				} else {
					return {
						wizardDataError: true,
						wizardDataMessage:
							'⦿ Field  "' + field.name + '" of type grid must have a columns value \n'
					};
				}
				break;

			case 'ip-list':
				if (Array.isArray(field.default) || typeof field.default === 'string') {
					let ips = Array.isArray(field.default) ? field.default : field.default.split(',');
					let valid = true;
					let ipExists = false;
					let ipsToCheck = [];
					ips.forEach((innerField) => {
						if (ipExistsValidator({}, innerField, ipsToCheck) === 'Value already exists') {
							ipExists = true;
						} else {
							ipsToCheck.push(innerField);
						}
						if (innerField !== '' && ipValidator({}, innerField, null, false) === 'IP Invalid') {
							valid = false;
						}
					});
					if (field.unique === true && ipExists) {
						return {
							wizardDataError: true,
							wizardDataMessage: '⦿ IPs at field "' + field.name + '" must be unique \n'
						};
					} else if (!valid) {
						return {
							wizardDataError: true,
							wizardDataMessage: '⦿ Invalid IP at field "' + field.name + '"\n'
						};
					}
				} else {
					return {
						wizardDataError: true,
						wizardDataMessage:
							'⦿ Expected Array in "' + field.name + '" but found "' + typeof field.default + '"\n'
					};
				}
				break;
			case 'select':
				if (field.values && Array.isArray(field.values)) {
					if (
						field.allowCreate !== true &&
						field.default !== '' &&
						((typeof field.default === 'string' && !field.values.includes(field.default)) ||
							(Array.isArray(field.default) &&
								!field.default.every((elem) => field.values.indexOf(elem) > -1)))
					) {
						return {
							wizardDataError: true,
							wizardDataMessage:
								'⦿ Default value in "' + field.name + '"  is not listed among its values \n'
						};
					}
				} else {
					return {
						wizardDataError: true,
						wizardDataMessage: '⦿ No values list for field "' + field.name + '" \n'
					};
				}

				break;
			case 'host-list':
				if (Array.isArray(field.default) || typeof field.default === 'string') {
					let hosts = Array.isArray(field.default) ? field.default : field.default.split(',');
					let valid = true;
					let hostExists = false;
					let hostsToCheck = [];
					let stringsArray = true;
					hosts.forEach((innerField) => {
						if (typeof innerField !== 'string') {
							stringsArray = false;
						}
						if (
							field.validation !== undefined &&
							!fieldREGX.test(innerField.toString()) &&
							innerField !== ''
						) {
							valid = false;
						}
						if (ipExistsValidator({}, innerField, hostsToCheck) === 'Value already exists') {
							hostExists = true;
						} else {
							hostsToCheck.push(innerField);
						}
					});

					if (!valid) {
						return {
							wizardDataError: true,
							wizardDataMessage: '⦿ Invalid value at field "' + field.name + '"\n'
						};
					}
					if (!stringsArray) {
						return {
							wizardDataError: true,
							wizardDataMessage:
								'⦿ Expected Array of strings in "' +
								field.name +
								'" but found "' +
								typeof field.default +
								'"\n'
						};
					} else if (field.unique === true && hostExists) {
						return {
							wizardDataError: true,
							wizardDataMessage: '⦿ Hosts at field "' + field.name + '" must be unique \n'
						};
					}
				} else {
					return {
						wizardDataError: true,
						wizardDataMessage:
							'⦿ Expected Array in "' + field.name + '" but found "' + typeof field.default + '"\n'
					};
				}

				break;
			case 'dependent-list':
				if (typeof field.default !== 'object') {
					return {
						wizardDataError: true,
						wizardDataMessage:
							'⦿ Expected object in "' + field.name + '" but found "' + typeof field.default + '"\n'
					};
				} else if (Array.isArray(field.default.collection)) {
					let valid = true;
					let valueExists = false;
					let valuesToCheck = [];
					field.default.collection.forEach((value) => {
						if (
							field.validation !== undefined &&
							!fieldREGX.test(value.toString()) &&
							value !== ''
						) {
							valid = false;
						}
						if (ipExistsValidator({}, value, valuesToCheck) === 'Value already exists') {
							valueExists = true;
						} else {
							valuesToCheck.push(value);
						}
					});
					if (!valid) {
						return {
							wizardDataError: true,
							wizardDataMessage: '⦿ Invalid value at field "' + field.name + '"\n'
						};
					}
					if (field.unique === true && valueExists) {
						return {
							wizardDataError: true,
							wizardDataMessage: '⦿ Values at field "' + field.name + '" must be unique \n'
						};
					}
				}

				break;

			case 'subsections-tuple':
				if (typeof field.default !== 'object') {
					return {
						wizardDataError: true,
						wizardDataMessage:
							'⦿ Expected object in "' + field.name + '" but found "' + typeof field.default + '"\n'
					};
				}
				break;

			case 'file_upload':
				if (typeof field.default !== 'string') {
					return {
						wizardDataError: true,
						wizardDataMessage:
							'⦿Expected string value in "' +
							field.name +
							'" but found "' +
							typeof field.default +
							'"\n'
					};
				} else if (field.maxFileSizeAllowed !== undefined && isNaN(field.maxFileSizeAllowed)) {
					return {
						wizardDataError: true,
						wizardDataMessage:
							'⦿Expected maxFileSizeAllowed in "' + field.name + '"to be a number "\n'
					};
				}
				break;
			default:
				break;
		}
	} else if (field.default === null) {
		return {
			wizardDataError: true,
			wizardDataMessage:
				'⦿ Field  "' + field.name + '" required "' + field.type + '" but got null instead \n'
		};
	}
	return { wizardDataError: false, wizardDataMessage: '' };
};

export const createAllFieldsMap = (sections) => {
	const map = new Map();
	sections.forEach((section) => {
		if (section.name !== 'ipmi_ips') {
			section.subSections.forEach((subSection) => {
				if (subSection.fields) {
					subSection.fields.forEach((field) => {
						// sometime the default for this field is "" from the server
						// So we need to parse it to an empty array
						const newField = { ...field };
						if ((field.type === 'ip-list' || field.type === 'host-list') && field.default === '') {
							field.default = [];
							newField.default = [];
						}
						if (field.showIf && field.showIf.customExpression) {
							newField.showIf.parentsNames = extractParentsNamesFromShowIfCustomFunction(
								field.showIf.customExpression
							);
						}
						newField.subSectionName = subSection.name;
						map.set(newField.name, {
							...newField,
							path: `${section.name}.${subSection.name}.${field.name}`,
							visible: true,
							helpVisible: false,
							section: section.name
						});
					});
				}
			});
		}
	});

	return map;
};

const checkFieldVisibilityWithOperator = (operator, parentValues, actionValue) => {
	switch (operator) {
		case 'or':
		case undefined:
		case null:
			return parentValues.some((el) => actionValue.includes(el));
		case 'and':
			return parentValues.every((el) => actionValue.includes(el));
		case 'not':
			if (actionValue == null || actionValue.length === 0) {
				return false;
			}
			return !parentValues.some((el) => actionValue.includes(el));
		default:
			break;
	}
};

const recursiveValidateFieldVisibility = (field, allFieldsMap) => {
	if (!field.showIf) {
		return true;
	}
	if (field.showIf.parentName !== undefined && field.showIf.parentName !== '') {
		return validateFieldVisibility(
			allFieldsMap.get(field.showIf.parentName),
			allFieldsMap,
			field.showIf.parentValue,
			field.showIf.operator
		);
	}
	if (field.showIf.customExpression) {
		let visible = executeCustomShowIfExpression({
			firstExecution: true,
			rawExpression: field.showIf.customExpression,
			parentsNames: field.showIf.parentsNames,
			allFieldsMap
		});
		field.showIf.parentsNames.forEach((parentName) => {
			visible =
				visible && recursiveValidateFieldVisibility(allFieldsMap.get(parentName), allFieldsMap);
		});
		return visible;
	}
	return true;
};

const validateFieldVisibility = (field, allFieldsMap, valueToCompare = null, operator = null) => {
	if (valueToCompare === null) {
		return recursiveValidateFieldVisibility(field, allFieldsMap);
	}
	const fieldValue = getNormalizedParentValue(field);
	if (Array.isArray(valueToCompare) && fieldValue) {
		if (checkFieldVisibilityWithOperator(operator, valueToCompare, fieldValue)) {
			return recursiveValidateFieldVisibility(field, allFieldsMap);
		}
		return false;
	}
	if (field.type === FIELD_TYPES.MESSAGE && field.data === valueToCompare) {
		return recursiveValidateFieldVisibility(field, allFieldsMap);
	}
	if (field.default === valueToCompare) {
		return recursiveValidateFieldVisibility(field, allFieldsMap);
	}
	return false;
};

export const validateFieldsVisibility = (allFieldsMap) => {
	allFieldsMap.forEach((field) => {
		allFieldsMap.set(field.name, {
			...allFieldsMap.get(field.name),
			visible: validateFieldVisibility(field, allFieldsMap)
		});
	});
};

const deepShowIfChildrenCheck = (showIfDependancyMap) => {
	let dataChanged = false;

	showIfDependancyMap.forEach((children, parent) => {
		children.forEach((child) => {
			if (showIfDependancyMap.has(child)) {
				const otherChildren = showIfDependancyMap.get(child);
				const currentChildren = showIfDependancyMap.get(parent);
				const uniqeArr = uniq([...currentChildren, ...otherChildren]);
				if (uniqeArr.length !== currentChildren.length) {
					showIfDependancyMap.set(parent, uniqeArr);
					dataChanged = true;
				}
			}
		});
	});

	return dataChanged;
};

export const createShowIfDependancyMap = (sections, allFieldsMap) => {
	// create a map of a parent, and all his related children fields (showIf)
	const showIfDependancyMap = new Map();
	allFieldsMap.forEach((v) => {
		if (v.showIf) {
			if (v.showIf.parentName) {
				const children = showIfDependancyMap.get(v.showIf.parentName) || [];
				showIfDependancyMap.set(v.showIf.parentName, [...children, v.name]);
			} else if (v.showIf.customExpression) {
				v.showIf.parentsNames.forEach((parentName) => {
					const children = showIfDependancyMap.get(parentName) || [];
					showIfDependancyMap.set(parentName, [...children, v.name]);
				});
			}
		}
	});

	while (deepShowIfChildrenCheck(showIfDependancyMap));

	return showIfDependancyMap;
};

export const createSubsectionsMap = (sections, allFieldsMap) => {
	const subsectionsMap = new Map();

	sections.forEach((section) => {
		if (section.subSections) {
			section.subSections.forEach((subSection) => {
				let visible = true;
				if (subSection.showIf) {
					if (subSection.showIf.parentName) {
						const parentValue = allFieldsMap.get(subSection.showIf.parentName).default;
						visible = Array.isArray(subSection.showIf.parentValue)
							? checkFieldVisibilityWithOperator(
									subSection.showIf.operator,
									subSection.showIf.parentValue,
									parentValue
							  )
							: subSection.showIf.parentValue === parentValue;
						subsectionsMap.set(subSection.name, {
							visible,
							showIf: subSection.showIf
						});
					} else if (subSection.showIf.customExpression) {
						const newSubSectionShowIf = { ...subSection.showIf };
						newSubSectionShowIf.parentsNames = extractParentsNamesFromShowIfCustomFunction(
							subSection.showIf.customExpression
						);
						visible = executeCustomShowIfExpression({
							firstExecution: true,
							rawExpression: subSection.showIf.customExpression,
							parentsNames: newSubSectionShowIf.parentsNames,
							allFieldsMap
						});

						visible =
							visible &&
							newSubSectionShowIf.parentsNames.every(
								(parentName) => allFieldsMap.get(parentName).visible
							);

						subsectionsMap.set(subSection.name, {
							visible,
							showIf: newSubSectionShowIf
						});
					}
				} else {
					subsectionsMap.set(subSection.name, {
						visible,
						showIf: undefined
					});
				}
			});
		}
	});

	return subsectionsMap;
};

export const initialFieldsCollapse = (sections) => {
	const collapseMap = new Map();
	sections.forEach((section) => {
		section.subSections.forEach((subSection) => {
			collapseMap.set(
				`${section.name}_${subSection.name}`,
				subSection.initialCollapse ? true : false
			);
		});
	});
	return collapseMap;
};

export const createUploadFilesMap = (sections) => {
	const map = new Map();
	sections.forEach((section) => {
		section.subSections.forEach((subSection) => {
			if (subSection.fields) {
				subSection.fields.forEach((field) => {
					if (field.type === 'file_upload') {
						map.set(field.name, []);
					}
				});
			}
		});
	});

	return map;
};

export const createExtendedFieldValuesMap = (allFieldsMap) => {
	const extendedFieldValuesMap = new Map();
	allFieldsMap.forEach((field) => {
		if (field.allowCreate && field.type === 'select') {
			extendedFieldValuesMap.set(
				field.name,
				map((value) => ({ value, label: value }), field.values)
			);
		}
	});
	return extendedFieldValuesMap;
};

export const createExtendableSectionFieldsDependencyMap = (allFieldsMap) => {
	const extendableSectionFieldsDependencyMap = new Map();
	allFieldsMap.forEach((field) => {
		if (field.type === 'subsections-tuple') {
			Object.values(field.tuple).forEach((section) => {
				if (!extendableSectionFieldsDependencyMap.has(section)) {
					extendableSectionFieldsDependencyMap.set(section, [field.display]);
				} else {
					extendableSectionFieldsDependencyMap.set(section, [
						...extendableSectionFieldsDependencyMap.get(section),
						field.display
					]);
				}
			});
		}
	});
	return extendableSectionFieldsDependencyMap;
};

export const updateAllFieldsHelpVisibility = (allFieldsMap, fieldName) => {
	const updatedAllFieldsMap = new Map(allFieldsMap);

	const field = updatedAllFieldsMap.get(fieldName);
	field.helpVisible = !field.helpVisible;
	updatedAllFieldsMap.set(fieldName, field);

	return updatedAllFieldsMap;
};

export const initialGridFields = (merged) => {
	// We need to add key to all field of type grid
	// because we don't remove the row from the array, but checking it as
	// deleted, therefore we need to keep the index (key)
	merged.sections.forEach((section) => {
		if (section.subSections) {
			section.subSections.forEach((subSection) => {
				if (subSection.fields) {
					subSection.fields.forEach((field) => {
						if (field.type === 'grid') {
							if (field.default) {
								field.default.forEach((row, idx) => {
									delete row['originRow'];
									return {
										key: idx,
										action: 'initial'
									};

									// row.key = idx;
									// row.action = 'initial';
									// delete row['originRow'];
								});
							}
						}
					});
				}
			});
		}
	});
};

export const createSearchMap = (allFieldsMap, subsectionsMap, searchText, newMap) => {
	const map = newMap ? new Map() : cloneDeep(allFieldsMap);
	let index = 0;
	allFieldsMap.forEach((field) => {
		const subSectionValues = subsectionsMap.get(get('subSectionName', field));
		const subSectionVisibility = get('visible', subSectionValues);
		if (
			subSectionVisibility &&
			field.visible &&
			field.display &&
			field.display.toLowerCase().includes(searchText)
		) {
			map.set(index++, {
				display: field.display,
				name: field.name,
				subSectionName: field.subSectionName,
				section: field.section,
				path: field.path,
				visible: field.visible
			});
		}
	});
	if (!newMap && map.size >= index) {
		map.forEach((field, idx) => {
			if (idx >= index) {
				map.delete(idx);
				index++;
			}
		});
	}
	return map;
};

export const createPrerequisiteFieldsMap = (fields) => {
	const map = new Map();

	fields.forEach((field) => {
		let fieldContent = {
			...field,
			visible: true,
			helpVisible: false,
			path: `${field.name}`
		};

		if (field.showIf && field.showIf.customExpression) {
			fieldContent = set(
				'showIf.parentsNames',
				extractParentsNamesFromShowIfCustomFunction(field.showIf.customExpression),
				fieldContent
			);
		}

		map.set(field.name, fieldContent);
	});

	return map;
};

export const updateSubsectionsVisability = (subsectionsMap, allFieldsMap, dynamicForm) => {
	const subsectionsMapNew = new Map(subsectionsMap);
	subsectionsMap.forEach((subsection, subsectionName) => {
		if (!subsection.showIf) return;
		if (subsection.showIf.parentName) {
			const parentValue = get(allFieldsMap.get(subsection.showIf.parentName).path, dynamicForm);
			subsectionsMapNew.set(
				subsectionName,
				Object.assign(subsection, {
					visible: Array.isArray(subsection.showIf.parentValue)
						? checkFieldVisibilityWithOperator(
								subsection.showIf.operator,
								subsection.showIf.parentValue,
								parentValue
						  )
						: subsection.showIf.parentValue === parentValue
				})
			);
		} else if (subsection.showIf.customExpression) {
			let allParentsAreVisible = false;
			let customShowIfConditionPassed = false;
			if (
				subsection.showIf.parentsNames.every((parentName) => allFieldsMap.get(parentName).visible)
			) {
				allParentsAreVisible = true;
			}
			// check customShowIf expression
			customShowIfConditionPassed = executeCustomShowIfExpression({
				rawExpression: subsection.showIf.customExpression,
				parentsNames: subsection.showIf.parentsNames,
				allFieldsMap,
				dynamicForm
			});
			subsectionsMapNew.set(
				subsectionName,
				Object.assign(subsection, {
					visible: allParentsAreVisible && customShowIfConditionPassed
				})
			);
		}
	});
	return subsectionsMapNew;
};

export const updateDependencies = (dependentFields, allFieldsMapNew, dynamicForm) => {
	let dependentFieldChanged = false;
	dependentFields.forEach((dependentFieldName) => {
		let visible = false;
		const dependentField = allFieldsMapNew.get(dependentFieldName);
		if (dependentField.showIf.parentValue) {
			visible = false;
			// get parent from allFieldsMap
			const parent = allFieldsMapNew.get(dependentField.showIf.parentName);
			if (parent.visible) {
				// normalize parent value according to it's type
				const parentValue = getNormalizedParentValue(parent, get(parent.path, dynamicForm));
				if (Array.isArray(dependentField.showIf.parentValue)) {
					visible = checkFieldVisibilityWithOperator(
						dependentField.showIf.operator,
						dependentField.showIf.parentValue,
						parentValue
					);
				} else {
					visible = dependentField.showIf.parentValue === parentValue;
				}
			}
		} else if (dependentField.showIf.customExpression) {
			let allParentsAreVisible = false;
			let customShowIfConditionPassed = false;
			if (
				dependentField.showIf.parentsNames.every(
					(parentName) => allFieldsMapNew.get(parentName).visible
				)
			) {
				allParentsAreVisible = true;
			}
			// check customShowIf expression
			customShowIfConditionPassed = executeCustomShowIfExpression({
				rawExpression: dependentField.showIf.customExpression,
				parentsNames: dependentField.showIf.parentsNames,
				allFieldsMap: allFieldsMapNew,
				dynamicForm
			});
			visible = allParentsAreVisible && customShowIfConditionPassed;
		}

		if (visible !== dependentField.visible) {
			allFieldsMapNew.set(dependentFieldName, Object.assign(dependentField, { visible }));
			dependentFieldChanged = true;
		}
	});

	return dependentFieldChanged;
};

export const updateFieldsVisability = (
	allFieldsMap,
	showIfDependancyMap,
	dynamicForm,
	changedFieldName
) => {
	if (!showIfDependancyMap.has(changedFieldName)) {
		return allFieldsMap;
	}
	const allFieldsMapNew = new Map(allFieldsMap);
	const dependentFields = showIfDependancyMap.get(changedFieldName);
	while (updateDependencies(dependentFields, allFieldsMapNew, dynamicForm));

	return allFieldsMapNew;
};

export const initializeWizardData = (wizardData) => {
	initialGridFields(wizardData);

	let updatedSections = cloneDeep(wizardData.sections);

	//Check for extendable (dynamic) sections
	let extendableSubsectionsMap = createExtendableSubsectionsMap(updatedSections);
	//add values to Data-sources
	updatedSections = setDataSourcesFields(updatedSections, extendableSubsectionsMap, true);

	const allFieldsMap = createAllFieldsMap(updatedSections);

	// check which fields should be visible for the first time wizard shows
	validateFieldsVisibility(allFieldsMap);

	// check which subsection should be visible for the first time wizard shows
	const subsectionsMap = createSubsectionsMap(updatedSections, allFieldsMap);
	// key: parent, value: all nested children
	const showIfDependancyMap = createShowIfDependancyMap(updatedSections, allFieldsMap);

	const collapseMap = initialFieldsCollapse(updatedSections);
	const uploadFiles = createUploadFilesMap(updatedSections);

	// Get all disallowed fields
	const disallowDuplicatedResult = checkDisallowDuplicatedFields(updatedSections);
	updatedSections = disallowDuplicatedResult.newSections;
	const allDisallowedFields = disallowDuplicatedResult.allDisallowedFields;

	const extendedFieldValuesMap = createExtendedFieldValuesMap(allFieldsMap);

	const extendableSectionFieldsDependencyMap = createExtendableSectionFieldsDependencyMap(
		allFieldsMap
	);

	return [
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
	];
};

export const addExamplePages = (categories) => {
	const examplesPages = require(`../components/example-cards/examplesPages.json`);
	const pages = get(`pages`, examplesPages);
	let obj = {};
	let examplesCard = {
		display: get(`display`, examplesPages),
		name: get(`name`, examplesPages),
		pages: []
	};
	pages.forEach((page) => {
		obj = {
			name: page.name,
			description: page.description,
			display: page.display,
			isExampleCard: true,
			deployButtonCaption: CAPTIONS.OPEN,
			hasInitialPage: false
		};
		examplesCard.pages.push(obj);
	});
	categories.push(examplesCard);
	return categories;
};

export const changeCategories = (categories, isExamplesCategoryVisible) => {
	let newCategories = categories;
	if (isExamplesCategoryVisible) {
		if (!newCategories.some((e) => e.name === 'cbis_examples')) {
			newCategories = addExamplePages(cloneDeep(categories));
		}
	} else {
		newCategories = remove((row) => {
			return row.name === 'cbis_examples';
		}, newCategories);
	}
	return newCategories;
};

export const createExtendableSubsectionsMap = (sections) => {
	const extendablesubsectionsMap = new Map();
	sections.forEach((section) => {
		if (section.isExtendable || section.isExtendable === false) {
			const subSectionsNamesArray = [];
			section.subSections.forEach((subSection) => {
				subSectionsNamesArray.push(subSection.name);
			});

			extendablesubsectionsMap.set(section.name, {
				extendableTemplate: section.subsectionTemplateFields,
				subSectionsNamesArray
			});

			if (section.dataSource) {
				extendablesubsectionsMap.get(section.name).dataSourceName = section.dataSource;
			}
		}
	});
	return extendablesubsectionsMap;
};

export const modifyCustomShowIfParamsToMeetInternalShowIf = (field, dynamicSubsectionName) => {
	const newField = cloneDeep(field);
	const parentsNames = extractParentsNamesFromShowIfCustomFunction(field.showIf.customExpression);
	let customFunctionString = field.showIf.customExpression;
	parentsNames.forEach((parentName) => {
		customFunctionString = customFunctionString.replaceAll(
			`{{${parentName}}}`,
			`{{${dynamicSubsectionName}_${parentName}}}`
		);
	});
	newField.showIf.customExpression = customFunctionString;
	newField.showIf.parentsNames = parentsNames.map(
		(parentsName) => `${dynamicSubsectionName}_${parentsName}`
	);
	return newField;
};

export const addNewSubsection = (
	sections,
	sectionName,
	extendableSubsectionsMap,
	subSectionName
) => {
	const newSections = cloneDeep(sections);
	const newExtendableSubsectionsMap = cloneDeep(extendableSubsectionsMap);
	const validSubSectionName = subSectionName.replace(/-/g, '_').replace(/ /g, '');
	sections.forEach((section, index) => {
		if (section.name === sectionName) {
			const extendableSection = newExtendableSubsectionsMap.get(section.name);
			const extendableTemplateNew = cloneDeep(extendableSection.extendableTemplate);
			const { subSectionsNamesArray } = extendableSection;

			extendableTemplateNew.forEach((field) => {
				field.name = `${validSubSectionName}_${field.name}`;
				if (field.showIf && !field.showIf.isExternal) {
					if (field.showIf.parentName) {
						field.showIf.parentName = `${validSubSectionName}_${field.showIf.parentName}`;
					} else if (field.showIf.customExpression) {
						field = modifyCustomShowIfParamsToMeetInternalShowIf(field, validSubSectionName);
					}
				}
			});

			const obj = {
				display: subSectionName,
				name: validSubSectionName,
				fields: extendableTemplateNew
			};
			newSections[index].subSections.push(obj);
			subSectionsNamesArray.push(validSubSectionName);
		}
	});
	return [newSections, newExtendableSubsectionsMap, validSubSectionName];
};

export const validateFieldsVisibilityAfterUpdate = (allFieldsMap, subSectionName) => {
	allFieldsMap.forEach((field) => {
		if (field.subSectionName === subSectionName) {
			field.visible = validateFieldVisibility(field, allFieldsMap);
		}
	});
};

export const createNewSubsectionFieldsMap = (
	extendableSubsectionsMap,
	newSectionName,
	sectionName
) => {
	const addedSubsectionsFieldsMap = new Map();
	extendableSubsectionsMap.get(sectionName).extendableTemplate.forEach((field) => {
		if (field.showIf && !field.showIf.isExternal) {
			if (field.showIf.parentName) {
				field.showIf.parentName = `${newSectionName}_${field.showIf.parentName}`;
			} else if (field.showIf.customExpression) {
				field = modifyCustomShowIfParamsToMeetInternalShowIf(field, newSectionName);
			}
		}
		addedSubsectionsFieldsMap.set(`${newSectionName}_${field.name}`, {
			...field,
			name: `${newSectionName}_${field.name}`,
			path: `${sectionName}.${newSectionName}.${newSectionName}_${field.name}`,
			visible: true,
			helpVisible: false,
			section: sectionName,
			subSectionName: newSectionName
		});
	});
	return addedSubsectionsFieldsMap;
};

export const populateWizardSections = (sections) => {
	let newSections = cloneDeep(sections);
	newSections.forEach((section) => {
		if (section.isExtendable || section.isExtendable === false) {
			let values,
				newField = {};
			section.subSections.forEach((subSection, index1) => {
				if (section.subSections[index1].default) {
					let fields = [];
					section.subsectionTemplateFields.forEach((field, index2) => {
						values = section.subSections[index1].default;
						newField = cloneDeep(field);
						newField.value = values[field.name];
						newField.default = values[field.name];
						newField.name = `${subSection.name}_${field.name}`;
						if (field.showIf && !field.showIf.isExternal) {
							if (field.showIf.parentName) {
								newField.showIf.parentName = `${subSection.name}_${field.showIf.parentName}`;
							} else if (field.showIf.customExpression) {
								newField = modifyCustomShowIfParamsToMeetInternalShowIf(field, subSection.name);
							}
						}
						fields.push(newField);
						subSection.fields = fields;
					});
				}
			});
		}
	});
	return newSections;
};

export const checkForNewSections = (sections, importedData, importFromFile = false) => {
	const newSections = cloneDeep(sections);
	sections.forEach((section, idx) => {
		if (section.isExtendable && importedData[section.name]) {
			const importedSubSections = !importFromFile
				? Object.keys(importedData[section.name]).filter(
						(importedSubsection) =>
							!newSections[idx].subSections
								.map((subsection) => subsection.name)
								.includes(importedSubsection)
				  )
				: Object.keys(importedData[section.name]);
			newSections[idx].subSections = !importFromFile ? newSections[idx].subSections : [];
			if (importedSubSections.length !== 0) {
				for (let item of importedSubSections) {
					let fields = [];
					section.subsectionTemplateFields.forEach((field) => {
						let newField = cloneDeep(field);
						newField.subSectionName = item;
						newField.name = `${item}_${newField.name}`;
						if (newField.showIf && !newField.showIf.isExternal) {
							if (field.showIf.parentName) {
								newField.showIf.parentName = `${item}_${field.showIf.parentName}`;
							} else if (field.showIf.customExpression) {
								newField = modifyCustomShowIfParamsToMeetInternalShowIf(newField, item);
							}
						}
						fields.push(newField);
					});
					let ShouldBeDeleted = true;
					let subsectionIndex = findIndex(
						(subsection) => subsection.name === item,
						section.subSections
					);
					if (subsectionIndex > -1) {
						ShouldBeDeleted = section.subSections[subsectionIndex].ShouldBeDeleted;
					}

					const subSectionObj = Object.assign(
						{},
						{
							display: item,
							name: item,
							ShouldBeDeleted,
							fields: fields
						}
					);
					newSections[idx].subSections.push(subSectionObj);
				}
			}
		}
	});
	return newSections;
};

// main function for updating the assignedFieldsArray
export const updateAssignedFieldsArray = (assignedItem, assignedFieldsArray) => {
	let newAssignedFieldsArray = cloneDeep(assignedFieldsArray);
	if (assignedItem.hasOwnProperty('clear')) {
		newAssignedFieldsArray.forEach((field) => {
			let newSelectedItems = field.selectedItems.filter(
				(item) => item !== assignedItem.subSectionName
			);
			field.selectedItems = newSelectedItems;
		});
	} else {
		let itemIndex = newAssignedFieldsArray.findIndex((item) => item.model === assignedItem.model);
		if (itemIndex > -1) {
			newAssignedFieldsArray[itemIndex].selectedItems = assignedItem.selectedItems;
		} else {
			newAssignedFieldsArray.push(assignedItem);
		}
	}
	return newAssignedFieldsArray;
};

export const updateAssignedFieldsArrayAfterChange = (
	value,
	model,
	allFieldsMap,
	assignedFieldsArray
) => {
	let newAssignedFieldsArray = assignedFieldsArray;
	let lastIndex = model.lastIndexOf('.');
	let fieldName = model.substring(lastIndex + 1);
	let isFieldValueArray = Array.isArray(value);
	let fieldObject = allFieldsMap.get(fieldName);
	if (fieldObject === undefined) {
		const newModel = model.substring(0, lastIndex - 2);
		let newFieldName = newModel.substring(newModel.lastIndexOf('.') + 1);
		let newFieldObject = allFieldsMap.get(newFieldName);
		if (newFieldObject.type === 'grid') {
			newFieldObject.columns.forEach((col) => {
				if (col.name === fieldName && col.hasOwnProperty('dataSource')) {
					let assignedItem = {
						dataSource: col.dataSource,
						fieldDefault: isFieldValueArray ? [] : '',
						model: model,
						selectedItems: isFieldValueArray ? value : [value],
						fieldName: fieldName
					};

					newAssignedFieldsArray = updateAssignedFieldsArray(assignedItem, newAssignedFieldsArray);
				}
			});
		}
	} else {
		let assignedItem = {
			dataSource: fieldObject.dataSource,
			fieldDefault: isFieldValueArray ? [] : '',
			model: model,
			selectedItems: isFieldValueArray ? value : [value],
			fieldName: fieldName
		};

		newAssignedFieldsArray = updateAssignedFieldsArray(assignedItem, newAssignedFieldsArray);
	}
	return newAssignedFieldsArray;
};

export const clearAssignedFieldsAfterDelete = (
	assignedFieldsArray,
	dynamicForm,
	subsectionName
) => {
	let newDynamicForm = dynamicForm;
	assignedFieldsArray.forEach((assignedField) => {
		let newSelectedItems = assignedField.selectedItems.filter((item) => item !== subsectionName);
		let model = assignedField.model.replace('dynamic.content.', '');
		newDynamicForm = set(model, newSelectedItems, newDynamicForm);
	});
	return newDynamicForm;
};

export const setDataSourcesFields = (
	sections,
	extendableSubsectionsMap,
	initializingDataSourceFields = false
) => {
	sections.forEach((section) => {
		if (section.name === 'ipmi_ips') {
			section.subSections.forEach((subSection) => {
				subSection.name === 'assignNodes' &&
					subSection.fields &&
					subSection.fields.forEach((field) => {
						const isIpmiAssignNodeField = true;
						field.dataSource &&
							addDataSourcevalues(
								field,
								extendableSubsectionsMap,
								isIpmiAssignNodeField,
								initializingDataSourceFields
							);
					});
			});
		} else {
			section.subSections.forEach((subSection) => {
				subSection.fields &&
					subSection.fields.forEach((field) => {
						if (field.type === 'grid') {
							field.columns &&
								field.columns.forEach((col) => {
									if (col.dataSource) {
										addDataSourcevalues(col, extendableSubsectionsMap);
									}
								});
						}
						if (field.dataSource) {
							addDataSourcevalues(field, extendableSubsectionsMap);
						}
					});
			});
		}
	});

	return sections;
};

const addDataSourcevalues = (
	field,
	extendableSubsectionsMap,
	isIpmiAssignNodeField = false,
	initializingDataSourceField = false
) => {
	extendableSubsectionsMap.forEach((val) => {
		if (val.dataSourceName && val.dataSourceName === field.dataSource) {
			if (!isIpmiAssignNodeField) {
				field.values = val.subSectionsNamesArray;
				if (field.useFirstAsDefault) {
					field.default = field.values[0];
				}
			} else {
				if (initializingDataSourceField) {
					field.staticValues = cloneDeep(field.values);
				}
				field.values = val.subSectionsNamesArray
					.map((dataSourceItem) => ({
						display: dataSourceItem,
						name: dataSourceItem
					}))
					.concat(field.staticValues);
			}
		}
	});
};

const checkParentChildDependency = (field, parentFieldDefaultValue) => {
	const dependencyMap = field.parentChildDependencyMap;
	let newValues = [];
	let newDefault = '';
	if (
		dependencyMap &&
		dependencyMap.parentChildMap &&
		Object.keys(dependencyMap.parentChildMap).length
	) {
		Object.keys(dependencyMap.parentChildMap).forEach((key) => {
			if (key === parentFieldDefaultValue) {
				newValues = dependencyMap.parentChildMap[key].values;
				const currentDefaultVal = dependencyMap.parentChildMap[key].default;
				if (currentDefaultVal && !Array.isArray(currentDefaultVal)) {
					for (let val of newValues) {
						if (val === currentDefaultVal) {
							newDefault = currentDefaultVal;
						}
					}
				}
			}
		});
	}
	return { newValues, newDefault };
};

const getDisallowDuplicatesFieldValues = (updatedSections, fieldPath) => {
	const splittedPath = fieldPath.split('.');
	const currentSection = filter((item) => item.name === splittedPath[0], updatedSections);
	const currentSubsections = filter(
		(item) => item.name === splittedPath[1],
		currentSection[0].subSections
	);
	const currentField = filter(
		(item) => item.name === splittedPath[2],
		currentSubsections[0].fields
	);
	return currentField && currentField.length && currentField[0].default;
};

export const filterDuplicatesValues = (currentValues, disallowDuplicatesValues) => {
	return currentValues.filter((obj) => {
		return disallowDuplicatesValues.indexOf(obj) === -1;
	});
};

export const checkDisallowDuplicatedFields = (sections) => {
	const newSections = cloneDeep(sections);
	let disallowFieldPath = '';
	let allDisallowedFields = [];
	newSections.forEach((section, sectionIdx) => {
		section.subSections.forEach((subSection, subSectionIdx) => {
			subSection.fields &&
				subSection.fields.forEach((field, fieldIdx) => {
					let obj = {};
					if (field.disallowDuplicates && field.disallowDuplicates.length) {
						disallowFieldPath = `${section.name}.${subSection.name}.${field.name}`;
						allDisallowedFields.push({
							disallowFieldPath,
							items: field.disallowDuplicates
						});
						let filteredValues = field.default;
						field.disallowDuplicates.forEach((fieldPath) => {
							obj = cloneDeep(field);
							const disallowDuplicatesValues = getDisallowDuplicatesFieldValues(
								sections,
								fieldPath
							);
							filteredValues = filterDuplicatesValues(filteredValues, disallowDuplicatesValues);
							obj.default = filteredValues;
						});
						newSections[sectionIdx].subSections[subSectionIdx].fields[fieldIdx] = obj;
					}
				});
		});
	});
	return { newSections, allDisallowedFields };
};

export const getTooltipContent = (field, fieldName, path) => {
	let renderTooltipContent = `Field Name: ${fieldName}`;
	renderTooltipContent = `${renderTooltipContent.concat(
		get('default', field) ? `\nDefault Value: ${JSON.stringify(getOr('', 'default', field))}` : ''
	)}`;
	renderTooltipContent = renderTooltipContent.concat(
		`\nSection Name: ${path.split('.')[0]}\nSubSection Name: ${path.split('.')[1]}`
	);
	renderTooltipContent = `${renderTooltipContent.concat(
		get('showIf', field) ? `\nShowIf: ${JSON.stringify(getOr('', 'showIf', field))}` : ''
	)}`;
	return renderTooltipContent;
};

export const formatBytes = (bytes) => {
	if (0 === bytes) {
		return '0 bytes';
	}
	const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const f = Math.floor(Math.log(bytes) / Math.log(1024));
	return parseFloat((bytes / Math.pow(1024, f)).toFixed(2)) + ' ' + e[f];
};

export const setFormValidity = (path, dynamicForm) => {
	const formEntry = get(path, dynamicForm);
	if (formEntry.$form === undefined) {
		return {
			valid: formEntry.valid !== undefined ? formEntry.valid : true,
			newDynamicForm: dynamicForm
		};
	}

	const formEntryErrors = formEntry.$form.errors;
	if (
		formEntry.$form !== undefined &&
		Array.isArray(formEntryErrors) &&
		!isEmpty(formEntryErrors.filter(Boolean))
	) {
		return {
			valid: formEntry.$form.valid !== undefined ? formEntry.$form.valid : true,
			newDynamicForm: dynamicForm
		};
	}
	const entryResult = { valid: true, newDynamicForm: dynamicForm };
	Object.keys(formEntry).forEach((entry) => {
		if (entry === '$form') {
			return;
		}
		const keyResult = setFormValidity(`${path}.${entry}`, entryResult.newDynamicForm);
		entryResult.valid = keyResult.valid ? entryResult.valid : false;
		entryResult.newDynamicForm = keyResult.newDynamicForm;
	});

	entryResult.newDynamicForm = set(
		`${path}.$form.valid`,
		entryResult.valid,
		entryResult.newDynamicForm
	);

	return entryResult;
};

export const setFieldsErrors = (dynamicForm, fieldPathToErrorsMap) => {
	let newDynamicForm = cloneDeep(dynamicForm);
	fieldPathToErrorsMap.forEach((errorsList, fieldPath) => {
		const isValid = isEmpty(errorsList.filter(Boolean));
		if (!isValid) {
			newDynamicForm = set(`content.${fieldPath}.errors`, errorsList, newDynamicForm);
		}
		newDynamicForm = set(`content.${fieldPath}.valid`, isValid, newDynamicForm);
		newDynamicForm = set(`content.${fieldPath}.validated`, true, newDynamicForm);
	});

	const validatedForm = setFormValidity('content', newDynamicForm);
	newDynamicForm = set('$form.valid', validatedForm.valid, validatedForm.newDynamicForm);

	return newDynamicForm;
};

const getValidators = (field, value) => {
	const validators = map((validator) => validator(field, value), getFieldValidators(field));
	return validators;
};

export const validateForm = (field, fieldsErrorsMap, form, dynamicForm) => {
	let validators;
	let value;
	switch (field.type) {
		case 'generic-select':
			field.default.forEach((_value, index) => {
				const fieldName = get(`${field.path}.${index}.name.value`, form);
				validators = getValidators(field, fieldName);
				fieldsErrorsMap.set(`${field.path}.${index}`, validators);
			});
			break;
		case 'ip-list':
		case 'host-list':
			value = get(`${field.path}.$form.value`, form);
			validators = getValidators(field, value);
			fieldsErrorsMap.set(`${field.path}.$form`, validators);
			break;
		case 'select': {
			const formField = get(field.path, form);
			const isComplexSelect = get(`$form`, formField);
			const fieldValue =
				isComplexSelect !== undefined ? get('$form.value', formField) : get('value', formField);
			validators = getValidators(field, fieldValue);
			isComplexSelect !== undefined
				? fieldsErrorsMap.set(`${field.path}.$form`, validators)
				: fieldsErrorsMap.set(`${field.path}`, validators);
			break;
		}
		case 'novl': {
			const conditionField = get('condition', field);
			const formValueField = get('fieldValue', field);
			const conditionValue = get(`${field.path}.condition.value`, form);
			const formFieldValue = get(`${field.path}.fieldValue.value`, form);
			const conditionValidators = getValidators(conditionField, conditionValue);
			fieldsErrorsMap.set(`${field.path}.condition`, conditionValidators);
			if (formValueField) {
				const fieldValueValidators = getValidators(formValueField, formFieldValue);
				fieldsErrorsMap.set(`${field.path}.fieldValue`, fieldValueValidators);
			}
			break;
		}
		case 'dependent-list': {
			const selectedValue = get(`${field.path}.value.value`, form);
			const selectErrors = getValidators(field, selectedValue);
			// set select validity according to default value
			fieldsErrorsMap.set(`${field.path}.value`, selectErrors);
			const listValues = get(`${field.path}.collection.$form.value`, form);
			const listErrors = getValidators(field, listValues);
			// set list validity according to list values
			fieldsErrorsMap.set(`${field.path}.collection`, listErrors);
			break;
		}
		case 'subsections-tuple': {
			const formFieldItems = get(`${field.path}`, dynamicForm);
			if (isEmpty(formFieldItems)) {
				fieldsErrorsMap.set(field.path, getValidators(field, []));
			} else {
				Object.keys(formFieldItems).forEach((item) => {
					const itemValue = get(`${field.path}.${item}.value`, form);
					fieldsErrorsMap.set(`${field.path}.${item}`, getValidators(field, itemValue));
				});
				fieldsErrorsMap.set(field.path, []);
			}
			break;
		}
		default: {
			const tempValue = get(field.path, form);
			value = tempValue && tempValue.value;
			validators = getValidators(field, value);
			fieldsErrorsMap.set(field.path, validators);
		}
	}
};

const checkValueInArray = (valueArr, colValue) => {
	if (Array.isArray(colValue)) {
		return valueArr.some((item) => {
			if (Array.isArray(item) && isEqual([...item].sort(), [...colValue].sort())) {
				return true;
			}
			return false;
		});
	}
	return valueArr.includes(colValue);
};

export const getDuplicatedColumns = (uniqueColumns, rowData, dialogRow, isEditColumn = false) => {
	let valueArr;
	const errorFields = [];
	let prevDialogRow;
	// Exclude the removed rows from the unique check
	const filteredRowData = rowData.filter((data) => data.action !== 'deleted');
	uniqueColumns &&
		uniqueColumns.forEach((col) => {
			if (Object.keys(dialogRow).includes(col)) {
				valueArr = filteredRowData.map((item) => {
					return item[col];
				});
				if (isEditColumn) {
					// Get the current edited field from rowDate array
					prevDialogRow = filteredRowData
						.filter((entry) => {
							return entry.key === dialogRow.key;
						})
						.shift();
				}
				// check if the item was repeated in other place more than once
				const count = {};
				valueArr.forEach((i) => {
					count[i] = (count[i] || 0) + 1;
				});
				// first statement to make sure that this is not the same field which I'm trying to update,
				// it's to handel the case when applying or saving the changes without any change in field.
				// second statement to make sure the field value not duplicated in any where accept the origin place.
				if (!isEmpty(prevDialogRow)) {
					if (
						(count[dialogRow[col]] > 1 || !isEqual(prevDialogRow[col], dialogRow[col])) &&
						checkValueInArray(valueArr, dialogRow[col])
					) {
						errorFields.push(col);
					}
				} else if (checkValueInArray(valueArr, dialogRow[col])) {
					errorFields.push(col);
				}
			}
		});
	return errorFields;
};

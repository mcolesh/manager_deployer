import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Tooltip } from '@nokia-csf-uxr/csfWidgets';
import PropTypes from 'prop-types';
import * as wizard from 'actions/wizard';
import {
	FieldContainer,
	FieldItemContainer,
	FieldComponentContainer
} from 'components/StyledComponents';
import {
	getFieldComponent,
	getFieldNormalizedProps,
	getFieldValidators,
	getTooltipContent
} from 'utils/wizard';
import 'components/wizard/subsectionStyle.css';
import styled from 'styled-components';
import { get, getOr, isEqual } from 'lodash/fp';

const Highlight = require('react-highlighter');

const LabelContainer = styled.div`
	${({ showHelpMsg }) =>
		showHelpMsg ? 'text-decoration: underline; cursor: pointer; color: #239df9' : ''};
	display: inline-block;
`;

class Subsection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentDependencyFields: [],
			clickedField: '',
			currentVisibilityMap: {},
			prevVisibilityMap: {}
		};
	}

	componentDidMount() {
		const { allFieldsMap, showIfDependancyMap } = this.props;
		const initVisibilityMap = this.updateVisibilityMap(allFieldsMap, showIfDependancyMap);
		this.setState({
			currentVisibilityMap: initVisibilityMap,
			prevVisibilityMap: initVisibilityMap
		});
	}

	componentDidUpdate(prevProps) {
		const { path, form, showIfDependancyMap, allFieldsMap } = this.props;
		const { clickedField, currentVisibilityMap } = this.state;
		const clickedFieldFullPath = `${path}.${clickedField}`;
		const prevClickedFieldValue = get(clickedFieldFullPath, prevProps.form.content);
		const ClickedFieldValue = get(clickedFieldFullPath, form.content);
		if (
			showIfDependancyMap &&
			showIfDependancyMap.has(clickedField) &&
			ClickedFieldValue !== prevClickedFieldValue
		) {
			this.setState({
				currentDependencyFields: showIfDependancyMap.get(clickedField)
			});
			const currentVisibilityMapRef = this.updateVisibilityMap(allFieldsMap, showIfDependancyMap);
			if (!isEqual(currentVisibilityMapRef, currentVisibilityMap)) {
				this.setState({
					prevVisibilityMap: currentVisibilityMap,
					currentVisibilityMap: currentVisibilityMapRef
				});
			}
		}
	}

	onClick = (field) => {
		const { showHelp, showHelpMessage } = this.props;
		if (showHelp && field.help) {
			showHelpMessage(field.help);
		} else if (showHelp && !field.help) {
			showHelpMessage(' ');
		}
		this.updateClickedField(field.name);
	};

	updateClickedField = (filedName) => {
		const { clickedField } = this.state;
		if (filedName !== clickedField) {
			this.setState({ clickedField: filedName });
		}
	};

	updateVisibilityMap = (allFieldsMap, showIfDependancyMap) => {
		const fieldVisibilityMap = {};
		allFieldsMap &&
			showIfDependancyMap &&
			showIfDependancyMap.forEach((item) => {
				item &&
					item.length &&
					item.forEach((field) => {
						!get(field, fieldVisibilityMap) &&
							Object.assign(fieldVisibilityMap, {
								[field]: allFieldsMap.get(field) ? allFieldsMap.get(field).visible : false
							});
					});
			});
		return fieldVisibilityMap;
	};

	render() {
		const {
			display,
			fields,
			path,
			form,
			allFieldsMap,
			searchText,
			extendedFieldValuesMap,
			showHelp,
			isFieldDescriptionInTooltipVisible
		} = this.props;
		const { currentDependencyFields, prevVisibilityMap, clickedField } = this.state;
		return (
			<div>
				{fields.map((field) => {
					const dependencyParentName =
						field.parentChildDependencyMap && field.parentChildDependencyMap.parentName;
					const parentFieldInfo = dependencyParentName && allFieldsMap.get(dependencyParentName);
					const dependencyParentFullPath = parentFieldInfo && parentFieldInfo.path;
					let parentValue = dependencyParentName && get(dependencyParentFullPath, form.content);
					parentValue = parentValue
						? parentValue
						: parentFieldInfo &&
						  (parentFieldInfo.default ? parentFieldInfo.default : parentFieldInfo.values[0]);
					const extendedFieldValues = extendedFieldValuesMap.has(field.name)
						? extendedFieldValuesMap.get(field.name)
						: [];
					const visible = allFieldsMap.get(field.name).visible;
					const FieldComponent = getFieldComponent(field.type);
					let normalizedProps = getFieldNormalizedProps(field, parentValue, extendedFieldValues);
					normalizedProps = dependencyParentFullPath
						? { dependencyParentFullPath, ...normalizedProps }
						: normalizedProps;
					const validators = getFieldValidators(field);
					const fieldName = get('name', field) && get('name', field).replace(/:/g, '_');
					const showLabelHelp = showHelp && field.help;

					const isFieldInDependencyMap =
						clickedField && currentDependencyFields.includes(field.name);

					// don't show animation if the field already visible
					const showAnimation =
						visible && isFieldInDependencyMap && !get(field.name, prevVisibilityMap);

					// show FadeIn if the field go from visible to invisible
					const showFadeIn =
						!visible && isFieldInDependencyMap && get(field.name, prevVisibilityMap);
					return (
						<FieldContainer
							key={field.name}
							showAnimation={showAnimation}
							visible={visible}
							showFadeIn={showFadeIn}>
							{visible && (
								<Fragment>
									<FieldItemContainer className='input-align-label'>
										<LabelContainer
											className={showLabelHelp ? 'label-container' : ''}
											onClick={() => this.onClick(field)}
											showHelpMsg={showLabelHelp}
											id={`field-label-tooltip-${fieldName}`}>
											<Highlight
												matchStyle={{ color: 'brown' }}
												search={searchText}
												className={`label-style ${field.name}`}
												id={showLabelHelp ? 'show-help-label' : ''}>
												{field.display}
											</Highlight>
										</LabelContainer>
										<Tooltip
											text={
												isFieldDescriptionInTooltipVisible
													? getTooltipContent(field, fieldName, path)
													: getOr('', 'display', field)
											}
											id='display-label-tooltip'
											target={`#field-label-tooltip-${fieldName}`}
										/>
									</FieldItemContainer>

									<FieldComponentContainer
										onClick={() => this.onClick(field)}
										onMouseDown={() => this.updateClickedField(field.name)}>
										<FieldComponent
											key={field.name}
											id={field.name}
											model={`dynamic.content.${path}.${field.name}`}
											path={`${path}.${field.name}`}
											validators={validators}
											display={display}
											className='center-align'
											{...normalizedProps}
										/>
									</FieldComponentContainer>
								</Fragment>
							)}
						</FieldContainer>
					);
				})}
			</div>
		);
	}
}

Subsection.propTypes = {
	display: PropTypes.string,
	name: PropTypes.string,
	model: PropTypes.string,
	path: PropTypes.string,
	searchText: PropTypes.string,
	showHelp: PropTypes.bool,
	isFieldDescriptionInTooltipVisible: PropTypes.bool,
	allFieldsMap: PropTypes.shape({ get: PropTypes.func }),
	extendedFieldValuesMap: PropTypes.shape({ has: PropTypes.func, get: PropTypes.func }),
	showIfDependancyMap: PropTypes.shape({ has: PropTypes.func, get: PropTypes.func }),
	form: PropTypes.shape({ content: PropTypes.shape({}) }),
	fields: PropTypes.instanceOf(Array),
	showHelpMessage: PropTypes.func
};

const mapStateToProps = (state) => ({
	form: state.dynamic,
	showIfParentsMap: state.wizard.showIfParentsMap,
	showIfDependancyMap: state.wizard.showIfDependancyMap,
	allFieldsMap: state.wizard.allFieldsMap,
	extendedFieldValuesMap: state.wizard.extendedFieldValuesMap,
	showHelp: state.wizard.showHelp,
	searchText: state.wizard.searchText,
	isFieldDescriptionInTooltipVisible: state.wizard.isFieldDescriptionInTooltipVisible
});

export default connect(mapStateToProps, {
	showHelpMessage: wizard.showHelpMessage
})(Subsection);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, actions } from 'react-redux-form';
import { ExpansionPanel, Button } from '@nokia-csf-uxr/csfWidgets';
import { connect } from 'react-redux';
import Subsection from 'components/wizard/Subsection';
import * as wizard from 'actions/wizard';
import 'components/wizard/subsectionStyle.css';
import {
	ExpansionPanelLabel,
	DescriptionLabel,
	DeleteSubSectionIcon
} from 'components/StyledComponents';
import { areAllFastPoolDisabled as areAllFastPoolDisabledRef } from 'selectors/ipmi';
import {
	ALLOCATIONS_MODEL,
	DISKS_MODEL,
	POOLS_MODEL,
	ZONE_POOL_MAP_MODEL
} from 'constants/ipmi-sub-section';
import { get } from 'lodash/fp';
import styled from 'styled-components';

const ExpandPanelContainer = styled.div`
	${({ isSubsectionInvalid }) => (isSubsectionInvalid ? 'border-right: 4px solid #d9070a' : '')};
	margin-bottom: 5px;
`;

const Panel = ({
	name,
	subSection,
	description,
	display,
	isExtendable,
	renderRemoveSubsectionButton,
	isOpen
}) => {
	let result;
	if (isOpen) {
		result = (
			<div>
				<ExpansionPanelLabel>{display}</ExpansionPanelLabel>
				<DescriptionLabel>{description}</DescriptionLabel>
				{isExtendable && renderRemoveSubsectionButton}
				<Subsection
					key={subSection.name}
					path={`${name}.${subSection.name}`}
					section={name}
					{...subSection}
				/>
			</div>
		);
	} else {
		result = (
			<div>
				<div>
					<ExpansionPanelLabel>{display}</ExpansionPanelLabel>
					<DescriptionLabel>{description}</DescriptionLabel>
					{isExtendable && renderRemoveSubsectionButton}
				</div>
			</div>
		);
	}
	return result;
};

class FormSection extends Component {
	UNSAFE_componentWillReceiveProps(nextProps) {
		const { areAllFastPoolDisabled } = this.props;
		// If user change the one of the enable_fast_pool in a hostgroup
		// of security type we need to:
		// 1. clear the zoneMap pools
		// 2. clear the pools
		if (
			!nextProps.areAllFastPoolDisabled &&
			nextProps.areAllFastPoolDisabled !== areAllFastPoolDisabled
		) {
			this.resetIpmiData();
		}
	}

	changeCollapseMode = (key) => () => {
		const { changeCollapseMap } = this.props;
		changeCollapseMap(key);
	};

	handleEnterKey = (e) => {
		const { addCollectionChip } = this.props;
		if (e.key === 'Enter' && e.target.nodeName.toLowerCase() !== 'textarea') {
			e.preventDefault();
			if (e.target.id.includes('collectionChipsInput')) {
				addCollectionChip(true, e.target.value);
			}
		}
	};

	resetIpmiData() {
		const { change } = this.props;
		change(ZONE_POOL_MAP_MODEL, {});
		change(`${POOLS_MODEL}.enabledPools`, false);
		change(`${POOLS_MODEL}.pools`, []);
		change(`${DISKS_MODEL}.disks`, []);
		change(ALLOCATIONS_MODEL, []);
	}

	renderRemoveSubsectionButton = (ShouldBeDeleted, display, deleteSubSection) => {
		return (
			<div>
				{(ShouldBeDeleted === true || ShouldBeDeleted === undefined) && (
					<DeleteSubSectionIcon>
						<Button
							id={`${display}-removeSubSection`}
							text=' '
							tooltip={{
								balloon: false,
								text: `Remove ${display}`,
								displayOnFocus: true
							}}
							icon='ic_delete'
							onClick={deleteSubSection}
						/>
					</DeleteSubSectionIcon>
				)}
			</div>
		);
	};

	render() {
		const {
			name,
			subSections,
			subsectionsMap,
			isExtendable,
			handleDeleteSubsectionClick,
			sectionDependentFields,
			deleteSubsection,
			collapseMap,
			dynamicForm
		} = this.props;
		return (
			<Form
				model={`dynamic.content.${name}`}
				className='wizard-form'
				onKeyDown={(e) => this.handleEnterKey(e)}>
				{subSections.map((subSection) => {
					const description = subSection.description ? subSection.description : '';
					const subectionForm = get([subSection.name, '$form'], dynamicForm);
					return (
						subectionForm &&
						subsectionsMap.get(subSection.name).visible &&
						(subSection.fields || (!isExtendable && subSection.default)) && (
							<ExpandPanelContainer
								key={subSection.name}
								isSubsectionInvalid={!subectionForm.valid}
								data-testid={`${subSection.name}-SUBSECTION-FORM`}>
								<ExpansionPanel
									id={subSection.name}
									key={subSection.name}
									height={-1}
									showExpansionGap={false}
									onExpand={this.changeCollapseMode(`${name}_${subSection.name}`)}
									onCollapse={this.changeCollapseMode(`${name}_${subSection.name}`)}>
									<Panel
										subSection={subSection}
										name={name}
										display={subSection.display}
										description={description}
										isExtendable={isExtendable}
										renderRemoveSubsectionButton={this.renderRemoveSubsectionButton(
											subSection.ShouldBeDeleted,
											subSection.display,
											() =>
												!sectionDependentFields
													? deleteSubsection(name, subSection.name)
													: handleDeleteSubsectionClick(name, subSection.name)
										)}
										isOpen={!collapseMap.get(`${name}_${subSection.name}`)}
									/>
								</ExpansionPanel>
							</ExpandPanelContainer>
						)
					);
				})}
			</Form>
		);
	}
}

Panel.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	display: PropTypes.string,
	isOpen: PropTypes.bool,
	subSection: PropTypes.shape({}),
	isExtendable: PropTypes.bool
};

FormSection.propTypes = {
	name: PropTypes.string,
	sectionDependentFields: PropTypes.string,
	subSections: PropTypes.instanceOf(Array),
	subsectionsMap: PropTypes.shape({ get: PropTypes.func }),
	collapseMap: PropTypes.shape({ get: PropTypes.func }),
	isExtendable: PropTypes.bool,
	areAllFastPoolDisabled: PropTypes.bool,
	handleDeleteSubsectionClick: PropTypes.func,
	deleteSubsection: PropTypes.func,
	addCollectionChip: PropTypes.func,
	changeCollapseMap: PropTypes.func,
	change: PropTypes.func,
	dynamicForm: PropTypes.shape({})
};

const mapStateToProps = (state, { name }) => ({
	collapseMap: state.wizard.collapseMap,
	subsectionsMap: state.wizard.subsectionsMap,
	areAllFastPoolDisabled: areAllFastPoolDisabledRef(state),
	collapseMapChanged: state.wizard.collapseMapChanged, // Added to check if collapsedMap has been changed by Search
	sectionDependentFields: state.wizard.sectionDependentFields,
	dynamicForm: get(['dynamicForm', 'content', name], state)
});

export default connect(mapStateToProps, {
	changeCollapseMap: wizard.changeCollapseMap,
	addCollectionChip: wizard.addCollectionChip,
	deleteSubsection: wizard.deleteSubsection,
	handleDeleteSubsectionClick: wizard.handleDeleteSubsectionClick,
	change: actions.change
})(FormSection);

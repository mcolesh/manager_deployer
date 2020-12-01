import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as wizardActions from 'actions/wizard';
import WizardStep from 'components/wizard/WizardStep';
import PropTypes from 'prop-types';

const Container = styled.div`
	${({ deployStatus }) =>
		deployStatus === 'pending' ? 'pointer-events: none' : 'pointer-events: initial'};
`;

const WizardSteps = ({ sections, setCurrentStep, deployStatus, handleAddNewSubSectionClicked }) => {
	const wizardStepClickHanlder = (display, name) => {
		setCurrentStep(display, name);
	};

	const changeTab = (e, section) => {
		if (e.type === 'keydown' && e.keyCode === 13) {
			setCurrentStep(section.display, section.name);
		}
	};

	const addNewSubSectionClicked = (sectionName, regexExpression) => {
		handleAddNewSubSectionClicked(sectionName, regexExpression);
	};

	return (
		<Container
			deployStatus={deployStatus}
			ref={(wizardSteps) => {
				window.wizardSteps = wizardSteps;
			}}>
			{sections.map((section, idx) => (
				<div key={section.name} tabIndex='0' onKeyDown={(event) => changeTab(event, section)}>
					<WizardStep
						key={section.name}
						id={`${section.name}-${idx}`}
						onClick={() => wizardStepClickHanlder(section.display, section.name)}
						isForm={!Boolean(section.type) || section.type === 'ipmi'}
						name={section.name}
						renderVerticalStep={idx !== sections.length - 1}
						isExtendable={section.isExtendable}
						limitMaxSubsections={section.limitMaxSubsections}
						existingDynamicSections={section.existingDynamicSections}
						addNewSubSectionClicked={() =>
							addNewSubSectionClicked(section.name, section.validation)
						}>
						{{ display: section.display, description: section.description }}
					</WizardStep>
				</div>
			))}
		</Container>
	);
};

WizardSteps.propTypes = {
	deployStatus: PropTypes.string,
	sections: PropTypes.instanceOf(Array),
	setCurrentStep: PropTypes.func,
	handleAddNewSubSectionClicked: PropTypes.func
};

const mapStateToProps = (state) => ({
	deployStatus: state.wizard.deployStatus
});

export default connect(mapStateToProps, {
	setCurrentStep: wizardActions.setCurrentWizardStep,
	handleAddNewSubSectionClicked: wizardActions.handleAddNewSubSectionClicked
})(WizardSteps);

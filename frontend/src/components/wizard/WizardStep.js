import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isFormInvalid } from 'selectors/wizard';
import { Tooltip, Button } from '@nokia-csf-uxr/csfWidgets';
import PropTypes from 'prop-types';

const StepperContainer = styled.div`
	display: flex;
	width: 100%;
	padding-bottom: 12px;
	padding-top: 12px;
	height: 100px;
	${({ isActive }) => (isActive ? 'background-color: #D7D7D7' : '')};
	${({ showErrorBorder }) => (showErrorBorder ? 'border-right: 4px solid #d9070a' : '')};
	align-items: center;
`;

const StepLabel = styled.div`
	cursor: pointer;
	flex-grow: 1;
	line-height: 36px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-bottom: 0;
	font-family: Nokia Pure Text Medium, Arial, sans-serif;
	font-size: 18px !important;
	${({ isActive }) => (isActive ? 'color: #124191 !important' : 'color: #000')};
`;

const TitleContainer = styled.div`
	width: 100%;
	padding-right: 10px;
	padding-left: 24px;
	cursor: pointer;
	${({ isDescriptionExist }) => (!isDescriptionExist ? 'display: flex; align-items: center;' : '')};
`;

const DescriptionLabel = styled.div`
	font-size: 16px;
	color: #000;
	margin-top: -8px;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`;

const AddExtendableSectionBtnContainer = styled.div`
	${({ existingDynamicSections }) => (existingDynamicSections ? 'pointer-events:none' : '')};
	position: relative;
	right: 10px;
`;

const WizardStep = ({
	name,
	onClick,
	children,
	activeStep,
	isForm,
	isFormValid,
	id,
	isExtendable,
	addNewSubSectionClicked,
	limitMaxSubsections,
	existingDynamicSections
}) => (
	<StepperContainer
		onClick={onClick}
		isActive={activeStep === children.display}
		showErrorBorder={!isFormValid && isForm}
		data-testid={`${name}-TAB-FORM`}>
		<TitleContainer isDescriptionExist={children.description}>
			<StepLabel
				id={id}
				className='step-label-container'
				isActive={activeStep === children.display}>
				{children.display}
			</StepLabel>
			<DescriptionLabel>{children.description}</DescriptionLabel>
		</TitleContainer>
		<Tooltip
			text={
				children.description
					? `${children.display} - ${children.description}`
					: `${children.display}`
			}
			id={`tooltip-${id}`}
			target={`#${id}`}
		/>
		{isExtendable && (
			<AddExtendableSectionBtnContainer
				existingDynamicSections={existingDynamicSections >= limitMaxSubsections}>
				<Button
					id={`${id}-addSubSection`}
					text=' '
					icon='ic_add'
					dataTest={`${name}-ADD-SUBSECTION`}
					onClick={addNewSubSectionClicked}
					tooltip={{
						balloon: false,
						text: `Add New ${name}`,
						displayOnFocus: true
					}}
				/>
			</AddExtendableSectionBtnContainer>
		)}
	</StepperContainer>
);

WizardStep.propTypes = {
	name: PropTypes.string,
	activeStep: PropTypes.string,
	id: PropTypes.string,
	limitMaxSubsections: PropTypes.string,
	isExtendable: PropTypes.bool,
	isFormValid: PropTypes.bool,
	isForm: PropTypes.bool,
	existingDynamicSections: PropTypes.number,
	children: PropTypes.shape({ display: PropTypes.string, description: PropTypes.string }),
	onClick: PropTypes.func,
	addNewSubSectionClicked: PropTypes.func
};

const mapStateToProps = (state, { name }) => ({
	isFormValid: !isFormInvalid(state, name),
	activeStep: state.wizard.currentStep
});

export default connect(mapStateToProps)(WizardStep);

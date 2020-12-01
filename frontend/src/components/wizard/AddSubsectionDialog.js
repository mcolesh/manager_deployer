import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	addNewSubSection as addNewSubSectionRef,
	hideAddSubsectionDialog as hideAddSubsectionDialogRef
} from 'actions/wizard';
import { Button, Dialog, TextInput } from '@nokia-csf-uxr/csfWidgets';
import styled from 'styled-components';
import { regexValidator } from 'utils/validators/regex';
import { SUBSECTION_NAME_REGEX_EXPRESSION } from 'constants/app-constants';
import { SUBSECTION_ALREADY_EXISTS } from 'constants/app-captions';
import { getFieldErrorMessages } from 'utils/wizard';
import { PropTypes } from 'prop-types';
import KeyboardAwareContainer from './KeyboardAwareContainer';

export const DialogContainer = styled.div``;

export const FieldContainer = styled.div`
	height: 35px;
`;

export const ButtonContainer = styled.div`
	position: absolute;
	margin-left: 382px;
	margin-top: 42px;
`;

const AddSubsectionDialog = ({
	sectionName,
	subsectionsMap,
	regexExpression,
	addNewSubSection,
	hideAddSubsectionDialog
}) => {
	const [subsectionName, setSubsectionName] = useState('');
	const [isNameValid, setIsNameValid] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const validateTextInput = (value) => {
		const errors = [];
		// validate that user input is valid according to the default regex expression pattern
		// (no '.' or non-ASCII chars are allowed)
		errors.push(
			regexValidator(
				{
					validation: SUBSECTION_NAME_REGEX_EXPRESSION
				},
				value
			)
		);
		// validate that user input is valid according to the custom regex expression (if provided)
		if (regexExpression) {
			errors.push(
				regexValidator(
					{
						validation: regexExpression
					},
					value
				)
			);
		}

		// validate that subsection with the same name not already exists
		const formatedValue = value.replace(/-/g, '_').replace(/ /g, '');
		errors.push(!subsectionsMap.has(formatedValue) ? false : SUBSECTION_ALREADY_EXISTS(value));

		const stringErrors = getFieldErrorMessages([...new Set(errors)]);
		setErrorMessage(stringErrors);
		setIsNameValid(stringErrors === '');
	};

	const onTextChange = ({ value }) => {
		setSubsectionName(value);
		validateTextInput(value);
	};

	const handleCreate = () => {
		addNewSubSection(sectionName, subsectionName);
		hideAddSubsectionDialog();
	};

	const clickOnCreateButton = () => {
		const documenta = document;
		const documentbyId = documenta.getElementById('new-subsection-create-button');
		documentbyId.click();
	};

	return (
		<DialogContainer>
			<Dialog
				title='Add Panel'
				theme='black'
				width={500}
				height={200}
				header
				close
				onClose={hideAddSubsectionDialog}
				scroll
				focusDialog={false}>
				<KeyboardAwareContainer onEnter={clickOnCreateButton}>
					<FieldContainer>
						<TextInput
							id='new-subsection-text-input'
							autoFocus
							onChange={onTextChange}
							text={subsectionName}
							label='Name'
							focus
							hasOutline={false}
							error={!isNameValid && subsectionName !== ''}
							errorMsg={errorMessage}
							dataTest='SUBSECTION-NAME-INPUT'
						/>
					</FieldContainer>
					<ButtonContainer>
						<Button
							id='new-subsection-create'
							text='CREATE'
							disabled={!isNameValid || subsectionName === ''}
							onClick={handleCreate}
							aria-label='text'
							dataTest='CREATE-SUBSECTION-CONFIRM'
						/>
					</ButtonContainer>
				</KeyboardAwareContainer>
			</Dialog>
		</DialogContainer>
	);
};

AddSubsectionDialog.propTypes = {
	sectionName: PropTypes.string,
	regexExpression: PropTypes.string,
	subsectionsMap: PropTypes.shape({ has: PropTypes.func }),
	addNewSubSection: PropTypes.func,
	hideAddSubsectionDialog: PropTypes.func
};

const mapStateToProps = (state) => ({
	subsectionsMap: state.wizard.subsectionsMap
});

export default connect(mapStateToProps, {
	addNewSubSection: addNewSubSectionRef,
	hideAddSubsectionDialog: hideAddSubsectionDialogRef
})(AddSubsectionDialog);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as wizardAction from 'actions/wizard';
import { AlertDialogWarning, AlertDialogError } from '@nokia-csf-uxr/csfWidgets';
import AddSubsectionDialog from 'components/wizard/AddSubsectionDialog';
import * as CONSTANTS from 'constants/app-constants';
import * as CAPTIONS from 'constants/app-captions';
import { isEmpty } from 'lodash/fp';
import JsonValidationWarning from './jsonValidationWarning';

const AlertDialog = ({
	caption,
	sectionDependentFields,
	errorMessage,
	addSubsectionRequestInfo,
	deleteSubsectionRequestInfo,
	deleteSubsection,
	hideDeleteSubsectionDialog,
	hideErrorDialog,
	hideFetchWizardWarningDialog,
	mapFormsFromFile
}) => {
	const onDeleteSubsectionDialogConfirm = () => {
		deleteSubsection(
			deleteSubsectionRequestInfo.sectionName,
			deleteSubsectionRequestInfo.subsectionName
		);
	};

	const closeDeleteSubsectionDialog = () => {
		hideDeleteSubsectionDialog();
	};

	const closeErrorDialog = () => {
		hideErrorDialog();
	};

	const closeWarningDialog = () => {
		hideFetchWizardWarningDialog();
	};

	const ignoreWarningDialog = () => {
		mapFormsFromFile(null, true, null);
	};

	switch (caption) {
		case CAPTIONS.IMPORT_ERROR_LABEL:
			return (
				<AlertDialogError
					title={CONSTANTS.ERROR}
					errorText={CAPTIONS.IMPORT_ERROR}
					detailsText={
						errorMessage === undefined && isEmpty(errorMessage)
							? null
							: CAPTIONS.IMPORT_ERROR_MSG(errorMessage)
					}
					onClose={closeErrorDialog}
					trapFocus
				/>
			);
		case CAPTIONS.DELETE_SUBSECTION_WARNING:
			return (
				<AlertDialogWarning
					title={CONSTANTS.WARNING}
					warningText1={CAPTIONS.DELETE_SUBSECTION_WARNING_MESSAGE(
						deleteSubsectionRequestInfo.sectionName,
						sectionDependentFields
					)}
					warningText2={CAPTIONS.DELETE_SUBSECTION_WARNING_MESSAGE_SECOND_TEXT}
					cancelButtonLabel={CONSTANTS.NO}
					buttonLabel={CONSTANTS.YES}
					onCancel={closeDeleteSubsectionDialog}
					onClose={onDeleteSubsectionDialogConfirm}
					focusDialog
				/>
			);
		case CAPTIONS.IMPORT_WARNING:
			return (
				<JsonValidationWarning
					closeWarningDialog={closeWarningDialog}
					ignoreWarningDialog={ignoreWarningDialog}
				/>
			);
		case CAPTIONS.ADD_SUBSECTION_DIALOG:
			return (
				<AddSubsectionDialog
					sectionName={addSubsectionRequestInfo.sectionName}
					regexExpression={addSubsectionRequestInfo.regexExpression}
				/>
			);
		default:
			return null;
	}
};

AlertDialog.propTypes = {
	caption: PropTypes.string,
	sectionDependentFields: PropTypes.string,
	errorMessage: PropTypes.string,
	addSubsectionRequestInfo: PropTypes.shape({
		regexExpression: PropTypes.string,
		sectionName: PropTypes.string
	}),
	deleteSubsectionRequestInfo: PropTypes.shape({
		sectionName: PropTypes.string,
		subsectionName: PropTypes.string
	}),
	deleteSubsection: PropTypes.func,
	hideDeleteSubsectionDialog: PropTypes.func,
	hideErrorDialog: PropTypes.func,
	hideFetchWizardWarningDialog: PropTypes.func,
	mapFormsFromFile: PropTypes.func
};
const mapStateToProps = (state) => ({
	sectionDependentFields: state.wizard.sectionDependentFields,
	errorMessage: state.wizard.errorMessage,
	addSubsectionRequestInfo: state.wizard.addSubsectionRequestInfo,
	deleteSubsectionRequestInfo: state.wizard.deleteSubsectionRequestInfo
});

export default connect(mapStateToProps, {
	deleteSubsection: wizardAction.deleteSubsection,
	hideDeleteSubsectionDialog: wizardAction.hideDeleteSubsectionDialog,
	hideErrorDialog: wizardAction.hideErrorDialog,
	hideFetchWizardWarningDialog: wizardAction.hideFetchWizardWarningDialog,
	mapFormsFromFile: wizardAction.mapFormsFromFile
})(AlertDialog);

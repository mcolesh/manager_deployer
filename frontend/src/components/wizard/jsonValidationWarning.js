import React from 'react';
import { useSelector } from 'react-redux';
import { AlertDialogWarning } from '@nokia-csf-uxr/csfWidgets';
import { OPEN_WIZARD_JSON_WARNING_MSG, NO, YES } from 'constants/app-captions';
import { WARNING } from 'constants/app-constants';
import PropTypes from 'prop-types';

const JsonValidationWarning = ({ closeWarningDialog, ignoreWarningDialog }) => {
	const jsonErrorWarningMessage = useSelector((state) => state.wizard.jsonErrorWarningMessage);

	return (
		<AlertDialogWarning
			title={WARNING}
			warningText1={OPEN_WIZARD_JSON_WARNING_MSG}
			detailsText={jsonErrorWarningMessage}
			cancelButtonLabel={NO}
			buttonLabel={YES}
			onCancel={closeWarningDialog}
			onClose={ignoreWarningDialog}
			focusDialog
		/>
	);
};

JsonValidationWarning.propTypes = {
	closeWarningDialog: PropTypes.func,
	ignoreWarningDialog: PropTypes.func
};

export default JsonValidationWarning;

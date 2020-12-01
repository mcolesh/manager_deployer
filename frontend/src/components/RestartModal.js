import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { AlertDialogConfirm, AlertDialogWarning } from '@nokia-csf-uxr/csfWidgets';
import * as CAPTIONS from 'constants/app-captions';
import { SERVER_STATUS } from 'constants/app-constants';

const RestartModal = (props) => {
	const [serverStatusChangedToShuttingDown, setServerStatusChangedToShuttingDown] = useState(false);
	const { messageStatus, messageContent, runningProcesses } = props;

	useEffect(() => {
		if (messageStatus === SERVER_STATUS.SHUTTING_DOWN) {
			setServerStatusChangedToShuttingDown(true);
		}
	}, [messageStatus]);

	const restartServerServices = () => {
		// reseting CBIS-Manager services (docker-compose down/up -d so it remove and create new all dockers
		props.restartServerServices();
		props.closeRestartServertDialog();
	};

	return (
		<div>
			{messageStatus === SERVER_STATUS.SHUTTING_DOWN ||
			serverStatusChangedToShuttingDown === true ? (
				<AlertDialogWarning
					id='restartServerAlertDialog'
					title={CAPTIONS.RESTART_SERVER_TITLE}
					buttonLabel={CAPTIONS.OK}
					warningText1={messageContent}
					onClose={() => props.logout()}
				/>
			) : (
				<AlertDialogConfirm
					id='restartServicesConfirmDialog'
					title={CAPTIONS.RESTART_SERVER_SERVICES_TITLE}
					confirmationButtonLabel={CAPTIONS.PROCEED}
					confirmationText1={
						runningProcesses.length !== 0
							? `The Following Processes [${runningProcesses}] are running on the server.\n${CAPTIONS.RESTART_CONFIRMATION_MSG}\n`
							: CAPTIONS.NO_PROCCESSES_MESSAGE
					}
					onClose={() => props.closeRestartServertDialog()}
					onConfirm={() => restartServerServices()}
				/>
			)}
		</div>
	);
};

RestartModal.propTypes = {
	runningProcesses: PropTypes.arrayOf(PropTypes.string),
	messageStatus: PropTypes.string,
	messageContent: PropTypes.string,
	closeRestartServertDialog: PropTypes.func,
	restartServerServices: PropTypes.func,
	logout: PropTypes.func
};

export default RestartModal;

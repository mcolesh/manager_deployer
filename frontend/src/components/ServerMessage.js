import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import useInterval from 'hooks/useInterval';
import { connect } from 'react-redux';
import {
	closeRestartServertDialog as closeRestartServertDialogRef,
	restartServerServices as restartServerServicesRef,
	openRestartServerDialog as openRestartServerDialogRef
} from 'actions/wizard';
import { fetchServerMessage } from 'actions/serverMessage';
import { logout as logoutRef } from 'actions/auth';
import { push as pushRef } from 'connected-react-router';
import RestartModal from 'components/RestartModal';
import { Snackbar } from '@nokia-csf-uxr/csfWidgets';
import notification from 'antd/es/notification';
import 'antd/lib/notification/style/css';
import { SERVER_NOTIFICATION, RESTART_SERVER_ALERT_MSG } from 'constants/app-captions';
import {
	FETCH_SERVER_STATUS_INTERVAL,
	SERVER_STATUS,
	RESTART_SERVER_MSG_DURATION
} from 'constants/app-constants';

export const ServerMessage = (props) => {
	const [serverStatusInterval, setServerStatusInterval] = useState(FETCH_SERVER_STATUS_INTERVAL);
	const {
		messageStatus,
		messageContent,
		runningProcesses,
		showRestartModal,
		areServerServicesRestarting,
		openRestartServerDialog,
		closeRestartServertDialog,
		restartServerServices,
		push,
		logout
	} = props;

	useEffect(() => {
		return () => {
			notification.destroy();
			setServerStatusInterval(null);
		};
	}, []);

	useInterval(() => {
		props.fetchServerMessage();
	}, serverStatusInterval);

	useEffect(() => {
		switch (messageStatus) {
			case SERVER_STATUS.RUNNING:
				notification.destroy();
				break;
			case SERVER_STATUS.REQUIRES_MANAGER_RESTART:
				if (messageContent && messageContent.length > 0) {
					notification.open({
						key: SERVER_NOTIFICATION,
						message: 'Server Message',
						description: messageContent,
						placement: 'bottomRight',
						bottom: 50,
						duration: 0
					});
				}
				break;
			case SERVER_STATUS.SHUTTING_DOWN:
				notification.destroy();
				setServerStatusInterval(null);
				openRestartServerDialog();
				break;
			default:
				break;
		}
	}, [messageStatus, messageContent, areServerServicesRestarting]);

	return (
		<div>
			{showRestartModal && (
				<RestartModal
					runningProcesses={runningProcesses}
					messageStatus={messageStatus}
					messageContent={messageContent}
					closeRestartServertDialog={closeRestartServertDialog}
					restartServerServices={restartServerServices}
					push={push}
					logout={logout}
				/>
			)}
			{areServerServicesRestarting && (
				<Snackbar
					id='restart-server-snackbar'
					dataList={[
						{
							message: RESTART_SERVER_ALERT_MSG,
							duration: RESTART_SERVER_MSG_DURATION
						}
					]}
				/>
			)}
		</div>
	);
};

ServerMessage.propTypes = {
	runningProcesses: PropTypes.arrayOf(PropTypes.string),
	messageStatus: PropTypes.string,
	messageContent: PropTypes.string,
	closeRestartServertDialog: PropTypes.func,
	restartServerServices: PropTypes.func,
	logout: PropTypes.func,
	push: PropTypes.func,
	showRestartModal: PropTypes.bool,
	areServerServicesRestarting: PropTypes.bool,
	openRestartServerDialog: PropTypes.func,
	fetchServerMessage: PropTypes.func
};

const mapStateToProps = (state) => ({
	messageStatus: state.serverMessage.messageStatus,
	messageContent: state.serverMessage.messageContent,
	runningProcesses: state.wizard.runningProcesses,
	areServerServicesRestarting: state.wizard.areServerServicesRestarting,
	showRestartModal: state.wizard.showRestartModal
});

export default connect(mapStateToProps, {
	fetchServerMessage,
	openRestartServerDialog: openRestartServerDialogRef,
	closeRestartServertDialog: closeRestartServertDialogRef,
	restartServerServices: restartServerServicesRef,
	push: pushRef,
	logout: logoutRef
})(ServerMessage);

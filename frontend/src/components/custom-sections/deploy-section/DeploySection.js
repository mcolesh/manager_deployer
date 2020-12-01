import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	AlertDialogError,
	AlertDialogConfirm,
	AppToolbar,
	Dialog
} from '@nokia-csf-uxr/csfWidgets';
import { push as pushAction } from 'connected-react-router';
import { getOr } from 'lodash/fp';
import Message from 'components/wizard/forms/Message';
import DeployDataView from 'components/custom-sections/deploy-section/DeployDataView';
import {
	isWizardValid as isWizardValidSelector,
	areAllFilesFinishUpload as areAllFilesFinishUploadSelector,
	wizardToDeploy as wizardToDeploySelector
} from 'selectors/wizard';
import {
	deploy as deployAction,
	hideDeploymentErrorDialog as hideDeploymentErrorDialogAction,
	showDeployJson as showDeployJsonAction,
	isWizardActive as isWizardActiveAction
} from 'actions/wizard';
import { onSuccessfullyDeployed as onSuccessfullyDeployedAction } from 'actions/pages';
import Loader from 'components/Loader';
import { LoaderContainer } from 'components/StyledComponents';
import * as CONSTANTS from 'constants/app-constants';
import * as CAPTIONS from 'constants/app-captions';
import styled from 'styled-components';
import 'components/DashboardStyles.css';
import PropTypes from 'prop-types';
import { isServerRebooting as isServerRebootingRef } from 'selectors/serverMessage';

const DeployButtonContainer = styled.div`
	position: absolute;
	bottom: 15px;
	right: 43px;
	z-index: 10;
`;

const DeployAppToolbarContainer = styled.div`
	position: fixed;
	bottom: 0px;
	width: 100%;
`;

class DeploySection extends Component {
	constructor(props) {
		super(props);
		this.state = { deployButtonClicked: false, requestInterval: NaN };
	}

	componentDidMount() {
		const { isWizardActive, wizardName } = this.props;
		if (wizardName) {
			this.setState({
				requestInterval: setInterval(
					() => isWizardActive(wizardName),
					CONSTANTS.FETCH_ISACTIVE_INTERVAL
				)
			});
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { requestInterval } = this.state;
		const { wizardName, onSuccessfullyDeployed, push, isServerRebooting } = this.props;
		if (nextProps.deployStatus === CONSTANTS.SUCCESS) {
			onSuccessfullyDeployed(wizardName);
			push('/dashboard');
		}

		if (!isServerRebooting && nextProps.isServerRebooting) {
			clearInterval(requestInterval);
		}
	}

	componentWillUnmount() {
		const { requestInterval } = this.state;
		clearInterval(requestInterval);
	}

	closeErrorDialog = () => {
		const { hideDeploymentErrorDialog } = this.props;
		hideDeploymentErrorDialog();
	};

	onDeploy = () => {
		this.setState({ deployButtonClicked: true });
	};

	onDeployConfirmed = () => {
		const { deployURL, wizardToDeploy, deploy } = this.props;
		let wizardToDeployStr = '';
		this.setState({ deployButtonClicked: false });
		try {
			wizardToDeployStr = JSON.stringify(wizardToDeploy);
		} catch (err) {
			console.error(
				`%c Error while trying to stringify the JSON before deploy `,
				'background: #222; color: #FF0000'
			);
		}
		deploy(deployURL, wizardToDeployStr);
	};

	onClose = () => {
		this.setState({ deployButtonClicked: false });
	};

	closeDeployDialog = () => {
		const { showDeployJson } = this.props;
		showDeployJson(false);
	};

	render() {
		const {
			deployStatus,
			isActive,
			areAllFilesFinishUpload,
			deployWarningMessage,
			isWizardValid,
			showDeploymentErrorDialog,
			errorMessage,
			showDeploymentJson,
			startDeploymentConfirmationMessage,
			deployButtonDisabled,
			showWarningExpectedValue
		} = this.props;
		const { deployButtonClicked } = this.state;

		const confirmationTextArr = startDeploymentConfirmationMessage.split('?');
		let confirmationText1 = getOr('', '0', confirmationTextArr);
		if (confirmationTextArr.length > 1) {
			confirmationText1 += '?';
		}

		let confirmationText2 = '';

		if (confirmationTextArr.length > 1 && confirmationTextArr[1] !== '') {
			confirmationTextArr.shift();
			confirmationText2 = confirmationTextArr.join();
		}

		return (
			<div>
				{deployStatus === CONSTANTS.PENDING ? (
					<LoaderContainer>
						<Loader wholePage size='xxlarge' />
					</LoaderContainer>
				) : null}

				{showWarningExpectedValue === isActive && areAllFilesFinishUpload && (
					<div className='deploy-alert-span'>
						<Message id='deploy-warning-msg' data={deployWarningMessage} severity='warning' />
					</div>
				)}

				{isWizardValid && !areAllFilesFinishUpload && (
					<div className='deploy-alert-span'>
						<Message
							id='deploy-warning-msg-2'
							data={CAPTIONS.FILES_STILL_UPLOADING}
							severity='warning'
						/>
					</div>
				)}

				<DeployAppToolbarContainer>
					{/* TODO: CSF to add option to remove margins */}
					<AppToolbar id='deployToolbar' />
					<DeployButtonContainer>
						<Button
							text={CAPTIONS.DEPLOY}
							onClick={this.onDeploy}
							isCallToAction
							disabled={
								deployButtonDisabled === true ||
								deployStatus === CONSTANTS.PENDING ||
								!isWizardValid ||
								!areAllFilesFinishUpload
							}
							tooltip={{
								text: CAPTIONS.DEPLOY_TOOLTIP,
								balloon: true
							}}
							dataTest='DEPLOY'
						/>
					</DeployButtonContainer>
				</DeployAppToolbarContainer>

				{showDeploymentErrorDialog && (
					<AlertDialogError
						title={CONSTANTS.ERROR}
						errorText={errorMessage}
						onClose={this.closeErrorDialog}
						trapFocus
					/>
				)}
				{deployButtonClicked && (
					<AlertDialogConfirm
						title={CONSTANTS.CONFIRMATION_DIALOG_HEADER}
						confirmationText1={confirmationText1}
						confirmationText2={confirmationText2}
						buttonLabel={CONSTANTS.NO}
						confirmationButtonLabel={CONSTANTS.YES}
						onClose={this.onClose}
						onConfirm={this.onDeployConfirmed}
						trapFocus
					/>
				)}

				{showDeploymentJson && (
					<Dialog
						id='deploy-dialog'
						title={CAPTIONS.DEPLOY_DIALOG_TITLE}
						height={600}
						width={1200}
						theme='black'
						header
						scroll
						trapFocus={false}
						close
						onClose={this.closeDeployDialog}>
						<DeployDataView />
					</Dialog>
				)}
			</div>
		);
	}
}

DeploySection.propTypes = {
	deployStatus: PropTypes.string,
	isActive: PropTypes.bool,
	areAllFilesFinishUpload: PropTypes.bool,
	deployWarningMessage: PropTypes.string,
	isWizardValid: PropTypes.bool,
	showDeploymentErrorDialog: PropTypes.bool,
	errorMessage: PropTypes.string,
	showDeploymentJson: PropTypes.bool,
	isServerRebooting: PropTypes.bool,
	hideDeploymentErrorDialog: PropTypes.func,
	showDeployJson: PropTypes.func,
	deploy: PropTypes.func,
	onSuccessfullyDeployed: PropTypes.func,
	startDeploymentConfirmationMessage: PropTypes.string,
	isActiveWizardURL: PropTypes.string,
	isWizardActive: PropTypes.func,
	wizardName: PropTypes.string,
	wizardToDeploy: PropTypes.shape({}).isRequired,
	deployURL: PropTypes.string,
	push: PropTypes.func,
	deployButtonDisabled: PropTypes.bool,
	showWarningExpectedValue: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isWizardValid: isWizardValidSelector(state),
	wizardName: state.wizard.name,
	wizardContent: state.dynamicForm.dynamic,
	deployStatus: state.wizard.deployStatus,
	wizardToDeploy: wizardToDeploySelector(state, false),
	showDeploymentErrorDialog: state.wizard.showDeploymentErrorDialog,
	errorMessage: state.wizard.errorMessage,
	debug: state.pagesData.debug,
	isActive: state.wizard.isActive,
	deployWarningMessage: state.wizard.deployWarningMessage,
	startDeploymentConfirmationMessage: state.wizard.startDeploymentConfirmationMessage,
	isActiveWizardURL: state.wizard.isActiveWizardURL,
	deployURL: state.wizard.deployURL,
	areAllFilesFinishUpload: areAllFilesFinishUploadSelector(state),
	showDeploymentJson: state.wizard.showDeploymentJson,
	showWarningExpectedValue: state.wizard.showWarningExpectedValue,
	messageStatus: state.serverMessage.messageStatus,
	extractedValue: state.wizard.extractedValue,
	isServerRebooting: isServerRebootingRef(state),
	deployButtonDisabled: state.wizard.deployButtonDisabled
});

export default connect(mapStateToProps, {
	deploy: deployAction,
	hideDeploymentErrorDialog: hideDeploymentErrorDialogAction,
	onSuccessfullyDeployed: onSuccessfullyDeployedAction,
	isWizardActive: isWizardActiveAction,
	showDeployJson: showDeployJsonAction,
	push: pushAction
})(DeploySection);

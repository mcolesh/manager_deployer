import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, ToggleSwitch, AlertDialogError } from '@nokia-csf-uxr/csfWidgets';
import { getOr, isEmpty } from 'lodash/fp';
import * as logActions from 'actions/log';
import styled from 'styled-components';
import 'components/DashboardStyles.css';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import { ERROR } from 'constants/app-constants';
import Log from './Log';
import ProgressSteps from './ProgressSteps';

const FileSaver = require('file-saver');

const DialogContainer = styled.div``;

const ButtonContainer = styled.div`
	float: right;
`;

const ToggleContainer = styled.div`
	float: left;
`;

const LogProgressStepsContainer = styled.div`
	display: flex;
	height: 100%;
`;

class LogModal extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { modalIsReady: false };
	}

	componentDidMount() {
		const { isPageActive, pageName } = this.props;
		isPageActive(`api/${pageName}/isActive`, true);
		window.addEventListener('popstate', () => this.onClose(), { once: true });
	}

	componentDidUpdate(prevProps) {
		const {
			downloadLogText,
			pageName,
			clearDownloadLogText,
			isFirstPageActiveStatusReceived,
			isLastLogReceived,
			changeScrollValue,
			isActive,
			fetchProgressStepsFinished,
			fetchLogFinished
		} = this.props;
		if (downloadLogText !== '') {
			const blob = new Blob([downloadLogText], {
				type: 'octet/stream'
			});
			FileSaver.saveAs(blob, `${pageName}Log.txt`);
			clearDownloadLogText();
		}
		if (
			(!prevProps.isFirstPageActiveStatusReceived && isFirstPageActiveStatusReceived) ||
			(!prevProps.isLastLogReceived && isLastLogReceived)
		) {
			changeScrollValue(isActive);
		}
		if (isFirstPageActiveStatusReceived && fetchProgressStepsFinished && fetchLogFinished) {
			this.setState({ modalIsReady: true });
		}
	}

	handleToggleChange = () => {
		const { enableScrollDown, changeScrollValue } = this.props;
		enableScrollDown ? changeScrollValue(false) : changeScrollValue(true);
	};

	onClose = () => {
		const { hideLog } = this.props;
		hideLog();
	};

	renderFooter = () => {
		const { getLogText, enableScrollDown, isActive } = this.props;
		const { modalIsReady } = this.state;
		return (
			<div>
				{modalIsReady && (
					<div>
						<ButtonContainer>
							<Button
								data-testid='DOWNLOAD_LOG'
								text='DOWNLOAD LOG'
								isCallToAction
								onClick={getLogText}
							/>
						</ButtonContainer>
						<ToggleContainer>
							<ToggleSwitch
								id='autoscroll'
								label='Auto scroll'
								checked={enableScrollDown}
								disabled={isActive === false}
								onChange={this.handleToggleChange}
							/>
						</ToggleContainer>
					</div>
				)}
			</div>
		);
	};

	closeErrorDialog = () => {
		const { hideErrorDialog } = this.props;
		hideErrorDialog();
	};

	render() {
		const { showLogErrorDialog, displayPageName, errorMessage, progressSteps } = this.props;
		const { modalIsReady } = this.state;
		return (
			<DialogContainer>
				{showLogErrorDialog && (
					<AlertDialogError
						title={ERROR}
						errorText={getOr('', 'message', errorMessage)}
						onClose={this.closeErrorDialog}
						trapFocus
					/>
				)}
				<Dialog
					id='logDialog'
					key='dialog_log'
					title={`${displayPageName} Log`}
					height={700}
					width={1500}
					header
					trapFocus={false}
					renderFooter={this.renderFooter}
					scroll={false}
					close
					onClose={this.onClose}>
					{modalIsReady ? (
						<LogProgressStepsContainer>
							{progressSteps && progressSteps !== undefined && !isEmpty(progressSteps) && (
								<ProgressSteps />
							)}
							<Log />
						</LogProgressStepsContainer>
					) : (
						<Loader wholePage size='xxlarge' />
					)}
				</Dialog>
			</DialogContainer>
		);
	}
}

LogModal.propTypes = {
	pageName: PropTypes.string,
	displayPageName: PropTypes.string,
	downloadLogText: PropTypes.string,
	isActive: PropTypes.bool,
	enableScrollDown: PropTypes.bool,
	fetchProgressStepsFinished: PropTypes.bool,
	fetchLogFinished: PropTypes.bool,
	showLogErrorDialog: PropTypes.bool,
	isFirstPageActiveStatusReceived: PropTypes.bool,
	isLastLogReceived: PropTypes.bool,
	errorMessage: PropTypes.shape({}),
	progressSteps: PropTypes.instanceOf(Array),
	isPageActive: PropTypes.func,
	clearDownloadLogText: PropTypes.func,
	changeScrollValue: PropTypes.func,
	hideLog: PropTypes.func,
	getLogText: PropTypes.func,
	hideErrorDialog: PropTypes.func
};

const mapStateToProps = (state) => ({
	pageName: state.log.pageName,
	displayPageName: state.log.displayPageName,
	pageLogUrl: state.log.pageLogUrl,
	isActive: state.log.isActive,
	isFirstPageActiveStatusReceived: state.log.isFirstPageActiveStatusReceived,
	enableScrollDown: state.log.enableScrollDown,
	progressSteps: state.log.progressSteps,
	downloadLogText: state.log.downloadLogText,
	fetchProgressStepsFinished: state.log.fetchProgressStepsFinished,
	fetchLogFinished: state.log.fetchLogFinished,
	isLastLogReceived: state.log.isLastLogReceived,
	showLogErrorDialog: state.log.showLogErrorDialog,
	errorMessage: state.log.errorMessage
});

export default connect(mapStateToProps, {
	isPageActive: logActions.isPageActive,
	hideLog: logActions.hideLog,
	changeScrollValue: logActions.changeScrollValue,
	getLogText: logActions.getLogText,
	clearDownloadLogText: logActions.clearDownloadLogText,
	hideErrorDialog: logActions.hideErrorDialog
})(LogModal);

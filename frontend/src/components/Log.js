import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as logActions from 'actions/log';
import 'components/DashboardStyles.css';
import { DEFAULT_LOG_DATA_TEXT } from 'constants/app-captions';
import Loader from 'components/Loader';
import * as CONSTANTS from 'constants/app-constants';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import { isEmpty } from 'lodash/fp';
import { isServerRebooting as isServerRebootingRef } from 'selectors/serverMessage';
import CustomTextMode from './CustomTextMode';

const AceEditorContainer = styled.div`
	${({ progressStepsExist }) => (progressStepsExist ? 'width: 70%' : 'width: 100%')};
	min-height: 100%;
`;

const LoaderContainer = styled.div`
	${({ progressStepsExist }) => (progressStepsExist ? 'left: 60%' : 'left: 40%')};
	position: fixed;
	top: 50%;
	z-index: 1;
`;

class Log extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { isPageActiveInterval: NaN, logInterval: NaN, scrollBottomValue: 0 };
	}

	componentDidMount() {
		const {
			isActive,
			logText,
			isPageActive,
			pageName,
			requestInAir,
			fetchLog,
			pageLogUrl
		} = this.props;
		if (isActive && logText !== DEFAULT_LOG_DATA_TEXT) {
			this.setState({
				isPageActiveInterval: setInterval(
					() => isPageActive(`api/${pageName}/isActive`),
					CONSTANTS.FETCH_ISACTIVE_INTERVAL
				),
				logInterval: setInterval(() => {
					return !requestInAir && fetchLog(`/${pageLogUrl}`);
				}, CONSTANTS.LOG_FETCH_INTERVAL)
			});
		}

		if (logText !== DEFAULT_LOG_DATA_TEXT) {
			const customMode = new CustomTextMode();
			this.aceEditor.editor.getSession().setMode(customMode);
			setTimeout(() => {
				// in case that user exits logModal before function execution
				// this.aceEditur value === null
				if (this.aceEditor) {
					this.scrollToBottom();
					this.setState({
						scrollValue: this.aceEditor.editor.session.$scrollTop
					});
				}
			}, 0);
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// isActive === false means that deployment operation is done.
		// at this point log file is final, hence, fetching it now will
		// result in changing logText to page's full log (untill the very last line).
		const { logInterval, isPageActiveInterval } = this.state;
		const { isActive, fetchLog, pageLogUrl, clickedStepValue } = this.props;
		if (!nextProps.isActive && isActive) {
			clearInterval(logInterval);
			clearInterval(isPageActiveInterval);
			fetchLog(`/${pageLogUrl}`, true);
		}

		if (nextProps.clickedStepValue !== clickedStepValue) {
			this.aceEditor.editor.find(nextProps.clickedStepValue);
		}
	}

	componentDidUpdate(prevProps) {
		const { isPageActiveInterval, logInterval } = this.state;
		const { enableScrollDown, fetchLogSize, logText, pageLogUrl, isServerRebooting } = this.props;

		if (!prevProps.enableScrollDown && enableScrollDown) {
			this.scrollToBottom();
		}
		if (prevProps.logText.length !== logText.length) {
			enableScrollDown && this.scrollToBottom();
			fetchLogSize(pageLogUrl);
		}

		if (!prevProps.isServerRebooting && isServerRebooting) {
			clearInterval(isPageActiveInterval);
			clearInterval(logInterval);
		}
	}

	componentWillUnmount() {
		const { logInterval, isPageActiveInterval } = this.state;
		clearInterval(logInterval);
		clearInterval(isPageActiveInterval);
	}

	scrollToBottom() {
		this.aceEditor.editor.focus(); // To focus the ace editor
		const n = this.aceEditor.editor.getSession().getValue().split('\n').length - 2;
		this.aceEditor.editor.gotoLine(n);
		this.aceEditor.editor.navigateLineEnd();
	}

	render() {
		const { logText, progressSteps } = this.props;
		return (
			<AceEditorContainer
				key='ace-editor-div'
				progressStepsExist={isEmpty(progressSteps) || progressSteps === undefined ? false : true}>
				{logText === DEFAULT_LOG_DATA_TEXT && (
					<LoaderContainer
						progressStepsExist={
							isEmpty(progressSteps) || progressSteps === undefined ? false : true
						}>
						<Loader wholePage size='xlarge' />
					</LoaderContainer>
				)}
				<AceEditor
					id='ace-editor-log'
					key='ace-editor-log'
					mode='text'
					theme='monokai'
					name='logger'
					width='100%'
					height='100%'
					showPrintMargin={false}
					readOnly
					editorProps={{ $blockScrolling: Infinity }}
					value={logText}
					ref={(editor) => {
						this.aceEditor = editor;
					}}
				/>
			</AceEditorContainer>
		);
	}
}

Log.propTypes = {
	logText: PropTypes.string,
	pageLogUrl: PropTypes.string,
	pageName: PropTypes.string,
	clickedStepValue: PropTypes.string,
	isActive: PropTypes.bool,
	enableScrollDown: PropTypes.bool,
	isServerRebooting: PropTypes.bool,
	requestInAir: PropTypes.bool,
	progressSteps: PropTypes.instanceOf(Array),
	isPageActive: PropTypes.func,
	fetchLogSize: PropTypes.func,
	fetchLog: PropTypes.func
};

const mapStateToProps = (state) => ({
	logText: state.log.logText,
	pageLogUrl: state.log.pageLogUrl,
	enableScrollDown: state.log.enableScrollDown,
	isActive: state.log.isActive,
	pageName: state.log.pageName,
	progressSteps: state.log.progressSteps,
	clickedStepValue: state.log.clickedStepValue,
	requestInAir: state.log.requestInAir,
	isServerRebooting: isServerRebootingRef(state)
});

export default connect(mapStateToProps, {
	fetchLog: logActions.fetchLog,
	isPageActive: logActions.isPageActive,
	fetchLogSize: logActions.fetchLogSize
})(Log);

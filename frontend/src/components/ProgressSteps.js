import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { HeaderLabel } from 'components/StyledComponents';
import * as CONSTANTS from 'constants/app-constants';
import * as logActions from 'actions/log';
import Loader from 'components/Loader';
import { cloneDeep, filter, get } from 'lodash/fp';
import PropTypes from 'prop-types';

const successIcon = require('../assets/images/check-circle.svg');
const failureIcon = require('../assets/images/alert-circle.svg');

const StepContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	padding: 8px 12px 8px 24px;
	${({ isClickable }) => (isClickable ? 'cursor: pointer' : 'cursor: not-allowed')};
	${({ clicked }) => (clicked ? 'background-color: #DCDCDC' : 'background-color: #FFFFFF')};
	&:hover {
		${({ isClickable }) => isClickable && 'background-color: #F0F0F0'};
	}
`;

const TextLineContainer = styled.div`
	width: 305px;
	color: black;
`;

const TextLineTitle = styled.div`
	font-weight: bold;
`;

const FirstTextLine = styled.div`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.54);
`;

const StatusContainer = styled.div`
	position: absolute;
	right: 24px;
`;

const TitleContainer = styled.div`
	padding: 16px 0 0 24px;
`;

const ProgressStepsContainer = styled.div`
	width: 35%;
	overflow: scroll;
	height: 100%;
	border: 1px solid #cfcfcf;
	min-width: 380px;
`;

const ProgressStepsLoaderContainer = styled.div`
	width: 35%;
	height: 34.4em;
	border: 1px solid #cfcfcf;
	padding-top: 15em;
`;

class ProgressSteps extends PureComponent {
	state = {
		progressStepsMap: [],
		currentStep: undefined,
		lastClickedStep: undefined
	};

	UNSAFE_componentWillMount() {
		this.storeProgressSteps();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (
			(nextProps.logText.length !== this.props.logText.length ||
				nextProps.isLastLogReceived !== this.props.isLastLogReceived) &&
			this.state.progressStepsMap.length !== 0
		) {
			const isLastCheck = nextProps.isLastLogReceived && !this.props.isLastLogReceived;
			this.checkStepsStatus(nextProps.logText, isLastCheck);
		}
	}

	checkStepsStatus(logText, isLastCheck = false) {
		const { progressStepsMap, currentStep } = this.state;
		const newProgressStepsMap = cloneDeep(progressStepsMap);
		let status,
			newStep = currentStep,
			newUpdate = false;

		for (let [index, progressStep] of newProgressStepsMap.entries()) {
			if (index >= currentStep) {
				status = logText.includes(get('logRef', progressStep));
				if (index === currentStep && !status) {
					if (isLastCheck) {
						progressStep.status = status;
						newUpdate = true;
					}
					break;
				} else if (index !== currentStep && !status) {
					progressStep.status = 'IN_PROGRESS';
					newStep = index;
					newUpdate = true;
					break;
				} else {
					progressStep.status = status;
					newStep = index;
					newUpdate = true;
				}
			}
		}
		if (newUpdate) {
			this.setState({
				progressStepsMap: newProgressStepsMap,
				currentStep: newStep
			});
		}
	}

	storeProgressSteps() {
		const progressStepsMap = [];
		let obj = {},
			status,
			currentStep = undefined,
			failureStepExists = false;
		const { isActive, progressSteps, logText } = this.props;
		if (!isActive) {
			progressSteps.forEach((progressStep) => {
				if (!failureStepExists) {
					status = logText.includes(get('logRef', progressStep));
					if (status === false) {
						failureStepExists = true;
					}
				} else {
					status = undefined;
				}
				obj = {
					description: progressStep.description,
					title: progressStep.display,
					logRef: progressStep.logRef,
					status: status
				};
				progressStepsMap.push(obj);
			});
		} else {
			progressSteps.forEach((progressStep, index) => {
				if (currentStep === undefined) {
					status = logText.includes(get('logRef', progressStep));
					if (status === false) {
						status = 'IN_PROGRESS';
						currentStep = index;
					}
				}
				obj = {
					description: progressStep.description,
					title: progressStep.display,
					logRef: progressStep.logRef,
					status: status
				};
				progressStepsMap.push(obj);
				status = undefined;
			});
		}
		this.setState({
			progressStepsMap: progressStepsMap,
			currentStep: currentStep
		});
		this.props.progressStepsMapReady();
	}

	onStepClick = (step) => {
		const { progressStepsMap, lastClickedStep } = this.state;
		const updatedProgressStepsMap = cloneDeep(progressStepsMap);
		if (lastClickedStep !== undefined) {
			filter({ logRef: lastClickedStep }, updatedProgressStepsMap)[0].clicked = false;
		}
		filter({ logRef: step }, updatedProgressStepsMap)[0].clicked = true;
		this.setState({
			progressStepsMap: updatedProgressStepsMap,
			lastClickedStep: step
		});
		this.props.stepClicked(step);
	};

	render() {
		if (this.state.progressStepsMap.length === 0) {
			return (
				<ProgressStepsLoaderContainer>
					<Loader size='large' />
				</ProgressStepsLoaderContainer>
			);
		}

		const { displayPageName } = this.props;
		const { progressStepsMap } = this.state;

		return (
			<ProgressStepsContainer>
				<TitleContainer>
					<HeaderLabel>{`${displayPageName} Progress`}</HeaderLabel>
				</TitleContainer>

				{progressStepsMap.map((step, index) => {
					const { description, title, status } = step;
					return (
						<StepContainer
							key={index}
							id={title}
							isClickable={status === true}
							clicked={step.clicked}
							onClick={() => status === true && this.onStepClick(step.logRef)}>
							<TextLineContainer>
								<TextLineTitle>{title}</TextLineTitle>
								<FirstTextLine>{description}</FirstTextLine>
							</TextLineContainer>
							<StatusContainer>
								{status === CONSTANTS.IN_PROGRESS ? (
									<Loader size='medium' />
								) : (
									<div>
										{status !== undefined && (
											<img
												src={status === true ? successIcon : failureIcon}
												alt='progress step icon'
											/>
										)}
									</div>
								)}
							</StatusContainer>
						</StepContainer>
					);
				})}
			</ProgressStepsContainer>
		);
	}
}

ProgressSteps.propTypes = {
	displayPageName: PropTypes.string,
	isActive: PropTypes.bool,
	progressSteps: PropTypes.array,
	logText: PropTypes.string,
	progressStepsMapIsReady: PropTypes.bool
};

const mapStateToProps = (state) => ({
	progressSteps: state.log.progressSteps,
	displayPageName: state.log.displayPageName,
	isActive: state.log.isActive,
	logText: state.log.logText,
	isLastLogReceived: state.log.isLastLogReceived,
	progressStepsMapIsReady: state.log.progressStepsMapIsReady
});

export default connect(mapStateToProps, {
	storeProgressInSteps: logActions.storeProgressInSteps,
	stepClicked: logActions.stepClicked,
	progressStepsMapReady: logActions.progressStepsMapReady
})(ProgressSteps);

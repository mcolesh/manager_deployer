import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';
import PropTypes from 'prop-types';
import { Card, Button, Tooltip, ProgressIndicatorCircular } from '@nokia-csf-uxr/csfWidgets';
import Loader from 'components/Loader';
import { DescriptionLabel } from 'components/StyledComponents';
import * as APP_CONSTANTS from 'constants/app-constants';
import { OPEN } from 'constants/app-captions';
import './DashboardStyles.css';
import { isServerRebooting as isServerRebootingRef } from 'selectors/serverMessage';

const successIcon = require('../assets/images/check-circle.svg');
const failureIcon = require('../assets/images/alert-circle.svg');
const partialIcon = require('../assets/images/ic_status_partially_down.svg');

const StyledCard = styled.div`
	margin: 16px;
	position: relative;
`;

const StartButtonContainer = styled.div`
	position: absolute;
	width: calc(100% - 32px);
	display: flex;
	bottom: 16px;
	justify-content: space-between;
	left: 256px;
`;

const StatusContainer = styled.div`
	position: absolute;
	bottom: 22px;
`;

const LoaderContainer = styled.div`
	position: absolute;
	bottom: 25px;
	margin-left: 10px;
`;

const Badge = styled.div`
	width: 150px;
	display: flex;
	margin-left: 2px;
`;

const SpinnerBadge = styled.div`
	width: 150px;
	display: flex;
`;

const StatusImage = styled.img`
	margin-right: 3px;
`;

const SpinnerContainer = styled.div`
	width: 25px;
`;

const StatusLabel = styled.p`
	position: relative;
	top: 6px;
`;

const CardTitle = styled.p`
	font-size: 20px !important;
	line-height: 27.3px !important;
	font-weight: bold;
`;

class Page extends Component {
	/*
		eslint no-script-url: 0
	*/

	constructor(props) {
		super(props);
		this.state = { statusInterval: NaN };
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { statusInterval } = this.state;
		const { isServerRebooting } = this.props;

		if (!isServerRebooting && nextProps.isServerRebooting) {
			clearInterval(statusInterval);
		}
	}

	componentWillUnmount() {
		const { statusInterval } = this.state;
		clearInterval(statusInterval);
	}

	render() {
		const { data, pageStatus, stateDisplay, onPageClick } = this.props;
		const { name, display, description, deployButtonCaption } = data;
		const status = pageStatus || '';
		console.log(
			'page ' +
				name +
				' has status of ' +
				status +
				'and pageStatus ' +
				pageStatus +
				' and display ' +
				display
		);
		const stateDisplayRef = stateDisplay || status;
		let statusIcon;
		switch (status) {
			case APP_CONSTANTS.SUCCESS:
				statusIcon = successIcon;
				break;
			case APP_CONSTANTS.FAIL:
				statusIcon = failureIcon;
				break;
			case APP_CONSTANTS.PARTIAL:
				statusIcon = partialIcon;
				break;
			default:
				break;
		}

		return (
			<StyledCard key={name} className='card-pages-container'>
				<Card id={name} className='card-pages' selectable={false}>
					<CardTitle id={`card-title-${name}`}>{display}</CardTitle>
					<Tooltip text={display} id={`tooltip-${name}`} target={`#card-title-${name}`} />
					<DescriptionLabel>{description}</DescriptionLabel>
					{status === '' ? (
						<LoaderContainer>
							<Loader size='small' />
						</LoaderContainer>
					) : (
						<div>
							{status !== APP_CONSTANTS.UNKNOWN && status !== APP_CONSTANTS.NEW && (
								<StatusContainer>
									{status !== APP_CONSTANTS.IN_PROGRESS ? (
										<Badge>
											<StatusImage src={statusIcon} alt='status icon' />
											<StatusLabel>{stateDisplayRef}</StatusLabel>
										</Badge>
									) : (
										<SpinnerBadge>
											<SpinnerContainer>
												<ProgressIndicatorCircular
													id='spinner'
													css={{
														small: false,
														medium: true,
														large: false,
														xlarge: false,
														xxlarge: false
													}}
												/>
											</SpinnerContainer>
											<StatusLabel>{stateDisplayRef}</StatusLabel>
										</SpinnerBadge>
									)}
								</StatusContainer>
							)}
						</div>
					)}
					<StartButtonContainer>
						<Button
							id={`${name}-open`}
							text={deployButtonCaption || OPEN}
							isCallToAction
							icon='ic_play_circle'
							onClick={onPageClick(name)}
						/>
					</StartButtonContainer>
				</Card>
			</StyledCard>
		);
	}
}

Page.propTypes = {
	data: PropTypes.shape({
		description: PropTypes.string,
		display: PropTypes.string,
		reportApi: PropTypes.string,
		name: PropTypes.string,
		deployButtonCaption: PropTypes.string,
		isExampleCard: PropTypes.bool
	}),
	pageStatus: PropTypes.string,
	stateDisplay: PropTypes.string,
	onPageClick: PropTypes.func.isRequired,
	isServerRebooting: PropTypes.bool
};

const mapStateToProps = (state, { data }) => ({
	pageStatus: get(`status`, state.pagesData.pagesStatus.get(data.name)),
	stateDisplay: get(`display`, state.pagesData.pagesStatus.get(data.name)),
	isServerRebooting: isServerRebootingRef(state)
});

export default connect(mapStateToProps, {})(Page);

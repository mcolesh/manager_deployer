import React, { Component } from 'react';
import { Image, Button } from '@nokia-csf-uxr/csfWidgets';
import * as Sentry from '@sentry/browser';
import styled from 'styled-components';
import { SENTRY_DSN } from 'constants/app-constants';
import {
	SOMETHING_WRONG,
	TRY_REFRESH,
	REFRESH_PAGE,
	REPORT_FEEDBACK
} from 'constants/app-captions';
import { getBrowserInfo } from 'utils/browser-info';
import PropTypes from 'prop-types';

Sentry.init({
	dsn: SENTRY_DSN
});

const ErrorBoundaryContainer = styled.div`
	text-align: center;
	padding-top: 80px;
`;

const ErrorTitle = styled.h1`
	margin-top: 24px;
`;

const ErrorRefresh = styled.h2`
	margin-top: 24px;
	color: #5e5e5e;
`;

const ReportFeedback = styled.a`
	padding-top: 16px;
	display: block;
`;

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null, eventId: null };
	}

	componentDidCatch(error, errorInfo) {
		const { cbisVersion } = this.props;
		const info = getBrowserInfo();
		this.setState({ error });
		Sentry.withScope((scope) => {
			scope.setExtra('CBIS Version', cbisVersion === undefined ? '' : cbisVersion);
			scope.setExtra('Window Size', `${info.screenWidth}px X ${info.screenHeight}px`);
			scope.setExtra('Language', info.navigatorLanguage);
			scope.setExtra('Media type', info.mediaType);
			scope.setExtra('Device Memory', info.deviceMemory);
			scope.setExtra('Hardware Concurrency', info.hardwareConcurrency);
			scope.setExtra('Connection Effective Type Info', info.effectiveType);
			scope.setExtras(errorInfo);
			const eventId = Sentry.captureException(error);
			this.setState({ eventId });
		});
	}

	onRefreshClick = () => {
		window.location.assign('/dashboard');
	};

	render() {
		const { error, eventId } = this.state;
		const { children } = this.props;
		if (error) {
			return (
				<ErrorBoundaryContainer>
					<Image
						id='internal-logo-image'
						internalSrc='Nokia_logo_blue.svg'
						alt='Nokia logo'
						width='300'
					/>
					<ErrorTitle>{SOMETHING_WRONG}</ErrorTitle>
					<ErrorRefresh>{TRY_REFRESH}</ErrorRefresh>
					<Button
						id='refresh-btn'
						icon='ic_refresh'
						isCallToAction
						onClick={this.onRefreshClick}
						tooltip={{
							text: REFRESH_PAGE,
							balloon: true
						}}
					/>
					<ReportFeedback onClick={() => Sentry.showReportDialog({ eventId })}>
						{REPORT_FEEDBACK}
					</ReportFeedback>
				</ErrorBoundaryContainer>
			);
		}
		// when there's not an error, render children untouched
		return children;
	}
}

ErrorBoundary.propTypes = {
	cbisVersion: PropTypes.string,
	children: PropTypes.shape({})
};

export default ErrorBoundary;

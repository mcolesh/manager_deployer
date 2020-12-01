import React, { Component, lazy } from 'react';
import { connect } from 'react-redux';
import { AppToolbar, Button } from '@nokia-csf-uxr/csfWidgets';
import { getOr, get } from 'lodash/fp';
import { push as pushRef } from 'connected-react-router';
import { hideReport as hideReportRef } from 'actions/report';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NovlReport = lazy(() => import('components/reports/novl/NovlReport'));

const ReportContent = styled.div`
	height: calc(100vh - 118px);
	overflow: scroll;
`;

class Report extends Component {
	children = [<NovlReport key='form1' handler={this.handler} />];

	componentDidMount() {
		const { showReport, push } = this.props;
		if (!showReport) {
			push('/dashboard');
		}
	}

	onFinish = () => {
		const { hideReport, push } = this.props;
		hideReport();
		push('/dashboard');
	};

	render() {
		const { showReport } = this.props;
		const createTitle = getOr('Report', 'novl.sections.0.display', this.props);
		const breadcrumbs = {
			isCompact: true,
			items: [
				{
					title: createTitle,
					tooltip: { text: createTitle }
				}
			],
			renderBackButton: () => (
				<Button id='return-novl-report' icon='ic_arrow_back' onClick={() => this.onFinish()} />
			)
		};
		return showReport ? (
			<div>
				<AppToolbar id='dialog-sheet-toolbar' breadcrumbs={breadcrumbs} />
				<ReportContent>{this.children}</ReportContent>
			</div>
		) : null;
	}
}

Report.propTypes = {
	showReport: PropTypes.bool,
	push: PropTypes.func,
	hideReport: PropTypes.func
};

const mapStateToProps = (state) => ({
	novl: get(`report.data`, state),
	showReport: get(`report.showReport`, state)
});

export default connect(mapStateToProps, {
	push: pushRef,
	hideReport: hideReportRef
})(Report);

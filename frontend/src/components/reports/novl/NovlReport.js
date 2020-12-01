import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormLayout } from '@nokia-csf-uxr/csfWidgets';
import PropTypes from 'prop-types';
import { get } from 'lodash/fp';

import './novlReport.css';
import { Summary } from './Summary';
import { Clusters } from './Clusters';
import { HostGroups } from './HostGroups';

class NovlReport extends Component {
	UNSAFE_componentWillMount() {
		// this.parseReportMock();
		this.parseReport();
	}

	static propTypes = {
		onValidate: PropTypes.func,
		onBack: PropTypes.func,
		handler: PropTypes.func
	};

	static defaultProps = {
		onValidate: null,
		onBack: null,
		handler: null
	};

	state = {};

	parseReport = () => {
		// ------ SUMMARY -------
		this.setState({
			summaryTitle: get('sections.0.subSections.0.display', this.props.novl)
		});

		this.setState({
			totalHostGroupTitle: get('sections.0.subSections.0.fields.0.display', this.props.novl)
		});
		this.setState({
			totalHostGroupFailuresValue: get(
				'sections.0.subSections.0.fields.0.failures',
				this.props.novl
			)
		});
		this.setState({
			totalHostGroupTotalValue: get('sections.0.subSections.0.fields.0.total', this.props.novl)
		});

		this.setState({
			hostGroupPassedTitle: get('sections.0.subSections.0.fields.1.display', this.props.novl)
		});
		this.setState({
			hostGroupPassedValue: get('sections.0.subSections.0.fields.1.numberOfPassed', this.props.novl)
		});

		this.setState({
			hostGroupFailedTitle: get('sections.0.subSections.0.fields.2.display', this.props.novl)
		});
		this.setState({
			hostGroupFailedValue: get('sections.0.subSections.0.fields.2.numberOfFailed', this.props.novl)
		});

		// -------- CLUSTER LEVEL TEST -------
		this.setState({
			clusterLevelTestsTitle: get('sections.0.subSections.1.display', this.props.novl)
		});
		this.setState({
			clusterLevelTestsColumns: get('sections.0.subSections.1.columns', this.props.novl)
		});
		this.setState({
			clusterLevelTestsRows: get('sections.0.subSections.1.rows', this.props.novl)
		});

		// -------- HOST GROUP LEVEL TEST -------
		this.setState({
			hostGroupLevelTestsTitle: get('sections.0.subSections.2.display', this.props.novl)
		});
		this.setState({
			hostGroupLevelTestsFailedTitle: get(
				'sections.0.subSections.2.failed.display',
				this.props.novl
			)
		});
		this.setState({
			hostGroupLevelTestsFailedRows: get('sections.0.subSections.2.failed.rows', this.props.novl)
		});
		this.setState({
			hostGroupLevelTestsPassedTitle: get(
				'sections.0.subSections.2.passed.display',
				this.props.novl
			)
		});
		this.setState({
			hostGroupLevelTestsPassedRows: get('sections.0.subSections.2.passed.rows', this.props.novl)
		});
	};

	parseReportMock = () => {
		// ------ SUMMARY -------
		this.setState({ summaryTitle: 'Summary' });

		this.setState({ totalHostGroupTitle: 'TOTAL HOST GROUPS' });
		this.setState({ totalHostGroupFailuresValue: 3 });
		this.setState({ totalHostGroupTotalValue: 12 });

		this.setState({ hostGroupPassedTitle: 'PASSED' });
		this.setState({ hostGroupPassedValue: 9 });

		this.setState({ hostGroupFailedTitle: 'FAILED' });
		this.setState({ hostGroupFailedValue: 3 });

		// -------- CLUSTER LEVEL TEST -------
		this.setState({ clusterLevelTestsTitle: 'Cluster Level Tests' });
		this.setState({
			clusterLevelTestsColumns: ['Criteria', 'Operand', 'Requested', 'Actual', 'Result']
		});
		this.setState({
			clusterLevelTestsRows: [
				['OpenStack version', '>=', 'Newton', 'Rocky', 'passed'],
				['Ceph status', 'Check', 'Check', 'HEALTH_WARN', 'failed'],
				['Ceph Replication Size', '==', '3', '3', 'passed']
			]
		});

		// -------- HOST GROUP LEVEL TEST -------
		this.setState({ hostGroupLevelTestsTitle: 'Host Group Level Tests' });
		this.setState({ hostGroupLevelTestsFailedTitle: 'Failed' });
		this.setState({
			hostGroupLevelTestsFailedRows: [
				{
					columns: ['Compute', 'Criteria', 'Operand', 'Requested', 'Actual', 'Result'],
					display: 'OvsCompute',
					rows: [
						['a', 'compute_state', '==', 'up', 'up', 'passed'],
						['a', 'available_cores', '>=', '24', '24', 'passed'],
						['a', 'huge_pages_1gb_count', '>=', '64', '0', 'failed'],
						['b', 'compute_state', '==', 'up', 'up', 'passed'],
						['b', 'available_cores', '>=', '24', '24', 'failed'],
						['b', 'huge_pages_1gb_count', '>=', '64', '0', 'failed']
					],
					status: '3 Criteria failed across 2 servers'
				},
				{
					columns: ['Compute', 'Criteria', 'Operand', 'Requested', 'Actual', 'Result'],
					display: 'MukiPuki',
					rows: [
						['c', 'compute_state', '==', 'up', 'up', 'passed'],
						['c', 'available_cores', '>=', '24', '24', 'passed'],
						['c', 'huge_pages_1gb_count', '>=', '64', '0', 'failed'],
						['c', 'compute_state', '==', 'up', 'up', 'passed'],
						['d', 'available_cores', '>=', '24', '24', 'failed'],
						['d', 'huge_pages_1gb_count', '>=', '64', '0', 'passed']
					],
					status: '2 Criteria failed across 2 servers'
				}
			]
		});

		this.setState({ hostGroupLevelTestsPassedTitle: 'Passed' });
		this.setState({
			hostGroupLevelTestsPassedRows: [
				{
					columns: ['Compute', 'Criteria', 'Operand', 'Requested', 'Actual', 'Result'],
					display: 'Shuster',
					rows: [
						['xxx', 'compute_state', '==', 'up', 'up', 'passed'],
						['xxx', 'available_cores', '>=', '24', '24', 'passed'],
						['yyy', 'compute_state', '==', 'up', 'up', 'passed'],
						['yyy', 'available_cores', '>=', '24', '24', 'passed']
					],
					status: 'Vulevu Kuskuse'
				},
				{
					columns: ['Compute', 'Criteria', 'Operand', 'Requested', 'Actual', 'Result'],
					display: 'Vladi',
					rows: [
						['cnn', 'compute_state', '==', 'up', 'up', 'passed'],
						['cnn', 'available_cores', '>=', '24', '24', 'passed'],
						['ccccd', 'huge_pages_1gb_count', '>=', '64', '0', 'passed']
					],
					status: 'Kabum'
				}
			]
		});
	};

	componentDidMount() {
		if (this.props.onValidate) {
			this.props.onValidate(this.validate);
		}
	}

	validate = () => {
		const validation = {
			errors: [],
			warnings: []
		};

		this.forceUpdate();

		return validation;
	};

	render() {
		const {
			summaryTitle,
			hostGroupLevelTestsPassedTitle,
			hostGroupPassedValue,
			hostGroupLevelTestsFailedTitle,
			hostGroupFailedValue,
			hostGroupFailedTitle,
			hostGroupPassedTitle,
			totalHostGroupFailuresValue,
			totalHostGroupTotalValue,
			clusterLevelTestsTitle,
			clusterLevelTestsColumns,
			clusterLevelTestsRows,
			hostGroupLevelTestsTitle,
			hostGroupLevelTestsFailedRows,
			hostGroupLevelTestsPassedRows
		} = this.state;
		const totalHostgroupsTitle = `${this.state.totalHostGroupTitle} (${this.state.totalHostGroupTotalValue})`;

		return (
			<FormLayout id='novl-report'>
				<Summary
					summaryTitle={summaryTitle}
					totalHostgroupsTitle={totalHostgroupsTitle}
					hostGroupPassedValue={hostGroupPassedValue}
					hostGroupFailedValue={hostGroupFailedValue}
					hostGroupFailedTitle={hostGroupFailedTitle}
					hostGroupPassedTitle={hostGroupPassedTitle}
					totalHostGroupFailuresValue={totalHostGroupFailuresValue}
					totalHostGroupTotalValue={totalHostGroupTotalValue}
				/>

				<Clusters
					title={clusterLevelTestsTitle}
					columns={clusterLevelTestsColumns}
					rows={clusterLevelTestsRows}
				/>

				<HostGroups
					title={hostGroupLevelTestsTitle}
					failedTitle={hostGroupLevelTestsFailedTitle}
					passedTitle={hostGroupLevelTestsPassedTitle}
					failedRows={hostGroupLevelTestsFailedRows}
					passedRows={hostGroupLevelTestsPassedRows}
				/>
			</FormLayout>
		);
	}
}

const mapStateToProps = (state) => ({
	novl: get(`report.data`, state)
});

export default connect(mapStateToProps, {})(NovlReport);

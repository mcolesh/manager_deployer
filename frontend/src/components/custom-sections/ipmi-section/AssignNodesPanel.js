import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';
import styled from 'styled-components';
import { DataGridEnterprise } from '@nokia-csf-uxr/csfWidgets';
import {
	isValidForAssignment as isValidForAssignmentRef,
	unusedIps as unusedIpsRef
} from 'selectors/ipmi';
import HostGroupAssignModal from 'components/custom-sections/ipmi-section/HostGroupAssignModal';

import Message from 'components/wizard/forms/Message';
import * as CAPTIONS from 'constants/app-captions';
import { showHostGroupAssignDialog as showHostGroupAssignDialogRef } from 'actions/wizard';
import { ExpansionPanelLabel, DescriptionLabel } from 'components/StyledComponents';
import { AG_GRID_ENTERPRISE_LICENSE } from 'constants/app-constants';
import { PropTypes } from 'prop-types';

const editIcon = require('assets/images/ic_edit.svg');

const WarningMessageContainer = styled.div`
	margin-bottom: 3px;
`;

const HostGroupContainer = styled.div`
	height: 225px;
	width: 100%;
`;

const columnDefs = [
	{ headerName: 'Name', field: 'display', width: 500 },
	{ headerName: 'Assigned IPs', field: 'assignedIps', width: 300 }
];

class AssignNodesPanel extends Component {
	constructor(props) {
		super(props);
		const parent = this;
		const hostGroups = get('0.values', props.fields);
		this.state = { noZones: false, pools: false, racks: false };
		this.gridOptionsAssign = {
			columnDefs,
			rowAction: {
				types: [
					{
						name: 'Assign',
						icon: editIcon
					}
				],
				callback(params) {
					const result = hostGroups.filter(
						(hg) => hg.display === params.value.items[0].data.display
					);
					parent.showAssignHostGroupDialog(
						get('0.name', result),
						get('0.noZones', result) || false,
						get('0.pools', result) || false,
						get('0.racks', result) || false
					);
				},
				disable: () => {
					return !parent.props.isValidForAssignment;
				}
			}
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.props.isValidForAssignment !== nextProps.isValidForAssignment) {
			this.api.refreshCells({ coloumns: ['rowActionColId'], force: true }); // force is true as the cell values are not changing
		}
	}

	showAssignHostGroupDialog = (name, noZones, pools, racks) => {
		const { showHostGroupAssignDialog } = this.props;
		this.setState({ noZones, pools, racks });
		showHostGroupAssignDialog(true, name);
	};

	getHostGroupsAssignedLength = (hostGroupName) => {
		const ips = {};
		const { allocations } = this.props;
		allocations.forEach((allocation) => {
			if (hostGroupName === allocation.host_group) {
				if (allocation.pm_addr) {
					allocation.pm_addr.forEach((ip) => {
						ips[ip] = true;
					});
				} else if (allocation.maps) {
					allocation.maps.forEach((poolMap) => {
						ips[poolMap.ip] = true;
					});
				}
			}
		});

		return Object.keys(ips).length;
	};

	onGridReady = (params) => {
		this.api = params.value.api;
		this.api.sizeColumnsToFit();
	};

	renderHostGroups = (hostGroups) => {
		const arr = [];
		hostGroups.forEach((hg) => {
			const obj = {
				display: hg.display,
				assignedIps: this.getHostGroupsAssignedLength(hg.name)
			};
			arr.push(obj);
		});
		return (
			<DataGridEnterprise
				id='host-groups-data-grid'
				gridOptions={this.gridOptionsAssign}
				onGridReady={this.onGridReady}
				rowData={arr}
				disableMultiActionToolbar
				licenseKey={AG_GRID_ENTERPRISE_LICENSE}
			/>
		);
	};

	render() {
		const {
			display,
			totalIps,
			unusedIps,
			hostGroups,
			forceMultiplePools,
			supported_racks,
			isRackSwitchEnabled,
			readonly_racks,
			storageRoles,
			isOpen,
			isValidForAssignment,
			hostGroupAssignDialogVisible,
			bmc
		} = this.props;
		const { noZones, pools, racks } = this.state;
		let result;
		if (isOpen) {
			result = (
				<div>
					<ExpansionPanelLabel>{display}</ExpansionPanelLabel>
					<DescriptionLabel>
						{`${totalIps - unusedIps.length} assigned out of ${totalIps}`}
					</DescriptionLabel>
					{isValidForAssignment ? null : (
						<WarningMessageContainer>
							<Message
								id='assign-node-warning'
								data={CAPTIONS.ASSIGNMENT_WARNING}
								severity='warning'
							/>
						</WarningMessageContainer>
					)}
					<HostGroupContainer>{this.renderHostGroups(hostGroups)}</HostGroupContainer>
					{hostGroupAssignDialogVisible && (
						<HostGroupAssignModal
							noZones={noZones}
							isHostGroupSupportPools={pools}
							isValidForAssignment={isValidForAssignment}
							title={display}
							forceMultiplePools={forceMultiplePools}
							supported_racks={supported_racks}
							isRackEnabled={isRackSwitchEnabled}
							readonly_racks={readonly_racks}
							storageRoles={storageRoles}
							doesHostGroupSupportRacks={racks}
							bmc={bmc}
						/>
					)}
				</div>
			);
		} else {
			result = <ExpansionPanelLabel>{display}</ExpansionPanelLabel>;
		}

		return result;
	}
}

AssignNodesPanel.propTypes = {
	display: PropTypes.string,
	totalIps: PropTypes.number,
	forceMultiplePools: PropTypes.bool,
	supported_racks: PropTypes.bool,
	isRackSwitchEnabled: PropTypes.bool,
	readonly_racks: PropTypes.bool,
	isOpen: PropTypes.bool,
	isValidForAssignment: PropTypes.bool,
	hostGroupAssignDialogVisible: PropTypes.bool,
	fields: PropTypes.instanceOf(Array),
	unusedIps: PropTypes.instanceOf(Array),
	hostGroups: PropTypes.instanceOf(Array),
	storageRoles: PropTypes.instanceOf(Array),
	allocations: PropTypes.instanceOf(Array),
	showHostGroupAssignDialog: PropTypes.func
};

const mapStateToProps = (state) => ({
	hostGroupAssignDialogVisible: state.wizard.hostGroupAssignDialogVisible,
	isValidForAssignment: isValidForAssignmentRef(state),
	unusedIps: unusedIpsRef(state),
	totalIps: get(`dynamic.content.ipmi_ips.ipmiAdd.computed.length`, state),
	allocations: get(`dynamic.content.ipmi_ips.allocations`, state),
	isRackSwitchEnabled: state.wizard.isRackSwitchEnabled
});

export default connect(mapStateToProps, {
	showHostGroupAssignDialog: showHostGroupAssignDialogRef
})(AssignNodesPanel);

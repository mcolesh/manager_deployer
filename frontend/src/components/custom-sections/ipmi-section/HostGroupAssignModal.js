import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, Button, DataGridEnterprise } from '@nokia-csf-uxr/csfWidgets';
import List from 'antd/es/list';
import Tabs from 'antd/es/tabs';
import Table from 'antd/es/table';
import 'antd/lib/list/style/css';
import 'antd/lib/tabs/style/css';
import 'antd/lib/table/style/css';
import PropTypes from 'prop-types';
import { actions } from 'react-redux-form';
import styled from 'styled-components';
import { get, findIndex, filter, find } from 'lodash/fp';
import { ALLOCATIONS_MODEL } from 'constants/ipmi-sub-section';

import ErrorLabel from 'components/wizard/ErrorLabel';
import {
	showHostGroupAssignDialog as showHostGroupAssignDialogRef,
	setSelectedAssignHostGroupAvailabilityZone as setSelectedAssignHostGroupAvailabilityZoneRef,
	setSelectedAssignHostGroupPool as setSelectedAssignHostGroupPoolRef,
	setSelectedAssignHostGroupRack as setSelectedAssignHostGroupRackRef
} from 'actions/wizard';
import {
	unusedIps as unusedIpsRef,
	hostGroupIpsFilterByZone as hostGroupIpsFilterByZoneRef,
	ipDeviceListByPool as ipDeviceListByPoolRef,
	countDisksPerPool as countDisksPerPoolRef,
	IpsFilteredByRack as IpsFilteredByRackRef,
	shouldShowLabelsWithRacks as shouldShowLabelsWithRacksRef,
	ipsFilteredByLabelsAndRacks as ipsFilteredByLabelsAndRacksRef
} from 'selectors/ipmi';
import {
	NO_MORE_DISKS_TO_ASSIGN,
	NO_MORE_DEVICES_TO_ASSIGN,
	NO_MORE_IPS_TO_ASSIGN
} from 'constants/app-captions';

import { AG_GRID_ENTERPRISE_LICENSE } from 'constants/app-constants';

const { TabPane } = Tabs;

const SelectorContainer = styled.div`
	display: flex;
	height: 176px;
	overflow: hidden;
`;

const FlexContainer = styled.div`
	flex: 1;
`;

const RackLabelTabContainer = styled.div`
	display: flex;
`;

const RackLabelTabsContainer = styled.div`
	width: 50%;
`;

const allocationsModel = `dynamic.content.ipmi_ips.allocations`;
const ipsColumnDefs = [{ headerName: 'IP', field: 'value', width: '100%', menuTabs: [] }];
const disksColumnDefs = [{ headerName: 'Disk', field: 'value', width: '100%', menuTabs: [] }];
class HostGroupAssignModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIps: null,
			selectedDisks: null,
			errorMessages: []
		};

		this.ipsGridOptionsAssign = {
			columnDefs: ipsColumnDefs,
			defaultColDef: {},
			noRowsToShow: NO_MORE_DISKS_TO_ASSIGN
		};

		this.disksGridOptionsAssign = {
			columnDefs: disksColumnDefs,
			defaultColDef: {},
			noRowsToShow: NO_MORE_DEVICES_TO_ASSIGN
		};

		this.onIPsGridReady = (params) => {
			this.ipsApi = params.value.api;
		};

		this.onDisksGridReady = (params) => {
			this.disksApi = params.value.api;
		};
	}

	componentDidMount() {
		const {
			noZones,
			zones,
			pools,
			racks,
			shouldShowLabelsWithRacks,
			setSelectedAssignHostGroupPool,
			setSelectedAssignHostGroupRack,
			setSelectedAssignHostGroupAvailabilityZone,
			isHostGroupSupportPools
		} = this.props;

		if (!noZones && zones && zones.length > 0) {
			setSelectedAssignHostGroupAvailabilityZone(zones[0]);
		}

		if (isHostGroupSupportPools && noZones && pools && pools.length > 0) {
			setSelectedAssignHostGroupPool(pools[0]);
		}

		if ((noZones || shouldShowLabelsWithRacks) && racks && racks.length) {
			setSelectedAssignHostGroupRack(racks[0]);
		}
	}

	componentWillUnmount() {
		const {
			setSelectedAssignHostGroupAvailabilityZone,
			setSelectedAssignHostGroupPool
		} = this.props;
		setSelectedAssignHostGroupAvailabilityZone('');
		setSelectedAssignHostGroupPool('');
	}

	onClose = () => {
		const { showHostGroupAssignDialog } = this.props;
		showHostGroupAssignDialog(false);
	};

	createNewHostGroup = () => {
		const {
			selectedAssignedHostGroup,
			noZones,
			selectedZone,
			pools,
			zonePools,
			userEnabledPools
		} = this.props;

		const hg = { host_group: selectedAssignedHostGroup, pm_addr: [] };

		if (!noZones) {
			hg.availability_zone = selectedZone;

			// if support pools by user, in the configuration stage, he mapped the
			// zone to pool
			if (zonePools.hasOwnProperty(selectedZone) && userEnabledPools) {
				hg.vm_pool = zonePools[selectedZone];
			}
		}

		if (noZones && pools && userEnabledPools && selectedZone !== '') {
			// sent in the host group
			hg.pools = [];
		}

		return hg;
	};

	// For IPMI storage
	onAssignIpsWithDisk = () => {
		const { selectedIps, selectedDisks, errorMessages } = this.state;
		const { selectedAssignedHostGroup, hostGroupsAllocations, push } = this.props;

		// 1. validate that we have storage object in the form (allocation)
		let hostGroupIndex = findIndex(
			(o) => o.host_group === selectedAssignedHostGroup,
			hostGroupsAllocations
		);

		// If no hostgroup found in allocations - we need to create new element
		if (hostGroupIndex < 0) {
			const hg = {
				host_group: selectedAssignedHostGroup,
				maps: []
			};
			push(allocationsModel, hg);
			hostGroupIndex = hostGroupsAllocations.length; // The
			// former action didn't update yet the reducer, so in this case the
			// index won't be: length - 1;
		}

		// Validate rules
		// get the current configuration for pool
		const maps = get(`${hostGroupIndex}.maps`, hostGroupsAllocations);
		if (maps) {
			const errors = [];
			selectedIps.forEach((ip) => {
				selectedDisks.forEach((disk) => {
					filter((item) => {
						if (item.ip === ip.value) {
							if (item.device === disk.value) {
								errors.push(
									`IP: "${ip.value}", with device name: "${disk.value}" - is already mapped to pool: "${item.pool}"`
								);
							} else if (disk.value === '*') {
								errors.push(
									`IP: "${ip.value}", is already mapped with some devices. Remove them before assigning all (*) to pool: "${item.pool}"`
								);
							}
						}
					}, maps);
				});
			});
			this.setState({ errorMessages: errors }, () => {
				// If no errors - we should update the map of alreadyAssignedMap
				if (errorMessages.length === 0) {
					this.updateFormAllocationMaps(selectedIps, selectedDisks, hostGroupIndex);
				}
			});
		} else {
			// first time - adding a pool
			this.updateFormAllocationMaps(selectedIps, selectedDisks, hostGroupIndex);
		}
	};

	updateFormAllocationMaps = (selectedIps, selectedDisks, hostGroupIndex) => {
		selectedIps.forEach((ip) => {
			selectedDisks.forEach((device) => {
				const { push, selectedPool } = this.props;
				push(`${allocationsModel}[${hostGroupIndex}.maps]`, {
					ip: ip.value,
					pool: selectedPool,
					device: device.value
				});
			});
		});
		// clear selection in IPs & Disks grids
		this.disksApi.deselectAll();
		this.ipsApi.deselectAll();
	};

	onAssignIps = () => {
		const {
			selectedAssignedHostGroup,
			noZones,
			selectedZone,
			hostGroupsAllocations,
			push
		} = this.props;
		const { selectedIps } = this.state;
		let hostGroupIndex = findIndex(
			(o) =>
				o.host_group === selectedAssignedHostGroup &&
				(noZones || selectedZone === o.availability_zone),
			hostGroupsAllocations
		);

		// If no hostgroup found in allocations - we need to create new element
		if (hostGroupIndex < 0) {
			const hg = this.createNewHostGroup();
			push(ALLOCATIONS_MODEL, hg);
			hostGroupIndex = hostGroupsAllocations.length; // The
			// former action didn't update yet the reducer, so in this case the
			// index won't be: length - 1;
		}

		selectedIps.map((ip) => push(`${ALLOCATIONS_MODEL}[${hostGroupIndex}].pm_addr`, ip.value));

		this.setState({ selectedIps: null });
	};

	onAssignIpsWithRack = () => {
		const { selectedIps } = this.state;
		const { selectedAssignedHostGroup, hostGroupsAllocations, selectedRack, push } = this.props;
		const hostGroupIndex = findIndex(
			(hg) => hg.host_group === selectedAssignedHostGroup && hg.rack_location === selectedRack,
			hostGroupsAllocations
		);

		if (hostGroupIndex >= 0) {
			selectedIps.map((ip) => push(`${ALLOCATIONS_MODEL}[${hostGroupIndex}].pm_addr`, ip.value));
		} else {
			const ips = [];
			selectedIps.map((ip) => ips.push(ip.value));
			push(ALLOCATIONS_MODEL, {
				host_group: selectedAssignedHostGroup,
				pm_addr: ips,
				rack_location: selectedRack
			});
		}
		this.setState({ selectedIps: null });
	};

	onRemoveIp = (item, zone, isRack = false) => () => {
		const { hostGroupsAllocations, selectedAssignedHostGroup, remove } = this.props;
		let hostGroupIndex;
		if (isRack) {
			hostGroupIndex = findIndex(
				(o) => o.host_group === selectedAssignedHostGroup && zone === o.rack_location,
				hostGroupsAllocations
			);
		} else {
			hostGroupIndex = findIndex(
				(o) =>
					o.host_group === selectedAssignedHostGroup &&
					(zone === undefined || zone === o.availability_zone),
				hostGroupsAllocations
			);
		}

		const ips = hostGroupsAllocations[hostGroupIndex].pm_addr;

		const ipIndex = findIndex((ip) => ip === item.value, ips);

		const ipsLength = get(`${hostGroupIndex}.pm_addr.length`, hostGroupsAllocations);

		// if we remove the last ip from the host group, we need to remove the
		// whole host group from the allocation list
		if (ipsLength === 1) {
			remove(ALLOCATIONS_MODEL, hostGroupIndex);
		} else {
			remove(`${ALLOCATIONS_MODEL}[${hostGroupIndex}].pm_addr`, ipIndex);
		}
	};

	onRemoveIpFromLabelsAndRacks = (item, rack) => {
		const { hostGroupsAllocations, selectedAssignedHostGroup, selectedZone, remove } = this.props;
		const hostGroupIndex = findIndex(
			(hg) =>
				hg.host_group === selectedAssignedHostGroup &&
				hg.rack_location === rack &&
				hg.availability_zone === selectedZone,
			hostGroupsAllocations
		);

		const ips = hostGroupsAllocations[hostGroupIndex].pm_addr;
		const ipIndex = findIndex((ip) => ip === item.value, ips);
		const ipsLength = get(`${hostGroupIndex}.pm_addr.length`, hostGroupsAllocations);
		// if we remove the last ip from the host group, we need to remove the
		// whole host group from the allocation list
		if (ipsLength === 1) {
			remove(ALLOCATIONS_MODEL, hostGroupIndex);
		} else {
			remove(`${ALLOCATIONS_MODEL}[${hostGroupIndex}].pm_addr`, ipIndex);
		}
	};

	setSelectedZone = (zone) => {
		const { setSelectedAssignHostGroupAvailabilityZone } = this.props;
		setSelectedAssignHostGroupAvailabilityZone(zone);
	};

	setSelectedPool = (pool) => {
		const { setSelectedAssignHostGroupPool } = this.props;
		setSelectedAssignHostGroupPool(pool);
	};

	setSelectedRack = (rack) => {
		const { setSelectedAssignHostGroupRack } = this.props;
		setSelectedAssignHostGroupRack(rack);
	};

	onRemoveIpDeviceFromPool = (text, record) => () => {
		const { selectedAssignedHostGroup, hostGroupsAllocations, selectedPool, remove } = this.props;
		const hostGroupIndex = findIndex(
			(o) => o.host_group === selectedAssignedHostGroup,
			hostGroupsAllocations
		);

		const recordIndex = findIndex((o) => {
			return o.ip === record.ip && o.device === record.device && o.pool === selectedPool;
		}, hostGroupsAllocations[hostGroupIndex].maps);

		const mapLength = get(`${hostGroupIndex}.maps.length`, hostGroupsAllocations);
		if (mapLength === 1) {
			// if length was 1 before we removed an item - it's empty now
			// we need to remove also the object from allocations
			remove(`${allocationsModel}`, hostGroupIndex);
		} else {
			remove(`${allocationsModel}[${hostGroupIndex}.maps`, recordIndex);
		}

		this.setState({ errorMessages: [] });
	};

	renderFooter = () => {
		const { countDisksPerPool, selectedPool } = this.props;
		return (
			<div>
				Total:
				{countDisksPerPool}
				&nbsp; disks for &nbsp;
				{selectedPool}
			</div>
		);
	};

	onAssignIpsInLabelsAndRacks = () => {
		const { selectedIps } = this.state;
		const {
			selectedAssignedHostGroup,
			hostGroupsAllocations,
			selectedRack,
			selectedZone,
			push
		} = this.props;
		const hostGroupIndex = findIndex(
			(hg) =>
				hg.host_group === selectedAssignedHostGroup &&
				hg.rack_location === selectedRack &&
				hg.availability_zone === selectedZone,
			hostGroupsAllocations
		);

		if (hostGroupIndex >= 0) {
			selectedIps.map((ip) => push(`${ALLOCATIONS_MODEL}[${hostGroupIndex}].pm_addr`, ip.value));
		} else {
			const ips = [];
			selectedIps.map((ip) => ips.push(ip.value));
			push(ALLOCATIONS_MODEL, {
				host_group: selectedAssignedHostGroup,
				pm_addr: ips,
				rack_location: selectedRack,
				availability_zone: selectedZone
			});
		}
		this.setState({ selectedIps: null });
	};

	renderStorageWithPools = () => {
		const { pools, title, disks, unusedIps, ipDeviceListByPool } = this.props;
		const { selectedIps, selectedDisks, errorMessages } = this.state;
		const disksArr = disks.map((disk) => ({ id: disk, value: disk }));
		disksArr.unshift({ id: '*', value: '*' });

		const columns = [
			{
				title: 'IP',
				dataIndex: 'ip'
			},
			{
				title: 'Device',
				dataIndex: 'device'
			},
			{
				render: (text, record) => (
					<span>
						<Button onClick={this.onRemoveIpDeviceFromPool(text, record)} text='Remove' />
					</span>
				)
			}
		];

		return (
			<Dialog
				title={title}
				theme='black'
				onClose={this.onClose}
				width={800}
				height={600}
				close
				header
				scroll>
				<SelectorContainer>
					{/* IPS */}
					<FlexContainer>
						<DataGridEnterprise
							id='host-groups-data-grid-ips'
							onGridReady={this.onIPsGridReady}
							gridOptions={this.ipsGridOptionsAssign}
							rowData={unusedIps}
							onRowSelected={(e) => {
								this.handleRowSelected('IPS', e);
							}}
							disableMultiActionToolbar
							licenseKey={AG_GRID_ENTERPRISE_LICENSE}
							showMoreButton={false}
						/>
					</FlexContainer>
					{/* DISKS */}
					<FlexContainer>
						<DataGridEnterprise
							id='host-groups-data-grid-disks'
							onGridReady={this.onDisksGridReady}
							gridOptions={this.disksGridOptionsAssign}
							rowData={disksArr}
							onRowSelected={(e) => {
								this.handleRowSelected('Disks', e);
							}}
							disableMultiActionToolbar
							licenseKey={AG_GRID_ENTERPRISE_LICENSE}
							showMoreButton={false}
						/>
					</FlexContainer>
				</SelectorContainer>

				<Button
					text='Assign'
					onClick={this.onAssignIpsWithDisk}
					disabled={
						selectedIps === null ||
						selectedIps === undefined ||
						selectedIps.length === 0 ||
						selectedDisks === null ||
						selectedDisks === undefined ||
						selectedDisks.length === 0
					}
				/>

				{errorMessages.length > 0 &&
					errorMessages.map((err, idx) => <ErrorLabel key={idx} text={err} />)}

				<Tabs defaultActiveKey={pools.length > 0 ? pools[0] : null} onChange={this.setSelectedPool}>
					{pools.map((pool) => (
						<TabPane tab={pool} key={pool}>
							<Table
								rowKey={(record) => `${record.pool}_${record.ip}_${record.device}`}
								columns={columns}
								scroll={{ x: 800, y: 150 }}
								dataSource={ipDeviceListByPool}
								pagination={false}
								footer={() => this.renderFooter()}
							/>
						</TabPane>
					))}
				</Tabs>
			</Dialog>
		);
	};

	renderStorageWithRacks = () => {
		const {
			racks,
			title,
			unusedIps,
			readonly_racks,
			defaultAllocations,
			IpsFilteredByRack
		} = this.props;
		const { selectedIps } = this.state;
		this.ipsGridOptionsAssign.noRowsToShow = NO_MORE_IPS_TO_ASSIGN;
		return (
			<Dialog
				title={title}
				theme='black'
				onClose={this.onClose}
				width={800}
				height={600}
				close
				header
				scroll>
				<SelectorContainer>
					{/* IPS */}
					<FlexContainer>
						<DataGridEnterprise
							id='host-groups-data-grid-1'
							gridOptions={this.ipsGridOptionsAssign}
							rowData={unusedIps}
							onRowSelected={(e) => {
								this.handleRowSelected('IPS', e);
							}}
							disableMultiActionToolbar
							licenseKey={AG_GRID_ENTERPRISE_LICENSE}
							showMoreButton={false}
						/>
					</FlexContainer>
				</SelectorContainer>

				<Button
					text='Assign'
					onClick={this.onAssignIpsWithRack}
					disabled={selectedIps === null || selectedIps === undefined || selectedIps.length === 0}
				/>

				<Tabs defaultActiveKey={racks.length > 0 ? racks[0] : null} onChange={this.setSelectedRack}>
					{racks.map((rack) => (
						<TabPane tab={rack} key={rack}>
							<List
								itemLayout='horizontal'
								dataSource={IpsFilteredByRack}
								renderItem={(item) => (
									<List.Item
										actions={
											readonly_racks &&
											find({ rack_location: rack, pm_addr: [item.value] }, defaultAllocations)
												? null
												: [<button onClick={this.onRemoveIp(item, rack, true)}>Remove</button>]
										}>
										<List.Item.Meta title={<span>{item.value}</span>} />
									</List.Item>
								)}
							/>
						</TabPane>
					))}
				</Tabs>
			</Dialog>
		);
	};

	renderHostGroupsWithLabelsAndRacks = () => {
		const { title, unusedIps, racks, zones, ipsFilteredByLabelsAndRacks } = this.props;
		const { selectedIps } = this.state;
		return (
			<Dialog
				title={title}
				theme='black'
				onClose={this.onClose}
				width={800}
				height={600}
				close
				header
				scroll>
				<SelectorContainer>
					{/* IPS */}
					<FlexContainer>
						<DataGridEnterprise
							id='ips-dataGrid'
							gridOptions={this.ipsGridOptionsAssign}
							rowData={unusedIps}
							onRowSelected={(e) => {
								this.handleRowSelected('IPS', e);
							}}
							disableMultiActionToolbar
							licenseKey={AG_GRID_ENTERPRISE_LICENSE}
							showMoreButton={false}
						/>
					</FlexContainer>
				</SelectorContainer>

				<Button
					text='Assign'
					onClick={this.onAssignIpsInLabelsAndRacks}
					disabled={selectedIps === null || selectedIps === undefined || selectedIps.length === 0}
				/>

				{/* Racks */}
				<RackLabelTabContainer>
					<RackLabelTabsContainer>
						<Tabs
							defaultActiveKey={racks.length > 0 ? racks[0] : null}
							onChange={this.setSelectedRack}>
							{racks.map((rack) => (
								<TabPane tab={rack} key={rack}>
									<List
										itemLayout='horizontal'
										dataSource={ipsFilteredByLabelsAndRacks}
										renderItem={(item) => (
											<List.Item
												actions={[
													<button onClick={() => this.onRemoveIpFromLabelsAndRacks(item, rack)}>
														Remove
													</button>
												]}>
												<List.Item.Meta title={<span>{item.value}</span>} />
											</List.Item>
										)}
									/>
								</TabPane>
							))}
						</Tabs>
					</RackLabelTabsContainer>

					{/* Labels */}
					<RackLabelTabsContainer>
						<Tabs
							defaultActiveKey={zones.length > 0 ? zones[0] : null}
							onChange={this.setSelectedZone}>
							{zones.map((zone) => (
								<TabPane tab={zone} key={zone}>
									<List
										itemLayout='horizontal'
										dataSource={ipsFilteredByLabelsAndRacks}
										renderItem={(item) => (
											<List.Item>
												<List.Item.Meta title={<span>{item.value}</span>} />
											</List.Item>
										)}
									/>
								</TabPane>
							))}
						</Tabs>
					</RackLabelTabsContainer>
				</RackLabelTabContainer>
			</Dialog>
		);
	};

	handleRowSelected = (type, e) => {
		const { selectedIps, selectedDisks } = this.state;
		let newSelected;
		if (type === 'IPS') {
			newSelected = selectedIps || [];
			if (e.nativeEvent.node.selected) {
				newSelected.push(e.nativeEvent.data);
			} else {
				newSelected = newSelected.filter((ip) => {
					return ip.id !== e.nativeEvent.data.id;
				});
			}
			this.setState({ selectedIps: newSelected });
		} else {
			newSelected = selectedDisks || [];
			if (e.nativeEvent.node.selected) {
				newSelected.push(e.nativeEvent.data);
			} else {
				newSelected = newSelected.filter((disk) => {
					return disk.id !== e.nativeEvent.data.id;
				});
			}
			this.setState({ selectedDisks: newSelected });
		}
	};

	render() {
		const {
			noZones,
			isHostGroupSupportPools,
			title,
			userEnabledPools,
			forceMultiplePools,
			supported_racks,
			isRackEnabled,
			selectedAssignedHostGroup,
			shouldShowLabelsWithRacks,
			racks,
			storageRoles,
			doesHostGroupSupportRacks,
			bmc,
			hostGroupIpsFilterByZone,
			unusedIps,
			zones
		} = this.props;
		const { selectedIps } = this.state;

		const renderStorageWithPools =
			noZones && isHostGroupSupportPools && (forceMultiplePools || userEnabledPools);

		const renderStorageWithRacks =
			!bmc &&
			doesHostGroupSupportRacks &&
			supported_racks &&
			isRackEnabled &&
			storageRoles &&
			storageRoles.includes(selectedAssignedHostGroup);

		const renderHostGroupsWithLabelsAndRacks =
			isRackEnabled &&
			racks.length !== 0 &&
			(shouldShowLabelsWithRacks ||
				(bmc && storageRoles && storageRoles.includes(selectedAssignedHostGroup)));

		if (renderStorageWithPools) {
			return this.renderStorageWithPools();
		} else if (renderStorageWithRacks) {
			return this.renderStorageWithRacks();
		} else if (renderHostGroupsWithLabelsAndRacks) {
			return this.renderHostGroupsWithLabelsAndRacks();
		} else {
			return (
				<Dialog
					title={title}
					theme='black'
					onClose={this.onClose}
					width={800}
					height={600}
					header
					close
					scroll>
					<SelectorContainer>
						<FlexContainer>
							<DataGridEnterprise
								id='host-groups-data-grid-1'
								gridOptions={this.ipsGridOptionsAssign}
								rowData={unusedIps}
								onRowSelected={(event) => {
									this.handleRowSelected('IPS', event);
								}}
								disableMultiActionToolbar
								licenseKey={AG_GRID_ENTERPRISE_LICENSE}
								showMoreButton={false}
							/>
						</FlexContainer>
					</SelectorContainer>
					<Button
						text='Assign'
						onClick={this.onAssignIps}
						disabled={!selectedIps || selectedIps.length === 0}
					/>

					{noZones && (
						<List
							itemLayout='horizontal'
							dataSource={hostGroupIpsFilterByZone}
							renderItem={(item) => (
								<List.Item actions={[<button onClick={this.onRemoveIp(item)}>Remove</button>]}>
									<List.Item.Meta title={<span>{item.value}</span>} />
								</List.Item>
							)}
						/>
					)}

					{!noZones && (
						<Tabs
							defaultActiveKey={zones.length > 0 ? zones[0] : null}
							onChange={this.setSelectedZone}>
							{zones.map((zone) => (
								<TabPane tab={zone} key={zone}>
									<List
										itemLayout='horizontal'
										dataSource={hostGroupIpsFilterByZone}
										renderItem={(item) => (
											<List.Item
												actions={[<button onClick={this.onRemoveIp(item, zone)}>Remove</button>]}>
												<List.Item.Meta title={<span>{item.value}</span>} />
											</List.Item>
										)}
									/>
								</TabPane>
							))}
						</Tabs>
					)}
				</Dialog>
			);
		}
	}
}

HostGroupAssignModal.propTypes = {
	title: PropTypes.string,
	selectedAssignedHostGroup: PropTypes.string,
	selectedZone: PropTypes.string,
	selectedPool: PropTypes.string,
	selectedRack: PropTypes.string,
	supported_racks: PropTypes.bool,
	readonly_racks: PropTypes.bool,
	noZones: PropTypes.bool,
	forceMultiplePools: PropTypes.bool,
	isHostGroupSupportPools: PropTypes.bool,
	userEnabledPools: PropTypes.bool,
	shouldShowLabelsWithRacks: PropTypes.bool,
	isRackEnabled: PropTypes.bool,
	doesHostGroupSupportRacks: PropTypes.bool,
	countDisksPerPool: PropTypes.number,
	unusedIps: PropTypes.instanceOf(Array),
	pools: PropTypes.instanceOf(Array),
	zones: PropTypes.instanceOf(Array),
	racks: PropTypes.instanceOf(Array),
	hostGroupsAllocations: PropTypes.instanceOf(Array),
	disks: PropTypes.instanceOf(Array),
	ipDeviceListByPool: PropTypes.instanceOf(Array),
	defaultAllocations: PropTypes.instanceOf(Array),
	IpsFilteredByRack: PropTypes.instanceOf(Array),
	ipsFilteredByLabelsAndRacks: PropTypes.instanceOf(Array),
	storageRoles: PropTypes.instanceOf(Array),
	hostGroupIpsFilterByZone: PropTypes.instanceOf(Array),
	zonePools: PropTypes.shape({}),
	showHostGroupAssignDialog: PropTypes.func,
	setSelectedAssignHostGroupPool: PropTypes.func,
	setSelectedAssignHostGroupRack: PropTypes.func,
	setSelectedAssignHostGroupAvailabilityZone: PropTypes.func,
	push: PropTypes.func,
	remove: PropTypes.func
};

const mapStateToProps = (state) => ({
	unusedIps: unusedIpsRef(state),
	hostGroupIpsFilterByZone: hostGroupIpsFilterByZoneRef(state),
	selectedAssignedHostGroup: state.wizard.selectedAssignedHostGroup,
	hostGroupsAllocations: get(ALLOCATIONS_MODEL, state),
	zones: get(`dynamic.content.ipmi_ips.defineZones.zones`, state),
	pools: get(`dynamic.content.ipmi_ips.pools.pools`, state),
	disks: get(`dynamic.content.ipmi_ips.disks.disks`, state),
	selectedZone: get(`wizard.selectedAssignHostGroupAavailabilityZone`, state),
	selectedPool: get(`wizard.selectedAssignHostGroupPool`, state),
	selectedRack: get(`wizard.selectedAssignHostGroupRack`, state),
	zonePools: get(`dynamic.content.ipmi_ips.defineZones.zonePool`, state),
	userEnabledPools: get(`dynamic.content.ipmi_ips.pools.enabledPools`, state),
	racks: get(`dynamic.content.ipmi_ips.racks.racks`, state),
	ipDeviceListByPool: ipDeviceListByPoolRef(state),
	countDisksPerPool: countDisksPerPoolRef(state),
	IpsFilteredByRack: IpsFilteredByRackRef(state),
	defaultAllocations: get('wizard.defaultAllocations', state),
	shouldShowLabelsWithRacks: shouldShowLabelsWithRacksRef(state),
	ipsFilteredByLabelsAndRacks: ipsFilteredByLabelsAndRacksRef(state)
});

export default connect(mapStateToProps, {
	showHostGroupAssignDialog: showHostGroupAssignDialogRef,
	remove: actions.remove,
	push: actions.push,
	change: actions.change,
	merge: actions.merge,
	setSelectedAssignHostGroupAvailabilityZone: setSelectedAssignHostGroupAvailabilityZoneRef,
	setSelectedAssignHostGroupPool: setSelectedAssignHostGroupPoolRef,
	setSelectedAssignHostGroupRack: setSelectedAssignHostGroupRackRef
})(HostGroupAssignModal);

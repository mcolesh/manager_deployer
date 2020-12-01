import { createSelector } from 'reselect';
import { get, getOr, difference, filter, sortBy } from 'lodash/fp';
import { ALLOCATIONS_MODEL, STORAGE } from 'constants/ipmi-sub-section';

export const getHostgroups = (state) => {
	const sections = getOr([], ['wizard', 'sections'], state);
	const hostGroupSection = filter((item) => item.name === 'hostgroups', sections);
	const hostGroups = getOr([], '0.subSections', hostGroupSection);
	return hostGroups;
};

export const getHostGroupsForm = (state) => get(['dynamic', 'content', 'hostgroups'], state);

export const getIpmiForm = (state) => get(['dynamic', 'content', 'ipmi_ips'], state);

export const getSelectedAssignHostGroupPool = (state) =>
	get(['wizard', 'selectedAssignHostGroupPool'], state);

export const getSelectedAssignHostGroupRack = (state) =>
	get(['wizard', 'selectedAssignHostGroupRack'], state);

export const getSelectedHostGroup = (state) => {
	return get('wizard.selectedAssignedHostGroup', state);
};

export const getHostgroupSection = (state) => {
	const sections = getOr([], ['wizard', 'sections'], state);
	const hostGroupSection = filter((item) => item.name === 'hostgroups', sections);
	return getOr([], '0', hostGroupSection);
};

export const getSelectedAssignHostGroup = (state) => {
	const allocations = get(['dynamic', 'content', 'ipmi_ips', 'allocations'], state);

	let arr = filter(
		(item) => item.host_group === state.wizard.selectedAssignedHostGroup,
		allocations
	);

	if (state.wizard.selectedAssignHostGroupAavailabilityZone !== '') {
		arr = filter(
			(item) => item.availability_zone === state.wizard.selectedAssignHostGroupAavailabilityZone,
			arr
		);
	}
	return arr;
};

const getAreAllZonesMapToPools = (zones, zonePool) => {
	let allZonesMapped = true;
	zones.forEach((zone) => {
		if (!Object.prototype.hasOwnProperty.call(zonePool, zone)) {
			allZonesMapped = false;
		}
	});
	return allZonesMapped;
};

export const isValidForAssignment = createSelector(getIpmiForm, (form) => {
	// Clean form (not created yet)
	if (!form) {
		return true;
	}

	const atLeastOneZoneExist = form.defineZones.zones.length > 0;
	const atLeastOneIpExist = form.ipmiAdd.computed.length > 0;
	const editingMode = form.editing === true;

	if (!atLeastOneIpExist || !atLeastOneZoneExist || editingMode) {
		return false;
	}

	let valid = false;
	const { supported_hw_pools, pools, defineZones, supported_racks, force_racks, racks } = form;
	if (
		(!get(`enabledPools`, pools) && !force_racks) ||
		(!force_racks &&
			supported_hw_pools &&
			get(`enabledPools`, pools) &&
			get(`pools`, pools).length > 0 &&
			getAreAllZonesMapToPools(defineZones.zones, defineZones.zonePool)) ||
		(!get(`enabledPools`, pools) &&
			supported_racks &&
			force_racks &&
			get(`racks`, racks).length > 0)
	) {
		valid = true;
	}
	return valid;
});

export const unusedIps = createSelector(
	getIpmiForm,
	getSelectedAssignHostGroupPool,
	(form, selectedAssignHostGroupPool) => {
		// get all ips
		const allIps = get('ipmiAdd.computed', form);
		const numberOfDisks = form.disks.disks.length;

		// get assigned ips
		const assignedIps = [];
		const assigned = get('allocations', form);
		assigned.forEach((hg) => {
			if (hg.pm_addr) {
				hg.pm_addr.map((ip) => assignedIps.push(ip));
			} else if (hg.maps) {
				// if ip is used to storage pool, we need to check if it used all its
				// disks.
				// If not all disks used - we should show this ip as valid to use
				// if we set compute or controller, and the pool used this ip - we
				// should no show it
				hg.maps.forEach((item) => {
					const arr = filter((item2) => {
						return item.ip === item2.ip;
					}, hg.maps);

					if (selectedAssignHostGroupPool !== '') {
						if (arr.length === numberOfDisks || item.device === '*') {
							assignedIps.push(item.ip);
						}
					} else {
						assignedIps.push(item.ip);
					}
				});
			}
		});

		let diff = difference(allIps, assignedIps);
		diff = diff.map((ip) => ({ id: ip, value: ip }));

		return diff;
	}
);

export const hostGroupIpsFilterByZone = createSelector(getSelectedAssignHostGroup, (hostGroup) => {
	let arr = get('0.pm_addr', hostGroup) ? get('0.pm_addr', hostGroup) : [];
	arr = arr.map((ip) => ({ id: ip, value: ip }));
	return arr;
});

export const IpsFilteredByRack = createSelector(
	getIpmiForm,
	getSelectedAssignHostGroupRack,
	getSelectedHostGroup,
	(form, selectedAssignHostGroupRack, selectedHostGroup) => {
		const hg = filter(
			{
				host_group: selectedHostGroup,
				rack_location: selectedAssignHostGroupRack
			},
			get('allocations', form)
		);
		let arr = hg.length > 0 ? get(`0.pm_addr`, hg).map((ip) => ({ id: ip, value: ip })) : [];
		arr = sortBy(['value'], arr);
		return arr;
	}
);

export const ipDeviceListByPool = createSelector(
	getIpmiForm,
	getSelectedAssignHostGroupPool,
	(form, selectedAssignHostGroupPool) => {
		let arr = [];
		const assigned = get('allocations', form);
		assigned.forEach((hg) => {
			if (hg.maps) {
				arr = filter((item) => item.pool === selectedAssignHostGroupPool, hg.maps);
				arr = sortBy(['ip', 'device'], arr);
			}
		});
		return arr;
	}
);

export const countDisksPerPool = createSelector(
	getIpmiForm,
	getSelectedAssignHostGroupPool,
	(form, selectedAssignHostGroupPool) => {
		let arr = [];
		let count = 0;
		const assigned = get('allocations', form);
		const disks = get('disks.disks', form);
		assigned.forEach((hg) => {
			if (hg.maps) {
				arr = filter((item) => item.pool === selectedAssignHostGroupPool, hg.maps);
				arr.forEach((item) => {
					if (item.device === '*') {
						count += disks.length;
					} else {
						count += 1;
					}
				});
			}
		});
		return count;
	}
);

// Only if all fastPool are disabled we should enable the multiple pools
// toggle in IPMI page
export const areAllFastPoolDisabled = createSelector(
	getHostgroups,
	getHostGroupsForm,
	(hostGroups, form) => {
		let allDisabled = true;
		hostGroups.forEach((hostGroup) => {
			if (hostGroup.type === 'storage') {
				const hostGroupName = get('name', hostGroup);
				const hostGroupEnableFastPool =
					'CBIS:host_group_config:Storage:storage_config:enable_fast_pool';
				const val = get(`${hostGroupName}.${hostGroupEnableFastPool}`, form);
				allDisabled = val ? false : allDisabled;
			}
		});
		return allDisabled;
	}
);

export const shouldShowLabelsWithRacks = createSelector(
	getHostgroupSection,
	getHostGroupsForm,
	getSelectedHostGroup,
	(hostGroupSections, hostGroupData, selectedHostGroup) => {
		const hostGroupTypeField = getOr(null, `hostGroupTypeField`, hostGroupSections);
		const caasRolesValues =
			hostGroupTypeField !== null &&
			get(`${selectedHostGroup}_${hostGroupTypeField}`, get(`${selectedHostGroup}`, hostGroupData));

		const values =
			caasRolesValues &&
			caasRolesValues.map((el) => {
				return el.toLowerCase();
			});
		return values && values.includes(STORAGE);
	}
);

export const ipsFilteredByLabelsAndRacks = createSelector(
	getSelectedAssignHostGroup,
	getSelectedAssignHostGroupRack,
	(hostGroup, selectedRack) => {
		let arr = [];
		hostGroup.forEach((hg) => {
			if (hg.rack_location === selectedRack) {
				arr = [...arr, ...hg.pm_addr.map((ip) => ({ id: ip, value: ip }))];
			}
		});
		return arr;
	}
);

export const doAllocationsExist = (state) => {
	return get(ALLOCATIONS_MODEL, state) && get(ALLOCATIONS_MODEL, state).length > 0;
};

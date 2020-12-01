import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, filter } from 'lodash/fp';
import { PropTypes } from 'prop-types';
import { ExpansionPanel } from '@nokia-csf-uxr/csfWidgets';
import * as wizard from 'actions/wizard';
import PoolsPanel from 'components/custom-sections/ipmi-section/PoolsPanel';

const disksModel = `dynamic.content.ipmi_ips.disks`;

class Pools extends Component {
	changeCollapseMode = (key) => () => {
		const { changeCollapseMap } = this.props;
		changeCollapseMap(key);
	};

	render() {
		const {
			name,
			model,
			subSectionName,
			help,
			display,
			wizardSections,
			enabledPools,
			force_multiple_pools,
			defaultPools,
			diskRegexValidation,
			collapseMap,
			validation
		} = this.props;

		const ipmiSection = filter((item) => item.name === 'ipmi_ips', wizardSections);
		const ipmiSubsections = get(`0.subSections`, ipmiSection);
		const diskSubSection = filter((item) => item.name === 'disks', ipmiSubsections);

		return (
			<ExpansionPanel
				id={name}
				key={name}
				height={-1}
				showExpansionGap={false}
				onExpand={this.changeCollapseMode(`${subSectionName}_${name}`)}
				onCollapse={this.changeCollapseMode(`${subSectionName}_${name}`)}>
				<PoolsPanel
					display={display}
					help={help}
					enabledPools={enabledPools}
					force_multiple_pools={force_multiple_pools}
					defaultPools={defaultPools}
					diskSubSection={diskSubSection}
					model={model}
					validation={validation}
					diskRegexValidation={diskRegexValidation}
					isOpen={!collapseMap.get(`${subSectionName}_${name}`)}
				/>
			</ExpansionPanel>
		);
	}
}

Pools.propTypes = {
	name: PropTypes.string,
	model: PropTypes.string,
	help: PropTypes.string,
	display: PropTypes.string,
	subSectionName: PropTypes.string,
	validation: PropTypes.string,
	enabledPools: PropTypes.bool,
	force_multiple_pools: PropTypes.bool,
	wizardSections: PropTypes.instanceOf(Array),
	defaultPools: PropTypes.instanceOf(Array),
	diskRegexValidation: PropTypes.shape({}),
	collapseMap: PropTypes.shape({ get: PropTypes.func }),
	changeCollapseMap: PropTypes.func
};

const mapStateToProps = (store, ownProps) => ({
	enabledPools: get(`dynamic.${ownProps.model}.enabledPools`, store),
	disks: get(`${disksModel}.disks`, store),
	wizardSections: get(`wizard.sections`, store),
	pools: get(`dynamic.${ownProps.model}.pools`, store),
	zonePools: get(`dynamic.content.ipmi_ips.defineZones.zonePool`, store),
	defaultPools: get('wizard.defaultPools', store),
	defaultDisks: get('wizard.defaultDisks', store),
	collapseMap: get('wizard.collapseMap', store)
});

export default connect(mapStateToProps, {
	changeCollapseMap: wizard.changeCollapseMap
})(Pools);

import React, { Component } from 'react';
import { get } from 'lodash/fp';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { ExpansionPanel } from '@nokia-csf-uxr/csfWidgets';
import ZonesPanel from 'components/custom-sections/ipmi-section/ZonesPanel';
import * as wizard from 'actions/wizard';

const poolsModel = `dynamic.content.ipmi_ips.pools`;

class Zones extends Component {
	changeCollapseMode = (key) => () => {
		this.props.changeCollapseMap(key);
	};

	render() {
		const {
			name,
			display,
			pools,
			zones,
			subSectionName,
			model,
			forceMultiplePools,
			validation,
			collapseMap
		} = this.props;
		let poolsArr = [];

		poolsArr = Array.isArray(pools.pools) ? pools.pools : pools.pools.split(',');

		return (
			<ExpansionPanel
				id={name}
				key={name}
				height={-1}
				showExpansionGap={false}
				onExpand={this.changeCollapseMode(`${subSectionName}_${name}`)}
				onCollapse={this.changeCollapseMode(`${subSectionName}_${name}`)}>
				<ZonesPanel
					display={display}
					zones={zones}
					poolsArr={poolsArr}
					validation={validation}
					isOpen={!collapseMap.get(`${subSectionName}_${name}`)}
					model={model}
					forceMultiplePools={forceMultiplePools}
					bmc={get('bmc', this.props)}
				/>
			</ExpansionPanel>
		);
	}
}

Zones.propTypes = {
	model: PropTypes.string,
	name: PropTypes.string,
	display: PropTypes.string,
	subSectionName: PropTypes.string,
	validation: PropTypes.string,
	pools: PropTypes.shape({
		pools: PropTypes.instanceOf(Array),
		enabledPools: PropTypes.bool
	}),
	zones: PropTypes.shape({}),
	collapseMap: PropTypes.shape({ get: PropTypes.func }),
	forceMultiplePools: PropTypes.bool,
	changeCollapseMap: PropTypes.func
};

const mapStateToProps = (store, { model }) => ({
	pools: get(poolsModel, store),
	zones: get(`dynamic.${model}`, store),
	userEnabledPools: get(`dynamic.content.ipmi_ips.pools.enabledPools`, store),
	defaultZones: get('wizard.defaultZones', store),
	collapseMap: get('wizard.collapseMap', store)
});

export default connect(mapStateToProps, {
	changeCollapseMap: wizard.changeCollapseMap
})(Zones);

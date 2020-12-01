import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';
import { PropTypes } from 'prop-types';

import AssignNodesPanel from 'components/custom-sections/ipmi-section/AssignNodesPanel';
import { ExpansionPanel } from '@nokia-csf-uxr/csfWidgets';
import * as wizard from 'actions/wizard';

class AssignNodes extends Component {
	changeCollapseMode = (key) => () => {
		this.props.changeCollapseMap(key);
	};

	render = () => {
		const {
			display,
			fields,
			name,
			unusedIps,
			totalIps,
			subSectionName,
			forceMultiplePools,
			supported_racks,
			readonly_racks,
			storageRoles,
			collapseMap,
			bmc
		} = this.props;
		const hostGroups = get('0.values', fields);
		return (
			<ExpansionPanel
				id={name}
				key={name}
				height={-1}
				showExpansionGap={false}
				onExpand={this.changeCollapseMode(`${subSectionName}_${name}`)}
				onCollapse={this.changeCollapseMode(`${subSectionName}_${name}`)}>
				<AssignNodesPanel
					fields={fields}
					display={display}
					totalIps={totalIps}
					unusedIps={unusedIps}
					hostGroups={hostGroups}
					forceMultiplePools={forceMultiplePools}
					supported_racks={supported_racks}
					readonly_racks={readonly_racks}
					storageRoles={storageRoles}
					isOpen={!collapseMap.get(`${subSectionName}_${name}`)}
					bmc={bmc}
				/>
			</ExpansionPanel>
		);
	};
}

AssignNodes.propTypes = {
	display: PropTypes.string,
	name: PropTypes.string,
	subSectionName: PropTypes.string,
	totalIps: PropTypes.number,
	forceMultiplePools: PropTypes.bool,
	supported_racks: PropTypes.bool,
	readonly_racks: PropTypes.bool,
	storageRoles: PropTypes.instanceOf(Array),
	unusedIps: PropTypes.instanceOf(Array),
	fields: PropTypes.instanceOf(Array),
	collapseMap: PropTypes.shape({ get: PropTypes.func }),
	changeCollapseMap: PropTypes.func
};

const mapStateToProps = (state) => ({
	hostGroupAssignDialogVisible: state.wizard.hostGroupAssignDialogVisible,
	totalIps: get(`dynamic.content.ipmi_ips.ipmiAdd.computed.length`, state),
	allocations: get(`dynamic.content.ipmi_ips.allocations`, state),
	collapseMap: get('wizard.collapseMap', state)
});

export default connect(mapStateToProps, {
	changeCollapseMap: wizard.changeCollapseMap
})(AssignNodes);

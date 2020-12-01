import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import IpRangesEditor from 'components/custom-sections/ipmi-section/IpRangesEditor';
import { ExpansionPanel } from '@nokia-csf-uxr/csfWidgets';
import { get } from 'lodash/fp';
import * as wizard from 'actions/wizard';
import {
	ExpansionPanelLabel,
	DescriptionLabel,
	MarginContainer
} from 'components/StyledComponents';
import Message from 'components/wizard/forms/Message';

const IPMI_WARNING = `If you change the IPMI Addresses list and/or the Availability Zones
          list after you assigned items from these lists to the node groups, all
          your existing node assignments will be lost. In this case, you need to
          re-assign your IPMIs and Availability Zones to the node groups.`;

const IPMI_INFO = `You can use ranges (like: 10.0.0.1 - 10.0.0.20), and/or comma separated values.`;

const TITLE_MSG = `Add your IPMI addresses.`;

const Panel = ({ display, model, isOpen }) => {
	let result;
	if (isOpen) {
		result = (
			<div>
				<ExpansionPanelLabel>{display}</ExpansionPanelLabel>
				<MarginContainer>
					<Message id='ipmi-info' data={IPMI_INFO} severity='info' />
				</MarginContainer>
				<p />
				<MarginContainer>
					<Message id='ipmi-warning' data={IPMI_WARNING} severity='warning' />
				</MarginContainer>

				<DescriptionLabel>{TITLE_MSG}</DescriptionLabel>
				<IpRangesEditor model={model} />
			</div>
		);
	} else {
		result = <ExpansionPanelLabel>{display}</ExpansionPanelLabel>;
	}
	return result;
};

class AddIpmi extends Component {
	changeCollapseMode = (key) => () => {
		const { changeCollapseMap } = this.props;
		changeCollapseMap(key);
	};

	render() {
		const { model, name, display, subSectionName, collapseMap } = this.props;
		return (
			<ExpansionPanel
				id={name}
				key={name}
				height={-1}
				showExpansionGap={false}
				onExpand={this.changeCollapseMode(`${subSectionName}_${name}`)}
				onCollapse={this.changeCollapseMode(`${subSectionName}_${name}`)}>
				<Panel
					display={display}
					model={model}
					isOpen={!collapseMap.get(`${subSectionName}_${name}`)}
				/>
			</ExpansionPanel>
		);
	}
}

AddIpmi.propTypes = {
	model: PropTypes.string,
	name: PropTypes.string,
	display: PropTypes.string,
	subSectionName: PropTypes.string,
	collapseMap: PropTypes.shape({ get: PropTypes.func }),
	changeCollapseMap: PropTypes.func
};

const mapStateToProps = (store) => ({
	collapseMap: get('wizard.collapseMap', store)
});

export default connect(mapStateToProps, {
	changeCollapseMap: wizard.changeCollapseMap
})(AddIpmi);

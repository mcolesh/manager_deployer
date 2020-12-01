import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as wizard from 'actions/wizard';
import { ExpansionPanel } from '@nokia-csf-uxr/csfWidgets';
import RacksPanel from 'components/custom-sections/ipmi-section/RacksPanel';
import { get } from 'lodash/fp';

class Racks extends Component {
	changeCollapseMode = (key) => () => {
		this.props.changeCollapseMap(key);
	};

	render() {
		const {
			name,
			subSectionName,
			display,
			model,
			validation,
			readonly_racks,
			force_racks,
			collapseMap
		} = this.props;
		return (
			<ExpansionPanel
				id={name}
				key={name}
				height={-1}
				showExpansionGap={false}
				onExpand={this.changeCollapseMode(`${subSectionName}_${name}`)}
				onCollapse={this.changeCollapseMode(`${subSectionName}_${name}`)}>
				<RacksPanel
					display={display}
					model={model}
					validation={validation}
					readonly_racks={readonly_racks}
					force_racks={force_racks}
					isOpen={!collapseMap.get(`${subSectionName}_${name}`)}
				/>
			</ExpansionPanel>
		);
	}
}

Racks.propTypes = {
	model: PropTypes.string,
	name: PropTypes.string,
	display: PropTypes.string,
	subSectionName: PropTypes.string,
	validation: PropTypes.string,
	readonly_racks: PropTypes.bool,
	force_racks: PropTypes.bool,
	collapseMap: PropTypes.shape({ get: PropTypes.func }),
	changeCollapseMap: PropTypes.func
};

const mapStateToProps = (store) => ({
	collapseMap: get('wizard.collapseMap', store)
});

export default connect(mapStateToProps, {
	changeCollapseMap: wizard.changeCollapseMap
})(Racks);

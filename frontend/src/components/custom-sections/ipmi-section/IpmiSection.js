import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import AddIpmi from 'components/custom-sections/ipmi-section/AddIpmi';
import Pools from 'components/custom-sections/ipmi-section/Pools';
import Zones from 'components/custom-sections/ipmi-section/Zones';
import Racks from 'components/custom-sections/ipmi-section/Racks';
import AssignNodes from 'components/custom-sections/ipmi-section/AssignNodes';

import { ADD_IPMIS, POOLS, DEFINE_NODES, RACKS, ASSIGN_NODES } from 'constants/ipmi-sub-section';
import { get, filter, getOr } from 'lodash/fp';
import styled from 'styled-components';

const IPMIContainer = styled.div`
	min-width: 800px;
	padding-bottom: 5px;
`;

class IpmiSection extends Component {
	renderSubSection = (
		props,
		supported_hw_pools,
		force_multiple_pools,
		supported_racks,
		readonly_racks,
		force_racks,
		storageRoles
	) => (
		<div key={props.name}>
			{this.renderSubsectionContent(
				props,
				supported_hw_pools,
				force_multiple_pools,
				supported_racks,
				readonly_racks,
				force_racks,
				storageRoles
			)}
		</div>
	);

	renderSubsectionContent(
		props,
		supported_hw_pools,
		force_multiple_pools,
		supported_racks,
		readonly_racks,
		force_racks,
		storageRoles
	) {
		const { name } = this.props;
		const model = `content.${name}.${props.name}`;
		const subSectionName = get('name', this.props);

		switch (props.name) {
			case ADD_IPMIS:
				return <AddIpmi model={model} subSectionName={subSectionName} {...props} />;

			case POOLS: {
				const disksSection = filter({ name: 'disks' }, get('subSections', this.props));
				return supported_hw_pools ? (
					<Pools
						model={model}
						subSectionName={subSectionName}
						diskRegexValidation={get('0', disksSection)}
						{...props}
						force_multiple_pools={force_multiple_pools}
					/>
				) : null;
			}

			case DEFINE_NODES:
				return (
					<Zones
						model={model}
						subSectionName={subSectionName}
						{...props}
						forceMultiplePools={force_multiple_pools}
						bmc={getOr(false, 'bmc', this.props)}
					/>
				);

			case RACKS:
				return supported_racks ? (
					<Racks
						model={model}
						subSectionName={subSectionName}
						readonly_racks={readonly_racks}
						force_racks={force_racks}
						{...props}
					/>
				) : null;

			case ASSIGN_NODES:
				return (
					<AssignNodes
						model={model}
						subSectionName={subSectionName}
						{...props}
						forceMultiplePools={force_multiple_pools}
						supported_racks={supported_racks}
						readonly_racks={readonly_racks}
						storageRoles={storageRoles}
						bmc={getOr(false, 'bmc', this.props)}
					/>
				);

			default:
				return null;
		}
	}

	render() {
		const {
			subSections,
			supported_hw_pools,
			force_multiple_pools,
			supported_racks,
			readonly_racks,
			force_racks,
			storageRoles
		} = this.props;
		return subSections.map((subSection) => {
			return (
				<IPMIContainer key={subSection.name}>
					{this.renderSubSection(
						subSection,
						supported_hw_pools,
						force_multiple_pools,
						supported_racks,
						readonly_racks,
						force_racks,
						storageRoles
					)}
				</IPMIContainer>
			);
		});
	}
}

IpmiSection.propTypes = {
	current: PropTypes.bool,
	supported_hw_pools: PropTypes.bool,
	force_multiple_pools: PropTypes.bool,
	supported_racks: PropTypes.bool,
	readonly_racks: PropTypes.bool,
	force_racks: PropTypes.bool,
	display: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	subSections: PropTypes.instanceOf(Array),
	storageRoles: PropTypes.instanceOf(Array)
};

export default IpmiSection;

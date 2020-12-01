import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, map } from 'lodash/fp';
import { actions } from 'react-redux-form';

import { TextInput, Button, SelectItem, Card, Tooltip } from '@nokia-csf-uxr/csfWidgets';
import {
	DUPLICATE,
	REGEX,
	ADD_ZONE,
	ZONE_WITHOUT_PULL_INFO,
	ZONE_WITH_PULL_INFO,
	ADD_ZONE_BMC,
	ZONE,
	LABEL
} from 'constants/app-captions';
import { regexValidator } from 'utils/validators/regex';
import 'components/custom-sections/ipmi-section/ipmi.css';
import { ExpansionPanelLabel, HeaderLabel } from 'components/StyledComponents';
import Message from 'components/wizard/forms/Message';
import {
	areAllFastPoolDisabled as areAllFastPoolDisabledRef,
	doAllocationsExist as doAllocationsExistRef
} from 'selectors/ipmi';
import { SCALE_OUT_WIZARD_NAME } from 'constants/app-constants';
import { POOLS_MODEL } from 'constants/ipmi-sub-section';
import { showResetAllocationsWarning as showResetAllocationsWarningRef } from 'actions/wizard';
import PropTypes from 'prop-types';

const NewZoneContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: baseline;
	margin-top: 18px;
`;

const ZonePoolsContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

const AddZoneLabel = styled.p`
	margin-right: 10px;
`;

const CardsContainer = styled.div`
	margin: 10px;
`;

const DeleteZoneBtn = styled.div`
	position: absolute;
	bottom: 16%;
	left: 40%;
`;

class ZonesPanel extends Component {
	constructor(props) {
		super(props);
		this.state = { newZone: '', newZoneValid: false, errorMessage: '', dirty: false };
	}

	onChangeNewZone = ({ value }) => {
		this.setState({ newZone: value });
		this.invokeItemValidators(value, false);
	};

	onAddingNewZone = (value) => () => {
		this.setState({ dirty: true });
		this.invokeItemValidators(value, true);
	};

	addNewZoneAfterValidation = (value) => {
		const { model, push } = this.props;
		const { newZoneValid } = this.state;
		if (newZoneValid) {
			push(`dynamic.${model}.zones`, value);
			this.setState({ newZone: '', dirty: false });
		}
	};

	onRemoveZone = (zoneIndex) => {
		const { remove, model, doAllocationsExist, showResetAllocationsWarning } = this.props;
		if (doAllocationsExist) {
			const action = { operation: 'remove', model: `dynamic.${model}.zones`, value: zoneIndex };
			showResetAllocationsWarning(true, action);
		} else {
			remove(`dynamic.${model}.zones`, zoneIndex);
		}
	};

	handleZonePoolChange = (zone, { value }) => {
		const { zones, change, model } = this.props;
		const zonePool = { ...get(`zonePool`, zones) };
		zonePool[zone] = value;
		change(`dynamic.${model}.zonePool`, zonePool);
	};

	invokeItemValidators(value, callAddHandler = false) {
		const { zones } = this.props;
		// check if empty
		if (value === '') {
			this.setState({ newZoneValid: false, errorMessage: '' }, () => {
				if (callAddHandler) {
					this.addNewZoneAfterValidation(value);
				}
			});
		}
		// validate regex
		else if (regexValidator(this.props, value) === 'Regex invalid') {
			this.setState({ newZoneValid: false, errorMessage: REGEX }, () => {
				if (callAddHandler) {
					this.addNewZoneAfterValidation(value);
				}
			});
		}
		// validate duplicates
		else if (get(`zones`, zones).includes(value)) {
			this.setState({ newZoneValid: false, errorMessage: DUPLICATE }, () => {
				if (callAddHandler) {
					this.addNewZoneAfterValidation(value);
				}
			});
		} else {
			this.setState({ newZoneValid: true, errorMessage: '' }, () => {
				if (callAddHandler) {
					this.addNewZoneAfterValidation(value);
				}
			});
		}
	}

	renderZonePool = (zone, pools, enabledPools, zoneIndex, areAllFastPoolDisabled) => {
		const {
			zones,
			forceMultiplePools,
			defaultZones = [],
			wizardName,
			userEnabledPools
		} = this.props;
		const cardLabel = get('bmc', this.props) === true ? LABEL : ZONE;
		const zonePool = get(`zonePool`, zones);
		const notEditable = wizardName === SCALE_OUT_WIZARD_NAME && defaultZones.includes(zone);
		const showZonePoolCondition =
			forceMultiplePools || (enabledPools && areAllFastPoolDisabled && userEnabledPools);

		return (
			<CardsContainer key={zone}>
				<Card
					id={zone}
					className='csfWidgets-card'
					selectable={false}
					css={showZonePoolCondition ? { height: 160, width: 224 } : { height: 90, width: 224 }}>
					<HeaderLabel id={`card-title-${zone}`} showEllipsis>
						{`${cardLabel}: ${zone}`}
					</HeaderLabel>
					{showZonePoolCondition && (
						<SelectItem
							id='ZoneSelect'
							options={map((value) => ({ value, label: value }), pools)}
							selectedItem={zonePool[zone]}
							placeholder='Map pool to zone ...'
							onChange={(pool) => this.handleZonePoolChange(zone, pool)}
							maxWidth={200}
							minWidth={50}
							width={172}
						/>
					)}
					<DeleteZoneBtn>
						<Button
							id={`card-btn-${zone}`}
							icon='ic_delete'
							onClick={() => this.onRemoveZone(zoneIndex)}
							disabled={notEditable}
						/>
					</DeleteZoneBtn>
				</Card>
				<Tooltip text={`${cardLabel}: ${zone}`} target={`#card-title-${zone}`} />
			</CardsContainer>
		);
	};

	renderAddZone = () => {
		const { newZone, errorMessage, dirty } = this.state;
		const { pools, userEnabledPools } = this.props;
		const zonesWithoutPoolsMsg =
			get('bmc', this.props) === true ? null : (
				<Message id='zone-without-pool-info' data={ZONE_WITHOUT_PULL_INFO} severity='info' />
			);

		return (
			<NewZoneContainer>
				{get(`enabledPools`, pools) && userEnabledPools ? (
					<Message id='zone-with-pool-info' data={ZONE_WITH_PULL_INFO} severity='info' />
				) : (
					zonesWithoutPoolsMsg
				)}

				<InputContainer>
					<AddZoneLabel>{get('bmc', this.props) === true ? ADD_ZONE_BMC : ADD_ZONE}</AddZoneLabel>
					<TextInput
						id='add-zone-textInput'
						text={newZone}
						onChange={this.onChangeNewZone}
						onSubmit={this.onAddingNewZone(newZone)}
						error={dirty && errorMessage !== ''}
						errorMsg={errorMessage}
					/>
					<Button
						text='Add'
						id='add-zone-btn'
						onClick={this.onAddingNewZone(newZone)}
						isCallToAction
					/>
				</InputContainer>
			</NewZoneContainer>
		);
	};

	render() {
		const { display, pools, zones, areAllFastPoolDisabled, poolsArr, isOpen } = this.props;
		let result;
		if (isOpen) {
			result = (
				<div>
					<ExpansionPanelLabel>{display}</ExpansionPanelLabel>
					{this.renderAddZone()}
					<ZonePoolsContainer>
						{get(`zones`, zones).map((zone, zoneIndex) =>
							this.renderZonePool(
								zone,
								poolsArr,
								get(`enabledPools`, pools),
								zoneIndex,
								areAllFastPoolDisabled
							)
						)}
					</ZonePoolsContainer>
				</div>
			);
		} else {
			result = <ExpansionPanelLabel>{display}</ExpansionPanelLabel>;
		}
		return result;
	}
}

ZonesPanel.propTypes = {
	model: PropTypes.string,
	display: PropTypes.string,
	wizardName: PropTypes.string,
	pools: PropTypes.shape({}),
	zones: PropTypes.shape({}),
	poolsArr: PropTypes.instanceOf(Array),
	defaultZones: PropTypes.instanceOf(Array),
	areAllFastPoolDisabled: PropTypes.bool,
	forceMultiplePools: PropTypes.bool,
	userEnabledPools: PropTypes.bool,
	doAllocationsExist: PropTypes.bool,
	isOpen: PropTypes.bool,
	push: PropTypes.func,
	change: PropTypes.func,
	remove: PropTypes.func,
	showResetAllocationsWarning: PropTypes.func
};

const mapStateToProps = (store, { model }) => ({
	pools: get(POOLS_MODEL, store),
	zones: get(`dynamic.${model}`, store),
	userEnabledPools: get(`${POOLS_MODEL}.enabledPools`, store),
	areAllFastPoolDisabled: areAllFastPoolDisabledRef(store),
	defaultZones: get('wizard.defaultZones', store),
	wizardName: get('wizard.name', store),
	doAllocationsExist: doAllocationsExistRef(store)
});

export default connect(mapStateToProps, {
	change: actions.change,
	remove: actions.remove,
	push: actions.push,
	setFormErrors: actions.setErrors,
	showResetAllocationsWarning: showResetAllocationsWarningRef
})(ZonesPanel);

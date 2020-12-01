import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	ExpansionPanelLabel,
	ItemsContainer,
	ChipsItemsContainer,
	MarginContainer
} from 'components/StyledComponents';
import { PropTypes } from 'prop-types';
import { Button, Chips, Label, TextInput, ToggleSwitch } from '@nokia-csf-uxr/csfWidgets';
import * as wizardActions from 'actions/wizard';
import Message from 'components/wizard/forms/Message';
import { findIndex, get } from 'lodash/fp';
import { ADD_RACK, REGEX, DUPLICATE } from 'constants/app-captions';
import styled from 'styled-components';
import 'components/custom-sections/ipmi-section/ipmi.css';
import { regexValidator } from 'utils/validators/regex';
import { actions } from 'react-redux-form';
import { doAllocationsExist as doAllocationsExistRef } from 'selectors/ipmi';
import {
	ENABLE_POOL_MSG,
	POOLS_MODEL,
	FORCE_RACKS_PATH,
	RACKS_MODEL
} from 'constants/ipmi-sub-section';

const AddRackSection = styled.div`
	display: flex;
	flex-direction: row;
	align-items: baseline;
`;

const AddRackLabel = styled.div`
	margin-right: 10px;
`;

const RackChipContainer = styled.div`
	margin-bottom: 4px;
	${({ isReadOnly }) => (isReadOnly ? 'pointer-events: none' : 'pointer-events: visible')};
`;

class RacksPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newRack: '',
			newRackValid: false,
			errorMessage: '',
			dirty: false
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { isPoolEnabled, changeRackSwitchStatus } = this.props;
		if (nextProps.isPoolEnabled && !isPoolEnabled) {
			changeRackSwitchStatus(false);
		}
	}

	OnEnableRacksChange = ({ value }) => {
		const { force_racks, readonly_racks } = this.props;
		if (value === false && force_racks && readonly_racks) {
			return true;
		}
		const {
			changeRackSwitchStatus,
			change,
			doAllocationsExist,
			showResetAllocationsWarning
		} = this.props;
		if (doAllocationsExist) {
			const action = { operation: 'change', model: FORCE_RACKS_PATH, value };
			showResetAllocationsWarning(true, action);
		} else {
			changeRackSwitchStatus(value);
			change(FORCE_RACKS_PATH, value);
		}
	};

	onChangeNewRack = ({ value }) => {
		this.setState({ newRack: value });
		this.invokeItemValidators(value, false);
	};

	addNewRackAfterValidation = (value) => {
		const { newRackValid } = this.state;
		const { push } = this.props;
		if (newRackValid) {
			push(`${RACKS_MODEL}.racks`, value);
			this.setState({ newRack: '', dirty: false });
		}
	};

	onAddNewRack = (value) => () => {
		this.setState({ dirty: true });
		this.invokeItemValidators(value, true);
	};

	removeRack = (rackIndex) => {
		const { remove, doAllocationsExist, showResetAllocationsWarning } = this.props;
		if (doAllocationsExist) {
			const action = { operation: 'remove', model: `${RACKS_MODEL}.racks`, value: rackIndex };
			showResetAllocationsWarning(true, action);
		} else {
			remove(`${RACKS_MODEL}.racks`, rackIndex);
		}
	};

	invokeItemValidators(value, callAddHandler = false) {
		const { racks } = this.props;
		// empty value
		if (value === '') {
			this.setState({ newRackValid: false, errorMessage: '' });
		}
		// regex validation
		else if (regexValidator(this.props, value) === 'Regex invalid') {
			this.setState({ newRackValid: false, errorMessage: REGEX });
		}
		// duplicate value
		else if (racks.includes(value)) {
			this.setState({ newRackValid: false, errorMessage: DUPLICATE });
		} else {
			this.setState({ newRackValid: true, errorMessage: '' }, () => {
				if (callAddHandler) {
					this.addNewRackAfterValidation(value);
				}
			});
		}
	}

	renderAddRack() {
		const { newRack, errorMessage, dirty } = this.state;
		const { racks, readonly_racks } = this.props;
		return (
			<AddRackSection>
				<AddRackLabel>{ADD_RACK}</AddRackLabel>
				<TextInput
					id='add-rack-textInput'
					text={newRack}
					onChange={this.onChangeNewRack}
					onSubmit={this.onAddNewRack(newRack)}
					error={dirty && errorMessage !== ''}
					errorMsg={errorMessage}
				/>
				<Button text='Add' id='add-rack-btn' onClick={this.onAddNewRack(newRack)} isCallToAction />

				<ItemsContainer>
					<ChipsItemsContainer>
						{racks.map((rack, rackIndex) => this.renderRack(rack, rackIndex, readonly_racks))}
					</ChipsItemsContainer>
				</ItemsContainer>
			</AddRackSection>
		);
	}

	renderRack = (rack, index, readonly = false) => {
		const { defaultRacks } = this.props;
		const isNewRack =
			readonly && findIndex((item) => item === rack, defaultRacks) >= 0 ? true : false;
		return (
			<RackChipContainer key={`rackChip-${rack}-${index}`} isReadOnly={isNewRack}>
				<Chips
					key={`rackChip-${rack}-${index}`}
					text={rack}
					showCloseButton={!isNewRack}
					internalIcon='ic_add_circle'
					closeInternalIcon='ic_close_circle'
					editable={false}
					onCloseClick={() => this.removeRack(index)}
				/>
			</RackChipContainer>
		);
	};

	render() {
		const { isOpen, display, isPoolEnabled, isRackSwitchEnabled } = this.props;

		let panelData;
		if (isOpen) {
			panelData = (
				<div>
					<ExpansionPanelLabel>{display}</ExpansionPanelLabel>
					<div>
						{isPoolEnabled && (
							<MarginContainer>
								<Message id='enable-racks-msg' data={ENABLE_POOL_MSG} severity='info' />
							</MarginContainer>
						)}
						<Label text='Enable Racks' />
						<ToggleSwitch
							id='enable-racks-switch'
							label=''
							checked={isRackSwitchEnabled}
							onChange={this.OnEnableRacksChange}
							disabled={isPoolEnabled}
						/>
					</div>

					{isRackSwitchEnabled && this.renderAddRack()}
				</div>
			);
		} else {
			panelData = <ExpansionPanelLabel>{display}</ExpansionPanelLabel>;
		}
		return panelData;
	}
}

RacksPanel.propTypes = {
	isOpen: PropTypes.bool,
	isPoolEnabled: PropTypes.bool,
	isRackSwitchEnabled: PropTypes.bool,
	readonly_racks: PropTypes.bool,
	force_racks: PropTypes.bool,
	doAllocationsExist: PropTypes.bool,
	display: PropTypes.string,
	defaultRacks: PropTypes.instanceOf(Array),
	racks: PropTypes.instanceOf(Array),
	remove: PropTypes.func,
	change: PropTypes.func,
	push: PropTypes.func,
	changeRackSwitchStatus: PropTypes.func,
	showResetAllocationsWarning: PropTypes.func
};

const mapStateToProps = (store) => ({
	isPoolEnabled: get(`${POOLS_MODEL}.enabledPools`, store),
	racks: get(`${RACKS_MODEL}.racks`, store),
	defaultRacks: get('wizard.defaultRacks', store),
	isRackSwitchEnabled: get('wizard.isRackSwitchEnabled', store),
	doAllocationsExist: doAllocationsExistRef(store)
});

export default connect(mapStateToProps, {
	push: actions.push,
	remove: actions.remove,
	change: actions.change,
	changeRackSwitchStatus: wizardActions.changeRackSwitchStatus,
	showResetAllocationsWarning: wizardActions.showResetAllocationsWarning
})(RacksPanel);

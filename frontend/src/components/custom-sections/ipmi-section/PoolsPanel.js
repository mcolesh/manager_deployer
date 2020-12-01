import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, findIndex, isEqual } from 'lodash/fp';
import { Label, ToggleSwitch, Button, TextInput, Chips } from '@nokia-csf-uxr/csfWidgets';
import { actions } from 'react-redux-form';
import {
	DUPLICATE,
	REGEX,
	ENABLE_POOL_MSG,
	ENABLE_POOL_MSG_WITH_RACKS
} from 'constants/app-captions';
import { regexValidator } from 'utils/validators/regex';
import {
	ExpansionPanelLabel,
	DescriptionLabel,
	ItemsContainer,
	ChipsItemsContainer,
	MarginContainer
} from 'components/StyledComponents';
import Message from 'components/wizard/forms/Message';
import 'components/custom-sections/ipmi-section/ipmi.css';
import {
	areAllFastPoolDisabled as areAllFastPoolDisabledRef,
	doAllocationsExist as doAllocationsExistRef
} from 'selectors/ipmi';
import { DISKS_MODEL, POOLS_MODEL } from 'constants/ipmi-sub-section';
import { showResetAllocationsWarning as showResetAllocationsWarningRef } from 'actions/wizard';
import PropTypes from 'prop-types';

const ChipContainer = styled.div`
	${({ isReadOnly }) => (isReadOnly ? 'pointer-events: none' : 'pointer-events: visible')};
	margin-bottom: 4px;
`;

const Container = styled.div`
	${({ visible }) => (visible ? 'display: initial' : 'display: none')};
`;

const ExistingPoolsContainer = styled.div`
	display: flex;
`;

const AddPoolContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: baseline;
`;

class PoolsPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newPool: '',
			newDisk: '',
			newPoolValid: false,
			newDiskValid: false,
			errorMessagePool: '',
			errorMessageDisk: '',
			dirtyPool: false,
			dirtyDisk: false
		};
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		const { pools } = this.props;
		if (newProps.pools.length !== pools.length) {
			this.validatePoolZoneMapping(newProps.pools);
		}
	}

	onRemovePool = (poolIndex) => {
		const { remove, doAllocationsExist, showResetAllocationsWarning } = this.props;
		if (doAllocationsExist) {
			const action = { operation: 'remove', model: `${POOLS_MODEL}.pools`, value: poolIndex };
			showResetAllocationsWarning(true, action);
		} else {
			remove(`${POOLS_MODEL}.pools`, poolIndex);
		}
	};

	onRemoveDisk = (diskIndex) => {
		const { remove, doAllocationsExist, showResetAllocationsWarning } = this.props;
		if (doAllocationsExist) {
			const action = { operation: 'remove', model: `${DISKS_MODEL}.disks`, value: diskIndex };
			showResetAllocationsWarning(true, action);
		} else {
			remove(`${DISKS_MODEL}.disks`, diskIndex);
		}
	};

	addNewPoolAfterValidation = (value) => {
		const { push } = this.props;
		const { newPoolValid } = this.state;
		if (newPoolValid) {
			push(`${POOLS_MODEL}.pools`, value);
			this.setState({ newPool: '', dirtyPool: false });
		}
	};

	addNewDiskAfterValidation = (value) => {
		const { newDiskValid } = this.state;
		const { push } = this.props;
		if (newDiskValid) {
			push(`${DISKS_MODEL}.disks`, value);
			this.setState({ newDisk: '', dirtyDisk: false });
		}
	};

	onChangeNewPool = ({ value }) => {
		this.setState({ newPool: value });
		this.invokeItemValidators(value, false, 'pool');
	};

	onChangeNewDisk = ({ value }) => {
		this.setState({ newDisk: value });
		this.invokeItemValidators(value, false, 'disk');
	};

	validatePoolZoneMapping = (newPools) => {
		const { zonePools, change } = this.props;
		const zonePool = { ...zonePools };
		for (var k in zonePools) {
			if (typeof zonePools[k] !== 'function') {
				// eslint-disable-next-line
				if (findIndex((o) => o === zonePools[k], newPools) === -1) {
					delete zonePool[k];
				}
			}
		}
		if (!isEqual(zonePools, zonePool)) {
			change(`dynamic.content.ipmi_ips.defineZones.zonePool`, zonePool);
		}
	};

	onAddingNewPool = (value) => () => {
		this.setState({ dirtyPool: true });
		this.invokeItemValidators(value, true, 'pool');
	};

	onAddingNewDisk = (value) => () => {
		this.setState({ dirtyDisk: true });
		this.invokeItemValidators(value, true, 'disk');
	};

	handleEnablePools = ({ value }) => {
		const {
			change,
			areAllFastPoolDisabled,
			disks,
			doAllocationsExist,
			defaultDisks,
			showResetAllocationsWarning
		} = this.props;
		if (doAllocationsExist) {
			const action = { operation: 'change', model: `${POOLS_MODEL}.enabledPools`, value };
			showResetAllocationsWarning(true, action);
		} else {
			change(`${POOLS_MODEL}.enabledPools`, value);

			// if the user enable pools, and default disks are not in the list, load
			// them. They can disapear if the user enable fast_ceph_pool in storage
			// section
			if (areAllFastPoolDisabled && disks.length === 0) {
				change(`${DISKS_MODEL}.disks`, [...defaultDisks]);
			}
		}
	};

	invokeItemValidators(value, callAddHandler = false, item) {
		if (value === '') {
			item === 'pool'
				? this.setState({ newPoolValid: false, errorMessagePool: '' }, () => {
						if (callAddHandler) {
							this.addNewPoolAfterValidation(value);
						}
				  })
				: this.setState({ newDiskValid: false, errorMessageDisk: '' }, () => {
						if (callAddHandler) {
							this.addNewDiskAfterValidation(value);
						}
				  });
		}
		// validate regex
		else if (item === 'pool' && regexValidator(this.props, value) === 'Regex invalid') {
			this.setState({ newPoolValid: false, errorMessagePool: REGEX }, () => {
				if (callAddHandler) {
					this.addNewPoolAfterValidation(value);
				}
			});
		} else if (
			item === 'disk' &&
			regexValidator(this.props.diskRegexValidation, value) === 'Regex invalid'
		) {
			this.setState({ newDiskValid: false, errorMessageDisk: REGEX }, () => {
				if (callAddHandler) {
					this.addNewDiskAfterValidation(value);
				}
			});
		}
		// validate duplicates
		else if (item === 'pool' && this.props.pools.includes(value)) {
			this.setState({ newPoolValid: false, errorMessagePool: DUPLICATE }, () => {
				if (callAddHandler) {
					this.addNewPoolAfterValidation(value);
				}
			});
		} else if (item !== 'pool' && this.props.disks.includes(value)) {
			this.setState({ newDiskValid: false, errorMessageDisk: DUPLICATE }, () => {
				if (callAddHandler) {
					this.addNewDiskAfterValidation(value);
				}
			});
		} else {
			item === 'pool'
				? this.setState({ newPoolValid: true, errorMessagePool: '' }, () => {
						if (callAddHandler) {
							this.addNewPoolAfterValidation(value);
						}
				  })
				: this.setState({ newDiskValid: true, errorMessageDisk: '' }, () => {
						if (callAddHandler) {
							this.addNewDiskAfterValidation(value);
						}
				  });
		}
	}

	renderAddItem(item, showOnlyItems = [], filterItems = [], readonly = false) {
		const {
			newPool,
			newDisk,
			errorMessagePool,
			errorMessageDisk,
			dirtyPool,
			dirtyDisk
		} = this.state;
		const { pools, disks } = this.props;

		return (
			<AddPoolContainer>
				{!readonly ? (
					<TextInput
						id={`input_${item}`}
						key={`input_${item}`}
						text={item === 'pool' ? newPool : newDisk}
						onChange={item === 'pool' ? this.onChangeNewPool : this.onChangeNewDisk}
						onSubmit={
							item === 'pool' ? this.onAddingNewPool(newPool) : this.onAddingNewDisk(newDisk)
						}
						error={
							(item === 'disk' && dirtyDisk && errorMessageDisk !== '') ||
							(item === 'pool' && !readonly && dirtyPool && errorMessagePool !== '')
						}
						errorMsg={item === 'disk' ? errorMessageDisk : errorMessagePool}
					/>
				) : null}
				{!readonly ? (
					<Button
						key={`button_${item}`}
						id='add-pool-btn'
						text='Add'
						isCallToAction
						onClick={
							item === 'pool' ? this.onAddingNewPool(newPool) : this.onAddingNewDisk(newDisk)
						}
					/>
				) : null}

				<ItemsContainer>
					{item === 'pool' ? (
						<ChipsItemsContainer>
							{pools.map((pool, poolIndex) =>
								this.renderItem(pool, poolIndex, 'pool', showOnlyItems, filterItems, readonly)
							)}
						</ChipsItemsContainer>
					) : (
						<ChipsItemsContainer>
							{disks.map((disk, diskIndex) => this.renderItem(disk, diskIndex, 'disk', readonly))}
						</ChipsItemsContainer>
					)}
				</ItemsContainer>
			</AddPoolContainer>
		);
	}

	renderItem = (ip, ipIndex, type, showOnlyItems, filterItems = [], readonly) => {
		if (showOnlyItems && showOnlyItems.length > 0) {
			return showOnlyItems.indexOf(ip) === -1 ? null : (
				<ChipContainer isReadOnly={readonly} key={`${ip}_${ipIndex}_container1`}>
					<Chips
						key={`${ip}_${ipIndex}_${readonly}`}
						text={ip}
						showCloseButton={!readonly}
						internalIcon='ic_add_circle'
						closeInternalIcon='ic_close_circle'
						editable={false}
						onCloseClick={() => this.onRemovePool(ipIndex)}
					/>
				</ChipContainer>
			);
		} else {
			return filterItems.indexOf(ip) > -1 ? null : (
				<ChipContainer isReadOnly={readonly} key={`${ip}_${ipIndex}_container2`}>
					<Chips
						key={`${ip}_${ipIndex}_${readonly}`}
						text={ip}
						showCloseButton={!readonly}
						internalIcon='ic_add_circle'
						closeInternalIcon='ic_close_circle'
						editable={false}
						onCloseClick={() =>
							type === 'pool' ? this.onRemovePool(ipIndex) : this.onRemoveDisk(ipIndex)
						}
					/>
				</ChipContainer>
			);
		}
	};

	render() {
		const {
			display,
			help,
			areAllFastPoolDisabled,
			enabledPools,
			force_multiple_pools,
			defaultPools,
			diskSubSection,
			isOpen,
			isRackSwitchEnabled
		} = this.props;

		let result;
		if (isOpen) {
			result = (
				<div>
					<ExpansionPanelLabel>{display}</ExpansionPanelLabel>
					{(!areAllFastPoolDisabled || isRackSwitchEnabled) && (
						<MarginContainer>
							<Message
								id='enable-pool-msg'
								data={!areAllFastPoolDisabled ? ENABLE_POOL_MSG : ENABLE_POOL_MSG_WITH_RACKS}
								severity='info'
							/>
						</MarginContainer>
					)}
					<div>
						<Label text={display} />
						<ToggleSwitch
							id='multiple-ips-switch'
							checked={force_multiple_pools || (areAllFastPoolDisabled && enabledPools)}
							onChange={this.handleEnablePools}
							disabled={!areAllFastPoolDisabled || force_multiple_pools || isRackSwitchEnabled}
							label=''
						/>
					</div>
					<Container visible={force_multiple_pools || (enabledPools && areAllFastPoolDisabled)}>
						<DescriptionLabel>{help}</DescriptionLabel>
						{force_multiple_pools ? (
							<div>
								<ExistingPoolsContainer>
									<DescriptionLabel>Existing Pools: </DescriptionLabel>
									{this.renderAddItem('pool', defaultPools, [], force_multiple_pools)}
								</ExistingPoolsContainer>
								{this.renderAddItem('pool', [], defaultPools)}
							</div>
						) : (
							<div>{this.renderAddItem('pool')}</div>
						)}
						<DescriptionLabel>{get(`0.display`, diskSubSection)}</DescriptionLabel>
						<DescriptionLabel>{get(`0.help`, diskSubSection)}</DescriptionLabel>
						{this.renderAddItem('disk')}
					</Container>
				</div>
			);
		} else {
			result = <ExpansionPanelLabel>{display}</ExpansionPanelLabel>;
		}
		return result;
	}
}

PoolsPanel.propTypes = {
	pools: PropTypes.instanceOf(Array),
	disks: PropTypes.instanceOf(Array),
	defaultPools: PropTypes.instanceOf(Array),
	defaultDisks: PropTypes.instanceOf(Array),
	diskSubSection: PropTypes.instanceOf(Array),
	zonePools: PropTypes.shape({}),
	display: PropTypes.string,
	help: PropTypes.string,
	areAllFastPoolDisabled: PropTypes.bool,
	enabledPools: PropTypes.bool,
	force_multiple_pools: PropTypes.bool,
	isOpen: PropTypes.bool,
	isRackSwitchEnabled: PropTypes.bool,
	doAllocationsExist: PropTypes.bool,
	remove: PropTypes.func,
	push: PropTypes.func,
	change: PropTypes.func,
	showResetAllocationsWarning: PropTypes.func
};

const mapStateToProps = (store, ownProps) => ({
	enabledPools: get(`dynamic.${ownProps.model}.enabledPools`, store),
	disks: get(`${DISKS_MODEL}.disks`, store),
	wizardSections: get(`wizard.sections`, store),
	pools: get(`${POOLS_MODEL}.pools`, store),
	zonePools: get(`dynamic.content.ipmi_ips.defineZones.zonePool`, store),
	areAllFastPoolDisabled: areAllFastPoolDisabledRef(store),
	defaultPools: get('wizard.defaultPools', store),
	defaultDisks: get('wizard.defaultDisks', store),
	isRackSwitchEnabled: get('wizard.isRackSwitchEnabled', store),
	doAllocationsExist: doAllocationsExistRef(store)
});

export default connect(mapStateToProps, {
	change: actions.change,
	setFormErrors: actions.setErrors,
	push: actions.push,
	remove: actions.remove,
	showResetAllocationsWarning: showResetAllocationsWarningRef
})(PoolsPanel);

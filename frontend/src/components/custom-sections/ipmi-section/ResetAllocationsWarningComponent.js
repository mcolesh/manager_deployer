import React, { Component } from 'react';
import { AlertDialogWarning } from '@nokia-csf-uxr/csfWidgets';
import { PropTypes } from 'prop-types';
import { WARNING, YES, NO } from 'constants/app-constants';
import {
	IPMI_RESET_ALLOCATIONS_WARNING_MESSAGE,
	ALLOCATIONS_MODEL,
	DISKS_MODEL,
	FORCE_RACKS_PATH
} from 'constants/ipmi-sub-section';
import { get, map } from 'lodash/fp';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import {
	showResetAllocationsWarning as showAllocationsWarning,
	changeRackSwitchStatus as setRackSwitchValue,
	setIpRangeEditMode as setIpRangesValue
} from 'actions/wizard';
import { areAllFastPoolDisabled as areAllFastPoolDisabledRef } from 'selectors/ipmi';

class ResetAllocationsWarningDialog extends Component {
	onCancel = () => {
		this.resetParams();
	};

	onConfirm = () => {
		const {
			resetAllocationsAction,
			change,
			form,
			setErrors,
			remove,
			areAllFastPoolDisabled,
			disks,
			defaultDisks,
			changeRackSwitchStatus,
			setIpRangeEditMode
		} = this.props;
		const { operation, model, value, validators } = resetAllocationsAction;

		switch (operation) {
			case 'change':
				change(model, value, { form });
				// in case of caas_role storage select
				// verifying required validator if exists
				if (validators && validators.length > 0) {
					const validatorsValue = map(
						(validator) => validator({ required: true }, value),
						validators
					);
					setErrors(model, validatorsValue);
				} else if (model.includes('enabledPools')) {
					if (areAllFastPoolDisabled && disks.length === 0) {
						change(`${DISKS_MODEL}.disks`, [...defaultDisks]);
					}
				} else if (model === FORCE_RACKS_PATH) {
					changeRackSwitchStatus(value);
				}
				break;
			case 'remove':
				remove(model, value);
				break;
			case 'setIpRangeMode':
				setIpRangeEditMode(value);
				break;
			default:
				break;
		}
		change(ALLOCATIONS_MODEL, []);
		this.resetParams();
	};

	resetParams = () => {
		const { showResetAllocationsWarning } = this.props;
		showResetAllocationsWarning(false, {});
	};

	render() {
		return (
			<AlertDialogWarning
				title={WARNING}
				warningText1={IPMI_RESET_ALLOCATIONS_WARNING_MESSAGE}
				cancelButtonLabel={NO}
				buttonLabel={YES}
				onCancel={() => this.onCancel()}
				onClose={() => this.onConfirm()}
				trapFocus
			/>
		);
	}
}

ResetAllocationsWarningDialog.propTypes = {
	resetAllocationsAction: PropTypes.shape({
		operation: PropTypes.string,
		model: PropTypes.string,
		value: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.bool,
			PropTypes.array
		]),
		validators: PropTypes.array
	}),
	form: PropTypes.shape({}),
	areAllFastPoolDisabled: PropTypes.bool,
	disks: PropTypes.instanceOf(Array),
	defaultDisks: PropTypes.instanceOf(Array),
	showResetAllocationsWarning: PropTypes.func,
	changeRackSwitchStatus: PropTypes.func,
	setIpRangeEditMode: PropTypes.func,
	change: PropTypes.func,
	setErrors: PropTypes.func,
	remove: PropTypes.func
};

const mapStateToProps = (state) => ({
	resetAllocationsAction: get('wizard.resetAllocationsAction', state),
	form: get('dynamic.content', state),
	areAllFastPoolDisabled: areAllFastPoolDisabledRef(state),
	defaultDisks: get('wizard.defaultDisks', state),
	disks: get(`${DISKS_MODEL}.disks`, state)
});

export default connect(mapStateToProps, {
	change: actions.change,
	setErrors: actions.setErrors,
	remove: actions.remove,
	showResetAllocationsWarning: showAllocationsWarning,
	changeRackSwitchStatus: setRackSwitchValue,
	setIpRangeEditMode: setIpRangesValue
})(ResetAllocationsWarningDialog);

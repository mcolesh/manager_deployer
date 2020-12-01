import React, { Component } from 'react';
import { ToggleSwitch } from '@nokia-csf-uxr/csfWidgets';
import { get } from 'lodash/fp';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import PropTypes from 'prop-types';
import { doAllocationsExist as doAllocationsExistRef } from 'selectors/ipmi';
import { showResetAllocationsWarning as showResetAllocationsWarningRef } from 'actions/wizard';

class Switch extends Component {
	handleChange = ({ value }) => {
		const {
			change,
			model,
			form,
			ipmiFactor,
			doAllocationsExist,
			showResetAllocationsWarning
		} = this.props;
		if (ipmiFactor && doAllocationsExist && value) {
			const action = { operation: 'change', model, value };
			showResetAllocationsWarning(true, action);
		} else {
			change(model, value, { form });
		}
	};

	render() {
		const { name, checked, readonly } = this.props;
		return (
			<ToggleSwitch
				id={name}
				checked={checked}
				onChange={this.handleChange}
				disabled={readonly}
				label=''
			/>
		);
	}
}

Switch.propTypes = {
	model: PropTypes.string,
	name: PropTypes.string,
	checked: PropTypes.bool,
	readonly: PropTypes.bool,
	ipmiFactor: PropTypes.bool,
	doAllocationsExist: PropTypes.bool,
	form: PropTypes.shape({}),
	showResetAllocationsWarning: PropTypes.func,
	change: PropTypes.func
};

const mapStateToProps = (state, { path, preForm = 'dynamic.content' }) => ({
	checked: get(`${preForm}.${path}`, state),
	form: get(preForm, state),
	doAllocationsExist: doAllocationsExistRef(state)
});

export default connect(mapStateToProps, {
	change: actions.change,
	showResetAllocationsWarning: showResetAllocationsWarningRef
})(Switch);

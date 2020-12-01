import React, { Component } from 'react';
import { get, map, getOr } from 'lodash/fp';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { Spinner } from '@nokia-csf-uxr/csfWidgets';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import PropTypes from 'prop-types';

import { getFieldErrorMessages } from 'utils/wizard';
import './FieldsStyle.css';
import {
	DEFAULT_DEBOUNCE_SUSPEND,
	MAX_SAFE_INTEGER,
	MIN_SAFE_INTEGER
} from 'constants/app-constants';

class Number extends Component {
	setValidity(value) {
		const { validators, model, setErrors } = this.props;
		const numberErrors = map((validator) => validator(this.props, value), validators);

		setErrors(model, numberErrors);
	}

	setValidityDebounced = AwesomeDebouncePromise(
		this.setValidity.bind(this),
		DEFAULT_DEBOUNCE_SUSPEND,
		// Use a key to create distinct debouncing functions per field
		{ key: () => this.props.name }
	);

	handleChange = async ({ value }) => {
		const { model, form, change } = this.props;
		change(model, value, { form });
		await this.setValidityDebounced(value);
	};

	render() {
		const {
			value,
			formModel,
			readonly,
			restrictions,
			className,
			required,
			name,
			step
		} = this.props;
		const valid = get('valid', formModel);
		const errorMessages = get('errors', formModel);
		const min = getOr(MIN_SAFE_INTEGER, `min`, restrictions);
		const max = getOr(MAX_SAFE_INTEGER, `max`, restrictions);

		return (
			<div id={`${name}-container`}>
				<Spinner
					id={name}
					className={className}
					min={min}
					max={max}
					isRequired={required}
					disabled={readonly}
					readOnly={readonly}
					hasOutline
					step={step || 1}
					value={value}
					onChange={(val) => this.handleChange(val)}
					error={!valid}
					errorMsg={getFieldErrorMessages(errorMessages)}
					allowEmptyInput
				/>
			</div>
		);
	}
}

Number.propTypes = {
	model: PropTypes.string,
	name: PropTypes.string,
	step: PropTypes.number,
	validators: PropTypes.instanceOf(Array),
	setErrors: PropTypes.func,
	form: PropTypes.shape({}),
	change: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	formModel: PropTypes.shape({}),
	readonly: PropTypes.bool,
	restrictions: PropTypes.shape({}),
	className: PropTypes.string,
	required: PropTypes.bool
};

const mapStateToProps = (
	state,
	{ path, preFormModel = 'dynamicForm.content', preForm = 'dynamic.content' }
) => {
	return {
		formModel: get(`${preFormModel}.${path}`, state),
		value: get(`${preForm}.${path}`, state),
		form: get(`${preForm}`, state)
	};
};

export default connect(mapStateToProps, {
	change: actions.change,
	setErrors: actions.setErrors
})(Number);

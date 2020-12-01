import React, { Component } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { get, map } from 'lodash/fp';
import { TextArea } from '@nokia-csf-uxr/csfWidgets';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { getFieldErrorMessages } from 'utils/wizard';
import { DEFAULT_DEBOUNCE_SUSPEND } from 'constants/app-constants';
import PropTypes from 'prop-types';

class TextAreaComponent extends Component {
	setValidityDebounced = AwesomeDebouncePromise(
		this.setValidity.bind(this),
		DEFAULT_DEBOUNCE_SUSPEND,
		// Use a key to create distinct debouncing functions per field
		{ key: () => this.props.name }
	);

	setValidity(value) {
		const { validators, model, setErrors } = this.props;
		const validatorsRef = map((validator) => validator(this.props, value), validators);

		setErrors(model, validatorsRef);
	}

	handleChange = async ({ value }) => {
		const { form, change, model } = this.props;
		change(model, value, { form });
		await this.setValidityDebounced(value);
	};

	render() {
		const {
			name,
			formModel,
			readonly,
			lockHeight,
			lockWidth,
			required,
			maxCharCount,
			placeholder,
			text
		} = this.props;
		const valid = get('valid', formModel);
		const errorMessages = get('errors', formModel);

		return (
			<TextArea
				onChange={this.handleChange}
				text={text}
				id={name}
				name={name}
				error={!valid}
				readOnly={readonly}
				disabled={readonly}
				errorMsg={errorMessages && getFieldErrorMessages(errorMessages)}
				lockHeight={lockHeight}
				lockWidth={lockWidth}
				required={required}
				charCount={(text && text.length) || 0}
				maxCharCount={maxCharCount}
				placeholder={placeholder}
			/>
		);
	}
}

TextAreaComponent.propTypes = {
	readonly: PropTypes.bool,
	lockHeight: PropTypes.bool,
	lockWidth: PropTypes.bool,
	required: PropTypes.bool,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	text: PropTypes.string,
	model: PropTypes.string,
	maxCharCount: PropTypes.number,
	formModel: PropTypes.shape({}),
	form: PropTypes.shape({}),
	validators: PropTypes.instanceOf(Array),
	change: PropTypes.func,
	setErrors: PropTypes.func
};

const mapStateToProps = (
	state,
	{ path, preFormModel = 'dynamicForm.content', preForm = 'dynamic.content' }
) => ({
	formModel: get(`${preFormModel}.${path}`, state),
	text: get(`${preForm}.${path}`, state),
	form: get(`${preForm}`, state)
});

export default connect(mapStateToProps, {
	change: actions.change,
	setErrors: actions.setErrors
})(TextAreaComponent);

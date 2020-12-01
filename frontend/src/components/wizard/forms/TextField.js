import React, { Component } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { get, map } from 'lodash/fp';
import { TextInput } from '@nokia-csf-uxr/csfWidgets';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { getFieldErrorMessages } from 'utils/wizard';
import { FIELD_TYPES } from 'constants/field-types';
import { DEFAULT_DEBOUNCE_SUSPEND } from 'constants/app-constants';
import PropTypes from 'prop-types';

class CustomTextField extends Component {
	handleChangeDebounced = AwesomeDebouncePromise(
		this.handleChange.bind(this),
		DEFAULT_DEBOUNCE_SUSPEND,
		// Use a key to create distinct debouncing functions per field
		// eslint-disable-next-line react/destructuring-assignment
		{ key: () => this.props.name }
	);

	constructor() {
		super();
		this.state = { text: '' };
	}

	componentDidMount() {
		const { text } = this.props;
		this.setState({ text });
	}

	componentDidUpdate(prevProps) {
		const { text } = this.props;

		if (text !== prevProps.text) {
			this.onUpdate(text);
		}
	}

	onUpdate(text) {
		this.setState({ text });
	}

	setValidity(value) {
		const { validators, setErrors, model } = this.props;
		const validatorsRef = map((validator) => validator(this.props, value), validators);

		setErrors(model, validatorsRef);
	}

	onChange = async ({ value }) => {
		this.setState({ text: value });
		await this.handleChangeDebounced(value);
	};

	handleChange(value) {
		const { change, form, model } = this.props;
		change(model, value, { form });
		this.setValidity(value);
	}

	render() {
		const { name, type, formModel, readonly, placeholder } = this.props;
		const { text } = this.state;
		const valid = get('valid', formModel);
		const errorMessages = get('errors', formModel);

		return (
			<TextInput
				onChange={this.onChange}
				text={text ? text.toString() : ''}
				id={name}
				name={name}
				error={!valid}
				readOnly={readonly}
				disabled={readonly}
				password={type === FIELD_TYPES.PASSWORD}
				errorMsg={errorMessages && getFieldErrorMessages(errorMessages)}
				placeholder={placeholder}
			/>
		);
	}
}

CustomTextField.propTypes = {
	name: PropTypes.string,
	type: PropTypes.string,
	model: PropTypes.string,
	text: PropTypes.string,
	placeholder: PropTypes.string,
	readonly: PropTypes.bool,
	validators: PropTypes.instanceOf(Array),
	form: PropTypes.shape({}),
	formModel: PropTypes.shape({}),
	setErrors: PropTypes.func,
	change: PropTypes.func
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
})(CustomTextField);

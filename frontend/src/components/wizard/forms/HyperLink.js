import React from 'react';
import { Hyperlink, TextInput } from '@nokia-csf-uxr/csfWidgets';
import PropTypes from 'prop-types';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { get, map } from 'lodash/fp';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { getFieldErrorMessages } from 'utils/wizard';
import { DEFAULT_DEBOUNCE_SUSPEND, NOKIA_URL } from 'constants/app-constants';

const HyperLink = (props) => {
	const {
		name,
		url,
		toolTip,
		text,
		tooltipProps,
		editable,
		validators,
		setErrors,
		model,
		change,
		form,
		formModel
	} = props;

	const valid = get('valid', formModel);
	const errorMessages = get('errors', formModel);

	const setValidity = (value) => {
		const validatorsRef = map((validator) => validator(props, value), validators);

		setErrors(model, validatorsRef);
	};

	const setValidityDebounced = AwesomeDebouncePromise(
		setValidity,
		DEFAULT_DEBOUNCE_SUSPEND,
		// Use a key to create distinct debouncing functions per field
		{ key: () => name }
	);

	const handleChange = async ({ value }) => {
		change(model, value, { form });
		await setValidityDebounced(value);
	};
	return !editable ? (
		<Hyperlink
			id={`${name}_hperlink`}
			href={url}
			text={text || url}
			toolTip={toolTip}
			toolTipText={text || url}
			tooltipProps={tooltipProps}
			newTab
		/>
	) : (
		<TextInput
			onChange={handleChange}
			id={`${name}_edit_hperlink`}
			text={url ? url.toString() : ''}
			error={!valid}
			errorMsg={errorMessages && getFieldErrorMessages(errorMessages)}
			placeholder={NOKIA_URL}
		/>
	);
};

HyperLink.defaultProps = {
	editable: false
};

HyperLink.propTypes = {
	name: PropTypes.string.isRequired,
	model: PropTypes.string,
	text: PropTypes.string,
	url: PropTypes.string.isRequired,
	toolTip: PropTypes.bool,
	tooltipProps: PropTypes.shape({}),
	editable: PropTypes.bool,
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
	url: get(`${preForm}.${path}`, state),
	form: get(`${preForm}`, state)
});

export default connect(mapStateToProps, {
	change: actions.change,
	setErrors: actions.setErrors
})(HyperLink);

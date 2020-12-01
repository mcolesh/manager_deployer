import React, { Component } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { get, map } from 'lodash/fp';
import { Slider as SliderField } from '@nokia-csf-uxr/csfWidgets';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { getFieldErrorMessages } from 'utils/wizard';
import { DEFAULT_DEBOUNCE_SUSPEND } from 'constants/app-constants';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorMessageStyle = styled.div`
	color: #d9070a;
	font-size: 11px;
	font-family: Nokia Pure Text Regular, Arial, sans-serif;
	line-height: 11px;
	padding-top: 4px;
`;

class Slider extends Component {
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

	handleChange = async (option) => {
		const { change, model, form } = this.props;
		change(model, option.value, { form });
		await this.setValidityDebounced(option.value);
	};

	render() {
		const { name, formModel, readonly, value, range, stepBy } = this.props;
		const valid = get('valid', formModel);
		const errorMessages = get('errors', formModel);

		return (
			<div id={name}>
				<SliderField
					onChange={this.handleChange}
					id={name}
					minValue={range.min}
					maxValue={range.max}
					value={value}
					stepBy={!stepBy ? 1 : stepBy}
					disabled={readonly}
					width={400}
				/>
				{valid ? null : (
					<ErrorMessageStyle>{getFieldErrorMessages(errorMessages)}</ErrorMessageStyle>
				)}
			</div>
		);
	}
}

Slider.propTypes = {
	model: PropTypes.string,
	name: PropTypes.string,
	readonly: PropTypes.bool,
	value: PropTypes.number,
	stepBy: PropTypes.number,
	validators: PropTypes.instanceOf(Array),
	formModel: PropTypes.shape({}),
	form: PropTypes.shape({}),
	range: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }),
	setErrors: PropTypes.func,
	change: PropTypes.func
};

const mapStateToProps = (
	state,
	{ path, preFormModel = 'dynamicForm.content', preForm = 'dynamic.content' }
) => ({
	formModel: get(`${preFormModel}.${path}`, state),
	value: get(`${preForm}.${path}`, state),
	form: get(`${preForm}`, state)
});

export default connect(mapStateToProps, {
	change: actions.change,
	setErrors: actions.setErrors
})(Slider);

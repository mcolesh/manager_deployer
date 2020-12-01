import React, { Component } from 'react';
import { get, map } from 'lodash/fp';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import Select from 'antd/es/select';
import 'antd/lib/select/style/css';
import styled from 'styled-components';
import { Label, TextInput } from '@nokia-csf-uxr/csfWidgets';
import { getFieldErrorMessages } from 'utils/wizard';
import PropTypes from 'prop-types';

const { Option } = Select;
const InputContainer = styled.div`
	display: flex;
`;

class GenericSelectField extends Component {
	onRowSelectValueChange = (rowIndex) => (value) => {
		const { change, model, form } = this.props;
		change(`${model}.${rowIndex}.value`, value, {
			form
		});
	};

	onRowNameChange = (rowIndex) => ({ value }) => {
		const { change, model, form } = this.props;
		change(`${model}.${rowIndex}.name`, value, {
			form
		});
		this.setValidity(value, rowIndex);
	};

	setValidity(value, rowIndex) {
		const { validators, model, setErrors } = this.props;
		const genericRangeErrors = map((validator) => validator(this.props, value), validators);
		setErrors(`${model}.${rowIndex}`, genericRangeErrors);
	}

	render() {
		const { display, name, searchable, data, selectedValues, formModel, nameReadOnly } = this.props;

		return (
			<div>
				<Label text={display} />
				{selectedValues &&
					selectedValues.map((value, rowIndex) => {
						const valid = get('valid', formModel[rowIndex].$form);
						const errorMessages = get('errors', formModel[rowIndex].$form);
						return (
							<InputContainer key={`${name}_${rowIndex}`}>
								<TextInput
									id={`${name}_${rowIndex}`}
									name={`${name}_${rowIndex}`}
									text={value.name}
									readOnly={nameReadOnly}
									disabled={nameReadOnly}
									onChange={this.onRowNameChange(rowIndex)}
									placeholder='Name'
									error={!valid}
									errorMsg={errorMessages && getFieldErrorMessages(errorMessages)}
								/>

								<Select
									id={`${name}_${rowIndex}`}
									name={`${name}_${rowIndex}`}
									style={{ width: 172 }}
									onChange={this.onRowSelectValueChange(rowIndex)}
									defaultValue={value.value}
									showSearch={searchable}
									optionFilterProp='children'
									filterOption={(input, option) =>
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}>
									{data.map((d) => (
										<Option key={d.value}>{d.label}</Option>
									))}
								</Select>
							</InputContainer>
						);
					})}
			</div>
		);
	}
}

GenericSelectField.propTypes = {
	formModel: PropTypes.instanceOf(Object),
	selectedValues: PropTypes.instanceOf(Array),
	form: PropTypes.instanceOf(Object),
	data: PropTypes.instanceOf(Array),
	model: PropTypes.string,
	display: PropTypes.string,
	name: PropTypes.string,
	searchable: PropTypes.bool,
	nameReadOnly: PropTypes.bool,
	change: PropTypes.func,
	setErrors: PropTypes.func,
	validators: PropTypes.instanceOf(Object)
};

const mapStateToProps = (
	state,
	{ path, preFormModel = 'dynamicForm.content', preForm = 'dynamic.content' }
) => ({
	formModel: get(`${preFormModel}.${path}`, state),
	selectedValues: get(`${preForm}.${path}`, state),
	form: get(`${preForm}`, state)
});

export default connect(mapStateToProps, {
	change: actions.change,
	setErrors: actions.setErrors
})(GenericSelectField);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { get, map } from 'lodash/fp';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SelectItem } from '@nokia-csf-uxr/csfWidgets';
import { getFieldErrorMessages } from 'utils/wizard';
import { getFieldComponent, getFieldNormalizedProps, getFieldValidators } from 'utils/wizard';

const NovlFieldContainer = styled.div`
	display: flex;
`;

const SecondFieldContainer = styled.div`
	padding-left: 10px;
	display: flex;
	flex: 1;
`;

class Novl extends Component {
	handleChange = (o) => {
		this.props.change(`${this.props.model}.condition`, o.value, {
			form: this.props.form
		});
		this.setValidity(o.value);
	};

	setValidity(value) {
		const validators = map((validator) => validator(this.props, value), this.props.validators);
		this.props.setErrors(`${this.props.model}.condition`, validators);
	}

	render() {
		const {
			name,
			selectData,
			formModel,
			selectedItem,
			isSelectReadonly = false,
			fieldValue,
			path
		} = this.props;
		const valid = get('condition.valid', formModel);
		const errorMessages = get('condition.errors', formModel);
		let FieldComponent, normalizedProps, secondFieldValidators;
		if (fieldValue) {
			FieldComponent = getFieldComponent(get('type', fieldValue));
			normalizedProps = getFieldNormalizedProps(fieldValue);
			secondFieldValidators = getFieldValidators(fieldValue);
		}

		return (
			<NovlFieldContainer>
				<SelectItem
					id={`selectItem-${name}`}
					options={selectData.filter((d) => (d.label = d.label.toString()))}
					disabled={isSelectReadonly}
					selectedItem={selectedItem}
					onChange={this.handleChange}
					searchable={true}
					errorMsg={valid ? null : getFieldErrorMessages(errorMessages)}
					max-width={160}
					min-width={160}
					width={160}
				/>
				{fieldValue && (
					<SecondFieldContainer>
						<FieldComponent
							key={name}
							model={`dynamic.content.${path}.fieldValue`}
							path={`${path}.fieldValue`}
							validators={secondFieldValidators}
							className='novl-second-field'
							{...normalizedProps}
						/>
					</SecondFieldContainer>
				)}
			</NovlFieldContainer>
		);
	}
}

Novl.propTypes = {
	model: PropTypes.string
};

const mapStateToProps = (
	state,
	{ path, preFormModel = 'dynamicForm.content', preForm = 'dynamic.content' }
) => {
	return {
		formModel: get(`${preFormModel}.${path}`, state),
		selectedItem: get(`${preForm}.${path}.condition`, state),
		form: get(`${preForm}`, state)
	};
};

export default connect(mapStateToProps, {
	change: actions.change,
	setErrors: actions.setErrors
})(Novl);

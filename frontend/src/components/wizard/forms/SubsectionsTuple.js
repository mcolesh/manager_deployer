import React, { Component } from 'react';
import { get, map } from 'lodash/fp';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { getFieldErrorMessages } from 'utils/wizard';
import styled from 'styled-components';
import { SelectItem } from '@nokia-csf-uxr/csfWidgets';
import InlineFeedbackMessage, {
	InlineMessageAlert
} from '@nokia-csf-uxr/csfWidgets/InlineFeedbackMessage';
import { HeaderLabel } from 'components/StyledComponents';
import PropTypes from 'prop-types';
import { SECTION_IS_EMPTY_ERROR_MESSAGE } from 'constants/app-captions';

const GridContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const SelectItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 15px;
`;

const AlertMessageContainer = styled.div`
	margin-top: -20px;
`;

const SectionIsEmptyAlertMessage = (props) => {
	const { name, required, tuple } = props;
	const { items, values } = tuple;
	const errorMessage = SECTION_IS_EMPTY_ERROR_MESSAGE(items, values);

	return (
		<AlertMessageContainer>
			<InlineFeedbackMessage>
				<InlineMessageAlert
					msgId={name}
					alertType={required ? 'error' : 'info'}
					text={errorMessage}
					displayCloseButton={false}
				/>
			</InlineFeedbackMessage>
		</AlertMessageContainer>
	);
};

class SubsectionsTuple extends Component {
	setItemValidity(item, value) {
		const { validators, model, setErrors } = this.props;
		const validatorsRef = map((validator) => validator(this.props, value), validators);

		setErrors(`${model}.${item}`, validatorsRef);
	}

	handleChange = (item, option) => {
		const { change, model, tuples } = this.props;
		change(model, {
			...tuples,
			...{ [item]: option.value }
		});
		this.setItemValidity(item, option.value);
	};

	render() {
		const { name, items, values, readonly, formModel } = this.props;

		const itemsSubsections = Object.keys(items);
		const valuesSubsections = map((value) => ({ value, label: value }), Object.keys(values));

		if (itemsSubsections.length === 0 || valuesSubsections.length === 0) {
			return <SectionIsEmptyAlertMessage {...this.props} />;
		}

		return (
			<GridContainer>
				{itemsSubsections.map((item) => {
					return (
						<SelectItemContainer key={item}>
							<HeaderLabel className='subsections-tuple-header'>{item}</HeaderLabel>
							<SelectItem
								id={`selectItem-${name}_${item && item.replace(/:/g, '_')}`}
								options={valuesSubsections.filter((d) => (d.label = d.label.toString()))}
								isDisabled={readonly}
								selectedItem={get(`value`, formModel[item])}
								onChange={(evt) => this.handleChange(item, evt)}
								searchable
								errorMsg={
									get('valid', formModel[item])
										? null
										: getFieldErrorMessages(get('errors', formModel[item]))
								}
								maxWidth={500}
								minWidth={50}
								width={400}
							/>
						</SelectItemContainer>
					);
				})}
			</GridContainer>
		);
	}
}

SubsectionsTuple.propTypes = {
	model: PropTypes.string,
	name: PropTypes.string,
	readonly: PropTypes.bool,
	useFirstAsDefault: PropTypes.bool,
	required: PropTypes.bool,
	validators: PropTypes.instanceOf(Array),
	items: PropTypes.shape({}),
	values: PropTypes.shape({}),
	formModel: PropTypes.shape({}),
	tuples: PropTypes.shape({}),
	setErrors: PropTypes.func,
	change: PropTypes.func
};

SectionIsEmptyAlertMessage.propTypes = {
	name: PropTypes.string,
	required: PropTypes.bool,
	tuple: PropTypes.shape({ items: PropTypes.string, values: PropTypes.string })
};

const mapStateToProps = (
	state,
	{ tuple, path, preFormModel = 'dynamicForm.content', preForm = 'dynamic.content' }
) => ({
	formModel: get(`${preFormModel}.${path}`, state),
	tuples: get(`${preForm}.${path}`, state),
	items: get(`${preForm}.${tuple.items}`, state),
	values: get(`${preForm}.${tuple.values}`, state)
});

export default connect(mapStateToProps, {
	change: actions.change,
	setErrors: actions.setErrors
})(SubsectionsTuple);

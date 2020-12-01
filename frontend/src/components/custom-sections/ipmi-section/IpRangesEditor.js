import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actions } from 'react-redux-form';
import { Button, TextArea } from '@nokia-csf-uxr/csfWidgets';
import styled from 'styled-components';
import { getOr, flatten } from 'lodash/fp';
import * as wizardActions from 'actions/wizard';
import { OVERLAPPED_RANGES_ERROR } from 'constants/app-captions';
import { createIpList } from 'utils/ip-utils';
import 'components/custom-sections/ipmi-section/ipmi.css';
import { doAllocationsExist as doAllocationsExistRef } from 'selectors/ipmi';
import { INVALID_IPS } from 'constants/ipmi-sub-section';

const Container = styled.div`
	border: 1px solid #ccc;
	max-height: 242px;
	overflow: auto;
`;

const AddIPMIButtonContainer = styled.div`
	position: relative;
	min-height: 50px;
`;

const EditButtonWrap = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
`;

const SaveButtonWrap = styled.div`
	position: absolute;
	bottom: 10px;
	right: 10px;
`;

const ErrorContainer = styled.div`
	position: absolute;
	margin-top: 10px;
	color: red;
`;

class IpRangesEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorValue: props.rawRanges,
			valid: true,
			errorMsg: ''
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { wizard, clearWizardAfterReset } = this.props;
		if (nextProps.wizard.finishedResetWizard && !wizard.finishedResetWizard) {
			this.setState({ editorValue: nextProps.rawRanges });
			clearWizardAfterReset();
		}
	}

	onEdit = () => {
		const {
			setIpRangeEditMode,
			doAllocationsExist,
			showResetAllocationsWarning,
			change
		} = this.props;
		change(`dynamic.content.ipmi_ips.editing`, true);
		if (doAllocationsExist) {
			const action = { operation: 'setIpRangeMode', value: true };
			showResetAllocationsWarning(true, action);
		} else {
			setIpRangeEditMode(true);
		}
	};

	onSave = () => {
		const { editorValue } = this.state;
		const { model, change, setIpRangeEditMode } = this.props;
		const raw = editorValue;
		const computed = this.getComputedIpList(editorValue);
		const ranges = { raw, computed };
		change(`dynamic.${model}`, ranges);
		setIpRangeEditMode(false);
		change(`dynamic.content.ipmi_ips.editing`, false);
	};

	onChange = ({ value }) => {
		try {
			this.getComputedIpList(value);
			this.setState({
				valid: true,
				editorValue: value,
				errorMsg: ''
			});

			const computedList = this.getComputedIpList(value);
			for (const [idx, ip] of computedList.entries()) {
				for (const [idx2, ip2] of computedList.entries()) {
					if (ip === ip2 && idx !== idx2) {
						this.setState({
							valid: false,
							editorValue: value,
							errorMsg: OVERLAPPED_RANGES_ERROR
						});
						break;
					}
				}
			}
		} catch (e) {
			this.setState({
				valid: false,
				editorValue: value,
				errorMsg: INVALID_IPS
			});
		}
	};

	getComputedIpList(rawRanges) {
		let rawRangesParsed = [];
		const rows = rawRanges.split('\n');

		rows.forEach((item) => {
			const items = item.split(',');
			rawRangesParsed = [...rawRangesParsed, ...items];
		});

		const ipRangeList = rawRangesParsed.map((range) => {
			let [start, end] = range.split('-');
			start = start ? start.replace(/\s/g, '') : undefined;
			end = end ? end.replace(/\s/g, '') : undefined;
			return createIpList(start, end);
		});

		return flatten(ipRangeList);
	}

	renderIpRanges = () => {
		const { rawRanges } = this.props;
		return this.getComputedIpList(rawRanges).map((ip) => <div key={ip}>{ip}</div>);
	};

	renderEditor = () => {
		const { editorValue, valid } = this.state;
		return (
			<div className='text-area-container'>
				<TextArea id='ipmi' text={editorValue} error={!valid} onChange={this.onChange} lockWidth />
			</div>
		);
	};

	render() {
		const { ipRangeEditMode } = this.props;
		const { valid, errorMsg } = this.state;

		return (
			<div>
				<Container>{ipRangeEditMode ? this.renderEditor() : this.renderIpRanges()}</Container>
				<AddIPMIButtonContainer>
					{ipRangeEditMode ? (
						<SaveButtonWrap>
							<Button onClick={this.onSave} text='Save' disabled={!valid} isCallToAction />
						</SaveButtonWrap>
					) : (
						<EditButtonWrap>
							<Button onClick={this.onEdit} text='Edit' isCallToAction />
						</EditButtonWrap>
					)}
					{!valid && <ErrorContainer>{errorMsg}</ErrorContainer>}
				</AddIPMIButtonContainer>
			</div>
		);
	}
}

IpRangesEditor.propTypes = {
	model: PropTypes.string,
	rawRanges: PropTypes.string,
	doAllocationsExist: PropTypes.bool,
	ipRangeEditMode: PropTypes.bool,
	wizard: PropTypes.shape({ finishedResetWizard: PropTypes.bool }),
	change: PropTypes.func,
	setIpRangeEditMode: PropTypes.func,
	showResetAllocationsWarning: PropTypes.func,
	clearWizardAfterReset: PropTypes.func
};

const mapStateToProps = (store, { model }) => ({
	rawRanges: getOr(``, `dynamic.${model}.raw`, store),
	ipRangeEditMode: getOr(false, `wizard.ipRangeEditMode`, store),
	doAllocationsExist: doAllocationsExistRef(store),
	wizard: getOr(``, `wizard`, store)
});

export default connect(mapStateToProps, {
	change: actions.change,
	setFormErrors: actions.setErrors,
	clearWizardAfterReset: wizardActions.clearWizardAfterReset,
	setIpRangeEditMode: wizardActions.setIpRangeEditMode,
	showResetAllocationsWarning: wizardActions.showResetAllocationsWarning
})(IpRangesEditor);

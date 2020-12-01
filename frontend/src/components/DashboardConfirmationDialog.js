import React, { Component } from 'react';
import { push as pushRef } from 'connected-react-router';
import { connect } from 'react-redux';
import { AlertDialogWarning } from '@nokia-csf-uxr/csfWidgets';
import { getOr } from 'lodash/fp';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { WARNING, CONFIRMATION_DIALOG_HEADER, YES, NO } from 'constants/app-constants';
import {
	clearWizard as clearWizardRef,
	showDashboardConfirmationDialog as showDashboardConfirmationDialogRef
} from '../actions/wizard';

const AlertDialogContainer = styled.div``;

export class DashboardConfirmationDialog extends Component {
	closeDashboardDialog = () => {
		const { showDashboardConfirmationDialog } = this.props;
		showDashboardConfirmationDialog(false);
	};

	onDashboardConfirmed = () => {
		const { clearWizard, push } = this.props;
		clearWizard();
		push('/dashboard');
	};

	render() {
		const { showDashboardDialog } = this.props;
		return (
			<AlertDialogContainer>
				{showDashboardDialog && (
					<AlertDialogWarning
						title={WARNING}
						warningText1={CONFIRMATION_DIALOG_HEADER}
						warningText2={getOr('', 'confirmationMsg', this.props)}
						cancelButtonLabel={NO}
						buttonLabel={YES}
						onCancel={this.closeDashboardDialog}
						onClose={this.onDashboardConfirmed}
						trapFocus
					/>
				)}
			</AlertDialogContainer>
		);
	}
}

DashboardConfirmationDialog.propTypes = {
	showDashboardDialog: PropTypes.bool,
	showDashboardConfirmationDialog: PropTypes.func,
	clearWizard: PropTypes.func,
	push: PropTypes.func
};

const mapStateToProps = (state) => ({
	showDashboardDialog: state.wizard.showDashboardDialog,
	confirmationMsg: state.pagesData.confirmationMsg
});

export default connect(mapStateToProps, {
	clearWizard: clearWizardRef,
	showDashboardConfirmationDialog: showDashboardConfirmationDialogRef,
	push: pushRef
})(DashboardConfirmationDialog);

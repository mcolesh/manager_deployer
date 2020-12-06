import React, { Component, lazy } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push as pushRef } from 'connected-react-router';
import { get } from 'lodash/fp';
import { actions } from 'react-redux-form';
import { prerequisitesToSendToServer as prerequisitesToSendToServerRef } from 'selectors/wizard';
import * as pageActions from 'actions/pages';
import Loader from 'components/Loader';
import Page from 'components/Page';
import { FloatingActionButton } from '@nokia-csf-uxr/csfWidgets';
import {
	fetchWizardPrerequisite as fetchWizardPrerequisiteRef,
	fetchWizard as fetchWizardRef,
	setExamplesCategory as setExamplesCategoryRef,
	checkWizardDependencies as checkWizardDependenciesRef,
	resetWizardDependenciesParameters as resetWizardDependenciesParametersRef,
	restartServerServicesFinished as restartServerServicesFinishedRef
} from 'actions/wizard';
import { clearWizardAfterDeployment } from 'actions/pages';
import 'components/DashboardStyles.css';
import { LoaderContainer } from 'components/StyledComponents';
import { isServerRebooting as isServerRebootingRef } from 'selectors/serverMessage';
import { fetchComponents as fetchComponentsRef } from '../actions/externalLinks';
import { fetchUserInfo as fetchUserInfoRef } from '../actions/ui';

const PrerequisitesModal = lazy(() => import('components/PrerequisitesModal'));

const DashboardLayout = styled.div`
	display: flex;
	flex-direction: row;
	background-color: #e8e8e8;
	min-height: calc(100vh - 50px);
`;

const CardsCollection = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { fetchUserInfo, fetchPages, fetchPagesStatus } = this.props;
		fetchUserInfo();
		fetchPages();
		fetchPagesStatus();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { push, fetchPagesSuccess } = this.props;
		// in case of 500 for /pages without sign in
		if (!nextProps.fetchPagesSuccess && fetchPagesSuccess) {
			push('/login');
		}
	}

	onModalConfirm = () => {
		const { fetchWizard, debug, prerequisitesToSendToServer } = this.props;
		const { selectedPageName, jsonWarningIgnore } = this.state;
		this.setState({ jsonWarningChoice: '' });
		fetchWizard(prerequisitesToSendToServer, selectedPageName, debug, jsonWarningIgnore);
	};

	onPageClick = (name) => () => {
		alert(`manager ${name} has been clicked`);
	};

	pages = (pages) => {
		return (
			<CardsCollection>
				{pages.map((page) => (
					<Page key={page.name} data={page} onPageClick={this.onPageClick} />
				))}
			</CardsCollection>
		);
	};

	addNewManager = () => {
		alert('ADD NEW MANAGER CARD');
	};

	addNewManagerButton = () => {
		return (
			<FloatingActionButton
				id='ADD_NEW_MANAGER'
				text='ADD NEW MANAGER'
				textColor='#fff'
				eventData={{ eventData: 'eventData' }}
				style={{ position: 'fixed', right: '32px', bottom: '32px', background: 'rgb(18, 65, 145)' }}
				onClick={this.addNewManager}
				icon='ic_add'
				iconColor='#fff'
				tooltip={{
					text: 'Floating Action Button',
					offset: { top: -110 },
					displayTooltipOnFocus: true
				}}
			/>
		);
	};

	render() {
		const { fetchPagesSuccess, pages, blockUI } = this.props;

		return (
			<DashboardLayout>
				{blockUI && (
					<LoaderContainer>
						<Loader wholePage size='xxlarge' />
					</LoaderContainer>
				)}
				<PrerequisitesModal onModalConfirm={this.onModalConfirm} />
				{fetchPagesSuccess && this.pages(pages)}
				{this.addNewManagerButton()}
			</DashboardLayout>
		);
	}
}

Dashboard.propTypes = {
	debug: PropTypes.bool,
	blockUI: PropTypes.bool,
	fetchPagesSuccess: PropTypes.bool,
	pages: PropTypes.instanceOf(Array),
	newCategories: PropTypes.shape({}),
	mergedData: PropTypes.shape({}),
	prerequisitesToSendToServer: PropTypes.shape({}),
	fetchPages: PropTypes.func,
	fetchPagesStatus: PropTypes.func,
	push: PropTypes.func,
	fetchWizard: PropTypes.func,
	fetchUserInfo: PropTypes.func
};

const mapStateToProps = (state) => ({
	pages: state.pagesData.pages,
	blockUI: state.ui.blockUI,
	wizardInitialized: state.wizard.initialized,
	successfulDeployment: state.pagesData.successfulDeployment,
	deployedWizardName: state.pagesData.deployedWizardName,
	prerequisites: state.prerequisites,
	serverMessageStatus: get('serverMessage.messageStatus', state),
	selectedCategoryIndex: state.pagesData.selectedCategoryIndex,
	showReport: state.report.showReport,
	reportFail: state.report.reportFail,
	reportLoading: state.report.loading,
	prerequisitesToSendToServer: prerequisitesToSendToServerRef(state),
	pending: state.externalLinks.pending,
	debug: state.pagesData.debug,
	wizardDependenciesStatus: state.wizard.wizardDependenciesStatus,
	wizardDependenciesServerMsg: state.wizard.wizardDependenciesServerMsg,
	initialPageStatus: state.wizard.initialPageStatus,
	areServerServicesRestarting: state.wizard.areServerServicesRestarting,
	isExamplesCategoryVisible: state.pagesData.isExamplesCategoryVisible,
	fetchPagesSuccess: state.pagesData.fetchPagesSuccess,
	mergedData: state.wizard.mergedData,
	clientJsonValidation: state.pagesData.clientJsonValidation,
	isServerRebooting: isServerRebootingRef(state),
	isReconnectionSuccessful: state.ui.isReconnectionSuccessful
});

export default connect(mapStateToProps, {
	fetchPages: pageActions.fetchPages,
	fetchPagesStatus: pageActions.fetchPagesStatus,
	fetchWizardPrerequisite: fetchWizardPrerequisiteRef,
	fetchWizard: fetchWizardRef,
	clearWizardAfterDeployment,
	push: pushRef,
	change: actions.change,
	storeSelectedCategory: pageActions.storeSelectedCategory,
	setExamplesCategory: setExamplesCategoryRef,
	fetchComponents: fetchComponentsRef,
	checkWizardDependencies: checkWizardDependenciesRef,
	resetWizardDependenciesParameters: resetWizardDependenciesParametersRef,
	restartServerServicesFinished: restartServerServicesFinishedRef,
	fetchUserInfo: fetchUserInfoRef
})(Dashboard);

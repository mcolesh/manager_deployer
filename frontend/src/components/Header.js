import React, { Component, lazy } from 'react';
import { push as pushRef } from 'connected-react-router';
import { get, getOr, isEmpty } from 'lodash/fp';
import { connect } from 'react-redux';
import { AppBanner, SimpleList, AboutProduct } from '@nokia-csf-uxr/csfWidgets';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import dashboardIcon from 'assets/icons/dashboard.png';
import pluginIcon from 'assets/icons/plugin.png';
import restartIcon from 'assets/icons/restart.png';
import documentsIcon from 'assets/images/ic_file.svg';
import 'components/HeaderStyles.css';
import { fetchPlugins as fetchPluginsRef } from 'actions/plugins';
import { hideReport as hideReportRef } from 'actions/report';
import { REPORT_PATH, CBIS_MANAGER_API_DOC } from 'constants/app-constants';
import { PRODUCT_NAME, ABOUT_PRODUCT_TEXT_LINE } from 'constants/app-captions';
import { logout as logoutRef } from 'actions/auth';
import { fetchProductType as fetchProductTypeRef } from '../actions/ui';
import {
	clearWizard,
	showDashboardConfirmationDialog as showDashboardConfirmationDialogRef,
	getRunningProcesses as getRunningProcessesRef
} from '../actions/wizard';

const UploadPluginModal = lazy(() => import('./UploadPluginModal'));
const PluginModal = lazy(() => import('./PluginModal'));
const DashboardConfirmationDialog = lazy(() => import('./DashboardConfirmationDialog'));

const wizardMenuApps = [
	{
		id: 'dashboard',
		text: 'Dashboard',
		icon: dashboardIcon
	}
];

const dashboardMenuApps = [
	{
		id: 'plugins',
		text: 'Plugins',
		icon: pluginIcon
	},
	{
		id: 'restart',
		text: 'Restart Server',
		icon: restartIcon
	},
	{
		id: 'documents',
		text: 'Open API Documentation',
		icon: documentsIcon
	}
];

const AppBannerContainer = styled.div`
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 12000;
`;

const AppHeaderContainer = styled.div`
	height: 49px;
`;

export class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { currentMenuApps: [], showAbout: false };
	}

	componentDidMount() {
		const { routePath, productTypeInfo, fetchProductType } = this.props;
		this.setMenuAppContent(routePath);
		if (isEmpty(productTypeInfo)) {
			fetchProductType();
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { productTypeInfo } = this.props;
		this.setMenuAppContent(nextProps.routePath);
		if (!isEmpty(productTypeInfo)) {
			document.title = get('product_type', productTypeInfo);
		}
	}

	setMenuAppContent = (routePath) => {
		if (routePath.indexOf('dashboard') > -1) {
			this.setState({ currentMenuApps: dashboardMenuApps });
		} else if (routePath.indexOf('wizard') > -1 || routePath.indexOf('report') > -1) {
			this.setState({ currentMenuApps: wizardMenuApps });
		}
	};

	onAppClick = (appName) => {
		const {
			routePath,
			hideReport,
			push,
			showDashboardConfirmationDialog,
			getRunningProcesses,
			fetchPlugins
		} = this.props;
		switch (appName) {
			case 'dashboard':
				if (routePath === REPORT_PATH) {
					hideReport();
					push('/dashboard');
				} else {
					showDashboardConfirmationDialog(true);
				}
				break;
			case 'restart':
				getRunningProcesses();
				break;
			case 'documents':
				window.open(CBIS_MANAGER_API_DOC, '_blank');
				break;
			default:
				fetchPlugins();
		}
	};

	onLogoutClick = () => {
		const { logout } = this.props;
		logout();
	};

	getReleaseVersion = (cbisVersion, bcmtVersion) => {
		if (cbisVersion === undefined) {
			return undefined;
		} else if (bcmtVersion === undefined) {
			return cbisVersion;
		}
		return `${cbisVersion} (bcmt version: ${bcmtVersion})`;
	};

	render() {
		const { fetchProductTypeFinished, username, cbisVersion, bcmtVersion } = this.props;
		const { currentMenuApps, showAbout } = this.state;

		return (
			<AppHeaderContainer>
				<AppBannerContainer>
					<AppBanner
						productName={
							fetchProductTypeFinished
								? getOr(PRODUCT_NAME, 'productTypeInfo.description', this.props)
								: ''
						}
						appMenuVisible={
							currentMenuApps === wizardMenuApps || currentMenuApps === dashboardMenuApps
						}
						appMenuAllApps={currentMenuApps}
						appMenuOnAppClick={(e) => this.onAppClick(e.event.value.app.id)}
						userAccountSummaryUsername={username}
						userAccountSummaryOnLogoutButtonClick={this.onLogoutClick}
						dataTest='APP-HEADER-SUMMARY'
						userAccountSummaryContent={(closeMenus) => (
							<SimpleList
								data={{
									rows: [
										{
											textLines: [ABOUT_PRODUCT_TEXT_LINE]
										}
									]
								}}
								onClick={() => {
									this.setState({ showAbout: true });
									// closes the UAS menu
									closeMenus();
								}}
							/>
						)}
					/>
					{showAbout && (
						<AboutProduct
							id='aboutProduct'
							title='About'
							productName={
								fetchProductTypeFinished
									? getOr(PRODUCT_NAME, 'productTypeInfo.description', this.props)
									: ''
							}
							releaseNumber={this.getReleaseVersion(cbisVersion, bcmtVersion)}
							onClose={() => this.setState({ showAbout: false })}
							theme='black'
							focusDialog={false}
						/>
					)}
					<DashboardConfirmationDialog />
				</AppBannerContainer>
				<PluginModal />
				<UploadPluginModal />
			</AppHeaderContainer>
		);
	}
}

Header.propTypes = {
	fetchProductTypeFinished: PropTypes.bool,
	routePath: PropTypes.string,
	username: PropTypes.string,
	cbisVersion: PropTypes.string,
	fetchProductType: PropTypes.func,
	hideReport: PropTypes.func,
	push: PropTypes.func,
	showDashboardConfirmationDialog: PropTypes.func,
	getRunningProcesses: PropTypes.func,
	fetchPlugins: PropTypes.func,
	logout: PropTypes.func,
	productTypeInfo: PropTypes.shape({})
};

const mapStateToProps = (state) => ({
	routePath: get(`location.pathname`, state.router),
	username: get('ui.username', state),
	cbisVersion: get('ui.productTypeInfo.version', state),
	bcmtVersion: get('ui.productTypeInfo.bcmt_version', state),
	productTypeInfo: get('ui.productTypeInfo', state),
	fetchProductTypeFinished: get('ui.fetchProductTypeFinished', state)
});

export default connect(mapStateToProps, {
	clearWizard,
	showDashboardConfirmationDialog: showDashboardConfirmationDialogRef,
	push: pushRef,
	fetchPlugins: fetchPluginsRef,
	hideReport: hideReportRef,
	getRunningProcesses: getRunningProcessesRef,
	fetchProductType: fetchProductTypeRef,
	logout: logoutRef
})(Header);

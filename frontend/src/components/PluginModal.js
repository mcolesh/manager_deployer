import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, Button, Label } from '@nokia-csf-uxr/csfWidgets';
import * as pluginActions from 'actions/plugins';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import * as CONSTANTS from 'constants/app-constants';
import * as CAPTIONS from 'constants/app-captions';
import 'components/DashboardStyles.css';
import { HeaderLabel, DescriptionLabel } from 'components/StyledComponents';

const deleteImage = require('../assets/images/ic_delete.svg');

const PluginContainer = styled.div`
	border: 1px solid rgba(0, 0, 0, 0.125);
	padding: 0.75rem 1.25rem;
`;

const DeleteIconContainer = styled.div`
	border: 1px solid #ccc;
	float: right;
	margin-top: 3%;
	margin-right: 4%;
	cursor: pointer;
	&:hover {
		background-color: #e6e6e6;
	}
`;

class PluginModal extends Component {
	removePlugin = (plugin) => {
		const { deletePlugin, fetchPlugins } = this.props;
		deletePlugin(plugin).then(() => {
			fetchPlugins();
		});
	};

	onClose = () => {
		const { hidePluginModal } = this.props;
		hidePluginModal();
	};

	showUploadModal = () => {
		const { showUploadPluginModal } = this.props;
		showUploadPluginModal();
	};

	renderFooter = () => {
		const { serverMessageStatus } = this.props;
		return (
			<div>
				<Button
					id='upload-plugin-button'
					text='Upload Plugin'
					isCallToAction
					icon='ic_arrow_upward'
					onClick={this.showUploadModal}
					disabled={serverMessageStatus === CONSTANTS.SERVER_STATUS.REQUIRES_SERVICE_RESTART}
				/>
			</div>
		);
	};

	render() {
		const { showPluginModal, plugins, startedUpload, deleteStarted } = this.props;
		if (!showPluginModal) {
			return null;
		}

		return (
			<Dialog
				title='Plugins'
				theme='black'
				id='plugin-modal'
				width={600}
				scroll
				height={380}
				header
				close
				onClose={this.onClose}
				renderFooter={this.renderFooter}>
				<div>
					{plugins && plugins.length === 0 && <Label text={CAPTIONS.NO_PLUGINS} />}

					{plugins &&
						plugins.length !== 0 &&
						plugins.map((plugin) => {
							return (
								<PluginContainer key={plugin.name}>
									<DeleteIconContainer onClick={() => this.removePlugin(plugin)}>
										<img src={deleteImage} alt='delete plugin' width='20' height='20' />
									</DeleteIconContainer>
									<HeaderLabel>{plugin.display}</HeaderLabel>
									<DescriptionLabel>{plugin.description}</DescriptionLabel>
								</PluginContainer>
							);
						})}
				</div>
				{startedUpload || deleteStarted ? <Loader wholePage size='xlarge' /> : null}
			</Dialog>
		);
	}
}

PluginModal.propTypes = {
	plugins: PropTypes.instanceOf(Array),
	showPluginModal: PropTypes.bool,
	deleteStarted: PropTypes.bool,
	startedUpload: PropTypes.bool,
	serverMessageStatus: PropTypes.string,
	deletePlugin: PropTypes.func,
	fetchPlugins: PropTypes.func,
	hidePluginModal: PropTypes.func,
	showUploadPluginModal: PropTypes.func
};

const mapStateToProps = ({ plugins, serverMessage }) => ({
	showPluginModal: plugins.showPluginModal,
	plugins: plugins.plugins,
	startedUpload: plugins.startedUpload,
	deleteStarted: plugins.deleteStarted,
	serverMessageStatus: serverMessage.messageStatus
});

export default connect(mapStateToProps, {
	hidePluginModal: pluginActions.hidePluginModal,
	showUploadPluginModal: pluginActions.showUploadPluginModal,
	deletePlugin: pluginActions.deletePlugin,
	fetchPlugins: pluginActions.fetchPlugins
})(PluginModal);

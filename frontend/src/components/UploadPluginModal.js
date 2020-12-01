import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, Button } from '@nokia-csf-uxr/csfWidgets';
import {
	uploadFile as uploadFileRef,
	uploadFileName as uploadFileNameRef,
	fetchPlugins as fetchPluginsRef,
	hideUploadPluginModal as hideUploadPluginModalRef,
	uploadFailed as uploadFailedRef
} from 'actions/plugins';
import * as CONSTANTS from 'constants/app-constants';
import PropTypes from 'prop-types';
import { get } from 'lodash/fp';
import Loader from 'components/Loader';
import Uploader from './Uploader';

class UploadPluginModal extends Component {
	onClose = () => {
		const { hideUploadPluginModal } = this.props;
		hideUploadPluginModal();
	};

	uploadFile = () => {
		const { file, status, uploadFile, uploadFileName, fetchPlugins, uploadFailed } = this.props;
		if (file && status !== CONSTANTS.FAIL) {
			uploadFile(file).then(() => {
				uploadFileName(file).then((res) => {
					if (get(`payload.status`, res) === CONSTANTS.SUCCESS) {
						this.onClose();
						fetchPlugins();
					} else {
						uploadFailed();
					}
				});
			});
		}
	};

	renderFooter = () => {
		return (
			<div>
				<Button text='Submit' onClick={this.uploadFile} />
				<Button text='Cancel' onClick={this.onClose} />
			</div>
		);
	};

	render() {
		const { showUploadPluginModal, startedUpload } = this.props;
		if (!showUploadPluginModal) {
			return null;
		}

		return (
			<Dialog
				title='Upload Plugin'
				theme='black'
				width={500}
				height={300}
				header
				close={false}
				onClose={this.onClose}
				renderFooter={this.renderFooter}>
				<div>
					<Uploader />
					{startedUpload && <Loader size='xlarge' />}
				</div>
			</Dialog>
		);
	}
}

UploadPluginModal.propTypes = {
	status: PropTypes.string,
	showUploadPluginModal: PropTypes.bool,
	startedUpload: PropTypes.bool,
	file: PropTypes.shape({}),
	hideUploadPluginModal: PropTypes.func,
	uploadFile: PropTypes.func,
	uploadFileName: PropTypes.func,
	fetchPlugins: PropTypes.func,
	uploadFailed: PropTypes.func
};

const mapStateToProps = ({ plugins }) => ({
	showUploadPluginModal: plugins.showUploadPluginModal,
	file: plugins.file,
	startedUpload: plugins.startedUpload,
	status: plugins.status
});

export default connect(mapStateToProps, {
	uploadFile: uploadFileRef,
	uploadFileName: uploadFileNameRef,
	fetchPlugins: fetchPluginsRef,
	hideUploadPluginModal: hideUploadPluginModalRef,
	uploadFailed: uploadFailedRef
})(UploadPluginModal);

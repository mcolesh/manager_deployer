import React, { Component } from 'react';
import { get, map, isEmpty } from 'lodash/fp';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FileUploader } from '@nokia-csf-uxr/csfWidgets';

import {
	uploadWizardFile as uploadWizardFileRef,
	updateFileUploadStatus as updateFileUploadStatusRef
} from 'actions/wizard';
import 'components/wizard/forms/FieldsStyle.css';
import * as FILE_UPLOAD_STATUS from 'constants/fileUploadStatus';
import {
	REJECTED_FILE_TYPE_ERROR_MSG,
	REJECTED_FILE_MAX_ERROR_MSG,
	REQUIRED_VALIDATOR,
	REGEX
} from 'constants/app-captions';
import ErrorLabel from 'components/wizard/ErrorLabel';
import { getFieldErrorMessages, formatBytes } from 'utils/wizard';

/*
  CSF bugs related
  https://greenhopper.app.alcatel-lucent.com/browse/CSFS-6193
  https://greenhopper.app.alcatel-lucent.com/browse/CSFS-6196
  https://greenhopper.app.alcatel-lucent.com/browse/CSFS-6197
  https://greenhopper.app.alcatel-lucent.com/browse/CSFS-6198
  https://greenhopper.app.alcatel-lucent.com/browse/CSFS-6200
* */

const FileUploadContainer = styled.div`
	max-width: 500px;
`;
const statusErrorList = [
	FILE_UPLOAD_STATUS.REJECTED_TYPE,
	FILE_UPLOAD_STATUS.REJECTED_MAX,
	FILE_UPLOAD_STATUS.REJECTED_MIN
];

class FileUpload extends Component {
	constructor(props) {
		super(props);
		this.state = { uploadInProgress: false, shouldUploadFileToServer: false }; // TODO: change to true...
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { shouldUploadFileToServer } = this.state;
		if (nextProps.fileStatus && !statusErrorList.includes(get('fileStatus.0.status', nextProps))) {
			if (shouldUploadFileToServer) {
				this.setState({ shouldUploadFileToServer: false });
				this.uploadFileToServer();
			}
		}
	}

	setValidity(value, shouldUploadFileToServer = false, fileStatus = '') {
		const { validators, setErrors, model } = this.props;
		const newValidators = map((validator) => validator(this.props, value), validators);
		if (!statusErrorList.includes(fileStatus)) {
			if (
				shouldUploadFileToServer &&
				newValidators.every((currentValue) => currentValue === false)
			) {
				this.setState({ shouldUploadFileToServer });
			} else {
				// hack for CSF bug
				this.clearFile(false);
			}

			setErrors(model, newValidators);
		}
	}

	handleDelete = (e) => {
		this.clearFile(true);
	};

	clearFile = (callValidity = true) => {
		const { change, model, form, updateFileUploadStatus, name } = this.props;
		change(model, '', { form });
		updateFileUploadStatus(name, []);
		if (callValidity) {
			this.setValidity('');
		}
	};

	handleChange = (e) => {
		const { change, model, form, updateFileUploadStatus, name } = this.props;
		const fileObject = get('value.0', e);
		const value = [
			{
				filename: fileObject.filename,
				status: fileObject.status
			}
		];

		// In the JSON we need only the file name
		change(model, fileObject.filename, {
			form
		});

		// in the files map, we need also the metadata for the CSF component
		updateFileUploadStatus(name, value);
		this.setState({ file: fileObject.file });
		this.setValidity(fileObject.filename, true, fileObject.status);
	};

	uploadFileToServer = () => {
		const { uploadWizardFile, name, wizardName } = this.props;
		const { file } = this.state;
		uploadWizardFile(file, name, wizardName);
	};

	handleAbort = (e) => {
		const { uploadSource } = this.props;
		uploadSource.cancel();
		this.clearFile(true);
	};

	render() {
		const { accept, maxFileSizeAllowed, formModel, fileStatus } = this.props;
		const { uploadInProgress } = this.state;
		const errorMessages = get('errors', formModel);
		const isRequiredAndNotUploded =
			!isEmpty(errorMessages) && errorMessages.includes(REQUIRED_VALIDATOR);

		const isSupported =
			fileStatus && fileStatus.length && statusErrorList.includes(fileStatus[0].status);
		const isFileNameInvalid = !isEmpty(errorMessages) && errorMessages.includes(REGEX);
		const extensions =
			accept &&
			accept
				.split(',')
				.map((extension) => {
					const items = extension.split('.');
					const tempItem = items[items.length - 1];
					return `.${tempItem}`;
				})
				.join(',');
		return (
			<FileUploadContainer>
				{!isSupported && (isRequiredAndNotUploded || isFileNameInvalid) && (
					<ErrorLabel text={getFieldErrorMessages(errorMessages)} />
				)}
				<FileUploader
					denyMultipleFileDrop
					allowOnlyOneFileInUploader
					fileDownloadIndicator={false}
					maxFileSizeAllowed={maxFileSizeAllowed}
					fileRejectedMaxSizeMessage={`${REJECTED_FILE_MAX_ERROR_MSG} ${formatBytes(
						maxFileSizeAllowed
					)}`}
					onFileSelect={(e) => this.handleChange(e)}
					fileDeleteResponse={(e) => this.handleDelete(e)}
					fileCancelResponse={(e) => this.handleDelete(e)}
					data={fileStatus}
					fileTypes={extensions}
					fileRejectedTypeMessage={`${REJECTED_FILE_TYPE_ERROR_MSG}`.replace('{0}', accept)}
					disableFileUpload={uploadInProgress}
					dropZoneDateColumnHeader=''
					fileAbortResponse={(e) => this.handleAbort(e)}
				/>
			</FileUploadContainer>
		);
	}
}

FileUpload.propTypes = {
	formModel: PropTypes.shape({}),
	form: PropTypes.shape({}),
	model: PropTypes.string,
	wizardName: PropTypes.string,
	fileStatus: PropTypes.instanceOf(Array),
	change: PropTypes.func,
	setErrors: PropTypes.func,
	uploadWizardFile: PropTypes.func,
	updateFileUploadStatus: PropTypes.func,
	name: PropTypes.string,
	accept: PropTypes.string,
	maxFileSizeAllowed: PropTypes.number,
	validators: PropTypes.instanceOf(Array),
	uploadSource: PropTypes.shape({})
};

const mapStateToProps = (
	state,
	{ path, preFormModel = 'dynamicForm.content', preForm = 'dynamic.content', name }
) => ({
	formModel: get(`${preFormModel}.${path}`, state),
	form: get(`${preForm}`, state),
	wizardName: get('wizard.name', state),
	fileStatus: get('wizard.uploadFiles', state).get(name),
	uploadSource: get('wizard.uploadSource', state)
});

export default connect(mapStateToProps, {
	change: actions.change,
	setErrors: actions.setErrors,
	uploadWizardFile: uploadWizardFileRef,
	updateFileUploadStatus: updateFileUploadStatusRef
})(FileUpload);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { storeFileToUpload as storeFileToUploadRef } from 'actions/plugins';
import * as CONSTANTS from 'constants/app-constants';
import { DescriptionLabel } from 'components/StyledComponents';
import { PLUGIN_UPLOAD_ERROR } from 'constants/app-captions';

const ErrorContainer = styled.div`
	background-color: #f2dede;
	border-color: #ebcccc;
	color: #a94442;
	padding: 0.75rem 1.25rem;
	margin-bottom: 1rem;
	border: 1px solid transparent;
	border-radius: 0.25rem;
`;

class Uploader extends Component {
	handleChange(selectorFiles) {
		const { storeFileToUpload } = this.props;
		storeFileToUpload(selectorFiles);
	}

	render() {
		const { status, error } = this.props;
		return (
			<div>
				<DescriptionLabel>Select the tar.gz file of your plugin:</DescriptionLabel>
				{status === CONSTANTS.FAIL && (
					<ErrorContainer>{error || PLUGIN_UPLOAD_ERROR}</ErrorContainer>
				)}
				<input
					type='file'
					name='file'
					accept='.tar.gz, .tgz, application/gzip'
					onChange={(e) => this.handleChange(e.target.files)}
				/>
			</div>
		);
	}
}

Uploader.propTypes = {
	status: PropTypes.string,
	error: PropTypes.string,
	storeFileToUpload: PropTypes.func
};

const mapStateToProps = ({ plugins }) => ({
	status: plugins.status,
	error: plugins.error
});

export default connect(mapStateToProps, { storeFileToUpload: storeFileToUploadRef })(Uploader);

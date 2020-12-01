import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import { wizardToDeploy as wizardToDeploySelector } from 'selectors/wizard';
import CustomTextMode from 'components/CustomTextMode';
import PropTypes from 'prop-types';

class DeployDataView extends PureComponent {
	componentDidMount() {
		const customMode = new CustomTextMode();
		this.jsonEditor.editor.getSession().setMode(customMode);
	}

	render() {
		const { wizardToDeploy } = this.props;
		return (
			<AceEditor
				id='deploy-json-editor'
				key='deploy-json-editor'
				mode='text'
				theme='monokai'
				name='deployDataView'
				width='100%'
				height='510px'
				setOptions={{ readOnly: true }}
				editorProps={{ $blockScrolling: Infinity }}
				showPrintMargin={false}
				value={JSON.stringify(wizardToDeploy, null, '\t')}
				ref={(editor) => {
					this.jsonEditor = editor;
				}}
			/>
		);
	}
}

DeployDataView.propTypes = {
	wizardToDeploy: PropTypes.shape({}).isRequired
};

const mapStateToProps = (state) => ({
	wizardToDeploy: wizardToDeploySelector(state, false)
});

export default connect(mapStateToProps)(DeployDataView);

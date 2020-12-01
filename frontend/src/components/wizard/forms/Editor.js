import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import { get } from 'lodash/fp';
import CustomTextMode from '../../CustomTextMode';

class Editor extends PureComponent {
	componentDidMount() {
		const customMode = new CustomTextMode();
		this.jsonEditor.editor.getSession().setMode(customMode);
	}

	render() {
		const { height } = this.props;
		return (
			<AceEditor
				id='editor-field-log'
				key='editor-field-log'
				mode='text'
				theme='monokai'
				name='editor-field'
				width='100%'
				height={height ? height : '30em'}
				showPrintMargin={false}
				readOnly={true}
				editorProps={{ $blockScrolling: Infinity }}
				value={this.props.value}
				ref={(editor) => {
					this.jsonEditor = editor;
				}}
			/>
		);
	}
}

Editor.propTypes = {
	value: PropTypes.string,
	model: PropTypes.string,
	name: PropTypes.string,
	height: PropTypes.string
};

const mapStateToProps = (state, { path, preForm = 'dynamic.content' }) => ({
	value: get(`${preForm}.${path}`, state)
});

export default connect(mapStateToProps, {})(Editor);

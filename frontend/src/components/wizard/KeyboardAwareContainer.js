import React from 'react';
import PropTypes from 'prop-types';
import { ENTER_ASCII_CODE, ESCAPE_ASCII_CODE } from 'constants/app-constants';

const KeyboardAwareContainer = (props) => {
	const { children } = props;
	const onKeyUp = (event) => {
		event.stopPropagation();
		if (props.onEnter && event.keyCode === ENTER_ASCII_CODE) {
			props.onEnter();
		}
		if (props.onEsc && event.keyCode === ESCAPE_ASCII_CODE) {
			props.onEsc();
		}
	};
	return (
		<div onKeyUp={onKeyUp} role='button' tabIndex='0'>
			{children}
		</div>
	);
};

KeyboardAwareContainer.propTypes = {
	onEnter: PropTypes.func,
	onEsc: PropTypes.func,
	children: PropTypes.instanceOf(Array)
};

export default KeyboardAwareContainer;

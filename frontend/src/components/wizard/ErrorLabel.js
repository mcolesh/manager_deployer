import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const ErrorMessage = styled.span`
	color: #d9070a;
	font-size: 11px;
	font-family: Nokia Pure Text Regular, Arial, sans-serif;
	line-height: 11px;
	padding-top: 4px;
`;
const ErrorLabel = ({ text, classes }) => <ErrorMessage className={classes}>{text}</ErrorMessage>;

ErrorLabel.propTypes = {
	text: PropTypes.string,
	classes: PropTypes.string
};

export default ErrorLabel;

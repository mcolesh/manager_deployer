import React from 'react';
import styled from 'styled-components';
import { ProgressIndicatorCircular } from '@nokia-csf-uxr/csfWidgets';
import { PropTypes } from 'prop-types';

const LoaderContainer = styled.div`
	${({ wholePage }) => (wholePage ? 'position: absolute' : 'position: initial')};
	${({ wholePage }) => (wholePage ? 'bottom: 50%' : 'bottom: initial')};
	${({ wholePage }) => (wholePage ? 'width: 100%' : 'width: initial')};
	z-index: 99999;
`;

const Loader = (props) => {
	const { size, wholePage } = props;
	const isSmall = size === 'small';
	const isMedium = size === 'medium';
	const isLarge = size === 'large';
	const isXlarge = size === 'xlarge';
	const isXxLarge = size === 'xxlarge';

	return (
		<LoaderContainer wholePage={wholePage}>
			<ProgressIndicatorCircular
				id='progressIndicatorCircularID'
				spinner='right'
				className=''
				css={{
					fade: true,
					small: isSmall,
					medium: isMedium,
					large: isLarge,
					xlarge: isXlarge,
					xxlarge: isXxLarge,
					overlay: true
				}}
			/>
		</LoaderContainer>
	);
};

Loader.propTypes = {
	wholePage: PropTypes.bool,
	size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge'])
};

export default Loader;

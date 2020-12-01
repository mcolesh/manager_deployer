import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as componentsActions from 'actions/externalLinks';
import { Card, Tooltip } from '@nokia-csf-uxr/csfWidgets';
import styled from 'styled-components';
import Loader from 'components/Loader';
import * as APP_CONSTANTS from 'constants/app-constants';
import './DashboardStyles.css';
import { HeaderLabel, DescriptionLabel, ContentLabel } from 'components/StyledComponents';

const hyperlink = require('../assets/images/hyperlink.png');
const linkImage = require('../assets/images/ic_open_in_new.svg');

const ExternalLinksContainer = styled.div`
	height: 100%;
	width: 100%;
`;

const ImageLink = styled.img`
	position: absolute;
	right: 10px;
	top: 10px;
`;

const LinksContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const CardInnerContainer = styled.div`
	display: flex;
`;

const CardContainer = styled.div`
	${({ status }) =>
		status === APP_CONSTANTS.NOT_INSTALLED ? 'cursor: not-allowed' : 'cursor: pointer'};
	margin: 10px;
`;

const InternalLoaderContainer = styled.div`
	position: absolute;
	margin-top: 20%;
	width: 100%;
`;

export class Components extends Component {
	componentDidMount() {
		const { pending, fetchComponents } = this.props;
		if (!pending) {
			fetchComponents();
		}
	}

	getImageURI = (name) => {
		let link;

		try {
			link = require(`../assets/images/${name.toLowerCase()}.png`); // eslint-disable-line import/no-dynamic-require , global-require
		} catch (e) {
			link = hyperlink;
		}
		return link;
	};

	onClick = (externalLink) => () => {
		if (externalLink.status !== APP_CONSTANTS.NOT_INSTALLED) {
			const win = window.open(externalLink.url, '_blank');
			win.focus();
		}
	};

	render() {
		const { components } = this.props;
		return (
			<ExternalLinksContainer>
				{components.length ? (
					<LinksContainer className='external-links-cards'>
						{components.map((externalLink) => (
							<CardContainer status={externalLink.status} key={externalLink.display}>
								<Card
									id={externalLink.display}
									className=''
									css={{
										height: '70',
										width: '248',
										backgroundColor:
											externalLink.status === APP_CONSTANTS.NOT_INSTALLED
												? 'rgb(176,176,176)'
												: 'rgb(255,255,255)'
									}}
									selectable={false}
									onClick={this.onClick(externalLink)}>
									<CardInnerContainer>
										<img
											src={this.getImageURI(externalLink.display)}
											alt='external link img'
											width='38px'
											height='38px'
										/>
										<ContentLabel>
											<HeaderLabel id='external-link-card-title'>
												{externalLink.display}
											</HeaderLabel>
											<ImageLink src={linkImage} alt='external links img' />
											<DescriptionLabel id='external-link-card-description'>
												{externalLink.description}
											</DescriptionLabel>
										</ContentLabel>
									</CardInnerContainer>
								</Card>
								{externalLink.status === APP_CONSTANTS.NOT_INSTALLED && (
									<Tooltip
										text={APP_CONSTANTS.NOT_INSTALLED_LINK_TOOLTIP_TEXT}
										id={`${externalLink.display}_tooltip`}
										target={`#${externalLink.display}`}
									/>
								)}
							</CardContainer>
						))}
					</LinksContainer>
				) : (
					<InternalLoaderContainer>
						<Loader size='xxlarge' />
					</InternalLoaderContainer>
				)}
			</ExternalLinksContainer>
		);
	}
}

Components.propTypes = {
	pending: PropTypes.bool,
	components: PropTypes.instanceOf(Array),
	fetchComponents: PropTypes.func
};

const mapStateToProps = (state) => ({
	components: state.externalLinks.components,
	pending: state.externalLinks.pending
});

export default connect(mapStateToProps, {
	fetchComponents: componentsActions.fetchComponents
})(Components);

import styled from 'styled-components';

export const MarginContainer = styled.div`
	margin: 10px;
`;

export const FieldContainer = styled.div`
	${({ showAnimation }) =>
		showAnimation
			? `animation: animate .5s ease-in-out; transition: transform .5s ease-in-out, opacity .5s;`
			: ``};
	${({ showFadeIn }) =>
		showFadeIn
			? `animation: animateReverse .25s ease-in-out; transition: transform .25s ease-in-out, opacity .25s;`
			: ``};
	${({ visible }) =>
		visible
			? `display: flex; flex-direction: row; visibility: visible; margin-bottom: 40px;`
			: `visibility: hidden; opacity: 0; height: 0;`};
`;

export const FieldComponentContainer = styled.div`
	width: 100%;
`;

export const FieldItemContainer = styled.div`
	align-self: flex-start;
`;

export const HeaderLabel = styled.p`
	font-family: Nokia Pure Text Regular, Arial, sans-serif;
	font-size: 16px !important;
	color: black;
	${({ showEllipsis }) =>
		showEllipsis
			? 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap; min-width: 180px;'
			: ''};
`;

export const DescriptionLabel = styled.p`
	font-family: Nokia Pure Text Regular, Arial, sans-serif;
	font-size: 15px !important;
	line-height: 19px !important;
	color: black;
	white-space: pre-wrap;
`;

export const ContentLabel = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ExpansionPanelLabel = styled.p`
	font-family: Nokia Pure Text Medium, Arial, sans-serif;
	font-size: 19px;
	color: black;
`;

export const LoaderContainer = styled.div`
	height: 100%;
	top: 0px;
	left: 0;
	display: block;
	opacity: 0.7;
	background-color: #fff;
	position: fixed;
	width: 100%;
	z-index: 99999;
`;

export const DeleteSubSectionIcon = styled.div`
	position: absolute;
	right: 58px;
	top: 10px;
`;

export const ItemsContainer = styled.div`
	flex: 1;
`;

export const ChipsItemsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const WizardLoaderContainer = styled.div`
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: fixed;
	display: block;
	opacity: 0.7;
	background-color: #fff;
	z-index: 99;
	text-align: center;
`;

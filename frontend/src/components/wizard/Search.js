import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as wizardActions from 'actions/wizard';
import * as CAPTIONS from 'constants/app-captions';
import { TextInput, Button } from '@nokia-csf-uxr/csfWidgets';
import { get, filter } from 'lodash/fp';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const SearchComponent = styled.div`
	position: absolute;
	display: flex;
	max-width: 300px;
	right: ${(props) => (!props.isExampleCard ? '19em;' : '4em;')}
	top: 1.5em;
	z-index: 10;
`;

const SearchInputConainer = styled.div`
	display: flex;
`;

const CounterContainer = styled.div`
	position: relative;
	top: 5px;
	min-width: 35px;
`;

const NextButtonContainer = styled.div``;

const BackButtonContainer = styled.div``;

const ClearButtonContainer = styled.div``;

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
			searchNext: false,
			searchBack: '',
			currentSearchIndex: -1
		};
	}

	componentDidUpdate() {
		const { searchWordsMap } = this.props;
		const { searchNext, searchBack } = this.state;
		if (searchWordsMap.size !== 0 && (searchNext || searchBack)) {
			this.searchOverWizard();
		}
	}

	onSearchTextChanged = ({ value }) => {
		const { search } = this.props;
		const { searchText } = this.state;
		if (value.length <= 1 && searchText.length > 1) {
			search('');
			this.setState({
				searchNext: false,
				searchBack: false,
				currentSearchIndex: -1
			});
		}
		this.setState({ searchText: value });
		if (value.length > 1) {
			search(value);
			this.setState({
				searchNext: true,
				searchBack: false,
				currentSearchIndex: -1
			});
		}
	};

	searchNext = () => {
		this.setState({ searchNext: true });
	};

	searchBack = () => {
		this.setState({ searchBack: true });
	};

	clearSearchText = () => {
		this.onSearchTextChanged({ value: '' });
	};

	onSubmit = (key) => {
		const { searchWordsMap } = this.props;
		const { currentSearchIndex } = this.state;
		if (key.nativeEvent.shiftKey && currentSearchIndex > 0) {
			this.setState({ searchBack: true });
		}

		if (!key.nativeEvent.shiftKey && currentSearchIndex < searchWordsMap.size - 1) {
			this.setState({ searchNext: true });
		}
	};

	onKeyUp = (key) => {
		const { searchText } = this.state;
		if (searchText !== '' && key.nativeEvent.keyCode === 27) {
			this.clearSearchText();
		}
	};

	searchOverWizard() {
		const { searchNext, currentSearchIndex } = this.state;
		const {
			collapseMap,
			searchWordsMap,
			currentStepName,
			collapseMapChanged,
			changeCollapseMapStatus,
			changeCollapseMapInSearch
		} = this.props;
		const index = currentSearchIndex + (searchNext ? 1 : -1);
		const currentSearch = searchWordsMap.get(index);
		const currentSearchSection = get('section', currentSearch);
		const subSection = get('subSectionName', currentSearch);
		if (currentSearchSection === currentStepName) {
			if (!collapseMap.get(`${currentSearchSection}_${subSection}`)) {
				const domNode = document.getElementsByClassName(currentSearch.name)[0];
				if (domNode) {
					domNode.scrollIntoView(domNode.offsetTop);
					this.setState({ searchNext: false, searchBack: false, currentSearchIndex: index }, () => {
						if (collapseMapChanged) {
							changeCollapseMapStatus();
						}
					});
				}
			} else {
				changeCollapseMapInSearch(`${currentSearchSection}_${subSection}`);
			}
		} else {
			const wizardStep = filter(
				{ key: currentSearchSection },
				get('wizardSteps.props.children', window)
			);
			if (collapseMap.get(`${currentSearchSection}_${subSection}`)) {
				changeCollapseMapInSearch(`${currentSearchSection}_${subSection}`);
				get('0.props.children.props', wizardStep).onClick();
			} else {
				get('0.props.children.props', wizardStep).onClick();
			}
		}
	}

	render() {
		const { searchWordsMap, isExampleCard } = this.props;
		const { searchText, currentSearchIndex } = this.state;
		return (
			<SearchComponent isExampleCard={isExampleCard}>
				<SearchInputConainer>
					<TextInput
						text={searchText}
						id='search-input-text'
						placeholder='search'
						onChange={this.onSearchTextChanged}
						onSubmit={this.onSubmit}
						onKeyUp={this.onKeyUp}
					/>
					{searchWordsMap.size > 0 || (searchWordsMap.size === 0 && searchText.length > 1) ? (
						<CounterContainer>
							{currentSearchIndex + 1}/{searchWordsMap.size}
						</CounterContainer>
					) : (
						<CounterContainer />
					)}
				</SearchInputConainer>
				<NextButtonContainer isExampleCard={isExampleCard}>
					<Button
						id='search-btn-next'
						icon='ic_arrow_downward'
						onClick={this.searchNext}
						disabled={currentSearchIndex === searchWordsMap.size - 1}
						tooltip={{ balloon: true, text: CAPTIONS.SEARCH_NEXT_TOOLTIP }}
					/>
				</NextButtonContainer>
				<BackButtonContainer isExampleCard={isExampleCard}>
					<Button
						id='search-btn-back'
						icon='ic_arrow_upward'
						onClick={this.searchBack}
						disabled={currentSearchIndex <= 0}
						tooltip={{ balloon: true, text: CAPTIONS.SEARCH_BACK_TOOLTIP }}
					/>
				</BackButtonContainer>
				<ClearButtonContainer isExampleCard={isExampleCard}>
					<Button
						id='close-search-btn'
						icon='ic_close'
						onClick={this.clearSearchText}
						disabled={searchText === ''}
						tooltip={{ balloon: true, text: CAPTIONS.CLEAR_SEARCH_TOOLTIP }}
					/>
				</ClearButtonContainer>
			</SearchComponent>
		);
	}
}

Search.propTypes = {
	currentStepName: PropTypes.string,
	isExampleCard: PropTypes.bool,
	collapseMapChanged: PropTypes.bool,
	searchWordsMap: PropTypes.shape({ size: PropTypes.number, get: PropTypes.func }),
	collapseMap: PropTypes.shape({ get: PropTypes.func }),
	changeCollapseMapStatus: PropTypes.func,
	changeCollapseMapInSearch: PropTypes.func,
	search: PropTypes.func
};

const mapStateToProps = (state) => ({
	collapseMap: state.wizard.collapseMap,
	collapseMapChanged: state.wizard.collapseMapChanged,
	searchWordsMap: state.wizard.searchWordsMap,
	currentStepName: state.wizard.currentStepName
});

export default connect(mapStateToProps, {
	search: wizardActions.search,
	changeCollapseMap: wizardActions.changeCollapseMap,
	changeCollapseMapStatus: wizardActions.changeCollapseMapStatus,
	changeCollapseMapInSearch: wizardActions.changeCollapseMapInSearch
})(Search);

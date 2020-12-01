import React, { Component } from 'react';
import styled from 'styled-components';
import { LoginScreen } from '@nokia-csf-uxr/csfWidgets';
import { connect } from 'react-redux';
import { push as pushRef } from 'connected-react-router';
import * as CAPTIONS from 'constants/app-captions';
import { get, getOr, isEmpty } from 'lodash/fp';
import Loader from 'components/Loader';
import { PropTypes } from 'prop-types';
import { login as loginRef } from '../actions/auth';
import { fetchProductType as fetchProductTypeRef } from '../actions/ui';
import ErrorBoundary from './ErrorBoundary';
import { fetchPages as fetchPagesRef } from '../actions/pages';

const Container = styled.div`
	height: 100vh;
	width: 100vw;
`;

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonDisabled: true,
			username: '',
			password: '',
			buttonLoading: false
		};
	}

	componentDidMount() {
		const { fetchProductType, fetchProductTypeFinished } = this.props;
		if (!fetchProductTypeFinished) {
			fetchProductType();
		}
	}
	static getDerivedStateFromProps(props, state) {
		const { push, fetchProductTypeFinished, productTypeInfo } = props;
		if (!isEmpty(props.credentials) || props.fetchPagesSuccess) {
			push('/dashboard');
		}
		if (fetchProductTypeFinished) {
			document.title = get('product_type', productTypeInfo);
		}
		if (props.loginErrorFromServer && !props.inProgress) {
			return { ...state, notificationMessage: props.errorMessage, notificationType: 'error' };
		}
		return state;
	}

	onUserNameChange = (data) => {
		const { value } = data;
		const { password } = this.state;
		this.setState({
			username: value,
			buttonDisabled: password.length === 0 || value.length === 0,
			usernameError: false,
			passwordError: false
		});
	};

	onPasswordChange = (data) => {
		const { value } = data;
		const { username } = this.state;
		this.setState({
			password: value,
			buttonDisabled: username.length === 0 || value.length === 0,
			usernameError: false,
			passwordError: false
		});
	};

	onButtonClick = () => {
		const { username, password } = this.state;
		const { login } = this.props;
		this.setState(
			{
				buttonLoading: true,
				passwordDisabled: true,
				userNameDisable: true
			},
			() => {
				// Clear Errors
				this.setState({ notificationMessage: '', notificationType: undefined });
				// Base64-encoded URL-encoded data
				const credentials = btoa(`${encodeURIComponent(username)}:${encodeURIComponent(password)}`);

				login(username, credentials);
			}
		);
	};

	render() {
		const { fetchProductTypeFinished, inProgress } = this.props;
		const { username, password, notificationMessage } = this.state;
		return (
			<Container>
				<ErrorBoundary>
					{fetchProductTypeFinished ? (
						<LoginScreen
							id='Login'
							productName={getOr(
								CAPTIONS.DEFAULT_PRODUCT_TITLE,
								'productTypeInfo.title',
								this.props
							)}
							productDescription={getOr(
								CAPTIONS.PRODUCT_NAME,
								'productTypeInfo.description',
								this.props
							)}
							versionNumber={getOr('', 'productTypeInfo.version', this.props)}
							copyrightYear={2018}
							userNameProps={{
								onChange: this.onUserNameChange,
								text: username,
								css: { disabled: inProgress }
							}}
							passwordProps={{
								onChange: this.onPasswordChange,
								text: password,
								css: { disabled: inProgress }
							}}
							buttonProps={{
								onClick: this.onButtonClick,
								disabled: inProgress || username.length === 0 || password.length === 0
							}}
							logoAltText={getOr(
								CAPTIONS.DEFAULT_PRODUCT_TITLE,
								'productTypeInfo.title',
								this.props
							).toUpperCase()}
							noBackground={false}
							buttonLoading={inProgress}
							notificationMessage={notificationMessage}
							notificationType='error'
							focus
						/>
					) : (
						<Loader wholePage size='xxlarge' />
					)}
				</ErrorBoundary>
			</Container>
		);
	}
}

Login.propTypes = {
	authenticated: PropTypes.bool,
	loginErrorFromServer: PropTypes.bool,
	inProgress: PropTypes.bool,
	fetchProductTypeFinished: PropTypes.bool,
	errorMessage: PropTypes.string,
	push: PropTypes.func,
	fetchProductType: PropTypes.func,
	login: PropTypes.func,
	fetchPages: PropTypes.func,
	credentials: PropTypes.shape({}),
	fetchPagesSuccess: PropTypes.bool,
	productTypeInfo: PropTypes.shape({})
};

const mapStateToProps = (state) => ({
	blockUI: state.ui.blockUI,
	authenticated: state.auth.authenticated,
	loginErrorFromServer: state.auth.loginErrorFromServer,
	inProgress: state.auth.inProgress,
	errorMessage: state.auth.errorMessage,
	productTypeInfo: state.ui.productTypeInfo,
	fetchProductTypeFinished: state.ui.fetchProductTypeFinished,
	credentials: state.auth.credentials,
	fetchPagesSuccess: state.pagesData.fetchPagesSuccess
});

export default connect(mapStateToProps, {
	login: loginRef,
	push: pushRef,
	fetchProductType: fetchProductTypeRef,
	fetchPages: fetchPagesRef
})(Login);

import React, { Component } from 'react';
import { Route } from 'react-router';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import * as AT from '../constants/action-types';
import ErrorBoundary from './ErrorBoundary';
import ServerMessage from './ServerMessage';

const ComponentContainer = styled.div`
	position: relative;
	min-width: 1000px;
`;

class PrivateRoute extends Component {
	render() {
		const { authenticated, component: Component, ...props } = this.props;
		return (
			<Route
				{...props}
				render={(props) =>
					authenticated ? (
						<ErrorBoundary cbisVersion={this.props.cbisVersion}>
							<div>
								<Header />
								<ComponentContainer>
									<Component {...props} />
								</ComponentContainer>
								<ServerMessage />
							</div>
						</ErrorBoundary>
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					)
				}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	authenticated: state.auth.authenticated,
	cbisVersion: state.pagesData.cbisVersion
});

export default connect(mapStateToProps, {
	useSessionAuth: () => ({
		type: AT.LOGIN.SUCCESS
	})
})(PrivateRoute);

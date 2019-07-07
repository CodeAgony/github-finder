/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

export class User extends Component {
	componentDidMount() {
		this.props.getUser(this.props.match.params.login);
	}
	render() {
		return <div>User</div>;
		return <div> test </div>;
	}
}

User.propTypes = {
	getUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	loading: PropTypes.bool
};

export default User;

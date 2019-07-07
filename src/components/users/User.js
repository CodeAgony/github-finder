/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

export class User extends Component {
	componentDidMount() {
		this.props.getUser(this.props.match.params.login);
	}
	render() {
		const { loading } = this.props;

		if (loading) return <Spinner />;

		return (
			<Fragment>
				<Link to='/' className='btn btn-light'>
					Back to Search
				</Link>
			</Fragment>
		);
	}
}

User.propTypes = {
	getUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	loading: PropTypes.bool
};

export default User;

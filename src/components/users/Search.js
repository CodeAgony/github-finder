import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
	state = {
		text: ''
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e => {
		e.preventDefault();
		// eslint-disable-next-line react/prop-types
		this.props.searchUsers(this.state.text);
		this.setState({ text: '' });
	};

	render() {
		return (
			<div>
				<form className='form' onSubmit={this.onSubmit}>
					<input
						type='text'
						name='text'
						placeholder='Search users...'
						onChange={this.onChange}
					/>
					<input
						type='submit'
						value='Search'
						className='btn btn-dark btn-block'
					/>
				</form>
				{this.props.isFull && (
					<button
						className='btn btn-light btn-block'
						onClick={this.props.clearUsers}
					>
						Clear
					</button>
				)}
			</div>
		);
	}
}

Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	isFull: PropTypes.bool.isRequired
};

export default Search;

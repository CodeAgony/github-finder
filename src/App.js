import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

class App extends Component {
	state = {
		users: [],
		loading: false,
		alert: null
	};

	// Get users from API based on search query
	searchUsers = async text => {
		// Show the loading spinner while data is on the way
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${
				process.env.REACT_APP_GITHUB_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		// Store response in state and remove spinner
		this.setState({ users: res.data.items, loading: false });
	};

	// Clear API response data from state
	clearUsers = () => this.setState({ users: [], loading: false });

	// Lift alert state
	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		// Remove alert in 5 seconds
		setTimeout(() => this.setState({ alert: null }), 5000);
	};

	render() {
		const { users, loading } = this.state;

		return (
			<Router>
				<div className='App'>
					<Navbar title='Github Finder' icon='fab fa-github' />
					<div className='container'>
						<Alert alert={this.state.alert} />
						<Search
							searchUsers={this.searchUsers}
							clearUsers={this.clearUsers}
							isFull={users.length > 0 ? true : false}
							setAlert={this.setAlert}
						/>
						<Users loading={loading} users={users} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;

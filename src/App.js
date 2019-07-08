/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	// Get users from API based on search query
	const searchUsers = async text => {
		// Show the loading spinner while data is on the way
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${
				process.env.REACT_APP_GITHUB_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		// Store response in state and remove spinner
		setUsers(res.data.items);
		setLoading(false);
	};

	// Clear API response data from state
	const clearUsers = () => setUsers([]);
	// setLoading(false);

	// Get single user
	const getUser = async login => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${login}?client_id=${
				process.env.REACT_APP_GITHUB_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setUser(res.data);
		setLoading(false);
	};

	// Get user repositories
	const getUserRepos = async login => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${
				process.env.REACT_APP_GITHUB_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setRepos(res.data);
		setLoading(false);
	};

	// Lift alert state
	const showAlert = (msg, type) => {
		setAlert({ msg, type });

		// Remove alert in 5 seconds
		setTimeout(() => setAlert(null), 5000);
	};

	return (
		<Router>
			<div className='App'>
				<Navbar title='Github Finder' icon='fab fa-github' />
				<div className='container'>
					<Alert alert={alert} />
					<Switch>
						<Route
							exact
							path='/'
							render={props => (
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										isFull={users.length > 0 ? true : false}
										setAlert={showAlert}
									/>
									<Users loading={loading} users={users} />
								</Fragment>
							)}
						/>
						<Route exact path='/about' component={About} />
						<Route
							exact
							path='/user/:login'
							render={props => (
								<Fragment>
									<User
										{...props}
										getUser={getUser}
										getUserRepos={getUserRepos}
										user={user}
										repos={repos}
									/>
								</Fragment>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;

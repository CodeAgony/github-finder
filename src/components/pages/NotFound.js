import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div>
			<h1>Not Found</h1>
			<p className='lead'>The page you are lloking for does not exist</p>
			<Link to='/'>Return to the home page</Link>
		</div>
	);
};

export default NotFound;

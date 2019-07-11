import React, { useReducer } from 'react';
import AlertContext from '../alert/alertContext';
import AlertReducer from '../alert/alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
	const initialState = null;

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	// Set alert
	const setAlert = (msg, type) => {
		dispatch({
			type: SET_ALERT,
			payload: { msg, type }
		});

		// Remove alert in 5 seconds
		setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
	};

	return (
		<AlertContext.Provider
			value={{
				// Leave alert null while unchanged. Line 7
				...state,
				alert: state,
				setAlert
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;

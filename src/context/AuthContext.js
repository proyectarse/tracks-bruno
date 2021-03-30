import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		case 'signup':
			return { token: action.payload, errorMessage: '' };
		case 'signin':
			return { token: action.payload, errorMessage: '' };
		case 'clear_error_message':
			return { ...state, errorMessage: '' };
		case 'signout':
			return { token: null, errorMessage: '' };
		default:
			return state;
	}
};

const signup = (dispatch) => {
	return async ({ email, password }) => {
		try {
			const response = await trackerApi.post('/signup', {
				email,
				password,
			});
			await AsyncStorage.setItem('token', response.data.token);
			dispatch({ type: 'signup', payload: response.data.token });
			navigate('TrackList');
		} catch (err) {
			dispatch({ type: 'add_error', payload: 'Something went wrong' });
		}
	};
};

const signin = (dispatch) => {
	return async ({ email, password }) => {
		try {
			const response = await trackerApi.post('/signin', {
				email,
				password,
			});
			await AsyncStorage.setItem('token', response.data.token);
			dispatch({ type: 'signin', payload: response.data.token });
			navigate('TrackList');
		} catch (err) {
			console.log(err);
			dispatch({ type: 'add_error', payload: 'Something went wrong' });
		}
	};
};

// versión resumida sin return
const clearErrorMessage = (dispatch) => () => {
	dispatch({ type: 'clear_error_message' });
};

// revisa el token
const tryLocalSignin = (dispatch) => async () => {
	const token = await AsyncStorage.getItem('token');
	if (token) {
		dispatch({ type: 'signin', payload: token });
		navigate('TrackList');
	} else {
		navigate('loginFlow');
	}
};

const signout = (dispatch) => {
	return async () => {
		await AsyncStorage.removeItem('token');
		dispatch({ type: 'signout' });
		navigate('loginFlow');
	};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup, clearErrorMessage, tryLocalSignin },
	{ token: null, errorMessage: '' }
);

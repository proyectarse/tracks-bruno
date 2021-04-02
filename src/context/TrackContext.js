import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
	switch (action.type) {
		case 'loading_fetch_tracks':
			return { ...state, loading: true };
		case 'fetch_tracks':
			return { ...state, tracks: action.payload };
		case 'stop_loading_fetch_tracks':
			return { ...state, loading: false };
		default:
			return state;
	}
};

const fetchTracks = (dispatch) => async () => {
	dispatch({ type: 'loading_fetch_tracks' });
	const response = await trackerApi.get('/tracks');
	// console.log(response.data);
	dispatch({ type: 'fetch_tracks', payload: response.data });
	dispatch({ type: 'stop_loading_fetch_tracks' });
};
const createTrack = (dispatch) => async (name, locations) => {
	// console.log(name, locations.length);
	await trackerApi.post('/tracks', { name, locations });
};

export const { Provider, Context } = createDataContext(
	trackReducer,
	{ fetchTracks, createTrack },
	{ tracks: [], loading: false }
);

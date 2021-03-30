// import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = ({ isFocused }) => {
	const { state, addLocation } = useContext(LocationContext);

	const callback = useCallback(
		(location) => {
			addLocation(location, state.recording);
		},
		[state.recording]
	);

	const [err] = useLocation(isFocused || state.recording, callback);

	console.log(isFocused, '<--');

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text h2>Create a Track</Text>
			<Map />
			{err && <Text>Please enable location services.</Text>}
			<TrackForm />
		</SafeAreaView>
	);
};

TrackCreateScreen.navigationOptions = {
	tabBarLabel: 'Add Track',
	tabBarIcon: <Feather name="plus" size={24} color="black" />,
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);

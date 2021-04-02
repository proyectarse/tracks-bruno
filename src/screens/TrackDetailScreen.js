import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) => {
	const {
		state: { tracks },
	} = useContext(TrackContext);
	const _id = navigation.getParam('_id');

	const track = tracks.find((tra) => tra._id === _id);
	const initalCoords = track.locations[0].coords;

	console.log(track, 'el track detail');

	return (
		<>
			<MapView
				style={styles.map}
				initialRegion={{
					...initalCoords,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				<Polyline
					coordinates={track.locations.map((loc) => loc.coords)}
				/>
			</MapView>
		</>
	);
};

TrackDetailScreen.navigationOptions = ({ navigation }) => ({
	title: navigation.getParam('name'),
});

const styles = StyleSheet.create({
	map: {
		height: 300,
	},
});

export default TrackDetailScreen;

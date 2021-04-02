import React, { useContext, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const TrackDetailScreen = ({ navigation }) => {
	const {
		state: { tracks },
	} = useContext(TrackContext);
	const _id = navigation.getParam('_id');

	const mapRef = useRef();

	const track = tracks.find((tra) => tra._id === _id);
	const initalCoords = track.locations[0].coords;

	// console.log(track, 'el track detail');

	useEffect(() => {
		let timeoutVariable;
		if (track.locations.length > 0) {
			timeoutVariable = setTimeout(() => {
				mapRef.current.fitToCoordinates(
					track.locations.map((loc) => loc.coords),
					{
						edgePadding: {
							bottom: 200,
							right: 50,
							top: 150,
							left: 50,
						},
						animated: true,
					}
				);
				console.log('pasa');
			}, 150);
		}

		return () => clearTimeout(timeoutVariable);
	}, []);

	return (
		<>
			<MapView
				style={styles.map}
				initialRegion={{
					...initalCoords,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
				ref={mapRef}
			>
				<Polyline
					coordinates={track.locations.map((loc) => loc.coords)}
					strokeWidth={3}
					strokeColor="rgba(255,204,0,.5)"
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
		height: WINDOW_HEIGHT * 0.7,
	},
});

export default TrackDetailScreen;

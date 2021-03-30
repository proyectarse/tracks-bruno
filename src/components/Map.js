import React, { useContext } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';

const Map = () => {
	const {
		state: { currentLocation, locations },
	} = useContext(LocationContext);

	if (!currentLocation) {
		return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
	}

	const initialLocation = {
		longitude: -71.272184,
		latitude: -29.9607125,
	};

	console.log(currentLocation, '<---la posición actual', locations);

	return (
		<MapView
			style={styles.map}
			// initialRegion={{
			// 	...initialLocation,
			// 	latitudeDelta: 0.01,
			// 	longitudeDelta: 0.01,
			// }}
			initialRegion={{
				...currentLocation.coords,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			}}
			// region hace el movimiento automático del mapa
			// region={{
			// 	...currentLocation.coords,
			// 	latitudeDelta: 0.01,
			// 	longitudeDelta: 0.01,
			// }}
		>
			<Circle
				center={currentLocation.coords}
				radius={50}
				strokeColor="rgba(158,158,255,1.0)"
				fillColor="rgba(158, 158, 255, 0.3)"
			/>
			<Polyline coordinates={locations.map((loc) => loc.coords)} />
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		height: 300,
	},
});

export default Map;

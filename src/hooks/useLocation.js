import { useState, useEffect } from 'react';
import {
	Accuracy,
	requestPermissionsAsync,
	watchPositionAsync,
} from 'expo-location';

export default (shouldTrack, callback) => {
	const [err, setErr] = useState(null);

	let subscriber;
	const startWatching = async () => {
		try {
			const { granted } = await requestPermissionsAsync();
			if (!granted) {
				throw new Error('Location permission not granted');
			}
			subscriber = await watchPositionAsync(
				{
					accuracy: Accuracy.BestForNavigation,
					timeInterval: 1000,
					distanceInterval: 3,
				},
				callback
			);
		} catch (e) {
			setErr(e);
		}
	};

	useEffect(() => {
		if (shouldTrack) {
			startWatching();
		} else {
			console.log(subscriber, 'cuando es false');
			if (subscriber) {
				subscriber.remove();
			}
			subscriber = null;
		}
		// esta función que retorno se ejecuta antes de la próxima ejecución del useEffect
		return () => {
			if (subscriber) {
				subscriber.remove();
			}
		};
	}, [shouldTrack, callback]);

	return [err];
};

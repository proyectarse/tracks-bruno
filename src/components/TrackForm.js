import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
	const {
		state: { name, recording, locations },
		startRecording,
		stopRecording,
		changeName,
	} = useContext(LocationContext);
	const [saveTrack] = useSaveTrack();

	console.log(locations, 'las locaciones guardadas');

	return (
		<>
			<Spacer>
				<Input
					placeholder="Enter name"
					onChangeText={changeName}
					value={name}
				/>
			</Spacer>
			<Spacer>
				{recording ? (
					<Button
						title="Stop Recording"
						onPress={stopRecording}
						buttonStyle={{ backgroundColor: 'red' }}
					/>
				) : (
					<Button title="Start Recording" onPress={startRecording} />
				)}
				{!recording && locations.length > 0 ? (
					<Button
						title="Save to DB"
						buttonStyle={{
							backgroundColor: 'green',
							marginTop: 20,
						}}
						onPress={saveTrack}
					/>
				) : null}
			</Spacer>
		</>
	);
};

export default TrackForm;

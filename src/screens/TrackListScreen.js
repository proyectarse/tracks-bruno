import React, { useContext } from 'react';
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({ navigation }) => {
	const { state, fetchTracks } = useContext(TrackContext);
	console.log(state, 'estado inicio');

	return (
		<>
			<NavigationEvents onWillFocus={fetchTracks} />
			{state.loading && (
				<ActivityIndicator
					size="large"
					style={{ marginTop: 100 }}
					color="#0000ff"
				/>
			)}
			<FlatList
				data={state.tracks}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('TrackDetail', {
									_id: item._id,
									name: item.name,
								})
							}
						>
							<ListItem>
								<ListItem.Content>
									<ListItem.Title>{item.name}</ListItem.Title>
								</ListItem.Content>
								<ListItem.Chevron />
							</ListItem>
						</TouchableOpacity>
					);
				}}
			/>
		</>
	);
};

TrackListScreen.navigationOptions = {
	title: 'My Tracks',
	headerTitleStyle: { alignSelf: 'center' },
};

const styles = StyleSheet.create({});

export default TrackListScreen;

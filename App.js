import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

const TrackNavigator = createStackNavigator({
	TrackList: TrackListScreen,
	TrackDetail: TrackDetailScreen,
});

TrackNavigator.navigationOptions = {
	tabBarLabel: 'My Tracks',
	tabBarIcon: ({ tintColor }) => (
		<FontAwesome5 name="route" size={24} color={tintColor} />
	),
};

const switchNavigator = createSwitchNavigator({
	ResolveAuth: ResolveAuthScreen,
	loginFlow: createStackNavigator({
		Signup: SignupScreen,
		Signin: SigninScreen,
	}),
	mainFlow: createBottomTabNavigator(
		{
			trackListFlow: TrackNavigator,
			TrackCreate: TrackCreateScreen,
			Account: AccountScreen,
		},
		{
			tabBarOptions: {
				activeTintColor: '#ffcc00',
				inactiveTintColor: '#ffffff',
				style: {
					backgroundColor: '#343434',
					paddingVertical: 5,
				},
			},
		}
	),
});

const App = createAppContainer(switchNavigator);

export default () => {
	return (
		<TrackProvider>
			<LocationProvider>
				<AuthProvider>
					<App
						ref={(navigator) => {
							setNavigator(navigator);
						}}
					/>
				</AuthProvider>
			</LocationProvider>
		</TrackProvider>
	);
};

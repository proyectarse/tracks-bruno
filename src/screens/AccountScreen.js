import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
	const { signout } = useContext(AuthContext);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text
				style={{
					textAlign: 'center',
					fontWeight: '600',
					fontSize: 19,
					paddingVertical: 10,
				}}
			>
				My Account
			</Text>
			<Spacer>
				<Button title="Sign Out" onPress={signout} />
			</Spacer>
		</SafeAreaView>
	);
};

AccountScreen.navigationOptions = {
	tabBarLabel: 'My Account',
	tabBarIcon: <Feather name="user" size={24} color="black" />,
};

const styles = StyleSheet.create({});

export default AccountScreen;

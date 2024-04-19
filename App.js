import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { setupDatabase } from './database';
import * as SplashScreen from 'expo-splash-screen';
// Screens
import MainScreen from './src/screens/MainScreen';
import GameScreen from './src/screens/GameScreen';
import ResultScreen from './src/screens/ResultScreen';
import AllResultsScreen from './src/screens/AllResultsScreen';
import DescriptionScreen from './src/screens/DescriptionScreen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 4000);

const Stack = createStackNavigator();

export default function App() {
    useEffect(() => {
        // Initialize the database
        setupDatabase();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainScreen">
                <Stack.Screen name="MainScreen" component={MainScreen} />
                <Stack.Screen name="GameScreen" component={GameScreen} />
                <Stack.Screen name="ResultScreen" component={ResultScreen} />
                <Stack.Screen name="AllResultsScreen" component={AllResultsScreen} />
                <Stack.Screen name="DescriptionScreen" component={DescriptionScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

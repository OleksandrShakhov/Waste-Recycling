// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen';
import GameScreen from './src/screens/GameScreen';
import ResultScreen from './src/screens/ResultScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainScreen">
                <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Recycling Game' }} />
                <Stack.Screen name="GameScreen" component={GameScreen} />
                <Stack.Screen name="ResultScreen" component={ResultScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

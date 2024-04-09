// src/screens/MainScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const MainScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Recycling Game</Text>
            <Button title="Start Game" onPress={() => navigation.navigate('GameScreen')} />
        </View>
    );
};

export default MainScreen;

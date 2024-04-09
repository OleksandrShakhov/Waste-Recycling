// src/screens/ResultScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const ResultScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Result Screen</Text>
            {/* Display current result */}
            <Button title="View All Results" onPress={() => navigation.navigate('AllResultsScreen')} />
            <Button title="Start Over" onPress={() => navigation.navigate('GameScreen')} />
            <Button title="Go Home" onPress={() => navigation.navigate('MainScreen')} />
        </View>
    );
};

export default ResultScreen;

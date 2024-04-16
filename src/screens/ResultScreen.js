import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultScreen = ({ navigation, route }) => {
    const { playerName, score } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Result Screen</Text>

            {/* Display current result */}
            <Text style={styles.resultText}>Player Name: {playerName}</Text>
            <Text style={styles.resultText}>Score: {score}</Text>

            {/* Navigation buttons */}
            <View style={styles.buttonContainer}>
                <Button title="View All Results" onPress={() => navigation.navigate('AllResultsScreen')} />
                <Button title="Start Over" onPress={() => navigation.navigate('GameScreen', { playerName })} />
                <Button title="Go Home" onPress={() => navigation.navigate('MainScreen')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    resultText: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ResultScreen;

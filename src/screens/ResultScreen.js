import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ResultScreen = ({ navigation, route }) => {
    const { playerName, score } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Result Screen</Text>

            {/* Display current result */}
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Player Name:</Text>
                <Text style={styles.resultValue}>{playerName}</Text>
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Score:</Text>
                <Text style={styles.resultValue}>{score}</Text>
            </View>

            {/* Navigation buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AllResultsScreen')}>
                    <Text style={styles.buttonText}>All Results</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameScreen', { playerName })}>
                    <Text style={styles.buttonText}>Start Over</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainScreen')}>
                    <Text style={styles.buttonText}>Go Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    resultContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    resultText: {
        fontSize: 18,
        marginRight: 10,
        color: '#555',
    },
    resultValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff',
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '30%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default ResultScreen;

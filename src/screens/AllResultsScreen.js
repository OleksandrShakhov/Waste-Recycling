import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { getAllResults } from '../../database'; // Import the getAllResults function from your database

const AllResultsScreen = ({ navigation }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Load all results from the database when the component mounts
        const unsubscribe = navigation.addListener('focus', () => {
            fetchResults();
        });

        // Unsubscribe to avoid memory leaks
        return unsubscribe;
    }, [navigation]);

    const fetchResults = async () => {
        try {
            const data = await getAllResults();
            setResults(data);
        } catch (error) {
            console.error('Failed to load results from database', error);
        }
    };

    const renderResultItem = ({ item }) => (
        <View style={styles.resultItem}>
            <Text style={styles.resultText}>Player Name: {item.playerName}</Text>
            <Text style={styles.resultText}>Score: {item.score}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>All Results</Text>
            <FlatList
                data={results}
                renderItem={renderResultItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
            />
            <Button title="Start Over" onPress={() => navigation.navigate('GameScreen')} />
            <Button title="Go Home" onPress={() => navigation.navigate('MainScreen')} />
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
    list: {
        width: '100%',
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        alignItems: 'center',
    },
    resultText: {
        fontSize: 18,
        marginBottom: 5,
    },
});

export default AllResultsScreen;

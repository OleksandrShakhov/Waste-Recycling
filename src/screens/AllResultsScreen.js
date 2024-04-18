import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { getAllResults } from '../../database';

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
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainScreen')}>
                <Text style={styles.buttonText}>Go Home</Text>
            </TouchableOpacity>
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
        color: '#555',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default AllResultsScreen;

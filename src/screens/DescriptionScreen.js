import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DescriptionScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>How to Play</Text>

            <Text style={styles.description}>
                Welcome to the Recycling Game! The objective of the game is to sort the items into the correct recycling bins.
            </Text>

            <Text style={styles.subtitle}>Gameplay</Text>
            <Text style={styles.description}>
                You will be presented with various items, such as 'Paper bags', 'Plastic bottles', 'Fruits', etc.
                Each item belongs to a specific recycling bin:
            </Text>

            <Text style={styles.listItem}>- Blue Bin: Paper bags, Plastic bottles, Newspapers, etc.</Text>
            <Text style={styles.listItem}>- Green Bin: Fruits, Coffee filters (paper), Food and food scraps, etc.</Text>
            <Text style={styles.listItem}>- Black Bin: Glass bottles, Batteries, Clay, Cleaning wipes, etc.</Text>

            <Text style={styles.description}>
                Tap on the corresponding bin to sort the item. You'll earn points for correct sorting and lose points for incorrect sorting.
            </Text>

            <Text style={styles.subtitle}>Scoring</Text>
            <Text style={styles.description}>
                - Correct bin: +1 point
            </Text>
            <Text style={styles.description}>
                - Incorrect bin: -2 points
            </Text>

            <Text style={styles.subtitle}>Time Limit</Text>
            <Text style={styles.description}>
                The game lasts for 30 seconds. Try to sort as many items as you can before the time runs out!
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    listItem: {
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 5,
    },
});

export default DescriptionScreen;

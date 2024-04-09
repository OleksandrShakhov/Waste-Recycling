// src/screens/GameScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

const GameScreen = ({ navigation }) => {
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(60); // Game duration in seconds
    const [playerName, setPlayerName] = useState('');
    const [garbageItem, setGarbageItem] = useState(''); // Current garbage item

    useEffect(() => {
        const timer = setInterval(() => {
            if (time > 0) {
                setTime(prevTime => prevTime - 1);
            } else {
                // Game over, navigate to result screen
                navigation.navigate('ResultScreen', { score, playerName });
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    useEffect(() => {
        // Generate random garbage item
        const garbageItems = ['Paper bags', 'Plastic bottles', 'Fruits', 'Plastic bags', 'Glass bottles', 'Newspapers', 'Cardboard boxes', 'Aluminum cans', 'Batteries', 'Clay', 'Cleaning wipes', 'Coffee filters (paper)', 'Food and food scraps', 'Pet food'];
        const randomIndex = Math.floor(Math.random() * garbageItems.length);
        setGarbageItem(garbageItems[randomIndex]);
    }, []);

    const handleBinPress = (binIndex) => {
        let newScore = score;
        let correctBin = '';

        switch (garbageItem) {
            case 'Paper bags':
            case 'Plastic bottles':
            case 'Plastic bags':
            case 'Newspapers':
            case 'Cardboard boxes':
            case 'Aluminum cans':
                correctBin = 'blue';
                break;
            case 'Fruits':
            case 'Coffee filters (paper)':
            case 'Food and food scraps':
            case 'Pet food':
                correctBin = 'green';
                break;
            case 'Glass bottles':
            case 'Batteries':
            case 'Clay':
            case 'Cleaning wipes':
                correctBin = 'black';
                break;
            default:
                break;
        }

        if ((correctBin === 'blue' && binIndex === 0) ||
            (correctBin === 'green' && binIndex === 1) ||
            (correctBin === 'black' && binIndex === 2)) {
            newScore += 1; // Correct bin, increase score
        } else {
            newScore -= 2; // Incorrect bin, decrease score
        }
        setScore(newScore);

        // Generate new garbage item
        const newGarbageItems = ['Paper bags', 'Plastic bottles', 'Fruits', 'Plastic bags', 'Glass bottles', 'Newspapers', 'Cardboard boxes', 'Aluminum cans', 'Batteries', 'Clay', 'Cleaning wipes', 'Coffee filters (paper)', 'Food and food scraps', 'Pet food'];
        const randomIndex = Math.floor(Math.random() * newGarbageItems.length);
        setGarbageItem(newGarbageItems[randomIndex]);
    };

    return (
        <View style={styles.container}>
            {/* Display player, score, and time horizontally */}
            <View style={styles.playerInfoContainer}>
                <Text style={styles.infoText}>Player: {playerName}</Text>
                <Text style={styles.infoText}>Score: {score}</Text>
                <Text style={styles.infoText}>Time: {time}</Text>
            </View>

            {/* Display bins */}
            <View style={styles.binsContainer}>
                <Pressable style={styles.bin} onPress={() => handleBinPress(0)}>
                    <Image source={require('../../assets/blue_bin.png')} style={styles.binImage} />
                </Pressable>
                <Pressable style={styles.bin} onPress={() => handleBinPress(1)}>
                    <Image source={require('../../assets/green_bin.png')} style={styles.binImage} />
                </Pressable>
                <Pressable style={styles.bin} onPress={() => handleBinPress(2)}>
                    <Image source={require('../../assets/black_bin.png')} style={styles.binImage} />
                </Pressable>
            </View>

            {/* Display garbage item */}
            <View style={styles.garbageItem}>
                <Text>{garbageItem}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    binsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    bin: {
        width: 100,
        height: 100,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5,
    },
    binImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    garbageItem: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 18,
    },
});

export default GameScreen;

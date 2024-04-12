import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Audio } from 'expo-av';

const GameScreen = ({ navigation, route }) => {
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(5); // Game duration in seconds
    const [garbageItem, setGarbageItem] = useState('Clay'); // Current garbage item
    const [correctSound, setCorrectSound] = useState(null);
    const [wrongSound, setWrongSound] = useState(null);
    const [gameEnded, setGameEnded] = useState(false);
    const playerName = route.params.playerName || '';

    const loadSounds = async () => {
        const correctSoundObject = new Audio.Sound();
        const wrongSoundObject = new Audio.Sound();

        try {
            await correctSoundObject.loadAsync(require('../../assets/correct.wav'));
            await wrongSoundObject.loadAsync(require('../../assets/wrong.wav'));
            setCorrectSound(correctSoundObject);
            setWrongSound(wrongSoundObject);
        } catch (error) {
            console.error('Failed to load sounds', error);
        }
    };

    const handleBinPress = async (binIndex) => {
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

        try {
            if ((correctBin === 'blue' && binIndex === 0) ||
                (correctBin === 'green' && binIndex === 1) ||
                (correctBin === 'black' && binIndex === 2)) {
                newScore += 1; // Correct bin, increase score
                if (correctSound) {
                    await correctSound.replayAsync();
                }
            } else {
                newScore -= 2; // Incorrect bin, decrease score
                if (wrongSound) {
                    await wrongSound.replayAsync();
                }
            }
        } catch (error) {
            console.error('Failed to play sound', error);
        }

        setScore(newScore);

        // Generate new garbage item
        const garbageItems = ['Paper bags', 'Plastic bottles', 'Fruits', 'Plastic bags', 'Glass bottles', 'Newspapers', 'Cardboard boxes', 'Aluminum cans', 'Batteries', 'Clay', 'Cleaning wipes', 'Coffee filters (paper)', 'Food and food scraps', 'Pet food'];
        const randomIndex = Math.floor(Math.random() * garbageItems.length);
        setGarbageItem(garbageItems[randomIndex]);
    };

    // Load sounds when the component mounts
    useEffect(() => {
        loadSounds();
        return () => {
            // Unload sounds when the component unmounts
            if (correctSound) {
                correctSound.unloadAsync();
            }
            if (wrongSound) {
                wrongSound.unloadAsync();
            }
        };
    }, []);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime === 1) {
                    clearInterval(timer);
                    setGameEnded(true); // Set the gameEnded flag to true
                }
                return prevTime - 1;
            });
        }, 1000);

        // Cleanup function
        return () => clearInterval(timer);
    }, []);

    // Navigate to ResultScreen if the game has ended
    useEffect(() => {
        if (gameEnded) {
            navigation.navigate('ResultScreen', { score: score, playerName: playerName });
        }
    }, [gameEnded, navigation, score, playerName]);

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

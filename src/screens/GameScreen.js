import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Audio } from 'expo-av';
import { insertResult } from '../../database';

const GameScreen = ({ navigation, route }) => {
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30); 
    const [garbageItem, setGarbageItem] = useState('Clay');
    const [correctSound, setCorrectSound] = useState(null);
    const [wrongSound, setWrongSound] = useState(null);
    const [playerName, setPlayerName] = useState('');

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
                newScore += 1;
                if (correctSound) {
                    await correctSound.replayAsync();
                }
            } else {
                newScore -= 2;
                if (wrongSound) {
                    await wrongSound.replayAsync();
                }
            }
        } catch (error) {
            console.error('Failed to play sound', error);
        }

        setScore(newScore);

        const garbageItems = ['Paper bags', 'Plastic bottles', 'Fruits', 'Plastic bags', 'Glass bottles', 'Newspapers', 'Cardboard boxes', 'Aluminum cans', 'Batteries', 'Clay', 'Cleaning wipes', 'Coffee filters (paper)', 'Food and food scraps', 'Pet food'];
        const randomIndex = Math.floor(Math.random() * garbageItems.length);
        setGarbageItem(garbageItems[randomIndex]);
    };

    const resetGame = useCallback(() => {
        setScore(0);
        setTime(30); 
        setGarbageItem('Clay');
        loadSounds();
    }, []);

    useEffect(() => {
        loadSounds();
        setPlayerName(route.params?.playerName || '');
    }, [route.params?.playerName]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime === 1) {
                    // Save result to database when time reaches 1
                    insertResult(playerName, score)
                        .then(() => {
                            navigation.navigate('ResultScreen', { score, playerName });
                        })
                        .catch(error => {
                            console.error('Failed to save result to database', error);
                        });
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigation, playerName, score]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            resetGame();
        });

        return unsubscribe;
    }, [navigation, resetGame]);

    return (
        <View style={styles.container}>
            <View style={styles.playerInfoContainer}>
                <Text style={styles.infoText}>Player: {playerName}</Text>
                <Text style={styles.infoText}>Score: {score}</Text>
                <Text style={styles.infoText}>Time: {time}</Text>
            </View>
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
        backgroundColor: '#f5f5f5',
    },
    playerInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    binsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    bin: {
        width: 120,
        height: 120,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    binImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    garbageItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    infoText: {
        fontSize: 18,
        color: '#333',
    },
});

export default GameScreen;

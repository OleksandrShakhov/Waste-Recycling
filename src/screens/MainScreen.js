// src/screens/MainScreen.js
import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [playerName, setPlayerName] = useState('');

    const startGame = () => {
        if (playerName.trim() !== '') {
            navigation.navigate('GameScreen', { playerName });
            setModalVisible(false);
        } else {
            alert('Please enter your name.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Recycling Game</Text>
            <Button title="Start Game" onPress={() => setModalVisible(true)} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter Your Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Your Name"
                            value={playerName}
                            onChangeText={text => setPlayerName(text)}
                        />
                        <Button title="Submit" onPress={startGame} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default MainScreen;

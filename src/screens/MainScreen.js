import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, Image } from 'react-native';

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
        <View style={styles.container}>
            
            <Image source={require('../../assets/logo.png')} style={styles.logo} />

            <Text style={styles.title}>Recycling Game</Text>

            {/* Description button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DescriptionScreen')}>
                <Text style={styles.buttonText}>How to Play</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>

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
                        <TouchableOpacity style={styles.modalButton} onPress={startGame}>
                            <Text style={styles.modalButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
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
        width: 200,
    },
    modalButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MainScreen;

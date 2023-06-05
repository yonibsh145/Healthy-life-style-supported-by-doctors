import React from 'react';
import { useNavigate } from 'react-router-dom';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
    const navigate = useNavigate();

    const handleChat = () => {
        navigate('/ChatPage'); // Navigate to the register page
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' }}
                style={styles.coverImage}
            />
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }}
                    style={styles.avatar}
                />
                <Text style={[styles.name, styles.textWithShadow]}>Shahar Almog</Text>
            </View>

            <Text style={styles.infoLabel}>Last Login: 2 hours ago</Text>

            <View style={styles.content}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Rating:</Text>
                    <Text style={styles.infoValue}>4 stars</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Location:</Text>
                    <Text style={styles.infoValue}>Israel</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Bio:</Text>
                    <Text style={styles.infoValue}>Check Check</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Titles:</Text>
                    <Text style={styles.infoValue}>Title1  Title2</Text>
                </View>
                <View style={styles.infoContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleChat}>
                        <Text style={styles.buttonText}>Chat</Text>
                    </TouchableOpacity> </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '50%',
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    coverImage: {
        height: 200,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    name: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'white'
    },
    content: {
        marginTop: 10,
    },
    infoContainer: {
        marginTop: 20,
    },
    infoLabel: {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    infoValue: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#0066cc',
        borderRadius: 5,
        padding: 10,
        width: '20%',
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },

});

export default ProfileScreen;
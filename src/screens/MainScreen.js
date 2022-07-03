import { StyleSheet, View, Pressable, Text } from 'react-native';
import React from 'react';

const MainScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('Auth')}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Supper Snacks</Text>
            </Pressable>

        </View>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#407BFF',
        marginVertical: 10,
        paddingVertical: 10,
        width: '80%',
        alignItems: 'center',
        borderRadius: 4,
    },
    text: {
        color: 'white',
    },
});

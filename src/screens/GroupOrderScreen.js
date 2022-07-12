import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Pressable,
    Dimensions,
    FlatList,
    ToastAndroid,
    Keyboard,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { AuthTextInput, AuthPressable } from '../components';
import { query, collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';

import { db } from '../firebase';
import { Task } from '../components';

const THEME = '#407BFF';
const { width } = Dimensions.get('window');

function GroupOrderScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <View style={styles.container}>
                    <Text style={[styles.welcomeText, styles.boldText]}>
                        {`Group Order`}
                    </Text>

                </View>
        </KeyboardAvoidingView>
    );
}

export default GroupOrderScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boldText: {
        fontWeight: '400',
    },
    welcomeText: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 20,
    },
    authText: {
        fontSize: 20,
        marginBottom: 10,
    },
    button: {
        width: width * 0.4,
        paddingVertical: 10,
        paddingHorizontal: 6,
        backgroundColor: THEME,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    space: {
        width: 10,
        height: 10,
    },
});
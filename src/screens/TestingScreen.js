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

function TestingScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <View style={styles.container}>
                    <Text style={[styles.welcomeText, styles.boldText]}>
                        {`Start Your Order Now!`}
                    </Text>
                    <AuthTextInput

                        placeholder="Grab Vendor Name"

                        keyboardType="email-address"
                    />
                    <AuthTextInput

                        placeholder="Grab Group Order Link"
                    />
                     <AuthTextInput

                        placeholder="Service Fee on Grab"

                     />
                     <AuthPressable
                        //onPressHandler={isLogin ? loginHandler : signUpHandler}
                        title={'Send Notifications!'}
                     />
                     <AuthPressable
                        title={'Group Order Page'}
                     />
                </View>
        </KeyboardAvoidingView>
    );
}

export default TestingScreen;

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
});
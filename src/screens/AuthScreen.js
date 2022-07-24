import {
    StyleSheet,
    View,
    Text,
    ToastAndroid,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

import { AuthTextInput, AuthPressable } from '../components';
import { auth, db } from '../firebase';

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Todo: email, password states

    const signUpToast = () => {
        ToastAndroid.show(
            'Sign Up successfully completed!',
            ToastAndroid.SHORT
        );
    };

    const missingFieldsToast = () => {
        ToastAndroid.show(
            'Missing fields, please try again!',
            ToastAndroid.SHORT
        );
    };

    const loginHandler = () => {
        if (email.length === 0 || password.length === 0) {
            missingFieldsToast();
            return;
        }

        // Todo
        return signInWithEmailAndPassword(auth, email, password).then(uc => {
            const user = uc.user;

            console.log(user);

            restoreForm();
        }).catch(err => {
            const errCode = err.code;
            const errMessage = err.message;

            console.log('[loginHandler]', errCode, errMessage);
        });
    };

    const signUpHandler = () => {
        if (email.length === 0 || password.length === 0) {
            missingFieldsToast();
            return;
        }

        // Todo
        return createUserWithEmailAndPassword(auth, email, password)
             .then((uc) => {
                const user = uc.user;

                console.log(user);

                restoreForm();
                signUpToast();
            }).catch(err => {
                const errCode = err.code;
                const errMessage = err.message;

                console.log('[signUpHandler]', errCode, errMessage);
            });
    };

    const restoreForm = () => {
        setEmail('');
        setPassword('');
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <View style={styles.container}>
            <MaterialIcons name="restaurant" size={100} color="blue" />
                <Text style={[styles.welcomeText, styles.boldText]}>
                    {`Turn Your Cravings\nInto Reality!`}
                </Text>
                <Text style={[styles.authText, styles.boldText]}>
                    {isLogin ? 'You are logging in!' : 'You are signing up!'}
                </Text>
                <AuthTextInput
                    value={email}
                    placeholder="Your Email"
                    textHandler={setEmail}
                    keyboardType="email-address"
                />
                <AuthTextInput
                    value={password}
                    placeholder="Your Password"
                    textHandler={setPassword}
                    secureTextEntry
                />
                <AuthPressable
                    onPressHandler={isLogin ? loginHandler : signUpHandler}
                    title={'Proceed'}
                />
                <AuthPressable
                    onPressHandler={() => setIsLogin(!isLogin)}
                    title={`Switch to ${isLogin ? 'Sign Up' : 'Login'}`}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e4f5f2',
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

import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';

import { auth } from '../firebase';
import {
    MainScreen,
    AuthScreen,
    LoginScreen,
    HomeScreen,
} from '../screens';

const Stack = createNativeStackNavigator();
const TodoStack = createNativeStackNavigator();

const AppNavigator = () => {
    /**
     * This hook serves as a listener to auth state changes provided by firebase.
     */
    // Todo: isAuth hook
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        // Todo: Authentication
        const subscriber = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setIsAuth(true);
                console.log('true');
            } else {
                setIsAuth(false);
                console.log('false');
            }
        })

        return () => subscriber();
    }, []);

    const MainNavigator = () => (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
                options={{ title: 'Main Page' }}
                component={MainScreen}
            />

            <Stack.Screen
                name="Auth"
                options={{ headerTitle: 'Supper Snacks' }}
                component={AuthScreen}
            />

        </Stack.Navigator>
    );

    const logoutHandler = () => {
        // Todo: Authentication
        signOut(auth).then(() => {
            setIsAuth(false);
        })
    };

    const LogoutIcon = () => (
        <TouchableOpacity onPress={logoutHandler}>
            <MaterialIcons name="logout" size={28} color="#407BFF" />
        </TouchableOpacity>
    );

    const TodoNavigator = () => (
        <TodoStack.Navigator>
            <TodoStack.Screen
                name="Home"
                options={{
                    headerTitle: 'Home',
                    headerRight: () => <LogoutIcon />,
                }}
                component={HomeScreen}
            />
        </TodoStack.Navigator>
    );

    return (
        <NavigationContainer>
            {isAuth ? <TodoNavigator /> : <MainNavigator />}
        </NavigationContainer>
    );
};

export default AppNavigator;

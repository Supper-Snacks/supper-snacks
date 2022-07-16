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
import { query, collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { getAuth } from "firebase/auth";
import { Task } from '../components';

const INPUT_PLACEHOLDER = 'Enter your order and hit Add';
const THEME = '#407BFF';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);
    /*
    useEffect(() => {
        // Expensive operation. Consider your app's design on when to invoke this.
        // Could use Redux to help on first application load.
        // Todo: listen to firestore changes
        const taskQuery = query(collection(db, 'tasks'));

        const subscriber = onSnapshot(taskQuery, (snapshot) => {
            const tasks = [];

            snapshot.forEach(doc => {
                tasks.push({ id: doc.id, ...doc.data() })
            });

            setTaskList([...tasks]);
        });

        return subscriber;
    }, []);

    const showRes = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    };

    // https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9
    // https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9_7
    const onSubmitHandler = async () => {
        if (task.length === 0) {
            showRes('Task description cannot be empty!');
            return;
        }

        // Todo
        try {
            const taskRef = await addDoc(collection(db, 'tasks'), {
                desc: task,
            });

            console.log('completed', taskRef.id);
        } catch (error) {
            console.log(error);

        }
    };

    const onDeleteHandler = async (id) => {
        // Todo
        try {
            await deleteDoc(doc(db, 'tasks', id));

            console.log('successfully deleted!')
        } catch (err) {
            console.log(err);
        }
    };

    const clearForm = () => {
        setTask('');
        Keyboard.dismiss();
    }; */
    const auth = getAuth();
    const user = auth.currentUser;
    const addHallUser = async () => {
      const newHallUser = await addDoc(collection(db, "Halls"), {
        user: user.uid
      });

      console.log(`Added to hall group: ${newHallUser.id}`)
      ToastAndroid.show(
                  'You have been added to the Halls group!',
                  ToastAndroid.SHORT
              );
    };

    const addRCUser = async () => {
       const newRCUser = await addDoc(collection(db, "Residential Colleges"), {
         user: user.uid
       });

       console.log(`Added to RC group: ${newRCUser.id}`)
       ToastAndroid.show(
                   'You have been added to the Residential Colleges group!',
                   ToastAndroid.SHORT
              );
    };

    const addRUser = async () => {
      const newRUser = await addDoc(collection(db, "Residences"), {
        user: user.uid
      });

      console.log(`Added to Residences group: ${newRUser.id}`)
      ToastAndroid.show(
                        'You have been added to the Residences group!',
                        ToastAndroid.SHORT
                    );
    };

    const addOtherUser = async () => {
      const newOtherUser = await addDoc(collection(db, "Others"), {
        user: user.uid
      });

      console.log(`Added to Others group: ${newOtherUser.id}`)
      ToastAndroid.show(
                        'You have been added to the Others group!',
                        ToastAndroid.SHORT
                    );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.headerText}>Choose Your Group</Text>
                    <View style={styles.listContainer}>
                        <FlatList
                            data={taskList}
                            renderItem={({ item, index }) => (
                                <Task
                                    data={item}
                                    key={index}
                                    onDelete={onDeleteHandler}
                                />
                            )}
                            style={styles.list}
                            showsVerticalScrollIndicator={true}

                        />
                        <Pressable
                            style={styles.button}
                            onPress={addHallUser}
                            android_ripple={{ color: 'white' }}
                        >
                            <Text style={styles.buttonText}>Halls</Text>
                        </Pressable>

                        <View style={styles.space} />

                        <Pressable
                            android_ripple={{ color: 'white' }}
                            onPress={addRCUser}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Residential Colleges</Text>
                        </Pressable>

                        <View style={styles.space} />

                        <Pressable
                            android_ripple={{ color: 'white' }}
                            onPress={addRUser}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Residences</Text>
                        </Pressable>

                        <View style={styles.space} />

                        <Pressable
                            android_ripple={{ color: 'white' }}
                            onPress={addOtherUser}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Others</Text>
                        </Pressable>
                    </View>

                </View>
                <View style={styles.formContainer}>

                    <Pressable
                        //onPress={onSubmitHandler}
                        android_ripple={{ color: 'white' }}
                        onPress={() => navigation.navigate('Testing')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Start Order</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    listContainer: {
        flex: 1,
        paddingBottom: 70, // Fix: Temporary workaround
    },
    list: {
        overflow: 'scroll',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 32,
        marginLeft: 14,
        marginTop: 14,
        marginBottom: 10,
        color: THEME,
    },
    formContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: '#FAF9F6',
    },
    taskInput: {
        width: width * 0.7,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#E0D4B0',
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    button: {
        width: width * 0.22,
        paddingVertical: 20,
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
        width: 10, // or whatever size you need
        height: 10,
    },
});

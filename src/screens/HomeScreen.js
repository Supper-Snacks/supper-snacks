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
import { query, collection, onSnapshot, addDoc, deleteDoc, doc, where, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { getAuth } from "firebase/auth";
import { Task, Order } from '../components';

const INPUT_PLACEHOLDER = 'Enter your order and hit Add';
const THEME = '#407BFF';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);
    const userDocRef = doc(db,"users", user.uid);
    const [userGroup, setUserGroup] = useState('');

    useEffect(() => {
        // Expensive operation. Consider your app's design on when to invoke this.
        // Could use Redux to help on first application load.
        // Todo: listen to firestore changes
        const getUserGroup = async () => {
                        const snap = await getDoc(userDocRef)
                        setUserGroup(snap.data())
                      };
        getUserGroup();
        const orderQuery = query(collection(db, 'Group Orders'));
        const subscriber = onSnapshot(orderQuery, (snapshot) => {
            const tasks = [];

            snapshot.forEach(doc => {
                tasks.push({ id: doc.id, ...doc.data() })
            });

            setTaskList([...tasks]);
        });

        return subscriber;
    }, []);


    /* const forceUpdateHandler = () => {
        forceUpdate();
      };

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
    };*/

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
    };


    const addHallUser = async () => {
      const newHallUser = await addDoc(collection(db, "Halls"), {
        user: user.uid
      });
      const hallUser = await setDoc(doc(db, "users", user.uid), {
        user: user.uid,
        group: 'Halls'
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
      const RCUser = await setDoc(doc(db, "users", user.uid), {
        user: user.uid,
        group: 'Residential Colleges'
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
      const RUser = await setDoc(doc(db, "users", user.uid), {
        user: user.uid,
        group: 'Residences'
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
      const OtherUser = await setDoc(doc(db, "users", user.uid), {
        user: user.uid,
        group: 'Others'
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
                        <View style = {styles.formContainer}>
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
                    <Text style={styles.headerText}>Active Orders</Text>
                    <View style={styles.listContainer}>
                        <FlatList
                            data={taskList}
                            renderItem={({ item, index }) => (
                                <Order
                                    data={item}
                                    key={index}
                                    onDelete={() => navigation.navigate('Group Order')}
                                />
                            )}
                            style={styles.list}
                            showsVerticalScrollIndicator={true}

                        />
                    </View>
                </View>
                    <View style = {{ flexDirection:"row" }}>
                    <Pressable
                        android_ripple={{ color: 'white' }}
                        onPress={() => navigation.navigate('Testing')}
                        style={styles.lastButton}
                    >
                        <Text style={styles.buttonText}>Start An Order</Text>
                    </Pressable>
                    </View>
                    <View style={styles.space} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4f5f2',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#e4f5f2',
        marginLeft: 10,
        marginRight: 10,
    },
    listContainer: {
        flex: 1,
        paddingBottom: 10, // Fix: Temporary workaround
    },
    list: {
        overflow: 'scroll',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 14,
        marginTop: 14,
        marginBottom: 10,
        color: THEME,
    },
    formContainer: {
        position: 'relative',
        bottom: 0,
        flexDirection: 'row',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 5,
        backgroundColor: '#edfcfa',
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
        width: width * 0.20,
        paddingVertical: 20,
        paddingHorizontal: 2,
        backgroundColor: THEME,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lastButton: {
        flex: 0.8,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: 'green',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center'
    },
    space: {
        width: 10, // or whatever size you need
        height: 30,
    },
});

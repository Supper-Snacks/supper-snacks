import {
    Alert,
    Button,
    Linking,
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
import React, { useState, useEffect, useCallback } from 'react';
import { query, collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { getAuth } from "firebase/auth";
import { Task } from '../components';

const INPUT_PLACEHOLDER = 'Enter your order and hit Add';
const THEME = '#407BFF';

const { width } = Dimensions.get('window');

const GroupOrderScreen = ({ navigation }) => {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);

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
    const auth = getAuth();
    const user = auth.currentUser;
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
                user: user.uid,
            });

            console.log('completed', taskRef.id, user.uid);
            clearForm();
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
    };

    const supportedURL = "https://grab.onelink.me/2695613898?pid=website&af_sub5=referral&c=gw_exp_home0_202110&af_r=https%3A%2F%2Fwww.grab.com%2Fsg%2Fdownload%2F%3Futm_campaign%3Dgw_exp_home0_202110%26utm_source%3Dgrab.com%26utm_medium%3Dreferral%26utm_content%3DDownloadApp_SG&deep_link_value=grab%3A%2F%2Fopen&af_dp=grab%3A%2F%2Fopen";

    const unsupportedURL = "slack://open?team=123456";

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(url);
      
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return <Button title={children} onPress={handlePress} color='green' />;
      };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.headerText}>Add Your Order and Price</Text>
                    <View >
      <OpenURLButton url={supportedURL}>Open Grab</OpenURLButton>
    </View>
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
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        onChangeText={setTask}
                        value={task}
                        selectionColor={THEME}
                        placeholder={INPUT_PLACEHOLDER}
                        style={styles.taskInput}
                    />
                    <Pressable
                        onPress={onSubmitHandler}
                        android_ripple={{ color: 'white' }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Add</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default GroupOrderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4f5f2',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#e4f5f2',
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
        fontSize: 23,
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
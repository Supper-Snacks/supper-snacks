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
import { query, collection, onSnapshot, addDoc, deleteDoc, doc, where, getDocs, getDoc, getString } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { getAuth } from "firebase/auth";
import { Task } from '../components';

const THEME = '#407BFF';
const { width } = Dimensions.get('window');

function TestingScreen({ navigation }) {

  const auth = getAuth();
  const user = auth.currentUser;

  const [vendorName, setVendorName] = useState('');
  const [orderLink, setorderLink] = useState('');
  const [serviceFee, setserviceFee] = useState('');

  const userDocRef = doc(db,"users", user.uid);
  const [userGroup, setUserGroup] = useState('');

    useEffect(() => {
      const getUserGroup = async () => {
        const snap = await getDoc(userDocRef)
        setUserGroup(snap.data())
      }
      getUserGroup()
    },[])

  const clearForm = () => {
          setVendorName('');
          setorderLink('');
          setserviceFee('');
          Keyboard.dismiss();
  };

  const sendNotif = async () => {

      const newGroupOrder = await addDoc(collection(db, "Group Orders"), {
              vendorName: vendorName,
              orderLink: orderLink,
              serviceFee: serviceFee,
              user: user.uid,
              group: userGroup.group,
            });
            
      console.log(`Group Order ${newGroupOrder.id} Started By: ${user.uid}`)
      const q = query(collection(db, "Group Orders"), where("user", "==", user.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      ToastAndroid.show(
                  'Order Started!',
                  ToastAndroid.SHORT
              );
    };
  return (
    <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <View style={styles.container}>
                    <Text style={[styles.welcomeText, styles.boldText]}>
                        {`Fill In Order Details!`}
                    </Text>

                    <TextInput
                         onChangeText={setVendorName}
                         value={vendorName}
                         selectionColor={THEME}
                         placeholder= "Grab vendor name"
                         style={styles.taskInput}
                     />

                    <TextInput
                         onChangeText={setorderLink}
                         value={orderLink}
                         selectionColor={THEME}
                         placeholder= "Grab group order link"
                         style={styles.taskInput}

                    />
                     <TextInput
                         onChangeText={setserviceFee}
                         value={serviceFee}
                         selectionColor={THEME}
                         placeholder= "Service Fee on Grab"
                         style={styles.taskInput}
                     />
                     <Pressable
                            android_ripple={{ color: 'white' }}
                            onPress={sendNotif}
                            //Marcus: Send Notifications with order details here!
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Send Notifications</Text>
                        </Pressable>
                     <View style={styles.space} />
                     <Pressable
                            android_ripple={{ color: 'white' }}
                            onPress={() => navigation.navigate('Group Order')}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Group Order Page</Text>
                        </Pressable>
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
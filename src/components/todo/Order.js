import { StyleSheet, Text, View, TouchableOpacity, Button, Linking, Alert } from 'react-native';
import React, { useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const Order = (props) => {
    const { data, onDelete } = props;

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

    const DeleteIcon = () => (
        <TouchableOpacity onPress={() => onDelete()}>
            <MaterialIcons name="chevron-right" size={28} color="white" />
        </TouchableOpacity>
    );

    return (
        <View>
        <TouchableOpacity 
            style={[styles.container, styles.containerShadow]} 
            onPress={() => onDelete()}>
            <MaterialIcons name="lunch-dining" size={28} color="#fceec0" />
            <Text style={styles.taskText}>
            vendor: {data.vendorName}{"\n"}
            delivery fee: {data.serviceFee}{"\n"}

            </Text>
<OpenURLButton url={data.orderLink}>Join On Grab</OpenURLButton>
            <DeleteIcon />
        </TouchableOpacity>
        </View>
    );
};

export default Order;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#669BB7',
        flexDirection: 'row',
        marginHorizontal: 14,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 6,
        alignItems: 'center',
        borderRadius: 4,
    },
    containerShadow: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    taskText: {
        color: 'white',
        fontWeight: 'bold',
        flex: 1,
        flexWrap: 'wrap',
        marginRight: 10,
        marginHorizontal: 10
    },
    space: {
            width: 10, // or whatever size you need
            height: 30,
    },
});

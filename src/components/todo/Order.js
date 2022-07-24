import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const Order = (props) => {
    const { data, onDelete } = props;

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
            <Text style={styles.taskText}>{data.vendorName}</Text>
            <Text style={styles.taskText}>Delivery Fee: {data.serviceFee}</Text>
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
});

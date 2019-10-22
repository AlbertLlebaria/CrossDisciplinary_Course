import React from 'react'
import {View,} from "react-native";

import {StyleSheet} from "react-native";
import {Button, Snackbar, TextInput} from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default function Index() {
    const [isVisible, handleSnackBar] = React
        .useState(false);

    const [formInputs, handleFormInputChange] = React
        .useState({
            productName: '',
            expiracyDate: '',
            recievedDate: '',
            provider: '',
            amount: ''
        });


    const handleSubmit = () => {
    };

    return (
        <View style={styles.container}>
            <TextInput
                label='Product Name'
                style={{backgroundColor: 'none'}}
                value={formInputs.productName}
                onChangeText={text => handleFormInputChange({...formInputs, productName: text})}
            />
            <TextInput
                label='Expiracty Date'
                style={{backgroundColor: 'none'}}
                value={formInputs.expiracyDate}
                onChangeText={text => handleFormInputChange({...formInputs, expiracyDate: text})}
            />
            <TextInput
                label='Received date'
                style={{backgroundColor: 'none'}}
                value={formInputs.recievedDate}
                onChangeText={text => handleFormInputChange({...formInputs, recievedDate: text})}
            />
            <TextInput
                label='provider'
                style={{backgroundColor: 'none'}}
                value={formInputs.provider}
                onChangeText={text => handleFormInputChange({...formInputs, provider: text})}
            />
            <TextInput
                label='Amount'
                style={{backgroundColor: 'none'}}
                value={formInputs.amount}
                onChangeText={text => handleFormInputChange({...formInputs, amount: text})}
            />
            <Snackbar
                visible={isVisible}
                onDismiss={() => handleSnackBar(false)}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        handleSnackBar(false)
                        // Do something
                    },
                }}
            >
                Food has been added successfully!
            </Snackbar>
            <Button raised style={{marginTop: 20}} onPress={() => handleSnackBar(true)}>
                Press me
            </Button>
        </View>
    )
}
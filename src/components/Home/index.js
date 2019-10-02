import React from "react";
import {Button, Text, View, TextInput, StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    input: {
        marginBottom: 20,
        height: 40,
        width: '60%',
        borderBottomColor: '#7a42f4',
        borderBottomWidth: 1,
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
});

export default function UselessTextInput(props) {
    const [username, onChangeTextUser] = React.useState('');
    const [password, onChangeTextPassword] = React.useState('');


    const handleClick = () => {
        props.navigation.navigate('Login')
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeTextUser(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeTextPassword(text)}
                value={password}
            />
            <Button
                styles={styles.submitButton}
                title="Go to Details"
                onPress={handleClick}
            >
                <Text style={styles.submitButtonText}>Log in</Text>
            </Button>
        </View>
    );

}
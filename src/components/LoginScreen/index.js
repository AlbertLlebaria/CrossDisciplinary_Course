import React from "react";
import {TextInput, Button, withTheme} from 'react-native-paper';
import {View} from "react-native";
import styles from './style'

function LoginScreen(props) {
    const [formFields, changeValueFromForm] = React.useState({username: '', password: ''});
    const {colors} = props.theme;

    const handleLogin = () => {
        props.navigation.navigate('Home')
    };

    return (
        <View style={styles.container}>
            <TextInput
                label='Username'
                style={{backgroundColor: 'none'}}
                value={formFields.username}
                onChangeText={text => changeValueFromForm({...formFields, username: text})}
            />
            <TextInput
                label='Password'
                style={{marginTop: 20, backgroundColor: 'none'}}
                value={formFields.password}
                onChangeText={text => changeValueFromForm({...formFields, password: text})}
            />
            <Button
                style={{marginTop: 20}}
                onClick={() => handleLogin()}>
                Sign in
            </Button>
        </View>
    );
}

export default withTheme(LoginScreen)
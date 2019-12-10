import React from "react";
import { TextInput, Button, withTheme } from 'react-native-paper';
import { View, StyleSheet, Image, Text } from "react-native";
import style from './style'

function LoginScreen(props) {
    const styles = StyleSheet.create(style)

    const [formFields, changeValueFromForm] = React.useState({ username: '', password: '' });
    const { colors } = props.theme;

    const handleLogin = () => {
        props.navigation.navigate('Home')
    };

    return (
        <View style={styles.container}>
            <View style={styles.image_container} >
                <Image style={styles.logo_image} source={require('../imgs/Logo.png')} />
            </View>
            <View style={styles.form_container}>
                <TextInput
                    label='Brugernavn'
                    style={{ backgroundColor: 'none' }}
                    value={formFields.username}
                    onChangeText={text => changeValueFromForm({ ...formFields, username: text })}
                />
                <TextInput
                    label='Password'
                    secureTextEntry={true} 
                    style={{ marginTop: 20, backgroundColor: 'none' }}
                    value={formFields.password}
                    onChangeText={text => changeValueFromForm({ ...formFields, password: text })}
                />
                <Button
                    style={style.loggin_button}
                    raised
                    color="#ffffff"
                    onPress={() => handleLogin()}>
                    Log Ind
            </Button>
            </View>
            <Text style={styles.auxiliary_bottom__left} >Har du ikke en bruger ?</Text>
            <Text style={styles.auxiliary_bottom__right} >Glemt Password ?</Text>
        </View>
    );
}

export default withTheme(LoginScreen)
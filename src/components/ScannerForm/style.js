import { StyleSheet } from "react-native";
import { DefaultTheme } from 'react-native-paper'

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    form__content__info_text: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold'
    },
    form_content: {
        width: '80%',
        margin: 5,
    },
    submit_button: {
        backgroundColor: '#C4D6B0',
        marginTop: 10,
    },
    form_content__input: {
        backgroundColor: '#D3D3D3',
        borderRadius: 5,
        color: "#FFFFFF",
        margin: 5
    },
    form_content_switch__selected: {
        backgroundColor: "#C4D6B0",
        width: 140

    },
    form_content_switch__unselected: {
        backgroundColor: '#D3D3D3',
        width: 100
    },
    form__content__label: {
        paddingHorizontal: 13,
        paddingTop: 13,
        fontSize: 12,
        color: '#696969'
    },
    form_content_switch: {
        display: 'flex',
        flexDirection: 'row',
    },
    form_content_picker: {
        height: 40,
        width: '100%'
    },
    dateIcon: {
        position: 'absolute',
        left: 5,
        top: 4,
        marginLeft: 5
    },
    dateInput: {
        marginLeft: 36,
        borderWidth: 0
    }
});

export const theme = {
    ...DefaultTheme,
    roundness: 6,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FFFFFF',
    }
};

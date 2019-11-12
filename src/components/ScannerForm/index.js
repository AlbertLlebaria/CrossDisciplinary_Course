import React, { useState, useEffect, AbortController } from 'react'
import { View, Text, Picker } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import DatePicker from 'react-native-datepicker'

import {
    postFood,
    fetchFoodHouses,
    fetchProviders
} from '../../api/backendAPI'
import { styles, theme } from './style.js'


export default function ScannerForm(props) {
    const parseDate = (d = new Date()) => {
        let month = (d.getMonth() + 1),
            day = d.getDate(),
            year = d.getFullYear();

        return `${year}-${month}-${day}`;
    }
    const [switchState, handleSwitchState] = useState("left")

    const [providers, handleProviders] = useState([])

    const [foodHouses, handleFoodHouses] = useState([])

    const [isVisible, handleSnackBar] = useState(false)

    const [formInputs, handleFormInputChange] = useState({
        name: ' ',
        expiracyDate: parseDate(),
        recievedDate: parseDate(),
        provider: '',
        foodHouse: '',
        amount: '0'
    });

    const handleSubmit = () => {
        postFood(formInputs, (err, response) => {
            console.log(response)
        })
    };

    useEffect(() => {
        fetchFoodHouses((err, result) => {
            if (!err) {
                handleFoodHouses(result)
            }
        })

        fetchProviders((err, result) => {
            if (!err) {
                console.log('hi', result)
                handleProviders(result)
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <View
                style={styles.form_content_switch}>
                <Button
                    onPress={() => handleSwitchState('left')}
                    color="#FFFFFF"
                    style={switchState === "left" ? {
                        ...styles.form_content_switch__selected,
                        ...styles.form_content_switch
                    } :
                        {
                            ...styles.form_content_switch,
                            ...styles.form_content_switch__unselected
                        }} >
                    <Text>Indtast Mad</Text>
                </Button>
                <Button
                    onPress={() => handleSwitchState('right')}
                    color="#FFFFFF"
                    style={switchState === "right" ? {
                        ...styles.form_content_switch__selected,
                        ...styles.form_content_switch
                    } :
                        {
                            ...styles.form_content_switch,
                            ...styles.form_content_switch__unselected
                        }
                    } >
                    <Text>Scan mad</Text>
                </Button>
            </View>
            <View style={styles.form_content}>
                <Text style={styles.form__content__info_text}>Information om mad</Text>
                <TextInput
                    label='Product Name'
                    theme={theme}
                    underlineColor="transparent"
                    placeholderTextColor="#FFFFFF"
                    selectionColor="#FFFFFF"
                    style={styles.form_content__input}
                    value={formInputs.name}
                    onChangeText={text => handleFormInputChange({ ...formInputs, name: text })}
                />
                <View style={styles.form_content__input}>
                    <Text style={styles.form__content__label}>From:</Text>
                    <DatePicker
                        date={formInputs.expiracyDate}
                        mode="date"
                        placeholder='Expiracty Date'
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2021-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: styles.dateIcon,
                            dateInput: styles.dateInput
                        }}
                        onDateChange={(date) => { handleFormInputChange({ ...formInputs, expiracyDate: date }) }}
                    />
                </View>
                <View style={styles.form_content__input}>
                    <Text style={styles.form__content__label}>Recieved Date:</Text>
                    <DatePicker
                        date={formInputs.expiracyDate}
                        mode="date"
                        placeholder='Recieved Date'
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2021-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: styles.dateIcon,
                            dateInput: styles.dateInput
                        }}
                        onDateChange={(date) => { handleFormInputChange({ ...formInputs, expiracyDate: date }) }}
                    />
                </View>
                <TextInput
                    label='Amount'
                    theme={theme}
                    underlineColor="transparent"
                    placeholderTextColor="#FFFFFF"
                    selectionColor="#FFFFFF"
                    style={styles.form_content__input}
                    value={formInputs.amount}
                    keyboardType={'numeric'}
                    onChangeText={text => handleFormInputChange({ ...formInputs, amount: text })}
                />
                <View style={styles.form_content__input}>
                    <Text style={styles.form__content__label}>Provider</Text>
                    <Picker
                        selectedValue={'this.state.language}'}
                        style={styles.form_content_picker}
                        onValueChange={(itemValue, itemIndex) => handleFormInputChange({ ...formInputs, provider: itemValue })}>
                        {providers.map(provider => {
                            console.log(provider)
                            return (
                                <Picker.Item
                                    key={provider.id}
                                    label={provider.name}
                                    value={provider.id} />
                            )
                        })}
                    </Picker>
                </View>
                <View style={styles.form_content__input}>
                    <Text style={styles.form__content__label}>Food Store:</Text>
                    <Picker
                        selectedValue={formInputs.foodHouse}
                        style={styles.form_content_picker}
                        onValueChange={(itemValue, itemIndex) => handleFormInputChange({ ...formInputs, provider: itemValue })}>
                        {foodHouses.map(provider => {
                            return (
                                <Picker.Item
                                    style={{ width: '100%' }}
                                    key={provider.id}
                                    label={provider.name}
                                    value={provider.id} />
                            )
                        })}
                    </Picker>
                </View>
                <Button
                    raised
                    color="#FFFFFF"
                    style={styles.submit_button}
                    onPress={() => {
                        handleSnackBar(true)
                        handleSubmit()
                    }}>
                    Tilmeld
            </Button>
            </View>
            <Snackbar
                style={{ color: '#C4D6B0' }}
                visible={isVisible}
                onDismiss={() => handleSnackBar(false)}
                action={{
                    label: 'Continue',
                    onPress: () => {
                        handleSnackBar(false)
                        // Do something
                    },
                }}>
                Mad er blevet registreret med succes
            </Snackbar>
            <Button
                style={{
                    position: 'absolute',
                    width: '100%',
                    bottom: 0,
                    backgroundColor: '#C4D6B0'
                }}
                color="#FFFFFF"
                raised
                onPress={() => { props.navigation.navigate('Home') }}>
                Tilbage
            </Button>
        </View >
    )
}
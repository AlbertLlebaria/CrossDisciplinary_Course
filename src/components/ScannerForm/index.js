import React, { useState, useEffect, AbortController } from 'react'
import { View, Text, Picker } from "react-native";
import { Button, Snackbar, TextInput, IconButton, Colors, ActivityIndicator } from "react-native-paper";
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux';
import {
    fetchFoodHouses,
    fetchProviders,
    clearForm,
    handleFormChange,
    postFoodRequest
} from '../../actions/store.actions'
import { cleanError } from '../../actions/global.actions'

import { styles, theme } from './style.js'


function ScannerForm(props) {

    useEffect(() => {
        props.fetchFoodHouses()
        props.fetchProviders()
    }, [])

    const onSnackBarClick = () => {
        if (props.error) {
            props.cleanError()
        } else {
            props.clearForm()
            props.cleanError()
        }
    }
    const isVisible = props.formSubmit === true || props.error !== null;

    if (props.foodHouses.lenght === 0 || props.providers.lenght === 0) {
        return (<View style={styles.container}>
            <ActivityIndicator animating={true} color={Colors.green600} size="large" />
        </View>)
    } else {
        return (<View style={styles.container}>
            <View style={styles.form_content}>
                <Text style={styles.form__content__info_text}>Information om mad</Text>
                <View style={styles.form_content__input}>
                    <TextInput
                        label={props.form.barcode !== null ? 'Barcode' : 'Produktnavn'}
                        theme={theme}
                        underlineColor="transparent"
                        placeholderTextColor="#FFFFFF"
                        selectionColor="#FFFFFF"
                        value={props.form.barcode !== null ? props.form.barcode : props.form.name}
                        onChangeText={text => {
                            let key = props.form.barcode !== null ? 'barcode' : 'name';
                            props.handleFormChange(key, text)
                        }}
                    />
                    <Button icon="camera" mode="contained" color="#C4D6B0"
                        onPress={() => props.navigation.navigate('Camera')}>
                        Scann Barcode
                            </Button>
                </View>
                <View style={styles.form_content__input}>
                    <Text style={styles.form__content__label}>Udløbsdato:</Text>
                    <DatePicker
                        date={props.form.expiracyDate}
                        mode="date"
                        placeholder='Udløbsdato'
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2021-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: styles.dateIcon,
                            dateInput: styles.dateInput
                        }}
                        onDateChange={(date) => { props.handleFormChange('expiracyDate', date) }}
                    />
                </View>
                <View style={styles.form_content__input}>
                    <Text style={styles.form__content__label}>Modtaget dato:</Text>
                    <DatePicker
                        date={props.form.recievedDate}
                        mode="date"
                        placeholder='Modtaget dato'
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2021-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: styles.dateIcon,
                            dateInput: styles.dateInput
                        }}
                        onDateChange={(date) => { props.handleFormChange('recievedDate', date) }}
                    />
                </View>
                <TextInput
                    label='Beløb'
                    theme={theme}
                    underlineColor="transparent"
                    placeholderTextColor="#FFFFFF"
                    selectionColor="#FFFFFF"
                    style={styles.form_content__input}
                    value={props.form.amount}
                    keyboardType={'numeric'}
                    onChangeText={text => props.handleFormChange('amount', text)}
                />
                <View style={styles.form_content__input}>
                    <Text style={styles.form__content__label}>Provider</Text>
                    <Picker
                        selectedValue={'this.state.language}'}
                        style={styles.form_content_picker}
                        onValueChange={(itemValue, itemIndex) => props.handleFormChange('provider', itemValue)}>
                        {props.providers.map(provider => {
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
                    <Text style={styles.form__content__label}>Food butik:</Text>
                    <Picker
                        selectedValue={props.form.foodHouse}
                        style={styles.form_content_picker}
                        onValueChange={(itemValue, itemIndex) => props.handleFormChange('foodHouse', itemValue)}>
                        {props.foodHouses.map(foodHouse => {
                            return (
                                <Picker.Item
                                    style={{ width: '100%' }}
                                    key={foodHouse.id}
                                    label={foodHouse.name}
                                    value={foodHouse.id} />
                            )
                        })}
                    </Picker>
                </View>
                <Button
                    raised
                    color="#FFFFFF"
                    style={styles.submit_button}
                    onPress={() => {
                        props.postFoodRequest(props.form);
                    }}>
                    Tilmeld
                </Button>
            </View>
            <Snackbar
                style={{ color: '#C4D6B0' }}
                visible={isVisible}
                onDismiss={() => onSnackBarClick()}
                action={{
                    label: "Blive ved",
                    onPress: () => { onSnackBarClick() }
                }}>
                {props.error === null ? 'Mad er blevet registreret med succes' : 'Kunne ikke indsende data'}
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
                onPress={() => {
                    props.clearForm()
                    props.cleanError()
                    props.navigation.navigate('Home')
                }}>
                Tilbage
                </Button>
        </View >)
    }
}

const mapStateToProps = function (state) {
    return {
        providers: state.API_store.providers,
        foodHouses: state.API_store.foodHouses,
        form: state.API_store.formFields,
        formSubmit: state.API_store.formSubmit,
        error: state.data.error

    }
}
const mapDispatchToProps = {
    fetchFoodHouses,
    fetchProviders,
    handleFormChange,
    clearForm,
    cleanError,
    postFoodRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ScannerForm);
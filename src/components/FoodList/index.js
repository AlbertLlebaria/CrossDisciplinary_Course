import React, { useEffect, useState } from 'react';
import { List, Text, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { View, SafeAreaView, ScrollView } from 'react-native'
import {
    fetchFoodFromProvider,
    fetchProviders,
    clearFood
} from '../../actions/store.actions'
import DatePicker from 'react-native-datepicker'

function FoodList(props) {
    useEffect(() => {
        props.fetchProviders();
    }, [])

    const parseDate = (d = new Date()) => {
        let month = (d.getMonth() + 1),
            day = d.getDate(),
            year = d.getFullYear();

        return `${year}-${month}-${day}`;
    }
    const [fromDate, handleFromDate] = useState(parseDate())

    const [expandedControl, handleExpandedProviders] = useState(props.providers.map(el => false))


    return (
        <SafeAreaView style={{
            marginTop: 30,
            flex: 1,
            textAlign: 'center'
        }}>
            <ScrollView>
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Text style={{
                        marginTop: 50,
                        marginBottom: 20,
                        fontWeight: 'bold',
                        fontSize: 30,
                        lineHeight: 37,
                        textAlign: 'center',
                    }}>
                        Allerede registeret mad
            </Text>
                    <View style={{
                        width: '50%',
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                        height: 1
                    }}>

                    </View>
                </View>
                <View style={{
                    padding: 2,
                    borderRadius: 5,
                    color: "#FFFFFF",
                    margin: 5,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <DatePicker
                        style={{ width: 200 }}
                        date={fromDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2019-05-01"
                        maxDate="2021-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                                borderWidth: 0

                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {
                            handleFromDate(date)
                            handleExpandedProviders(expandedControl.map(el => false))
                        }}
                    />
                </View>
                <List.Section title="Providers">
                    {props.providers.map((provider, index) => {
                        return (<List.Accordion
                            key={`${provider.name}-${index}`}
                            title={provider.name}
                            onPress={() => {
                                props.fetchFoodFromProvider(provider.id, fromDate)
                                expandedControl[index] = !expandedControl[index]
                                handleExpandedProviders(expandedControl)
                            }}
                            expanded={expandedControl[index]}
                            description={`Location: ${provider.address}, ${provider.city}`}
                            left={props => <List.Icon {...props} icon="home" />}>
                            {
                                props.food.map((food, index) =>
                                    <List.Item
                                        key={`${food.name}-${index}`}
                                        title={food.name}
                                        description={`Amount : ${food.amount}`}
                                    />)
                            }
                        </List.Accordion>)
                    })}
                </List.Section>
            </ScrollView>
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
                        props.navigation.navigate('Home')
                    }}>
                    Tilbage
                </Button>
        </SafeAreaView>
    )
}
const mapStateToProps = function (state) {
    return {
        food: state.API_store.food,
        providers: state.API_store.providers
    }
}
const mapDispatchToProps = {
    fetchFoodFromProvider,
    fetchProviders,
    clearFood
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodList);
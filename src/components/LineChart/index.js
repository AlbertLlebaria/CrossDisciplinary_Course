import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { LineChart } from "react-native-chart-kit";
import DatePicker from 'react-native-datepicker'
import { Button, Colors, Text } from 'react-native-paper';
import { reduce } from 'lodash'

import { connect } from 'react-redux'
import { fetchFoodFromStoreBetweenDates, clearFood } from '../../actions/store.actions'

import style from './style.js'

function FoodLineChart(props) {
    const parseDate = (d = new Date()) => {
        let month = (d.getMonth() + 1),
            day = d.getDate(),
            year = d.getFullYear();

        return `${year}-${month}-${day}`;
    }

    const [fromDate, handleFromDate] = useState(parseDate())
    const [toDate, handleToDate] = useState(parseDate())
    const [isLoading, handleLoading] = useState(false)

    const [selectedCategory, handleSelected] = useState([])

    const styles = StyleSheet.create(style)

    const foodCategories =
        [
            'Fruits',
            'Vegetables and legumes',
            'Grains and Cereals',
            'Meat and alternatives',
            'Other'
        ];

    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(196,214,176,${opacity})`,
        strokeWidth: 2 // optional, default 3
    }

    const handleToggleGroup = (value) => {
        let newSelectedCategories = []
        if (selectedCategory.includes(value)) {
            newSelectedCategories = selectedCategory.filter(el => el !== value);
        } else {
            newSelectedCategories = [...selectedCategory, value]
        }

        if (newSelectedCategories.length > 0) {
            handleLoading(true)
            props.fetchFoodFromStoreBetweenDates({
                from: fromDate,
                to: toDate,
                store: props.foodHouse.id,
            })
        }
        handleSelected(newSelectedCategories)
    }
    if (isLoading && props.food.length > 0) {
        handleLoading(false)
    }
    useEffect(() => {
        return () => {
            props.clearFood();
        }
    }, []);
    let labels = []
    let parsed = reduce(props.food, function (result, value, key) {
        if (result[value.category]) {
            if (result[value.category][value.recievedDate])
                result[value.category][value.recievedDate] = result[value.category][value.recievedDate] + value.amount
            else
                result[value.category][value.recievedDate] = value.amount
        } else {
            labels.push(value.recievedDate)
            result[value.category] = {
                [value.recievedDate]: value.amount
            }
        }
        return result;
    }, {});


    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
        }}>
            <Button
                style={{
                    alignSelf: 'flex-end',
                    backgroundColor: '#C4D6B0',
                    marginLeft: 5
                }}
                color={Colors.white}
                raised
                onPress={() => props.handleDeselect()}>X</Button>
            <Text>{props.title}</Text>
            <View style={styles.datepicker_input}>
                <Text>Fra:</Text>
                <DatePicker
                    date={fromDate}
                    style={{ width: 200 }}
                    mode="date"
                    placeholder="Vælg dato"
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
                        if (selectedCategory.length > 0) {
                            props.fetchFoodFromStoreBetweenDates({
                                from: date,
                                to: toDate,
                                store: props.foodHouse.id,
                            })
                        }
                    }}
                />
            </View>
            <View style={styles.datepicker_input}>
                <Text>Til:</Text>
                <DatePicker
                    style={{ width: 200 }}
                    date={toDate}
                    mode="date"
                    placeholder="Vælg dato"
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
                    }}
                    onDateChange={(date) => {
                        handleToDate(date)
                        if (selectedCategory.length > 0) {
                            props.fetchFoodFromStoreBetweenDates({
                                from: fromDate,
                                to: date,
                                store: props.foodHouse.id,
                            })
                        }
                    }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    width: props.width - 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    margin: 10
                }}>
                {foodCategories.map((category, index) => (
                    <Button
                        raised
                        key={category}
                        style={selectedCategory.includes(category) ? styles.toggle_button__active : {}}
                        onPress={() => handleToggleGroup(category)}
                        color={selectedCategory.includes(category) ? "#FFFFFF" : '#C4D6B0'}>
                        <Text>{category}</Text>
                    </Button>
                ))}
            </View>
            {selectedCategory.length > 0 ?
                <LineChart
                    data={{
                        labels: (() => {
                            return labels.map(data => {
                                const date = new Date(data)
                                var mm = date.getMonth() + 1; // getMonth() is zero-based
                                var dd = date.getDate();
                                return `${dd}/${mm}`
                            })
                        }
                        )(),
                        datasets: (() => {
                            const result = Object.keys(parsed).map(category => {

                                if (selectedCategory.includes(category))
                                    return {
                                        data: Object.keys(parsed[category]).map(key => {
                                            return parsed[category][key]
                                        })
                                    }

                            }).filter(el => typeof (el) !== "undefined");
                            console.log(result, parsed)
                            if (result.length == 0)
                                return [{ data: [0] }]
                            else return result
                        })()
                    }}
                    width={300} // from react-native
                    height={180}
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        marginVertical: 20,
                        borderRadius: 16
                    }}
                /> :
                <View style={{ height: 150, justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={{ color: '#C4D6B0' }}>Select a food category</Text>
                </View>}
        </View>
    )
}


const mapStateToProps = function (state) {
    return {
        food: state.API_store.food
    }
}
const mapDispatchToProps = {
    fetchFoodFromStoreBetweenDates,
    clearFood
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodLineChart);
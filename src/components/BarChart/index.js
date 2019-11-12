import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
    LineChart
} from "react-native-chart-kit";
import { Button } from "react-native-paper";
import DatePicker from 'react-native-datepicker'
import style from './style.js'
import { fetchFoodFromStoreBetweenDates } from '../../api/backendAPI'
import { reduce } from 'lodash'
import { ActivityIndicator, Colors } from 'react-native-paper';

export default function FoodBarChart(props) {
    const parseDate = (d = new Date()) => {
        let month =  (d.getMonth() + 1),
            day = d.getDate(),
            year = d.getFullYear();

        return `${year}-${month}-${day}`;
    }
    
    const [fromDate, handleFromDate] = useState(parseDate())
    const [toDate, handleToDate] = useState(parseDate())
    const [labels, handleLabels] = useState([])
    const [plotData, handlePlotData] = useState({})
    const [isLoading, handleLogin] = useState(false)

    const [selectedCategory, handleSelected] = useState("")

    const styles = StyleSheet.create(style)

    const foodCategories =
        [
            'Fruits',
            'Vegetables and legumes',
            'Grains and Cereals',
            'Meat and alternatives',
            'Other'
        ]
    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(196,214,176,${opacity})`,
        strokeWidth: 2 // optional, default 3
    }

    const handleToggleGroup = (value) => {
        handleLogin(true)
        fetchFoodFromStoreBetweenDates({
            from: fromDate,
            to: toDate,
            store: props.store.id,
            category: selectedCategory
        }, (err, result) => {
            if (!err) {
                newLabels = []
                let parsed = reduce(result, function (result, value, key) {
                    if (result[value.category]) {
                        if (result[value.category][value.recievedDate])
                            result[value.category][value.recievedDate] = result[value.category][value.recievedDate] + value.amount
                        else
                            result[value.category][value.recievedDate] = value.amount
                    } else {
                        newLabels.push(value.recievedDate)
                        result[value.category] = {
                            [value.recievedDate]: value.amount
                        }
                    }
                    return result;
                }, {});
                handleLabels(newLabels)
                handlePlotData(parsed)
                handleSelected(value)
            }
            handleLogin(false)
        })
    }

    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text>{props.title}</Text>
            <View style={styles.datepicker_input}>
                <Text>From:</Text>
                <DatePicker
                    date={fromDate}
                    style={{ width: 200 }}
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
                    onDateChange={(date) => { handleFromDate(date) }}
                />
            </View>
            <View style={styles.datepicker_input}>
                <Text>To:</Text>
                <DatePicker
                    style={{ width: 200 }}
                    date={toDate}
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
                    onDateChange={(date) => { handleToDate(date) }}
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
                        style={selectedCategory === category ? styles.toggle_button__active : {}}
                        onPress={() => handleToggleGroup(category)}
                        color={selectedCategory === category ? "#FFFFFF" : '#C4D6B0'}>
                        <Text>{category}</Text>
                    </Button>
                ))}
            </View>
            {isLoading &&
                <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator animating={true} color={Colors.green600} size="large" />
                </View>}
            {(labels.length > 0 && !isLoading) &&
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
                            const result = Object.keys(plotData).map(category => {
                                return {
                                    data: Object.keys(plotData[category]).map(key => {
                                        return plotData[category][key]
                                    })
                                }
                            })
                            console.log(result, plotData)
                            if (result.length == 0)
                                return [{ data: [0] }]
                            else return result
                        })()
                    }}
                    width={330} // from react-native
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />}
        </View>
    )

}
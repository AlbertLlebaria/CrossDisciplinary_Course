import React from 'react'
import {View, Text} from 'react-native'
import {LineChart} from "react-native-chart-kit";
import {Dimensions} from "react-native";
import {IconButton} from "react-native-paper";
import Icon from 'react-native-vector-icons/Entypo';

export default function BarChart(props) {
    const width = (Dimensions.get("window").width * 80) / 100;
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text>{props.store.title}</Text>
            <IconButton
                style={{float: 'right'}}
                size={20}
                onPress={props.handleCloseChart}>
                <Icon name="cross"/>
            </IconButton>
            <LineChart
                data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={width} // from react-native
                height={220}
                yAxisLabel={"$"}
                chartConfig={{
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    )

}
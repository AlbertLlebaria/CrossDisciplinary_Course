import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import MapView from "react-native-maps";
import BarChart from "../BarChart";


const superMarkets = [
    {
        latitude: 53.699551,
        longitude: 13.542715,
        title: "Netto 4-24",
        description: " Bal bla"
    },
    {
        latitude: 55.699551,
        longitude: 13.542715,
        title: "Netto 5-24",
        description: " Bal bla"
    }, {
        latitude: 53.699551,
        longitude: 12.542715,
        title: "Netto 6-24",
        description: " Bal bla"
    }, {
        latitude: 56.699551,
        longitude: 12.542715,
        title: "Netto 7-24",
        description: " Bal bla",
    }
];

function test() {
    return (
        <View style={
            {
                position: 'absolute',
                top: 0,
                left: 0,
            }
        }>
            <Text>HELOOO</Text>
        </View>
    )
}

export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: superMarkets,
            current: null,
            test: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleCloseChart = this.handleCloseChart.bind(this);
    }

    componentDidMount() {
    }

    handleClick(i) {
        this.setState({...this.state, current: this.state.markers[i], test: true})
    }

    handleCloseChart() {
        this.setState({...this.state, test: false})

    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: 55.699551,
                        longitude: 12.542715,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}>
                    {this.state.markers.map((marker, i) => {

                        return (
                            <MapView.Marker
                                className={`supermarket-pointer-${i}`}
                                key={`${marker.title}-${i}`}
                                coordinate={{
                                    latitude: marker.latitude,
                                    longitude: marker.longitude
                                }}
                                title={marker.title}
                                description={marker.description}
                                onPress={() => {
                                    this.handleClick(i)
                                }}
                            />
                        )
                    })}
                </MapView>
                {this.state.test && <TouchableOpacity style={styles.overlay}>
                    <BarChart
                        store={this.state.current}
                        handleCloseChart={this.handleCloseChart}/>
                </TouchableOpacity>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        position: 'absolute',
        bottom: 10,
        width: "90%",
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
});
import React from 'react'
import {StyleSheet, View} from "react-native";
import MapView from "react-native-maps";


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

export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: superMarkets
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <MapView
                style={styles.map}
                region={{
                    latitude: 55.699551,
                    longitude: 12.542715,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}>
                {this.state.markers && this.state.markers.map((marker,i) => {

                    return (
                        <MapView.Marker
                            className={`supermarket-pointer-${marker.i}`}
                            key={`${marker.title}-${marker.i}`}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }}
                            title={marker.title}
                            description={marker.description}
                            onPress={() => {
                                console.log(marker)
                            }}
                        />
                    )
                })}
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
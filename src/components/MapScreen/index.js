import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { Button } from 'react-native-paper'
import MapView from "react-native-maps";
import BarChart from "../BarChart";
import { fetchFoodHouses } from '../../api/backendAPI'
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = 100;
const CARD_WIDTH = (width / 2) - 30;

export default class screens extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markers: [
            ],
            region: {
                latitude: 55.679062,
                longitude:  12.565472,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            },
            test: false,
            current: null
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleCloseChart = this.handleCloseChart.bind(this);
    }

    handleClick(i) {
        this.setState({ ...this.state, current: this.state.markers[i], test: true })
    }

    handleCloseChart() {
        this.setState({ ...this.state, test: false })

    }

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
        fetchFoodHouses((err, response) => {
            if (!err) {
                this.setState({ ...this.state, markers: response })
            }
        })
    }
    componentDidMount() {
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.state.markers.length) {
                index = this.state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { coordinate } = this.state.markers[index];
                    this.map.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    }

    render() {
        const interpolations = this.state.markers.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return { scale, opacity };
        });

        return (
            <View style={styles.container}>
                <MapView
                    ref={map => this.map = map}
                    initialRegion={this.state.region}
                    style={styles.container}
                >
                    {this.state.markers.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <MapView.Marker key={index} coordinate={marker.coordinate}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]} />
                                    <View style={styles.marker} />
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },
                        ],
                        { useNativeDriver: true }
                    )}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}>
                    {!this.state.test && this.state.markers.map((marker, index) => (
                        <View style={styles.card} key={index}>
                            <View style={styles.textContent}>
                                <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
                                <Text numberOfLines={1} style={styles.cardDescription}>{marker.address},{marker.city}</Text>
                                <Button raised
                                    style={{
                                        margin: 3,
                                        backgroundColor: '#C4D6B0'
                                    }}
                                    color="#FFFFFF"
                                    onPress={() => { this.handleClick(index) }}>Inspect</Button>
                            </View>
                        </View>
                    ))}
                </Animated.ScrollView>
                {this.state.test && <TouchableOpacity style={styles.overlay}>
                    <BarChart
                        height={CARD_HEIGHT - 20}
                        width={Dimensions.get("window").width * 0.90}
                        store={this.state.current}
                        handleCloseChart={this.handleCloseChart} />
                </TouchableOpacity>}
                <Button
                    style={{
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                        backgroundColor: '#C4D6B0'
                    }}
                    color="#FFFFFF"
                    raised
                    onPress={() => { this.props.navigation.navigate('Home') }}>
                    Tilbage
            </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        marginBottom: 5,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
        borderRadius: 3
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
    overlay: {
        position: 'absolute',
        bottom: 10,
        margin: '5%',
        width: "90%",
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
});
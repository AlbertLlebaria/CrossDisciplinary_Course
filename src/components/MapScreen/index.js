import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { Button, ActivityIndicator, Colors} from 'react-native-paper'
import MapView from "react-native-maps";
import LineChart from "../LineChart";
import { fetchFoodHouses } from '../../actions/store.actions'
import { connect } from 'react-redux'

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = 100;
const CARD_WIDTH = (width / 2) - 30;

class MapScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: 55.679062,
                longitude: 12.565472,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            },
            current: null
        };
        this.handleDeselect = this.handleDeselect.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i) {
        this.setState({ ...this.state, current: this.props.foodHouses[i] })
    }

    handleDeselect() {
        this.setState({ ...this.state, current: null })
    }

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
        this.props.fetchFoodHouses();
    }
    componentDidMount() {
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.props.foodHouses.length) {
                index = this.props.foodHouses.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { coordinate } = this.props.foodHouses[index];
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
        const interpolations = this.props.foodHouses.map((marker, index) => {
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
                {this.props.isLoading && (
                    <View style={{
                        flex: 1,
                        position: 'absolute',
                        width: '100%',
                        top: 0,
                        height: '100%',
                        zIndex: 99,
                        backgroundColor: 'rgba(1, 15, 10, 0.51)',
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}>
                        <ActivityIndicator animating={true} size={'large'} color={Colors.green400} />
                    </View>
                )}
                <MapView
                    ref={map => this.map = map}
                    initialRegion={this.state.region}
                    style={styles.container}
                >
                    {this.props.foodHouses.map((marker, index) => {
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
                    {this.state.current === null && this.props.foodHouses.map((marker, index) => (
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
                                    onPress={() => { this.handleClick(index) }}>Analysere</Button>
                            </View>
                        </View>
                    ))}
                </Animated.ScrollView>
                {this.state.current && <TouchableOpacity style={styles.overlay}>
                    <LineChart
                        handleDeselect={this.handleDeselect}
                        height={CARD_HEIGHT - 20}
                        width={Dimensions.get("window").width * 0.90}
                        foodHouse={this.state.current} />
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
        width: 12,
        height: 12,
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

const mapStateToProps = function (state) {
    return {
        foodHouses: state.API_store.foodHouses,
        isLoading: state.data.isLoading
    }
}
const mapDispatchToProps = {
    fetchFoodHouses
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
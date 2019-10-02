import React from 'react';
import {View, Text, Button} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from "./src/components/Home";
import Login from "./src/components/Login";


const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Login:{
        screen: Login,
    }

}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);
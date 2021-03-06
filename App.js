import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import LoginScreen from "./src/components/LoginScreen";
import HomeScreen from "./src/components/HomeScreen";
import ScannerForm from "./src/components/ScannerForm";
import FoodList from "./src/components/FoodList";
import MapScreen from "./src/components/MapScreen";
import CameraScanner from "./src/components/CameraScanner";

import {Provider} from 'react-redux';
import configureStore from './src/configureStore'

let store = configureStore();

export const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#C4D6B0',
        accent: '#f1c40f',
    }
};

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PaperProvider theme={theme}>
                    <AppContainer/>
                </PaperProvider>
            </Provider>
        );
    }
}


const AuthenticationNavigator = createSwitchNavigator({
    SignIn: LoginScreen,
});

const AppNavigator = createSwitchNavigator({
    Auth: AuthenticationNavigator,
    Home: HomeScreen,
    Form: ScannerForm,
    MapScreen: MapScreen,
    List: FoodList,
    Camera: CameraScanner
});

const AppContainer = createAppContainer(AppNavigator);
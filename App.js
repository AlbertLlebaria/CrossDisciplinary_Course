import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import LoginScreen from "./src/components/LoginScreen";
import HomeScreen from "./src/components/HomeScreen";
import ScannerForm from "./src/components/ScannerForm/ScannerForm";
import FoodList from "./src/components/FoodList/FoodList";
import {Provider} from 'react-redux';
import configureStore from './src/configureStore'

let store = configureStore();

export const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
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
    List: FoodList,
});

const AppContainer = createAppContainer(AppNavigator);
import React from "react";
import {View} from "react-native";
import {IconButton, Colors} from 'react-native-paper';
import Text from "react-native-web/dist/exports/Text";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClickedMenuButton(path) {
        this.props.navigation.navigate(path)
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',

                }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        <IconButton
                            icon="form"
                            size={50}
                            style={{color: '#AAC0AA'}}
                            onPress={() => this.handleClickedMenuButton('Form')}
                        />
                        <Text>Food Scanner</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        <IconButton
                            icon="account-circle"
                            size={50}
                            onPress={() => console.log('account-circle')}
                        />
                        <Text>Account</Text>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'row'
                }}>

                    <View style={{
                        flex: 1,
                        alignItems: 'center'
                    }}>
                        <IconButton
                            icon="list"
                            size={50}
                            onPress={() => this.handleClickedMenuButton('List')}
                        />
                        <Text>Store</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        <IconButton
                            icon="android"
                            size={50}
                            onPress={() => console.log('google-analytics')}
                        />
                        <Text>Analyze</Text>
                    </View>
                </View>
            </View>
        );
    }

}
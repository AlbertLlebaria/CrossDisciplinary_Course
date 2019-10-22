import React from "react";
import {View} from "react-native";
import {IconButton, Text} from 'react-native-paper';

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
                            icon="speaker"
                            size={50}
                            style={{color: '#AAC0AA'}}
                            onPress={() => this.handleClickedMenuButton('Form')}
                        />
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
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        <IconButton
                            icon="android"
                            size={50}
                            onPress={() => this.handleClickedMenuButton('MapScreen')}
                        />
                    </View>
                </View>
            </View>
        );
    }

}
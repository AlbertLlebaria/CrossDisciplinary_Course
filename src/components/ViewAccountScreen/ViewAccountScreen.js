import React from 'react'
import {View} from 'react-native'
import {Button, TextInput} from "react-native-paper";

export default function ViewAccountScreen() {
    return (
        <View style={styles.container}>
            <TextInput
                label='Product Name'
                style={{backgroundColor: 'none'}}
                value={'Adolfo'}
            />
            <Button raised style={{marginTop: '20px'}} onPress={() => console.log('Pressed')}>
                Press me
            </Button>
        </View>
    )

}
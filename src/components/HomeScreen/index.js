import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { IconButton, Text, Button } from 'react-native-paper';
import style from './style'

export default function HomeScreen(props){

    const styles = StyleSheet.create(style)

    const handleClickedMenuButton = (path) => {
        props.navigation.navigate(path)
    }

    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <Text style={style.home_tittle}>
                    Vælg nedenfor hvad du gerne vil foretage dig
            </Text>
                <View style={styles.bottom_line}></View>
            </View>
            <View style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 50

            }}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                    <IconButton
                        style={styles.icon_button}
                        icon={({ size, color }) => (
                            <Image
                                source={require('../imgs/RegisterFoodIcon.png')}
                                style={styles.image_button}
                            />)}
                        onPress={() => handleClickedMenuButton('Form')}></IconButton>
                    <Text style={styles.button_label} >Register Mad</Text>

                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                    <IconButton
                        style={styles.icon_button}
                        icon={({ size, color }) => (<Image
                            source={require('../imgs/RegisterMadIcon.png')}
                            style={styles.image_button}
                        />)}
                        onPress={() => console.log('account-circle')}
                    />
                    <Text style={styles.button_label} >Analyse</Text>
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
                        style={styles.icon_button}
                        icon={({ size, color }) => (
                            <Image
                                source={require('../imgs/AlleRegisteredIcon.png')}
                                style={styles.image_button}
                            />)}
                        onPress={() => handleClickedMenuButton('List')}
                    />
                    <Text style={styles.button_label} >Allerede registeret mad</Text>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <IconButton
                        style={styles.icon_button}
                        icon={({ size, color }) => (
                            <Image
                                style={styles.image_button}
                                source={require('../imgs/MapIcon.png')}
                            />)}
                        onPress={() => handleClickedMenuButton('MapScreen')}
                    />
                    <Text style={styles.button_label} >Kort over Butik</Text>
                </View>
            </View>
            <Button
                style={style.loggin_button}
                raised
                color="#ffffff">
                Videre
            </Button>
        </View>
    );
}

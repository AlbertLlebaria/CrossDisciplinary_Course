import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loggin_button: {
        backgroundColor: '#C4D6B0',
        marginTop: 20,
    },
    form_container: {
        width: '80%',
        marginTop: 40,
    },
    image_container: {
        width: '80%',
        justifyContent:'center',
        alignItems:'center'
    },
    logo_image:{
        zIndex:999,
    },
    line_style_left: {
        position: "absolute",
        top: 65,
        left: 0,
        width: '18%',
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10,
    },
    line_style_right: {
        position: "absolute",
        top: 65,
        right: 0,
        width: '18%',
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10,
    },
    auxiliary_bottom__left:{
        position: "absolute",
        bottom:0,
        left:0,
        fontSize:12,
        margin:5,
        color:'#808080'
    },
    auxiliary_bottom__right:{
        position: "absolute",
        bottom:0,
        right:0,
        fontSize:12,
        margin:5,
        color:'#808080'
    }
});

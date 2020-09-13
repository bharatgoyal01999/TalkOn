import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import Colors from '../../utils/Colors'
import { screenWidth, screenHeight} from '../../utils/Dimention'
export default FloatingButton=({onPress})=>(  <View  style={styles.buttonContainer}>

    <TouchableOpacity onPress={onPress}>
    <Icon name="chat" size={40} color="white" />
    </TouchableOpacity>
</View>);
const styles=StyleSheet.create({
    buttonContainer:{
        backgroundColor:Colors.HeaderColor,
        position:'absolute',
        bottom:screenWidth*0.048,
        right:screenWidth*0.048,
        width:screenWidth*0.145,
        height:screenWidth*0.145,
        borderRadius:(screenWidth*0.145)/2,
        alignItems:"center",
        justifyContent:'center'
    }
})
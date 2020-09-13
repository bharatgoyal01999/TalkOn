import React from 'react'
import Mcon from 'react-native-vector-icons/FontAwesome5'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import Colors from '../../utils/Colors'
import { screenWidth, screenHeight} from '../../utils/Dimention'
export default ({onPress})=>(  <View  style={styles.buttonContainer}>

    <TouchableOpacity onPress={onPress}>
    <Mcon name="images" size={30} color="white" />
    </TouchableOpacity>
</View>);
const styles=StyleSheet.create({
    buttonContainer:{
        backgroundColor:Colors.HeaderColor,
        position:'absolute',
        bottom:screenWidth*0.048,
        left:screenWidth*0.048,
        width:screenWidth*0.145,
        height:screenWidth*0.145,
        borderRadius:(screenWidth*0.145)/2,
        alignItems:"center",
        justifyContent:'center'
    }
})
import React from 'react'
import {View, Text, StyleSheet,Dimensions, Button} from 'react-native'
import Colors from '../../utils/Colors'

import Constants from 'expo-constants'
export default ({heading})=>{
    return (
        <View style={styles.HeaderContainer}>
           
            <Text style={styles.HeaderText}>{heading.toUpperCase()+"S"}</Text>
        </View>
    );
}
const styles=StyleSheet.create({
    HeaderContainer:{
        flex:1,
        flexDirection:'row',
        backgroundColor:Colors.HeaderColor,
        justifyContent:'center',
        alignItems:'center',
        marginTop:Constants.statusBarHeight,
    },
    HeaderText:{
        fontSize:30,
        color:'white'
    }
})
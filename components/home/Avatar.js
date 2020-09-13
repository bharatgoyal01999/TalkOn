import  React,{useState} from 'react'
import {View , Text ,StyleSheet } from 'react-native'
import {screenHeight,screenWidth} from '../../utils/Dimention'
import { randomColor } from '../../utils/randomColor'
export default function Avatar({username}){
    const r1=randomColor()
    const r2=randomColor()
    const r3=randomColor()
    
    let size=screenHeight*0.04
  const style={
    container:{
        width:size*2,
        height:size*2,
        borderRadius:size,
        backgroundColor:"rgb("+r1+","+r2+","+r3+")",
        alignItems:"center",
    justifyContent:"center"

    },
    text:{
color:"white",
fontSize:size,
 }
  }
    return (
       
        <View style={style.container}>
            <Text style={style.text}>
                {username.slice(0,2)}
            </Text>
        </View>
    );

}

import * as React from 'react'
 import {View ,TextInput, StyleSheet} from 'react-native'
import { Message } from 'react-native-gifted-chat'
import { screenHeight, screenWidth } from '../../../utils/Dimention'

 export default ({onChange,value})=>{
     return (
         <View style={styles.inputContainer}> 
             <TextInput placeholder={'message..'} placeholderTextColor="#1E2121"
             multiline
             value={value}
            onChangeText={text=>onChange(text)}
              style={styles.inputField}/>
         </View>
     )
 }
 const styles=StyleSheet.create({
     inputContainer:{
         borderWidth:1,
         borderColor:'white',
         borderRadius:20,
        flex:0.9
     },
     inputField:{
         flex:1,
         color:"white",
         fontSize:20,
         maxWidth:screenWidth*0.8,
         maxHeight:screenHeight*0.2,
        //  borderBottomColor:"white",
         borderBottomWidth:1
     }
 })
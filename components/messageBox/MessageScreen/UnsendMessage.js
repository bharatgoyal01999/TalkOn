import * as React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, TouchableW} from 'react-native'
import { withTheme } from 'react-native-elements'
import {screenWidth} from '../../../utils/Dimention'

export default({unsend,closeModal})=>{
return(
    <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center',width:screenWidth}} onPress={closeModal} activeOpacity={1} >
        <View style={styles.UnsendBox}>
    <TouchableOpacity onPress={unsend} >
        <Text style={{color:'white', fontSize:20}}>Unsend Message</Text>
    </TouchableOpacity>
    </View>
    </TouchableOpacity>
    
)
    
}
const styles=StyleSheet.create({


    UnsendBox:{
      
      flex:0.2,
        padding:5,
        alignItems:'center',
        justifyContent:'center',
    borderRadius:10,
    backgroundColor:'black',
    elevation:5
    }
})
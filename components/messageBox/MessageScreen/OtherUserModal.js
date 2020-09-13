import * as React from 'react'
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native'
import {screenWidth} from '../../../utils/Dimention'
export default({startPersonalChat,closeModal,Report})=>{
    return (
        <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center',width:screenWidth}} onPress={closeModal} activeOpacity={1} >
        <View style={styles.UnsendBox}>
    <TouchableOpacity onPress={startPersonalChat} >
        <Text style={{color:'white', fontSize:20}}>Start/Reset Personal Chat</Text>
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
import * as React from 'react'
import { View, Image, TextInput, StyleSheet,ScrollView ,Text, Button, TouchableOpacity} from 'react-native'
import {screenWidth, screenHeight} from '../../utils/Dimention'

import Aicon from 'react-native-vector-icons/MaterialCommunityIcons'
export default ({image,uplodePost,isUploding,cancelUploding,onChangeText})=>{
    return(
        <ScrollView style={styles.Previewcontainer}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'white', fontSize:25, marginBottom:10}} >Preview</Text>
            <TouchableOpacity onPress={cancelUploding} >
             <Aicon name='cancel' size={25} color='white' />
            </TouchableOpacity>
            </View>
            <Image source={image} style={styles.imageCard} />
          
                <TextInput placeholder={'write caption...'} placeholderTextColor='grey' 
                style={styles.inputStyle}
                multiline={true} numberOfLines={6}
                onChangeText={text=>onChangeText(text)}
                />
                <Button title={'Uplode'} color='black' width={100}  onPress={uplodePost} />
           
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    Previewcontainer:{
        flex:1,
        backgroundColor:'black'
    },
    imageCard:{
    
        width:screenWidth,
        aspectRatio:1,
        resizeMode:"contain",
       backgroundColor:'black',
      
      

    },
    inputStyle:{
       maxWidth:screenWidth,
       maxHeight:screenHeight*0.1,
        fontSize:20,
        color:'white',
        flex:0.2,
        borderBottomWidth:1,
        borderColor:'white'
    
       
    }

})
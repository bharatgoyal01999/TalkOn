import * as React from 'react'
import { Image, Text, View, TouchableOpacity} from 'react-native'
 
export default ({image, title, navigation:{navigate},id, cat})=>{

  
    return(
<TouchableOpacity style={{flex:0.5,alignItems:'center',
justifyContent:"center",margin:10,width:180,height:200,
borderColor:"white",
borderWidth:2

}}
onPress={()=>{navigate('Detail',{id:id,cat:cat})}}
>

    <Image source={image} style={{resizeMode:"contain",flex:1,aspectRatio:2}}/>
    <View style={{alignItems:"center"}}>
    <Text style={{color:"white", fontSize:20}}>{title}</Text>

    </View>
</TouchableOpacity>)
}
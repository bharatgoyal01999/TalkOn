import * as React from 'react'
import {View, TouchableOpacity, Image, Text , ActivityIndicator} from 'react-native'
import Aicon from 'react-native-vector-icons/AntDesign'
export default ({image, isUploading ,cancelImageSending,uploadImage})=>{
   
    return (
        <View style={{flexDirection:'row'}}>
          
            <Image  source={{uri:image}} style={{flex:1,resizeMode:"contain"}}/>
            
                {isUploading ? <ActivityIndicator size={'small'}  color={'white'} /> : <TouchableOpacity onPress={uploadImage}>
                    <Aicon name="arrowup" color={'white'} size={30} />
                    </TouchableOpacity>}
<TouchableOpacity onPress={cancelImageSending}>
<Aicon name="close" color={'white'} size={30} />
</TouchableOpacity>
             
            
            
        </View>
    );
}
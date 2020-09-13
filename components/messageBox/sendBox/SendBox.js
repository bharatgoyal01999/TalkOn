import * as React from 'react'
 import {View, Button} from 'react-native'
 import {screenWidth} from '../../../utils/Dimention'
import InputContainer from './InputContainer'
import SendKey from './SendKey'
import Colors from '../../../utils/Colors'
import ImagePiker from './ImagePikerKey'

  export default ({onTyping,onSend,value, onPickingImage})=>{
      return (
          <View style={{
            flex:1,
            backgroundColor:'black',
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
         
         
            padding:10,
            position:'absolute',
            width:screenWidth,
            bottom:0

        }}>
              <InputContainer onChange={text=>onTyping(text)} value={value}/> 
              <ImagePiker pikImage={onPickingImage}/>
               <SendKey onSend={onSend}></SendKey>
          </View>
      );
  }
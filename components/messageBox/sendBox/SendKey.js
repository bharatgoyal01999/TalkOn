import * as React from 'react'
import {TouchableOpacity, View} from 'react-native'
import Ficon from 'react-native-vector-icons/FontAwesome'

export default ({onSend})=>{
return (
    
    <TouchableOpacity onPress={onSend}>
        <Ficon name='send' color="white" style={{fontSize:30}} />
    </TouchableOpacity> 
 
);

}


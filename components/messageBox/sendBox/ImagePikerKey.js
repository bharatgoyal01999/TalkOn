import * as React from 'react'
import {TouchableOpacity, View} from 'react-native'
import EIcon from 'react-native-vector-icons/Entypo'

export default ({pikImage})=>{
    return (
        <TouchableOpacity onPress={pikImage}>
            <EIcon name='images' color='white' size={30} />
        </TouchableOpacity>
    );
}
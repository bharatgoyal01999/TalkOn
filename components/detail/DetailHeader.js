import * as React from 'react'
import { View , Switch, Text, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native'
import Colors from '../../utils/Colors'
import Aicon from 'react-native-vector-icons/AntDesign'
export default ({goback,heading,pinValue,changePinStatus,pinLoading})=>{
    console.log(pinLoading)
return (
   
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goback}>
    <Aicon name='back' color="white" size={25}/>
        </TouchableOpacity>
<Text style={{fontSize:30, color:'white'}} numberOfLines={2} >{'Discription'} </Text>
<View style={{flexDirection:'row',justifyContent:"space-between"}}>
<Text style={{fontSize:20, color:'white',marginRight:5 }}>{'Pin'}</Text>
{pinLoading ? <ActivityIndicator size={'small'} color={'white'}/>: <Switch value={pinValue} onValueChange={changePinStatus} style={{width:40}}
></Switch> 
}
</View>


    </View>
);
}

const styles=StyleSheet.create({
    headerContainer:{
        flex:0.1,
        padding:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:Colors.HeaderColor
    }
})
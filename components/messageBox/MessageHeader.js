import * as React from 'react'
import {View, Switch , Text,TouchableOpacity} from 'react-native'
import Colors from '../../utils/Colors'
import Ficon from 'react-native-vector-icons/FontAwesome'



export default ({Heading,users,closeModal})=>{
    const containerStyle={
        flex:users==-1 ? 0.1 : 1,
        backgroundColor:Colors.HeaderColor,
        flexDirection:'row',
        justifyContent: "space-between",
        alignItems:'center',
        padding:20
    }
        return(
            <View style={containerStyle}>
                <TouchableOpacity onPress={closeModal}>
                    <Ficon name='chevron-left' color="white" style={{fontSize:20}} />
                </TouchableOpacity>
                
                <Text style={{color:'white', fontSize:30}}>{Heading}</Text> 
                {users!=-1 ?  <View style ={{justifyContent:'center', alignItems:'center'}}>
                    <Ficon name='users' color='white' style={{fontSize:20}}/>
        <Text style={{color:'white', fontSize:15}}>{users}</Text>
                </View> : <View style={{width:20,flex:0.18}} /> }
              
            </View>
        );
}

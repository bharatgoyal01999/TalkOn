import * as React from 'react'
import {TextInput, Text, TouchableOpacity, View, Button , StyleSheet} from 'react-native' 
import Colors from "../../utils/Colors";
import Icon from 'react-native-vector-icons/AntDesign'

export default CreateRoom=({changeText,createRoom,val,closeModal})=>{

   return( 
       <View style={styles.MoadView}>
 <TouchableOpacity style={{flex:0.3,alignItems:'flex-start',justifyContent:"flex-start",marginBottom:20,width:30}} onPress={closeModal}>
<Icon name='closecircleo' color='white' style={{fontSize:25,flex:1}}/>
       </TouchableOpacity>
        <View style={{alignItems:'center'}}>
            <TextInput onChangeText={changeText} 
            value={val}
            style={styles.inputField} 
            placeholder='Enter Room Name' 
            placeholderTextColor="grey"
       
            />

            <TouchableOpacity style={styles.btn} onPress={createRoom}>
                <Text style={{color:"white", fontSize:20}}>Create Room</Text>
            </TouchableOpacity>
         
        </View></View>
   );
}
const styles=StyleSheet.create({
    MoadView:{
        margin:20,
       
      padding:10,
        backgroundColor:Colors.HeaderColor,
        borderRadius:10,
        flex:0.3,
        elevation:5,
        shadowColor:"grey"
        
    },
    inputField:{
        borderBottomColor:"white",
    borderBottomWidth:2,
    padding:4,

    alignItems:"stretch", 
    justifyContent:"flex-start",
    color:'white',fontSize:20
    },
    btn:{
        marginTop:20,
        borderRadius:10,
        backgroundColor:Colors.HeaderColor,
        color:Colors.HeaderColor,
        alignItems:"center",
        borderWidth:2,
        borderColor:"white"
    }
})
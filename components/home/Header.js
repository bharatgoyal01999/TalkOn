import  React,{useState} from 'react'
import {View , Text ,StyleSheet,TouchableOpacity,Dimensions, Button ,Modal} from 'react-native'
import Colors from '../../utils/Colors'
import Avtar from './Avatar'
import Constants from 'expo-constants'
import AIcon from "react-native-vector-icons/AntDesign"
import EIcon from "react-native-vector-icons/Entypo"
import {screenHeight,screenWidth} from '../../utils/Dimention'
import Auth from '../../screens/Auth/Auth'

const LogedinHeader=({navigation,username,showPin})=>{
    return (
        <>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
               
        <Avtar username={username}  /></TouchableOpacity>
        <Text style={styles.text}>TalkOn</Text>
        <TouchableOpacity onPress={showPin}>
        <AIcon name='pushpin' color='white' style={[styles.icon,{color:'white'}]}/>
        </TouchableOpacity></>
    );

}

const UnRegisterHeader=({showLoginPage})=>{
    return(
        <>
        <Text style={styles.text}>{'TalkOn'}</Text>
       <Button title={'Login/Signup'}
       onPress={showLoginPage}
       style={{fontSize:40}} 
       color='black'
       />
      
        </>
    );
}
export default class Header extends React.Component{
    state={
        showLoginPage:false,
    }

    render(){
        

     const {isUserLogin} =this.props

        return (
            <View style={styles.container} >
                <LogedinHeader navigation={this.props.navigation} username={this.props.username} showPin={this.props.showPin}/> 

              
               </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        padding:screenWidth*0.025,
        width:screenWidth,
        flex:0.1,
        flexDirection:'row',
        justifyContent:"space-between",
    marginBottom:Constants.statusBarHeight,
    
     
        alignItems:"center",
        borderColor:"#48C9B0",
        borderWidth:2
        
    },
    
    text:{
        color:"#FFFAFA",
        fontSize:screenHeight*0.05,
    },
    touch:{
        borderRadius:screenHeight*0.05,
        backgroundColor:"#162447"
    },
    icon:{
        fontSize:screenHeight*0.04
    }
    

})
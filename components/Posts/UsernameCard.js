import * as React from 'react'
import {View , Text, Image, TouchableOpacity ,Modal } from 'react-native'
import * as firebase from 'firebase'

import Avatar from '../home/Avatar'
export default class UsernameCard extends React.Component{
    state={
        username:'',
    showChatBox:false
    }
componentDidMount=()=>{
    const userref=firebase.database().ref('users/'+this.props.chatUserRef)
        userref.on('value', datasnap=>{
            if (datasnap.val()){
                this.setState({username:datasnap.val().username})
            }
        })
}

    render(){
        
    return(   
    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',borderBottomColor:'white',borderBottomWidth:1,paddingBottom:10}} onPress={()=>this.setState({showChatBox:true})}>
        <Avatar username={this.props.username}/>
         <Text style={{color:'white', fontSize:25}}>{this.props.username}</Text>
    </TouchableOpacity>
   
    )
    }


}
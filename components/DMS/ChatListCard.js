import * as React from 'react'
import {View , Text, Image, TouchableOpacity ,Modal } from 'react-native'
import * as firebase from 'firebase'
import ChatBox from './ChatBox'
import Avatar from '../home/Avatar'
export default class ChatCard extends React.Component{
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
        
    return(    <View>
    <TouchableOpacity style={{flex:1,flexDirection:'row',margin:6,padding:3,alignItems:'center' }} onPress={()=>this.setState({showChatBox:true})}>
        <Avatar username={this.state.username}/>
         <Text style={{color:'white', fontSize:20}}>{this.state.username}</Text>
    </TouchableOpacity>
    <Modal visible={this.state.showChatBox}> 
            <ChatBox chatUserRef={this.props.chatUserRef} closeChatBox={()=>this.setState({showChatBox:false})}></ChatBox>
            </Modal>
    </View>)
    }


}
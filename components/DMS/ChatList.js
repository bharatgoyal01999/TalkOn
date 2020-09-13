import * as React from 'react'
import { FlatList, View,Text, StyleSheet, Modal } from 'react-native'
import * as firebase from 'firebase'
import ChatCard from './ChatListCard'
import ChatBox from './ChatBox'
import CatHeader from '../CatScreen/CarScreenHeader'
import { screenWidth } from '../../utils/Dimention'

export default class ChatList extends React.Component{
    state={
        chats:[],
        showChatBox:false
    }

componentDidMount=()=>{
    
    const Current_user=firebase.auth().currentUser.email.split('@')[0]
    const chat_ref=firebase.database().ref('users/'+Current_user+"/chats")
    chat_ref.on('value', datasnap=>{
        if (datasnap.val())
     {   let chats=Object.keys( datasnap.val())
        this.setState({chats:chats})}
    })


}

    render(){

        console.log(this.state.showChatBox,"  ///")
        return (
            <View style={{flex:1, backgroundColor:'black'}}>
                <View style={{flex:0.15}}>
                <CatHeader heading={'Messages'} />
                </View>
                
      { this.state.chats.length>0 ? <FlatList
         data={this.state.chats}
         renderItem={({item})=>{
            
            return (
            
            
            <ChatCard chatUserRef={item} showChatBox={()=>{this.setState({showChatBox:true})}}  />
            
            )
         }}
         keyExtractor={(item)=>item}
         >

        </FlatList> :
            <Text style={{color:'white',fontSize:20,width:screenWidth*0.6}} numberOfLines={2} >
                You haven't started personal chat with anyone
            </Text>
        
  }
        </View>
        )

    }
}
import * as React from 'react'
import { View, Text, StyleSheet,FlatList, Modal, Button} from 'react-native'
import UnsendMessage from './UnsendMessage'
import TextCard from './TextCard'
import ImageCard from './ImageCard'
import * as firebase from 'firebase'
export default class MessageScreen extends React.Component{
    
state={
    haveSource:false,
    loding:true,
    source:'',
    isSource:{},
    NonUserModal:false,
    UserModal:false,
    ModalMessageIndex:0,
}

url=null
rennderList= ({item:{message,Type,messageIndex,userRef,userKey,dt}})=>{
    const {cat ,id} = this.props
    if (Type=='text')
              {  
                  return (
                    <TextCard username={userRef} message={message} mi={this.state.messageIndex} msgRef={'category/'+cat+"/"+id+"/ChatBox/Messages/"+messageIndex} 
            userRef={userRef}  closeModal={this.props.closeModal} DM={this.props.DM} date={dt}></TextCard>
                )}
                
else if(Type=='image'){


    console.log(this.state.source)
    return (
        <View>
        <ImageCard username={userKey} image={this.state.source} message={message} date={dt}/>
        
        </View>
    )
    





}
}


    render(){
        const messages=this.props.messages
     
     const showModal=this.state.UserModal || this.state.NonUserModal
     console.log(showModal)
        return(
            <>
            <FlatList
            ref={ref => this.flatList = ref}
   onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}

            data={this.props.messages}
            renderItem={
                this.rennderList
           }
            keyExtractor={(item)=>item.msgId}
            >
    
                
            </FlatList>

      
            </>
            
        )
       
    }
}
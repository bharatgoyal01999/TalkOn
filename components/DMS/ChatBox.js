import * as React from 'react'
import { View ,Text,StyleSheet ,TouchableHighlight,TouchableOpacity } from 'react-native'

import * as firebase from 'firebase'
import MessageHeader from '../messageBox/MessageHeader'
import SendBox from '../messageBox/sendBox/SendBox'
import MessageScreen from '../messageBox/MessageScreen/MessageScreen'
import ImageLoadingBox from '../messageBox/sendBox/imageLodingBox'

import ImagePicker from 'react-native-image-picker';
export default class ChatBox extends React.Component{

state={
text:'',
chatBoxUsers:{},
messages:[],
userKey:'',
haveImage:false,
upLoadingImage:false,
ImageSource:null,
number_of_users:0,
UserRef:null
}


componentDidMount=()=>{
    const {chatUserRef}=this.props
console.log(chatUserRef)
    const CurrentUserRef=firebase.auth().currentUser.email.split('@')[0]

    this.setState({UserRef:CurrentUserRef})
    const msgpth=firebase.database().ref('users/'+CurrentUserRef+"/chats/"+chatUserRef)
console.log(msgpth)
    msgpth.on('value',dataSnap=>{
        if (dataSnap.val()){
           
        this.setState({messages:dataSnap.val()})}
    })

    const path= firebase.database().ref('users/'+CurrentUserRef)
    path.on('value',dataSnap=>{
        if(dataSnap.val())
        {
            this.setState({userKey: dataSnap.val().username,})
        
}
    })



}


PickImage=()=>{

    const options = {
        maxWidth: 2000,
        maxHeight: 2000,
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };
      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
         
       
            this.setState({haveImage:true, ImageSource:response.uri})
        }
      });

}

uploadImage=async ()=>{

this.setState({upLoadingImage:true})

    const {cat,id}=this.props
    const  uri = this.state.ImageSource;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const respone = await fetch(uri)
    const blob=await respone.blob();
    const CurrentUserRef=firebase.auth().currentUser.email.split('@')[0]
    var storageRef = firebase.storage().ref()
    const curImage=storageRef.child('images/'+CurrentUserRef+'/'+filename)
    const userRef=storageRef.child('images/'+this.props.chatUserRef+'/'+filename)

    // Create file metadata including the content type
var metadata = {
contentType: 'image/jpeg',
};

// Upload the file and metadata
var uploadTask = curImage.put(blob, metadata).catch((err)=>{
console.log(err)
});
 var upload2Task = userRef.put(blob, metadata).catch((err)=>{
    console.log(err)
    });

const D=new Date();

 
 if (this.state.userKey!=''){ 
        const msdId=cat+id+D
        const date='date '+D
        const msgObject={
            msgId:msdId,
            dt:date,
        userKey:this.state.userKey ,
        Type: 'image',
        message:'images/'+CurrentUserRef+'/'+filename,

    }
  
    let {messages}=this.state
    messages.push(msgObject)
    const msgpth1=firebase.database().ref('users/'+this.state.UserRef+"/chats/"+this.props.chatUserRef)
    msgpth1.set(messages)
    const msgpth2=firebase.database().ref('users/'+this.props.chatUserRef+"/chats/"+this.state.UserRef)
    msgpth2.set(messages)

 this.setState({upLoadingImage:false,haveImage:false})
}
    else{
        console.log("Having Problem")
    }



}

sendMessage= ()=>{
    const {cat,id}=this.props
    const {chatUserRef}=this.props
    console.log(chatUserRef)
    const D=new Date();
    let {messages}=this.state
    let messageIndex=messages.length
console.log(this.state.UserRef)
 
 if (this.state.userKey!=''){ 
     const date='date '+D
       const msgId=messageIndex
        const msgObject={
            userRef:this.state.UserRef,
         msdId:msgId,
            dt:date,
            messageIndex:messageIndex,
        userKey:this.state.userKey ,
        Type: 'text',
        message: this.state.text,

    }

   
    messages.push(msgObject)
    const msgpth1=firebase.database().ref('users/'+this.state.UserRef+"/chats/"+chatUserRef)
    msgpth1.set(messages)
    const msgpth2=firebase.database().ref('users/'+chatUserRef+"/chats/"+this.state.UserRef)
    msgpth2.set(messages)

        this.setState({text:""})
 }
 



}
    render(){
        const {cat,id}=this.props
      
        return(
            <View style={styles.mainContainer}>
                <View style={styles.msghdr}>
                <MessageHeader Heading={'Messages'} users={2} closeModal={this.props.closeChatBox}/>
                </View>
                <View style={{flex:0.9}}>
                    <MessageScreen messages={this.state.messages} 
                     userRef={this.state.UserRef} closeModal={()=>this.props.navigation.goBack()  }
                     DM
                     />
                </View>
                <View style={{flex:0.1}}>
                 {!this.state.haveImage ?   <SendBox onTyping={text=>{this.setState({text})}} onSend={this.sendMessage} value={this.state.text} 
                    onPickingImage={this.PickImage}
                    />: <ImageLoadingBox image={this.state.ImageSource} isUploading={this.state.upLoadingImage}
                    cancelImageSending={()=>{this.setState({haveImage:false})}} uploadImage={this.uploadImage}
                    />}
                </View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    mainContainer:{
        backgroundColor:'#1E2121',
        flex:1,
    },
    msghdr:{
        flex:0.1,

    }
})
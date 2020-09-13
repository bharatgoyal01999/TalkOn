import * as React from 'react'
import { View ,Text,StyleSheet ,TouchableHighlight,TouchableOpacity } from 'react-native'
import { Send } from 'react-native-gifted-chat'
import * as firebase from 'firebase'
import MessageHeader from './MessageHeader'
import SendBox from './sendBox/SendBox'
import MessageScreen from './MessageScreen/MessageScreen'
import ImageLoadingBox from './sendBox/imageLodingBox'

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
    const {cat,id}=this.props
    const msgpth=firebase.database().ref('/category/'+cat+"/"+id+"/ChatBox/Messages")
    const chatBoxUsers_path=firebase.database().ref('/category/'+cat+"/"+id+"/ChatBox/Users")
    msgpth.on('value',dataSnap=>{
        if (dataSnap.val()){
        this.setState({messages:dataSnap.val()})}
    })
    const ref=firebase.auth().currentUser.email.split('@')[0]
    this.setState({UserRef:ref})
    const path= firebase.database().ref('users/'+ref)
    path.on('value',dataSnap=>{
        if(dataSnap.val())
        {
            this.setState({userKey: dataSnap.val().username,})
        
}
    })
chatBoxUsers_path.on('value',dataSnap=>{
    if (dataSnap.val()){
        this.setState({chatBoxUsers:dataSnap.val(),number_of_users:Object.keys(dataSnap.val()).length})

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
    var storageRef = firebase.storage().ref()
    const finalref=storageRef.child('images/'+cat+'/'+id+'/'+filename)
    // Create file metadata including the content type
var metadata = {
contentType: 'image/jpeg',
};

// Upload the file and metadata
var uploadTask = finalref.put(blob, metadata).then(snapshot=>{
    console.log(snapshot.bytesTransferred)
    console.log(snapshot.totalBytes)
}).catch((err)=>{
console.log(err)
});

// uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
//     var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
//     console.log(percent + "% done");
//   });

const D=new Date();

let {messages}=this.state
let messageIndex=messages.length
 if (this.state.userKey!=''){ 
     const date='date '+D
        const msdId=cat+id+D
        const msgObject={
            msgId:msdId,
            messageIndex:messageIndex,
            dt:date,
        userKey:this.state.userKey ,
        Type: 'image',
        message:'images/'+cat+'/'+id+'/'+filename,

    }
  
  
    messages.push(msgObject)
    const msgpth=firebase.database().ref('/category/'+cat+"/"+id+"/ChatBox/Messages")
    msgpth.set(messages)

 this.setState({upLoadingImage:false,haveImage:false})
}
    else{
        console.log("Having Problem")
    }



}

sendMessage= ()=>{
    if(this.state.text!='')
  {  const {cat,id}=this.props
 
    const D=new Date();
    let {messages,chatBoxUsers}=this.state
    let messageIndex=messages.length


 
 if (this.state.userKey!=''){ 
        const msdId=cat+id+D
        const date="date "+D
        const msgObject={
            msgId:msdId,
            userRef:this.state.UserRef,
            
            dt:date,
            report:0,
            messageIndex:messageIndex,
        userKey:this.state.userKey ,
        Type: 'text',
        message: this.state.text,

    }

   
    messages.push(msgObject)
    const msgpth=firebase.database().ref('/category/'+cat+"/"+id+"/ChatBox/Messages")
    msgpth.set(messages)

    if (this.state.UserRef in chatBoxUsers){
        chatBoxUsers[this.state.UserRef]=chatBoxUsers[this.state.UserRef]+1
    }
    else{
        chatBoxUsers[this.state.UserRef]=1
    }
        
   
        const chatBoxUsers_path=firebase.database().ref('/category/'+cat+"/"+id+"/ChatBox/Users")
     
        chatBoxUsers_path.set(chatBoxUsers)
        this.setState({text:""})
 }
 }



}
    render(){
        const {cat,id}=this.props
 
        return(
            <View style={styles.mainContainer}>
                <View style={styles.msghdr}>
                <MessageHeader Heading={'Messages'} users={this.state.number_of_users} closeModal={this.props.closeModal}/>
                </View>
                <View style={{flex:0.8}}>
                    <MessageScreen messages={this.state.messages} cat={cat} id={id} userRef={this.state.UserRef}  closeModal={this.props.closeModal} DM={false} />
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
        backgroundColor:'#232b2b',
        flex:1,
    },
    msghdr:{
        flex:0.1,

    }
})
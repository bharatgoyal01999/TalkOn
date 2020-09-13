import * as React from 'react'
import {View, Text, StyleSheet,Image,FlatList, TouchableOpacity,ImageBackground , ScrollView, Modal,TextInput} from 'react-native'
import UsernameCard from './UsernameCard'
import PostCard from './PostCard'
import Constants from 'expo-constants'
import PostFeatureBox from './PostFeaturesBox'
import Micon from 'react-native-vector-icons/MaterialIcons'
import Ficon from 'react-native-vector-icons/FontAwesome'
import { screenHeight,screenWidth } from '../../utils/Dimention'
import PreView from './PreView'
import * as firebase from 'firebase'
import ImagePicker from 'react-native-image-picker';
import Colors from '../../utils/Colors'

export default class Post extends React.Component{
state={
    loding:false,
    ImageSource:null,
    haveImage:false,
    caption:null,
    posts:[],
    upLoadingPost:false,
    upLodingRatio:0,
    PostIds:[],
    UserPostIds:[],

}
componentDidMount=()=>{
  
  console.log("HI There")

  const UserRef=firebase.auth().currentUser.email.split('@')[0]
  const {cat,id}=this.props
  const Cat_Path=firebase.database().ref('category/'+cat+"/"+id+"/"+'Posts')
  const User_Path=firebase.database().ref('users/'+UserRef+"/Posts")
  User_Path.on('value',datasnap=>{
    if(datasnap.val()){
    
      this.setState({UserPostIds:datasnap.val()})
    }
  })
  let PostIds=[]
  Cat_Path.on('value',datasnap=>{
 
    if(datasnap.val()){
   PostIds=datasnap.val()
      this.setState({PostIds:datasnap.val()})
    }
  })
 
// setTimeout(()=>{
//   let posts=[]
//   PostIds.forEach( (postID)=>{
  
//     console.log("PostIds", postID)
//     let post_ref= firebase.database().ref('Posts/'+postID)
//     post_ref.on('value',datasnap=>{
   
//       if(datasnap.val()){
       
//         posts.push(datasnap.val())
//       }
//     })
 
//    })
//    setTimeout(()=>{
//     console.log("posts",posts)
//     this.setState({posts:posts})
//    },2000)

// },2000)


}

uplodeNewPost=async()=>{
 

  this.setState({upLoadingPost:true,haveImage:false})
     const {cat,id}=this.props
     const  uri = this.state.ImageSource;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const UserRef=firebase.auth().currentUser.email.split('@')[0]
      const respone = await fetch(uri)
      const D=new Date();
        const blob=await respone.blob();
        var storageRef = firebase.storage().ref()
        const finalref=storageRef.child('Posts/'+cat+'/'+id+'/'+UserRef+'/'+filename)
        // Create file metadata including the content type
    var metadata = {
    contentType: 'image/jpeg',
    };
    
    var uploadTask = finalref.put(blob, metadata).then(snapshot=>{
        let upLodingRatio=snapshot.bytesTransferred/snapshot.totalBytes
          console.log(upLodingRatio)
        this.setState({upLodingRatio})

    }).catch((err)=>{
    console.log(err)
    });
    
  
    
  
    // let {posts}=this.state
    // let postIndex=posts.length
    
      const date='date '+D
            // const postId=cat+" "+id+" "+" "+D+" "+UserRef
   
      const path=firebase.database().ref().child('Posts')
        let new_path=path.push()
        let postObject={
          postId:new_path.key,
          likes:{},
          caption:this.state.caption,
          userRef:UserRef,
          comments:{},
          dt:date,
          Type: 'image',
          message:'Posts/'+cat+'/'+id+'/'+UserRef+'/'+filename,
  
      }
   
       new_path.set(postObject)

       const cat_posts_id=this.state.PostIds
      cat_posts_id.push(new_path.key)
      const Cat_Path=firebase.database().ref('category/'+cat+"/"+id+"/"+'Posts')
      Cat_Path.set(cat_posts_id)

      const user_posts_id=this.state.UserPostIds
      user_posts_id.push(new_path.key)
     

      const User_Path=firebase.database().ref('users/'+UserRef+"/Posts")
      User_Path.set(user_posts_id)
   
   console.log("uploading Ratio",this.state.upLodingRatio)
 
      this.setState({upLoadingPost:false})
    
    
    
    
}
pickVideoForPost=()=>{
  const options2 = {
    title: 'Select video',
     mediaType: 'video',
    path:'video',
    quality: 1
  };

ImagePicker.showImagePicker(options2, (response) => {
console.log('Response = ', response);

if (response.didCancel) {
  console.log('User cancelled image picker');
} else if (response.error) {
  console.log('ImagePicker Error: ', response.error);
} else if (response.customButton) {
  console.log('User tapped custom button: ', response.customButton);
} else {
  const source = { uri: response.uri };


  this.setState({haveImage:true,ImageSource:response.uri})


}
});



}
pickImageForPost=()=>{


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
   
    console.log(response.uri)
      this.setState({haveImage:true, ImageSource:response.uri})
  }
});
}
render(){
const posts=this.state.PostIds
 let width=screenWidth*this.state.upLodingRatio
  return(
    < View  style={{flex:1,backgroundColor:'black'}}>
    <View style={styles.header}>
<Text style={{color:'white',fontSize:30}}>{'Posts'}</Text>
<View style={{flexDirection:'row'}}>
{/* <TouchableOpacity onPress={this.pickVideoForPost}>
<Ficon name='video-camera' color='white' size={30} />
    </TouchableOpacity> */}
    <TouchableOpacity onPress={this.pickImageForPost} style={{marginLeft:30}}>
<Micon name='add-a-photo' color='white' size={30} />
    </TouchableOpacity></View>
 
    
           </View>
           
        {this.state.upLoadingPost && <View style={{borderWidth:1,borderColor:'white' ,flex:0.02,alignItems:"flex-start",marginTop:10}}>
         <View style={{width:width,backgroundColor:Colors.HeaderColor,flex:1}}></View>
         </View>}
           <View style={{flex:0.9}}>
  
           <FlatList
           initialNumToRender={1}
        data={posts}
        renderItem={({item})=>{
                return ( <><PostCard postid={item} /></>);
        }}
        keyExtractor={(item)=>item}
        >
          
        </FlatList>
  </View>
  <Modal visible ={this.state.haveImage}>
<PreView image={{uri:this.state.ImageSource}} isUploding={false} uplodePost={this.uplodeNewPost}
cancelUploding={()=>{this.setState({haveImage:false,ImageSource:null})}} onChangeText={(text)=>{this.setState({caption:text})}}
></PreView>

  </Modal>
           </ View>
  );
}

}
const styles=StyleSheet.create({
  
 header:{
  padding:8,
  width:screenWidth,
  flex:0.1,
  flexDirection:'row',
  justifyContent:"space-between",
marginBottom:Constants.statusBarHeight,


  alignItems:"center",
  borderColor:"#48C9B0",
  borderWidth:2
 }
})
      

    
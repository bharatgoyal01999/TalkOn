import * as React from 'react'
import {View, Text, StyleSheet,Image, ImageBackground } from 'react-native'
import UsernameCard from './UsernameCard'
import PostCard from './PostCard'
import Constants from 'expo-constants'
import PostFeatureBox from './PostFeaturesBox'
import * as firebase from 'firebase'
import { screenHeight,screenWidth } from '../../utils/Dimention'
export default class Post extends React.Component{
state={
    loding:false,
    imageSource:null,
    username:'us',
    likes:{},
    isLiked:false,
    comments:{},
    caption:'',
    date:null,
    showLike:false,
    showComments:false
}

componentDidMount=()=>{
    
    const postid=this.props.postid
    const Post=firebase.database().ref('Posts/'+postid)
    const CurrUserRef=firebase.auth().currentUser.email.split('@')[0]
    Post.on('value',dataSnap=>{

        if(dataSnap.val()){

            const post_data=dataSnap.val()
            const time=post_data.dt
            let likes={}
            let comments={}
            if(post_data.likes){
               likes=post_data.likes
              const isLiked=likes[CurrUserRef]
               this.setState({isLiked})

            }
            if(post_data.comments){
                likes=post_data.comments
             }
             let caption=''
             if(post_data.caption){
                 caption=post_data.caption
             }
             let imageUrl='';
           
            firebase.storage().ref(post_data.message).getDownloadURL().
                then((url)=>{
                    imageUrl=url
                    this.setState({imageSource:url})
                }).catch((err)=>{
      
                    console.log(err)
                      })
          

                const userRef=post_data.userRef
                let username
                firebase.database().ref('users/'+userRef).on('value',dataSnap=>{
                    if(dataSnap.val()){
                        username=dataSnap.val().username
                        this.setState({username:dataSnap.val().username})
                    }
                })

                this.setState(
                    {likes:likes,
                     comments:comments,
                     caption:caption,
                     date:time,})
      
          
           
            
            

        }
    })
}

togleLike=()=>{
    const postid=this.props.postid
    const Post_like=firebase.database().ref('Posts/'+postid+'/likes')
    let likes=this.state.likes  
   const userRef=firebase.auth().currentUser.email.split("@")[0]
  
         if (userRef in likes){
             let isLiked=likes[userRef]
             likes[userRef] = !likes[userRef]
             this.setState({isLiked:!isLiked})
         }
         else{
             likes[userRef]=true
             this.setState({isLiked:true})
         }

   Post_like.set(likes)
  
}

render(){
   
  return(
     
    <View style={{justifyContent:'space-between',marginVertical:20,}}>
    <View>
    <UsernameCard username={this.state.username}/>
    </View>
    {/* <ImageBackground source={{uri:this.props.image}} style={{width:screenWidth,aspectRatio:1}} > */}
   

      <Image source={{uri:this.state.imageSource}} style={styles.imageCard} />
     

      <View>


<PostFeatureBox likes={this.state.likes} comments={this.state.comments} caption={this.state.caption}
showLikes={this.state.showLike} showComments={this.state.showComments}
handleComments={()=>{}} showLike={()=>this.setState({showLike:true})}
closeLike={()=>this.setState({showLike:false})}
togleLike={this.togleLike}

isLiked={this.state.isLiked}
 />

</View>
      </View>
  );
}

}
const styles=StyleSheet.create({
  
    imageCard:{
        flex:1,
        width:screenWidth,
        aspectRatio:1,
        resizeMode:"contain",
       backgroundColor:'black',
      
      

    }
})
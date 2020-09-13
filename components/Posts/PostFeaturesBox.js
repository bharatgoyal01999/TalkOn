import * as React from 'react'
import { View, TouchableOpacity,Text,Modal,FlatList,TouchableWithoutFeedback} from 'react-native'
import FFicon from 'react-native-vector-icons/Fontisto'
import Ficon from 'react-native-vector-icons/FontAwesome'
import * as firebase from 'firebase'
import Aicon from 'react-native-vector-icons/MaterialCommunityIcons'
import {screenWidth} from '../../utils/Dimention'
import { ScrollView } from 'react-native-gesture-handler'
import UsernameCard from './UsernameCard'

const LikeCard=({userref})=>{
let [username,setusername]=React.useState('')
firebase.database().ref('users/'+userref).once('value').then(datasnap=>{
    if (datasnap.val()){
        setusername(datasnap.val().username)
    }
})

    return (
        <View style={{margin:10}}>
            <Text style={{fontSize:20,color:'white'}}>{username}</Text>
        </View>
    )
}
function NoOFLikes(likes){
    let like_count=0
    const like_arr=Object.keys(likes)
    like_arr.forEach((item)=>{
        if(likes[item]){
            like_count++;
        }
    })
    return like_count
} 

export default (props)=>{
    const liked_by_User=Object.keys(props.likes)
    const likesColor=props.isLiked ? '#CD3A3A' : 'white'
    const likeIcon=props.isLiked ? 'heart' : 'heart-o'
    const like_count=NoOFLikes(props.likes)
  
  const comments=props.comments.length ? props.comments.length : 0

    return(
        <View style={{marginTop:10 , borderTopColor:'white', borderTopWidth:1, paddingTop:10}}>
            <View style={{flexDirection:'row',justifyContent:'flex-start', alignItems:'center',}}>
                <View>
           <TouchableWithoutFeedback onPress={props.togleLike} >
                <Ficon name={likeIcon} size={32} color={likesColor} style={{marginLeft:10}}/>
                </TouchableWithoutFeedback><TouchableOpacity onPress={props.showLike}>
                <Text style={{color:'grey'}}>{like_count}</Text>
            </TouchableOpacity></View>
           <TouchableOpacity onPress={()=>{console.log("Hi There")}}>  
           <FFicon name='comment' size={30} color='white' style={{marginLeft:20}} />
    <Text style={{color:'grey'}}>{comments}</Text>
           </TouchableOpacity></View>

    <Text  style={{color:'grey'}}>{props.caption}</Text>

<Modal visible={props.showLikes} transparent={true}>
<View style={{flex:1,alignItems:'center',justifyContent:'center'}}
>
<View style={{backgroundColor:'black',width:screenWidth*0.75,borderRadius:10,minHeight:40}}>
    <View style={{flexDirection:'row',
     justifyContent:'space-between',
      alignItems:'flex-end', 
      borderBottomColor:'white',
      borderBottomWidth:1,
      padding:5


}}>
        <Text style={{fontSize:30,color:'white'}}>likes</Text>
        <TouchableOpacity onPress={props.closeLike} >
             <Aicon name='cancel' size={25} color='white' />
            </TouchableOpacity></View>
            <View style={{minHeight:40}}>

           <FlatList 
                data={liked_by_User}
                renderItem={({item})=>{
                    if(props.likes[item]){
                    return (<LikeCard userref={item} />)}
                }}
keyExtractor={(item)=>item}
           />
            </View>
      

</View>

</View>

</Modal>
<Modal visible={props.showComments}></Modal>
        </View>
    );
}
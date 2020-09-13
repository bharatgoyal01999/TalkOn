import React from 'react'
import {Image, Text , View , Alert ,TouchableOpacity,StyleSheet, Dimensions, ScrollView, ActivityIndicator,Modal, PermissionsAndroid} from 'react-native'
import * as firebase from 'firebase'
import Floatingbutton from './Floatingbutton'
import { MSdata } from '../search/FetchMS'
import Colors from '../../utils/Colors'
import ChatBox from '../messageBox/ChatBox'
import DetailHeader from './DetailHeader'
import PostButton from './FloatingPost'
const ScreenWidth=Math.round(Dimensions.get('window').width)
const ScreenHeight=Math.round(Dimensions.get('window').height)
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import Posts from '../Posts/Posts'
import { BannerAd, BannerAdSize, TestIds,InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import { screenWidth } from '../../utils/Dimention'

export default class Detail extends React.Component{
   
state={ 
    data:{},
    loding:true,
    id:"",
    showPosts:false,
    VisibleChat:false,
    pinvalue:false,
    pinUsers:[],
    pinLoading:false,
    pinItems:[],
    pinUserIndex:0,
    pinIndex:0,
    isLogin:false,
             }



    componentDidMount=async ()=>{
     
      
 
      
        const {id,cat}=this.props.route.params
    try{
       await firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            this.setState({isLogin:true})
        }
       })


        const ref='category/'+cat+'/'+id+'/Details'
      
        const my_ref=await firebase.database().ref(ref)
        my_ref.on('value',dataSnap=>{
            if (dataSnap.val()){
            this.setState({loding:false,data:dataSnap.val()})}
        })
    }
    catch(error){
console.log(error)
    }
     
 
        try{
        
            const ref='category/'+cat+'/'+id+'/PinBox'
            const my_ref=await firebase.database().ref(ref)
            my_ref.on('value',dataSnap=>{
                if (dataSnap.val()){
                        this.setState({pinUsers:dataSnap.val()})
                }
            })
        }
        catch(error){
    console.log(error)
        }


try{
const {pinUsers,pinvalue}=this.state
let User
if(this.state.isLogin){

 User=firebase.auth().currentUser.email.split('@')[0] 
}
const isPin=pinUsers.filter((user,index)=>{
    return user['user']==User
})
console.log(isPin)
pinUsers.forEach((user,index)=>{

    if (user['user']==User){
        this.setState({pinvalue:true,pinUserIndex:index})
        
    }
    else{
        this.setState({pinvalue:false})
    }
})
}



catch(error){
    console.log(error)
}



       
    
 }

tooglePin=()=>{
if(this.state.isLogin)
{
   try{ 
    const {id,cat}=this.props.route.params
   const {pinUsers,pinvalue}=this.state

   const User=firebase.auth().currentUser.email.split('@')[0]
   const Pin_box_ref=firebase.database().ref('category/'+cat+'/'+id+'/PinBox')
   
   const user_ref=firebase.database().ref('users/'+User)

   if (!pinvalue){
    let UserInfo;

    user_ref.on('value',dataSnap=>{
        UserInfo=dataSnap.val()
    
    
    })
    this.setState({pinLoading:true})
    setTimeout(()=>{ 
        if (UserInfo.PinItems){
        const pinIndex=Object.keys(UserInfo.PinItems).length
    

 this.setState({pinIndex:pinIndex})
        UserInfo.PinItems.push({
            id:id,
            cat:cat

        })
    }
    else{
        UserInfo.PinItems=[
         {
             id:id,
             cat:cat

         }
        ]
    }
    user_ref.set(UserInfo)
 
    pinUsers.push({'user':User, 'index':this.state.pinIndex})
    Pin_box_ref.set(pinUsers)
 
    this.setState({pinLoading:false,pinvalue:true})
   
     
   },2000)

   

    
   }
   else{

const Pin_box_ref=firebase.database().ref('category/'+cat+'/'+id+'/PinBox/'+this.state.pinUserIndex)
let pinIndex
Pin_box_ref.on('value',data=>{if(data.val())pinIndex=data.val().index})
setTimeout(()=>{},1000)


Pin_box_ref.remove()
const User_Pin_item_ref=firebase.database().ref('users/'+User+'/PinItems/'+pinIndex)
User_Pin_item_ref.remove()
        this.setState({pinvalue:false})
      
}

}catch(err){
       console.log(err)
   }

   
 }
 else{
     Alert.alert(
        'Message', 
        'You Need To Login/SignUp first',
        [{
            text:"Ok",
            
        }],
        {cancelable:true}
     )
 }
}
HandleChat=()=>{
   
    if(this.state.isLogin){
        this.setState({VisibleChat:true})
    }
    else{
       
        Alert.alert(
        'Message', 
        'You Need To Login/SignUp first',
        [{
            text:"Ok",
            
        }],
        {cancelable:true}
    )
    }
}
 
    render(){
        console.log(ScreenHeight)
        const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-4275182898502525/5035755636';
      const {navigation}= this.props
      const discription=this.state.data.Plot
      let dis
      if (discription){
         dis= discription.replace(/<p>/g,"")
         dis= dis.replace(/p>/g,"")
         dis= dis.replace(/</g,"")
        
       

          console.log(dis)
      }
      
      const {id,cat}=this.props.route.params
        return(

            this.state.loding ? (
            <ActivityIndicator animating={this.state.loding} size={'large'} color={Colors.HeaderColor} />)
            :( <View style={styles.mainConatainer}> 

               <DetailHeader goback={navigation.goBack} heading={this.state.data.Title} pinValue={this.state.pinvalue}
                      changePinStatus={this.tooglePin} pinLoading={this.state.pinLoading}
               />
             
              <Image source={{uri:this.state.data.Poster}} style={styles.image}/>

               <View style={styles.about}>
                <ScrollView style={styles.discription}>
                    <View style={{flex:0.3}}>
                    <Text style={styles.text}>
                          {"Title: "+this.state.data.Title+"  ("+this.state.data.Year+")"}
                          </Text>
                        <Text style={styles.text}>
                          {"Ratings: "+this.state.data.imdbRating}
                          </Text>
                    </View>
                    <View>
                        {
                            this.state.data.Type=='book' ? <View><Text style={styles.text}>{'Authors:'+this.state.data.Author}</Text> 
                            <Text style={styles.text}>{'Publisher:'+ this.state.data.Publisher }</Text>
                            </View>:
                        <View><Text style={styles.text}>{'Actors:'+this.state.data.Actors}</Text>
                         <Text style={styles.text}>{'Director:'+ this.state.data.Director }</Text>
                        </View>
                        }
                    </View>
                    <View>
                    <Text style={styles.btext}>
                           Discription</Text>
                        <Text style={styles.text}>
                       {dis}
                             </Text>
                    </View>
               
                </ScrollView>
                <View style={{flex:0.2}}>
                <BannerAd
      unitId={'ca-app-pub-4275182898502525/8270818280'}
      size={BannerAdSize.FULL_BANNER}
    /></View>
              <PostButton onPress={()=>this.setState({showPosts:true})} />
              <Floatingbutton onPress={this.HandleChat} />
               </View>
               <Modal visible={this.state.VisibleChat}>
                   <ChatBox closeModal={()=>{this.setState({VisibleChat:false})}} cat={cat} id={id}/>
               </Modal>

<Modal visible={this.state.showPosts}>
<Posts id={id} cat={cat}/>
</Modal>


              </View>)
            
        );
    }
}
const styles=StyleSheet.create({
    mainConatainer:{
        flex:1,
        backgroundColor:"black",
        
        

    },
    image:{
       
        flex:0.4,
        width:ScreenWidth,
        resizeMode:"contain",
        borderWidth:2,
        borderColor:'white',
        
    },
    about:{
        flex:0.6,
        backgroundColor:"black",


},
btext:{
    color:"white",
    fontSize:30,
},
text:{
    color:'white',
    fontSize:20,
    // backgroundColor:"black",

},
discription:{
    flex:1
},


})
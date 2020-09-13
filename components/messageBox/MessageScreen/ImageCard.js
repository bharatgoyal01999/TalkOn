import * as React from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {screenWidth,screenHeight} from '../../../utils/Dimention'
import * as firebase from 'firebase'
import Colors from '../../../utils/Colors'
export default class MessangeCard extends React.Component{
  state={
    isUser:false,
    username:"",
    currentUserName:'',
    userModal:false,
    nonUserModal:false,
    imageSource:null
}
componentDidMount=()=>{
  const {username,message}=this.props;
  const ref = firebase.auth().currentUser.email.split('@')[0]
  const currref=firebase.database().ref('users/'+ref)
  currref.on('value',dataSnap=>{
      if(dataSnap.val())
      { let user=dataSnap.val().username
         
           
 this.setState({currentUserName:user})
        
}
  })

// const path= firebase.database().ref('users/'+username)
// console.log(path)
//   path.on('value',dataSnap=>{
//       if(dataSnap.val())
//       { let user=dataSnap.val().username
//          console.log(user,"....")
           
//  this.setState({username:user})
        
// }
//   })


if(this.state.currentUserName===this.state.username){
  console.log('Sender Viewer are same')
  this.setState({isUser:true})
}


const storageRef=firebase.storage().ref()
 setTimeout(()=>{
  const url=storageRef.child(this.props.message).getDownloadURL()
  .then((url)=>{
    
    this.setState({imageSource:url})

    
     
  
  }).catch((err)=>{
  
console.log(err)
  })
 },1500)



}
  render(){

    const {image, username}=this.props
  


    const ContainerStyle= this.state.currentUserName===this.props.username ? styles.Usercontainer : styles.container
    let d=this.props.date
    d=d.split(' ')
   
    return (

          
          <TouchableOpacity style={ContainerStyle} >
            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}} >
    <Text style={{color:'white',fontSize:20,marginRight:5}}>{this.props.username}</Text>
    <Text style={{color:'white', opacity:0.7}}>{'('+d[2]+d[3]+" "+d[5]+')'}</Text>
  </View>  
        { this.state.imageSource && <Image source={{uri:this.state.imageSource}} style={styles.image} />}
          
          </TouchableOpacity>
          

    );
}}

const styles = StyleSheet.create({
  container:{
    maxWidth:screenWidth*0.55,
    flex: 1,
    borderRadius:10,
    backgroundColor: 'black',
    justifyContent:"center",
    alignItems:"center",
    padding:5,
  marginVertical:20
  
  },
    Usercontainer: {
      paddingRight:5,
      borderRadius:10,
      maxWidth:screenWidth*0.55,
    flex: 1,
    left:screenWidth*0.45,
    backgroundColor: Colors.HeaderColor,
    justifyContent:"center",
    alignItems:"center",
    
padding:5,
  marginVertical:20
    },
  
  
    image:{
      flex:1,
      width:screenWidth*0.5,
      aspectRatio:1,
      resizeMode:"contain",
     
      
     
      
  },
    text:{
        color:"white",
        fontSize:40,
    }
  })
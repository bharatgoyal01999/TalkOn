import * as React from 'react'
import * as firebase from 'firebase'
import { View ,Text ,StyleSheet, TouchableOpacity,Modal, Button} from 'react-native'
import Colors from '../../../utils/Colors'
import {screenWidth} from '../../../utils/Dimention'
import UnsendMessage from './UnsendMessage'
import ModalForOther from './OtherUserModal'
import { colors } from 'react-native-elements'
export default class TextCard extends React.Component{
  
    constructor (props){
        super(props);
        this.state={
            isUser:false,
            username:"",
            currentUserName:'',
            userModal:false,
            nonUserModal:false
        }
        let date=this.props.date
        

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

    const path= firebase.database().ref('users/'+username)
  
    path.on('value',dataSnap=>{
        if(dataSnap.val())
        { let user=dataSnap.val().username
           
             
   this.setState({username:user})
          
}
    })
 

if(username===this.state.username){
    this.setState({isUser:true})
}

}


StartPersonalChat=()=>{
    const primaryUser=firebase.auth().currentUser.email.split('@')[0]
    const secondaryUser=this.props.userRef
    const primaryUserRef=firebase.database().ref('users/'+primaryUser)
    const secondaryUserRef=firebase.database().ref('users/'+secondaryUser)
  
    const D=new Date()
    const date='date '+D
    const msgObj={
        message:'Lets, Talk here',
        Type:'text',
        dt:date,
        userRef:primaryUser,
        
    }

   primaryUserRef.child('chats/'+secondaryUser).set([msgObj])
   secondaryUserRef.child('chats/'+primaryUser).set([msgObj])

this.props.closeModal()
}

Report=()=>{
    
}

Unsend=()=>{
    
    const {msgRef}=this.props

const msg_ref=firebase.database().ref(msgRef)

msg_ref.remove()
this.setState({UserModal:false,showModal:false})}


   render(){
    let d=this.props.date
    d=d.split(' ')
   
    
  
    const {username,message}=this.props;
 
    const ContainerStyle= this.state.currentUserName===this.state.username ? styles.isUser : styles.msgContainer
    const openModal=  this.state.currentUserName===this.state.username ? ()=>{this.setState({userModal:true,showModal:true})}: ()=>this.setState({nonUserModal:true,showModal:true})
    const showModal=(this.state.userModal || this.state.nonUserModal)
    return (
<>
        <TouchableOpacity  style={ContainerStyle} onLongPress={openModal}>
      
   
        <View>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            <Text style={styles.usernameText}>
            {this.state.username}
            </Text>
            <Text  style={{opacity:0.8,color:'white'}}>
                {"("+ d[2]+" "+d[3]+")"}
            </Text>
            </View>
      
        </View>
 
           
        <Text style={{fontSize:20,color:"white"}}>
        {message}
            </Text>
           
            <Text  style={{opacity:0.8,color:'white',position:'absolute',right:0,bottom:0}}>
                {"("+ d[5]+")"}
            </Text>
           
      
          
        
        </TouchableOpacity>
        {!this.props.DM &&
        <Modal visible={ showModal } transparent={true}  >
            { this.state.userModal ? <View style={{flex:1,justifyContent:'center', alignItems:"center"}}>
                <UnsendMessage unsend={this.Unsend} closeModal={()=>{this.setState({nonUserModal:false,userModal:false})}} mi={this.props.mi}/>
            </View> 
            :<View style={{flex:1,justifyContent:'center', alignItems:"center"}}>
   <ModalForOther startPersonalChat={this.StartPersonalChat} closeModal={()=>{
     
       this.setState({userModal:false,nonUserModal:false})
  
    }} 
   Report={()=>{console.log('Report')}}
   /></View>}
        </Modal> }
        </>
        
    );}
}

const styles=StyleSheet.create({
    isUser:{
        paddingHorizontal:5,
        paddingVertical:2,
        backgroundColor:Colors.HeaderColor,
        borderRadius:10,
        marginVertical:20,
        left:screenWidth*0.45,
        right:0,
       
        elevation:5,
        maxWidth:screenWidth*(0.5)
    },
    msgContainer:{
      padding:5,
        backgroundColor:"black",
        borderRadius:10,
        marginVertical:20,
       
        elevation:5,
        maxWidth:200
    },
    usernameText:{
        flex:1,
        fontSize:20,
        color:'white',

        
    }
})
import * as React from 'react'
import {TextInput, View, Text, TouchableOpacity,Button, StyleSheet, Alert, Modal} from 'react-native'
import * as firebase from 'firebase'
import Colors from '../../utils/Colors'
import Aicon from 'react-native-vector-icons/AntDesign'
import {InterstitialAd,TestIds} from '@react-native-firebase/admob'
import {BannerAdSize,BannerAd } from '@react-native-firebase/admob'

export default class Profile extends React.Component{
    state={
        userEmail:null,
        isVerified:false,
        user:{},
        username:null,
        PasswordModal:false,
        
    }

componentDidMount=async ()=>{
    const user=await firebase.auth().currentUser 
    let user_ref
    if (user){
        console.log(user.email)
        user_ref=user.email.split('@')[0]
        const user_path=firebase.database().ref('users/'+user_ref)
        user_path.once('value').then((dataSnap)=>{this.setState({username:dataSnap.val().username})})
        this.setState({userEmail:user.email,user:user})
        if (user.emailVerified){
            this.setState({isVerified:true})
        }
    }

}
render(){
  
    let user=this.state.user

    return(
        <View style={styles.profileContainer}> 
     
     <View style={styles.textContainer}>
                <Text style={styles.headingText} >
                    {'Username: '}
                </Text>
                <Text style={styles.textStyle}>
                  {this.state.username}
                </Text></View>
            <View style={styles.textContainer}>
                <Text style={styles.headingText} >
                    {'Email: '}
                </Text>
                <Text style={styles.textStyle}>
                  {this.state.userEmail}
                </Text>
                {
                    this.state.isVerified ? <Aicon name='check' color={Colors.HeaderColor} size={20} style={{marginLeft:20}}/>:
                        <Button title='Verify' color='black' onPress={()=>{
                            var user = firebase.auth().currentUser;

            user.sendEmailVerification().then(()=> {
                    Alert.alert('Message', 'Veification Email Sent',  [{
                        text:"Ok",
                        
                    }],
                    {cancelable:true})
                    firebase.auth().signOut()
            }
            
            
            ).catch((error) => {
  console.log(error)
            });
                        }} />
                }
            </View>

     <TouchableOpacity style={styles.textContainer} onPress={()=>{firebase.auth().sendPasswordResetEmail(this.state.userEmail).then(function() {
  Alert.alert("Message","Password Reset email has been sent",[{
    text:"Ok",
    
}],
{cancelable:true})
}).catch(function(error) {
  // An error happened.
});}} >
                <Text style={styles.headingText} >
                    {'Change Password'}
                </Text>
              </TouchableOpacity>
              <Modal transparent={true} visible={this.state.PasswordModal}>
                    <View style={{flex:1,alignItems:"center",justifyContent:'center'}}>
                        <View style={{backgroundColor:'black'}}>
                            <TextInput onChangeText={text=>(this.setState({Email:text}))}></TextInput>
                        </View>

                    </View>
              </Modal>
<TouchableOpacity onPress={()=>{firebase.auth().signOut()
       .catch((error)=>{
            console.log("error")
        })
        
        }}>
    <Text style={styles.textStyle}>
        SignOut
    </Text>
</TouchableOpacity>
      <View style={{flex:0.2,position:'absolute',bottom:0}}>
          <BannerAd 
             unitId={'ca-app-pub-4275182898502525/5035755636'}
             size={BannerAdSize.FULL_BANNER}
          />
     
      </View>
        </View>

    );
}

}
const styles=StyleSheet.create({

    profileContainer:{
        flex:1,
        backgroundColor:'black'
    },
    headingText:{
color:'white',
fontSize:22
    },
    textContainer:{
        backgroundColor:'#191919',
        borderStartWidth:4,
        borderStartColor:Colors.HeaderColor,
        padding:5,
        flex:0.1,
        margin:5,
        flexDirection:'row',
        alignItems:'center'
    },
    textStyle:{
        color:'white',
        fontSize:20,
      
    }
})
import * as React from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert, Modal} from 'react-native'
import * as firebase from 'firebase'
 export default class Login extends React.Component{
     state={
         email:'',
         password:'',
         Showfp:false,
         fgEmail:null
     }

     AlertBox=(errMsg)=>{
        Alert.alert(
            "Error",
            errMsg,
            [{
                text:"Ok",
                
            }],
            {cancelable:true}
        )
}
     Login_user=()=>{

 
 
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
            console.log("thanx")
          
        }).catch((error) =>{
            let errorCode = error.code;
            let errorMessage = error.message;
            this.AlertBox(errorMessage)
         
         })
      
        }
     render(){
         return(
            <KeyboardAvoidingView style={styles.mainContainer} behavior={'height'}>
            <View style={styles.Inputcontaier}>
                <View style={{flex:0.2, alignItems:"center", borderBottomColor:"white", borderBottomWidth:2}}> 
                <Text style={{color:'white', fontSize:20}}> Login </Text>
                 </View>
            <View style={{flex:0.5}}>

        <TextInput placeholder={'Email'} placeholderTextColor="grey"  style={styles.InputField} 
        onChangeText={email=>{this.setState({email})}}
        keyboardType={"email-address"} value={this.state.email} returnKeyType={"next"}/>
         <TextInput placeholder={'Password'} placeholderTextColor="grey" style={styles.InputField} 
         secureTextEntry={true} value={this.state.password} returnKeyType={'done'}
         onChangeText={password=>{this.setState({password})}}
         />
            
            </View>
            <View style={{alignItems:"center",justifyContent:"space-around", padding:30,}}>
                <TouchableOpacity underlayColor="white"
                onPress={this.Login_user} 
                >
                    <Text style={{fontSize:20, color:'white'}}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius:20,marginTop:20}} underlayColor="white" onPress={()=>{this.setState({Showfp:true})}}>
                <Text style={{fontSize:15, color:'white'}} numberOfLine={1}>Forgot Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius:20,marginTop:20}} underlayColor="white" onPress={(this.props.Login)}>
                <Text style={{fontSize:15, color:'white'}} numberOfLine={1}>Create an account/SignUp?</Text>
                </TouchableOpacity>
               
            </View>
            
          
          
            </View>
            <Modal visible={this.state.Showfp}>
            <KeyboardAvoidingView style={styles.mainContainer} behavior={'height'}>
            <View style={{flex:0.1, marginBottom:20}} >

<TextInput placeholder={'Email'} placeholderTextColor="grey"  style={styles.InputField} 
onChangeText={email=>{this.setState({fgEmail:email})}}
keyboardType={"email-address"} value={this.state.fgEmail} />
</View>
<TouchableOpacity underlayColor="white"
                onPress={()=>{
                    if(this.state.fgEmail){
                    firebase.auth().sendPasswordResetEmail(this.state.fgEmail).then(function() {
                    Alert.alert("Message","Password Reset email has been sent",[{
                      text:"Ok",
                    
                  }],
                  {cancelable:true})
                 
                  }).catch(function(error) {
                    // An error happened.
                  });
                  this.setState({Showfp:false})
                }
            else{
                Alert.alert("Message","Invalid Email",[{
                    text:"Ok",
                    
                }],
                {cancelable:true})
            }
            }}

                >
                    <Text style={{fontSize:20, color:'white'}}>
                       Reset Password
                    </Text>
                </TouchableOpacity>
   

            </KeyboardAvoidingView>
            </Modal>
        </KeyboardAvoidingView>

         );
     }
 }

 const styles=StyleSheet.create({
    mainContainer:{
      
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"black"

    },
    Inputcontaier:{
        alignItems:"center",
        justifyContent:"flex-start",
       flex:0.5,
       width:300,
        alignItems:"stretch",
        elevation:5,
        backgroundColor:"#00CED1",
        borderRadius:20,
        position:'absolute'
       

    },
    InputField:{borderBottomColor:"white",
    borderBottomWidth:2,
    padding:4,
    flex:1 ,
    alignItems:"stretch", 
    justifyContent:"flex-start",
    color:'white',fontSize:20}

 })
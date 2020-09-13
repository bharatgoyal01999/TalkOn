import * as React from 'react'
import {Text , View , ActivityIndicator ,StyleSheet,Modal,TextInput ,TouchableOpacity ,KeyboardAvoidingView, Alert, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

import * as firebase from 'firebase'
import Login from './Login'


export default class SignUp extends React.Component{

    state={
        haveUsername:false,
        Email:"",
        password:"",
        user:{},
        oldusernames:{},
        username:null,
        token:null,
        user:null,
        error:false,
        errMsg:null,
        loding:false,
    }


create_user=()=>{
    this.setState({
    loding:true
    })
    const users=firebase.database().ref('users')
users.on('value', datasnap=>{
    if (datasnap.val()){
        let usernames={}
      
        Object.keys(datasnap.val()).forEach((item)=>{
            usernames[datasnap.val()[item].username]=1
        })
      this.setState({oldusernames:usernames})
    }
})

setTimeout(()=>{
    
    console.log(this.state.oldusernames)
    const current_username=this.state.username
    const Email=this.state.Email
    const password=this.state.password
    const path_key=Email.split("@")[0]
    console.log("Hi", path_key)
    console.log(path_key)
    const path=firebase.database().ref('users/'+path_key)
    if (current_username in this.state.oldusernames){
        this.AlertBox('Username Allerady Exists')
    }
    else{
        firebase.auth().createUserWithEmailAndPassword(Email,password).catch((error)=>{
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorMessage)
            this.setState({Email:"",password:""})
            this.AlertBox(errorMessage)
          
        })
        path.set({
            Email:Email,
            username:current_username.toLowerCase(),
            PinItems:[]
        })
    }
  

},2000)

            
 this.setState({loding:false})

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


  

render(){
console.log(this.state.username)

return(
         <ScrollView  contentContainerStyle={styles.mainContainer}>
                 <View style={styles.Inputcontaier}>
                    <View style={{flex:0.2, alignItems:"center", borderBottomColor:"white", borderBottomWidth:2}}> 
                    <Text style={{color:'white', fontSize:20}}> SignUp </Text>
                        </View>
                    
                        <KeyboardAvoidingView style={{flex:0.5}} behavior={'height'}>
                        <TextInput placeholder={'Username'} placeholderTextColor="grey"  style={styles.InputField}  
        onChangeText={username=>this.setState({username})}
         value={this.state.username} returnKeyType={"next"}/>
                     
              
                <TextInput placeholder={'Email'} placeholderTextColor="grey"  style={styles.InputField} 
                onChangeText={Email=>{this.setState({Email})}}
                keyboardType={"email-address"} value={this.state.Email} returnKeyType={"next"}/>
                 <TextInput placeholder={'Password'} placeholderTextColor="grey" style={styles.InputField} 
                 secureTextEntry={true} value={this.state.password} returnKeyType={'done'}
                 onChangeText={password=>{this.setState({password})}}
                 />
                       </KeyboardAvoidingView>
                   
                    <View style={{alignItems:"center",justifyContent:"space-around", padding:30}}>
                    <TouchableOpacity onPress={this.create_user} underlayColor="white">
                        {
                            this.state.loding ? <ActivityIndicator size='small' color='white' /> :   <Text style={{fontSize:20, color:'white'}}>
                            SignUp
                        </Text>
                        }
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderRadius:20,paddingTop:30}} underlayColor="white" onPress={this.props.Login}>
                    <Text style={{fontSize:15, color:'white'}}>Already Have an account/Login?</Text>
                    </TouchableOpacity>
                   
                </View>
                 </View>
                </ScrollView>

)
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
    color:'white',fontSize:20},

    usenameContainer:{
        alignItems:"center",
        justifyContent:"center",
        flex:0.5
    }

})
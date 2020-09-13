import 'react-native-gesture-handler';
import * as React from "react";
import * as firebase from 'firebase'
import AppNavigator from "./routes";
import { NavigationContainer } from '@react-navigation/native';
import { View,ActivityIndicator, YellowBox , ScrollView } from 'react-native';
import { firebaseConfig } from './src/config';
import VideoPicker from './components/VidepPicker'

import Post from './components/Posts/Posts'
import Auth from './screens/Auth/Auth'
import Glogin from './components/Auth/SignUp'


// import { ScrollView } from 'react-native-gesture-handler';
firebase.initializeApp(firebaseConfig)


export default class App extends React.Component {
  state={
    user:null,
    loding:true
  }

componentDidMount= async ()=>{
console.disableYellowBox=true
  YellowBox.ignoreWarnings(['Setting a timer']); 
 await  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    this.setState({user,loding:false})

    } else {
     this.setState({user:null,loding:false})
      
    }
  });
}
bannerError=(err)=>{console.log(err)}
  render(){
    
    if (this.state.loding){
    return   <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"black"}}>
<ActivityIndicator size={100} />
      </View>
    }
  else{
   
      return(
        <>
      <NavigationContainer>
      <AppNavigator isLogedin={this.state.user}/>
      </NavigationContainer>
  

      </>);
    }

  

}
}
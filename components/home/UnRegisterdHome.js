import * as React from 'react'
import { View, Text, FlatList, Modal,Button } from 'react-native'
import CategoryBox from "./CategoryBox"
import {screenHeight,screenWidth} from '../../utils/Dimention'
import Constants from 'expo-constants'
import  Header from './Header'
import * as firebase from 'firebase'
import Auth from '../../screens/Auth/Auth'
import Pin from './Pin/Pin'
  
  // Set global test device ID


export default class HomeScreen extends React.Component{

    state={
        showLoginPage:false,
        showProfile:false,
        user:null,
        categories:[],
        loding:true,
        data_length:null,
        pinVisible:false,
        loding:true,
        username:null,
        isUserLogin:false
    }
    componentDidMount= async ()=>{
        try{
           
            let categories;
            const ref= firebase.database().ref('category')
            ref.on('value', snaps=>{
                if (snaps.val()){
                 categories=[];
                const data=Object.keys(snaps.val())
               
                
                
                this.setState({categories:data,})
                }
            })

            if(this.state.user){
                const user_ref=this.state.user.email.split('@')[0]
                const uname_ref=firebase.database().ref('users/'+user_ref)
                uname_ref.once('value').then((data)=>{if(data.val()){
                    this.setState({username:data.val().username,loding:false,isUserLogin:true})
                }})
            }
        }catch{(error)=>{
console.log(error)
        }}}
        

    render(){
   
        const {navigation:{navigate}}=this.props
        return (
            
            <View style={{flex:1,alignItems:"flex-start",justifyContent:"space-between",backgroundColor:"black"}}>
               
             <View style={{     padding:8,
        width:screenWidth,
        flex:0.1,
        flexDirection:'row',
        justifyContent:"space-between",
    marginBottom:Constants.statusBarHeight,
    
     
        alignItems:"center",
        borderColor:"#48C9B0",
        borderWidth:2}}>
<Text style={{color:'white',fontSize:30}}>{'TalkOn'}</Text>
       <Button title={'Login/Signup'}
       onPress={()=>{this.setState({showLoginPage:true})}}
       style={{fontSize:40}} 
       color='black'
       />
      
             </View>
                <View style={{flex:0.9}}>
                <FlatList 
               
                data={this.state.categories}
                renderItem={({item})=>{
                   return( <CategoryBox category={item} navigate={navigate}/>);
                }}
                keyExtractor={(item)=>(item)}
                ></FlatList></View>
               <Modal visible={this.state.showLoginPage}>
<Auth />
</Modal>
            </View>
           
        );
    }
}
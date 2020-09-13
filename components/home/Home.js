import * as React from 'react'
import { View, Text, FlatList, Modal } from 'react-native'
import CategoryBox from "./CategoryBox"

import  Header from './Header'
import * as firebase from 'firebase'

import Pin from './Pin/Pin'
  
 


export default class HomeScreen extends React.Component{

    state={
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
           await  firebase.auth().onAuthStateChanged((user) => {
                if (user) {

                this.setState({user,isUserLogin:true})
                  
                } else {
                 this.setState({user:null})
                  
                }
              });
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
                    this.setState({username:data.val().username,loding:false})
                }})
            }
        }catch{(error)=>{
console.log(error)
        }}}
        

    render(){
      
        const {navigation:{navigate}}=this.props

        return (
            
            <View style={{flex:1,alignItems:"flex-start",justifyContent:"space-between",backgroundColor:"black"}}>
               { 
               !this.state.loding &&
               <Header username={this.state.username} isUserLogin={this.state.isUserLogin} showPin={()=>{this.setState({pinVisible:true})}} navigation={this.props.navigation}/>}
                <View style={{flex:0.9}}>
                <FlatList 
               
                data={this.state.categories}
                renderItem={({item})=>{
                   return( <CategoryBox category={item} navigate={navigate}/>);
                }}
                keyExtractor={(item)=>(item)}
                ></FlatList></View>
                <Modal visible={this.state.pinVisible} >
                    <Pin navigate={navigate}  closeModal={()=>{this.setState({pinVisible:false})}} />

                 
                </Modal>
            </View>
        );
    }
}
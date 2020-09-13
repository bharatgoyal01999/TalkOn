import * as React from 'react'
import { View , Text , Image,StyleSheet,FlatList } from 'react-native' 
import MessageHeader from '../../messageBox/MessageHeader'
import PinCard from './PinCard'
import * as firebase from 'firebase'


export default class Pin extends  React.Component{
state={
    Items:[]
}
componentDidMount=()=>{
const user=firebase.auth().currentUser.email.split('@')[0]
const item_ref=firebase.database().ref('users/'+user+"/PinItems")


item_ref.on('value',dataSnap=>{
    let pin_items=[]
    if(dataSnap.val()){
           dataSnap.val().forEach((item)=>{
        if(item){
            pin_items.push(item)
        }
    })
    this.setState({Items:pin_items})}
})

}
render(){
    console.log(this.state.Items)
    return (
        <View style={styles.mainContainer}>
           
        <MessageHeader Heading={"Pin Items"}  closeModal={this.props.closeModal} users={-1} />
         
        { this.state.Items.length>0 ?  
       
        <FlatList
            data={this.state.Items}
            keyExtractor={(item)=>(item['id'])}
            renderItem={({item:{id,cat}})=>{
                    return(
                        <PinCard navigate={this.props.navigate} id={id} cat={cat} closeModal={this.props.closeModal}/>
                    );
            }}

            >
                
            </FlatList> : <View style={{justifyContent:'center',alignItems:'center'}}>
                 <Text style={{color:'white', fontSize:20}}>Sorry No Item is pinned </Text>
            </View> }
            
        </View>
    );
}
}
const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'black'
    }

})
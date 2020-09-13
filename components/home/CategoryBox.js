import  React,{useState} from 'react'
import { ActivityIndicator, View, Text ,StyleSheet, FlatList} from 'react-native'
import Card from "./Card"
import CategoryHeader from './CategoryHeader'

import * as firebase from 'firebase'
import { BannerAd } from '@react-native-firebase/admob'

export default class CategoryBox extends React.Component{
    state={
        loding:true,
        catData:[]
    }


componentDidMount=async ()=>{
    try{
       await firebase.database().ref('category').child(this.props.category).once('value')
        .then( dataSnap=>{
            if(dataSnap.exists)
            {     const data_array=Object.values(dataSnap.val())
               
                this.setState({catData:data_array})}
                   
            })
    }catch{(error)=>{
            this.setState({catData:null})
console.log(error)
    }}
    
   
}
shouldComponentUpdate(nextProp,nextState){
return (
    this.props.category==nextProp.category
)
}

render(){
    return(
        <View style={styles.container}>
            <CategoryHeader category={this.props.category.toUpperCase()} navigate={this.props.navigate} />
            <FlatList
            initialNumToRender={1}

            horizontal={true}
            data={this.state.catData}
            renderItem={({item:{Details:{imdbID,Poster,Type}}})=>{
               
              return(  <Card image={{uri:Poster}} id={imdbID} cat={Type} navigate={this.props.navigate}/>);
            }}
            keyExtractor={(item)=>(item.Details.imdbID)}
            
            />
        </View>

    );}
}
const styles=StyleSheet.create({
    container:{
        // borderWidth:4,
        borderRadius:5,
        borderColor:"#1f4068",
        marginVertical:20,
    }
})
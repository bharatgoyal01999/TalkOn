import * as React from 'react'
import { View, Text, FlatList,StyleSheet, Platform } from 'react-native'
import * as firebase from 'firebase'
import CatHead from './CarScreenHeader'
import CatCard from './CatCard'
import Detail from '../detail/Detail'



export default class CatScreen extends React.Component {
state={
    data:[]
}
componentDidMount=async ()=>{
    const cat=this.props.route.params.cat
const my_way=firebase.database().ref('/category/'+cat)
my_way.on('value',dataSnap=>{
    let data=Object.values(dataSnap.val())
    data=Object.values(data)
    this.setState({data})
})
}

    render(){
      const data_map=this.state.data.map((item)=>{
           return item.Details
      })
      

        const cat=this.props.route.params.cat
        return (
                <View style={styles.mainContainer}>
            <View style={{flex:0.1}}>
                    <CatHead heading={cat} /></View>
                    <View style={{flex:0.9}}> 
                 <FlatList 
                 data={data_map}
                 renderItem={({item:{Poster,Title,Type,imdbID}})=>{
                    
                    return(<CatCard image={{uri:Poster}} title={Title} id={imdbID } cat={Type} navigation={this.props.navigation}/>)
                 }}
                 keyExtractor={(item)=>(item.imdbID)}
                 numColumns={2}
                 /></View>
                  
    
            
                </View>
        );
    }
}
const styles=StyleSheet.create({
mainContainer:{
    backgroundColor:'black',
    flex:1,
  
    
}
})
import React from 'react'
import {Text , View ,TouchableOpacity, Image,StyleSheet,Dimensions , ActivityIndicator} from 'react-native'
import * as firebase from 'firebase'
const ScreenHeight=(Dimensions.get('window').height)
const ScreenWidth=(Dimensions.get('window').width)
import{ MSdata } from './FetchMS'
import { BookData } from './FetchBook'


export default class ResultCard extends React.Component{
state={
    dataPresent:false
}

addData=async () =>{
  
    const {imageLink,title,navigate,id,category}=this.props
    const my_ref=  firebase.database().ref("category/"+category).child(id+'/Details')
    let data
    if (category=='book'){
       
         data=await BookData(id)
    }
    else{
     data=await MSdata(id)}
    try{
        // const check_ref=firebase.database().ref('catgory/'+data.Type+"/"+data.imdbID)
        // check_ref.on('value',datasnap=>{
        //     if(datasnap.val()){
        //         this.setState({dataPresent:true})
        //     }
        // })
        
   
        my_ref.set(data),function(err){
            console.log(error)
        }
        // console.log("hi")
        navigate("Detail",{id:id,cat:data.Type})
    }catch(error){
console.log(error)
    }
   
  

}

    render(){


        const {imageLink,title,loading}=this.props
        const comp=loading ? (<View style={{flex:1,justifyContent:'center',alignItems:"center"}}><ActivityIndicator size={'small'}/></View>):
        (

            <TouchableOpacity style={styles.card_container} onPress={this.addData} >
         
                <View style={styles.headerImage}>
                    <Image source={{uri:imageLink}} style={styles.image} />
                </View>
                <View style={styles.Card_data}>
        <Text style={{color:'white'}}>{this.props.category}</Text>
        <Text style={styles.title}>{title}</Text>
      
                </View>


           
            </TouchableOpacity>
        )
        return comp;
    }
}
const styles=StyleSheet.create({
        card_container:{
            elevation:5,
            flexDirection:"row",
            flex:0.2,
            justifyContent:"space-between",
            marginVertical:5,
            shadowColor:"white"
        },
        headerImage:{
            flex:0.36,
           
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'black',
            borderRadius:3,
        },
        image:{
            flex:1,
            resizeMode:"contain",
            aspectRatio:1,
            borderRadius:3,
            borderColor:"white",
            borderWidth:2,
            width:ScreenWidth*0.10,
            height:ScreenHeight*0.2
        },
        Card_data:{
            flex:0.6,
            // backgroundColor:"white"
        },
        title:{
            color:"white",
            fontSize:20,
        },
        text:{
            color:'white',
            fontSize:20
        }

})
import * as React from 'react'
import {screenHeight,screenWidth } from '../../../utils/Dimention'
import { View, Text,TouchableOpacity ,StyleSheet,Image} from 'react-native'
import * as firebase from 'firebase'
export default class Pin extends React.Component{
    state={
        image:'',
        title:'',
        loding:true
    }
    componentDidMount=()=>{
        const {navigate,id,cat,closeModal}=this.props
const item_ref=firebase.database().ref('category/'+cat+'/'+id+'/Details')
item_ref.on('value',dataSnap=>{
    if(dataSnap.val()){
        const title=dataSnap.val().Title
        const image=dataSnap.val().Poster
        this.setState({image,title,loding:false})
    }
})
    }
   render(){
       const {navigate,id,cat,closeModal}=this.props
    return (
!this.state.loding && <TouchableOpacity style={styles.card_container} onPress={()=>{
    navigate("Detail",{id:id,cat:cat})
    closeModal()
    }} >
         
         <View style={styles.headerImage}>
             <Image source={{uri:this.state.image}} style={styles.image} />
         </View>
         <View style={styles.Card_data}>
 <Text style={styles.title}>{this.state.title}</Text>

         </View>


    
     </TouchableOpacity> 
    );
}}

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
        width:screenWidth*0.10,
        height:screenHeight*0.2
    },
    Card_data:{
        flex:0.6,
        // backgroundColor:"white"
    },
    title:{
        color:"white",
        fontSize:25,
    },
    text:{
        color:'white',
        fontSize:20
    }

})
import React from 'react'
import { TextInput, View, StyleSheet, Dimensions,Text,FlatList, KeyboardAvoidingView,ActivityIndicator} from 'react-native'
import Constants from 'expo-constants'
import Icon from 'react-native-vector-icons/Feather'
import Colors from '../../utils/Colors'
import ResultCard from './ResultCard'
import FetchMS from './FetchMS'
import FetchBooks from './FetchBook'

const ScreenHeight=(Dimensions.get('window').height)
const ScreenWidth=(Dimensions.get('window').width)
export default class SearchInput extends React.Component{
    state={
        
        loading:false,
        data:[],
        text:'',
        placeholder:''

    }
fetchData=async (text)=>{

this.setState({text})
    this.setState({loading:true})
    const search_key=this.state.text

    const data= await FetchMS(search_key);
   const book_data=await FetchBooks(search_key);
   book_data.forEach((item)=>{
       data.push(item)
   })
    this.setState({data:data,loading:false,})
  
}


render(){
    const {value}=this.state
   const Card=this.state.data
   const {navigation:{navigate}}=this.props

    return(

       <View style={{flex:1,backgroundColor:"black"}}>
        <View style={styles.inputContainer}>

            <View style={{flex:0.1, alignItems:"center",justifyContent:"flex-end"}}>
                <Icon name="search" color="white" size={20} />
            </View>

            <View style={{flex:1,alignItems:"flex-start",justifyContent:"flex-end",}}>
                <TextInput placeholder={"Search"} style={styles.inputField}
                 underlineColorAndroid={Colors.HeaderColor}
                 onChangeText={(text)=>{this.fetchData(text)
                }}
                 onSubmitEditing={this.fetchData}
                 value={this.state.text} />
            </View>
</View>
        <View style={{flex:6}}>
            
            <FlatList 
            data={Card}
            renderItem={({item:{title,imageLink,id,category}})=>{
                
                return <ResultCard title={title} category={category} imageLink={imageLink} navigate={navigate} id={id} loading={this.setState.loading}/>
            }
            
        }
        keyExtractor={(item)=>{
         
            return item.id
        }}
            ></FlatList></View>
       

        </View>
     
    );}
}
const styles=StyleSheet.create({
    inputContainer:{
        flex:1,
        flexDirection:"row",
      backgroundColor:Colors.HeaderColor,
       marginTop:Constants.statusBarHeight,
       alignItems:"center",
        justifyContent:"center",
        borderRadius:3,

    },
    inputField:{
        borderBottomWidth:1,
       width:ScreenWidth,
        borderColor:'white',
        fontSize:20,
        color:"white",
    }
})
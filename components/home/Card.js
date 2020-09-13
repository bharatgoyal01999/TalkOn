import * as React from 'react'
import { Image , View, Text, ActivityIndicator, Alert ,StyleSheet, TouchableOpacity, Dimensions} from 'react-native'

const ScreenWidth=Math.round(Dimensions.get('window').width);
const ScreenHeight=Math.round(Dimensions.get('window').height);

export default class Card extends React.Component{
 
    render(){
     
    
        return(
          <View style={{margin:5,borderColor:"white", borderWidth:3,borderRadius:3}}>
          
            <TouchableOpacity style={styles.container} onPress={()=>{this.props.navigate("Detail",{id:this.props.id,cat:this.props.cat})}}>
            <Image source={this.props.image} style={styles.image} />
            
            </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#1f4068',
    justifyContent:"center",
    alignItems:"center",
  
    },
  
  
    image:{
       
      flex:1,
      width:ScreenWidth*0.95,
      aspectRatio:1.5,
      resizeMode:"contain",
      borderWidth:2,
      borderColor:'white',
      
  },
    text:{
        color:"white",
        fontSize:40,
    }
  })
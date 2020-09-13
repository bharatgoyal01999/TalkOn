import * as React from 'react'
import { View, Text, StyleSheet , TouchableOpacity} from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'
import { screenWidth } from '../../utils/Dimention'
export default class CategoryHeader extends React.Component{
    render(){
        const cat=this.props.category
        const navigate=this.props.navigate
        
    return(
        <TouchableOpacity onPress={()=>{navigate("catScreen",{cat:cat.toLowerCase()})}}>
             <View style={styles.container}>
            <Text style={styles.text}>
        {cat}
            </Text>
            <Icon name="caretright" size={25} color="white" />
        </View>
        </TouchableOpacity>
       
    );}
}

const styles=StyleSheet.create({
    container:{

        flex:0.2,
        borderBottomWidth:2,
        borderRadius:5,
        borderColor:"#48C9B0",
        flexDirection:"row",
        alignItems:"center",
        
        padding:3,
    },
    text:{
        color:"white",
        fontSize:screenWidth*0.0608,

    }
})
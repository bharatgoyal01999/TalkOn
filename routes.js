import * as React from 'react';
import * as firebase from 'firebase'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/home/Home'
import Detail from './components/detail/Detail'
import AIcon from "react-native-vector-icons/AntDesign"
import FIcon from "react-native-vector-icons/FontAwesome"
import ChatBox from './components/DMS/ChatBox'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ChatList from './components/DMS/ChatList'
import {Text, Button , View} from 'react-native'
import Colors from './utils/Colors';
import SearchInput from './components/search/SearchInput'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from './components/Profile/Profile'
import BoxList from './components/DMS/ChatBox'
import CatScreen from './components/CatScreen/CategoryScreen'
import Micon from 'react-native-vector-icons/FontAwesome'
import UnRegisterHome from './components/home/UnRegisterdHome'

const Stack = createStackNavigator()
const Tab=createBottomTabNavigator()
const Drawer=createDrawerNavigator()


function ChatStack(){
  return (
    <Stack.Navigator initialRouteName={'ChatList'}>
      <Stack.Screen name='ChatList' component={ChatList} />
      <Stack.Screen name='ChatBox' component={ChatBox} 
      options={{
        headerShown:false,headerMode:'none'}}/>
    </Stack.Navigator>
  )
}


function SearchStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchInput} options={{headerMode:'none', headerShown:false}}/>
      <Stack.Screen name="Detail" component={Detail} options={{headerMode:'none', headerShown:false}}/>
    </Stack.Navigator>
  )
}


function HomeStack() {
  return (
   
      <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerMode:'none',headerShown:false,}}
        />
        <Stack.Screen name="Detail" component={Detail} 

      options={{headerMode:'none',headerShown:false,}}/>
    
           <Stack.Screen name="catScreen" component={CatScreen} options={{
        headerShown:false,headerMode:'none'}}/> 
         <Stack.Screen name={'Profile'} component={Profile} options={

         {  headerStyle: {
             backgroundColor:Colors.HeaderColor,
            
           },
           headerTitleStyle:{
             color:'white'
           },
           headerBackTitleStyle:{
color:'white'
           }}
         } />
      </Stack.Navigator>

  
  );
}
function UnHomeStack(){
  return (
   
    <Stack.Navigator initialRouteName="Home">
  <Stack.Screen
        name="Home"
        component={UnRegisterHome}
        options={{headerMode:'none',headerShown:false,}}
      />
      <Stack.Screen name="Detail" component={Detail} 

    options={{headerMode:'none',headerShown:false,}}/>
  
         <Stack.Screen name="catScreen" component={CatScreen} options={{
      headerShown:false,headerMode:'none'}}/> 
       
    </Stack.Navigator>


);
}
function HomeDrawer(){
return(
  <Drawer.Navigator initialRouteName={'Home'}> 
<Drawer.Screen name={'LogOut'} component={Profile} />
<Drawer.Screen name='Home' component={HomeStack} />
  </Drawer.Navigator>
);
  
}
export default class Main extends React.Component{

  state={
    isUserLogin:false
  }
  componentDidMount =async ()=>{
    await firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({isUserLogin:true})
      }
    })
  }
render(){
  const isLogedin=this.props.isLogedin
  return(
  <Tab.Navigator initialRouteName='Home'  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let IIcon;

      if (route.name === 'Home') {
        if(focused) { 
          IIcon =<MIcon name={'home'} size={25} color={color} />}
        else{  
           IIcon= <MIcon name={'home-outline'} size={25} color={color} />}
      } 
      else if (route.name === 'Search') {
       if(!focused) 
       {IIcon= <AIcon name={'search1'} size={25} color={color} /> }

       else{  
         IIcon=<FIcon name={'search'} size={25} color={color} />}
      }
      else if (route.name==='Messages'){
        if(focused) 
        {IIcon= <Micon name={'wechat'} size={25} color={color} />}
        else{ 
           IIcon=<Micon name={'wechat'} size={25} color={color} />}
       }
       return IIcon
      }


    })

  }

  tabBarOptions={{
    activeTintColor: Colors.HeaderColor,
    inactiveTintColor: 'white',
    style:{
      backgroundColor:'black',
      
    },
   
    
  }} 
  >
    { isLogedin ?  <Tab.Screen name='Home' component={HomeStack}  /> :  <Tab.Screen name='Home' component={UnHomeStack}  /> }
   
    <Tab.Screen name='Search' component={SearchStack} />
    {isLogedin &&  <Tab.Screen name="Messages" component={
     ChatList } />}
  </Tab.Navigator>)
}


}

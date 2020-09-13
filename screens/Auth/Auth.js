import * as React from 'react'
import SignUp from  './Signup'
import Login from './Login'

export default class Auth extends React.Component{
state={
    isLogin:false
}

    render (){

        if (this.state.isLogin){
            return <Login Login={()=>{this.setState({isLogin:false})}} />
        }
        else{
            return <SignUp Login={()=>{this.setState({isLogin:true})}}/>
        }

    }
}
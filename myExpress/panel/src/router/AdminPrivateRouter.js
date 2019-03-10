import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {Waiting} from '../Components';
import Axios from 'axios';

export default class AdminPrivateRouter extends Component{
    constructor(props) {
        super(props);
        this.state={
            isAllow: !!localStorage.loginData,
            isRequest: !!localStorage.loginData,
        }
        if (localStorage.loginData) {
            const data = JSON.parse(localStorage.loginData);
            Axios.post('//localhost:3000/signin',data)
            .then(response=>{
                this.setState({
                    isAllow : response.data.success,
                    isRequest : false
                })
            })
        }
    }

    render() {
        const {path,component} = this.props;
        const {isAllow,isRequest} = this.state;
        if (isRequest) {
            return <Waiting/>
        }
        if (isAllow){
            return <Route path={path} component={component}/>
        }
        return <Redirect to="login"/>
    }
}
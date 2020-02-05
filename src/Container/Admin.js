import React, { Component } from 'react';

import Aux from '../Component/hoc/Auxiliary';
import Layout from '../Component/Layout/Layout';
import Menu from '../Component/Menu/Menu';
import Forms from '../Component/Forms/Forms';

import axios from '../axios';

class Admin extends Component {
    state = {
        authd: false,
        layout:{
            header: {
                title: '',
                backLink: '/' 
                },
            admin:{
                loginDisplay: true,
                loginUserField: '',
                loginPwField: ''
                }
            },
            menu: {
                containerType: 'Long',
                boxes: [
                    {
                        key: 'Add',
                        title: 'New Category or Post',
                        description: '',
                        picture: '',
                    },
                    {
                        key: 'Edit',
                        title: 'Edit Category or Post',
                        description: '',
                        picture: '',
                    },
                    {
                        key: 'Delete',
                        title: 'Delete Category or Post',
                        description: '',
                        picture: '',
                    }
                ]
            },
            forms: {
                display: true,
                add: false,
                edit: false,
                del: false
            }
    }

    loginFormOnChangeHandler = (event) => {
        let formValue = event.target.value;
        let formField = event.target.name;
        let newState = this.state.layout;
        const translate = {'us': 'loginUserField', 'pw': 'loginPwField'};
        newState.admin[translate[formField]] = formValue;
        this.setState({
            layout: newState
        })
    }

    loginSubmitHandler = (event) => {
        event.preventDefault();
        let username = this.state.layout.admin.loginUserField;
        let pw = this.state.layout.admin.loginPwField
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAR6VG1NjRXWTN6bTHE-LoV1NokfolQKm4';
        let authData = {
            email: username,
            password: pw,
            returnSecureToken: true
        }
        axios.post(url, authData)
        .then(response => {
            let tokenExpiration = new Date();
            tokenExpiration.setHours(tokenExpiration.getHours() + 1);
            localStorage.setItem('tokenExpiration', tokenExpiration);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            if(response.status === 200){
                this.setState({authd: true})
            }
        }).catch(err => {
            console.log(err)
        })
    }

    summonForm = (t) => {
        //let target = t.target.getAttribute('id');
        let currentState = this.state.forms;
        let toggle = currentState.display ? false : true;
        currentState.display = toggle;
        this.setState({
            forms: currentState
        });
    }

    render() { 
        return ( 
            <Aux>
                <Layout 
                    layout={this.state.layout}
                    loginHandlers={
                        {
                        'toggleMode': null, 
                        'change': this.loginFormOnChangeHandler,
                        'submit': this.loginSubmitHandler
                        }}/>
                <Menu 
                    menu={this.state.menu}
                    selected={this.summonForm}/>

                {this.state.forms.display ? 
                <Forms
                    forms={this.state.forms}
                /> : null}
            </Aux>

         );
    }
}
 
export default Admin;
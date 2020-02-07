import React, { Component } from 'react';

import Aux from '../Component/hoc/Auxiliary';
import Layout from '../Component/Layout/Layout';
import Spinner from '../Component/UI/Spinner/Spinner';
import Menu from '../Component/Menu/Menu';
import Forms from '../Component/Forms/Forms';

import axios from '../axios';

class Admin extends Component {
    state = {
        loading: false,
        authd: true,
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
                        key: 'add',
                        title: 'New Category or Post',
                        description: '',
                        picture: '',
                    },
                    {
                        key: 'edit',
                        title: 'Edit Category or Post',
                        description: '',
                        picture: '',
                    },
                    {
                        key: 'delete',
                        title: 'Delete Category or Post',
                        description: '',
                        picture: '',
                    }
                ]
            },
            forms: {
                display: false,
                editSelectedCat: false,
                editSelectedPost: false,
                selected: '',
                currentPosts: [],
                currentCategories: '',
                add: {
                    category: {
                        categoryTitle: '',
                        description: ''
                    },
                    post: {
                        category: '',
                        title: '',
                        subtitle: '',
                        text: ''
                    }
                }
            }
    }

    componentDidMount = () => {
        this.setState({loading: true})
        axios.get('https://dumpy-24fc9.firebaseio.com/.json')
        .then(response => {
            
            let data = response.data;
            let menuCats = response.data.WelcomeMenu.filter(n => n);

            let categories = [];
            for(let each in menuCats){
                categories.push(menuCats[each].title)
            }

            let formState = this.state.forms;
            formState.currentPosts = data;
            formState.currentCategories = categories;
            this.setState({
                loading: false,
                forms: formState
            })
        })
        .catch(err => {console.log(err)})
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
        this.setState({loading: true});
        let target = t.target.getAttribute('id');
        let currentState = this.state.forms;
        let toggle = currentState.display ? false : true;
        currentState.display = toggle;
        currentState.selected = currentState.selected === '' ? target :  '';
        this.setState({
            loading: false,
            forms: currentState
        });
    }

    formOnChangeHandler = (event) => {
        let newState = this.state.forms;
        let formValue = event.target.value;
        let classification = event.target.name;
        let formField = event.target.getAttribute('id');
        newState.add[classification][formField] = formValue;
        this.setState({forms: newState})
    }   

    categoryFormSubmitHandler = () => { // called by addFormSubmitHandler
        let currentData = this.state.forms.currentPosts['WelcomeMenu'];
        let formData = this.state.forms.add.category;
        let postData = currentData;
        postData[currentData.length] = {
            'key': formData.categoryTitle.toUpperCase(),
            'title': formData.categoryTitle.toUpperCase(),
            'description': formData.description,
            'picture': ''
        }
        let url = `/WelcomeMenu.json`
        axios.put(url, postData)
        .catch(err => console.log(err));
    }

    postFormSubmitHandler = () => { // called by addFormSubmitHandler
        let formData = this.state.forms.add.post; // select post field data
        let category = formData.category; // current category in form field
        let currentData = ''
        if(this.state.forms.currentPosts[category] !== undefined){
            // post to established category
            currentData = this.state.forms.currentPosts[category];
            let key = currentData['Articles'].length;
            currentData['Articles'][key] = {
                'key': key,
                'title': formData.title.toUpperCase(),
                'text': formData.text,
                'images': ''
            }
            key = currentData['menuTags'].length;
            currentData['menuTags'][key] = {
                "key": key,
                'title': formData.title.toUpperCase(),
                'description': formData.subtitle,
                'picture': ''
            }
        }else{
            // "new" category
            currentData = {
                'Articles': {
                    0: {
                        'key': 0,
                        'title': formData.title.toUpperCase(),
                        'text': formData.text,
                        'images': ''
                    }},
                'menuTags': {
                    0: {
                        "key": 0,
                        'title': formData.title.toUpperCase(),
                        'description': formData.subtitle,
                        'picture': ''
                    }}}
        }
        let url = `/${category}.json`;
        axios.put(url, currentData)
        .catch(err => console.log(err));
        
        }

        addFormSubmitHandler = (event) => {
            let btnValue = event.target.value;
            if (btnValue === 'cat') {
                this.categoryFormSubmitHandler()
            } else if (btnValue === 'post') {
                this.postFormSubmitHandler();
            }
        }

        editSelectOptiontHandler = (event) => {
            let identify = event.target.getAttribute('id');
            let btnValue = event.target.value;
            let futureStateData = '';
            if(btnValue === 'cat'){
                axios.get('https://dumpy-24fc9.firebaseio.com/WelcomeMenu.json')
                .then(response => {
                    let data = response.data.filter(n => n);
                    for(let each in data){
                        console.log(data[each].key);
                        console.log(identify)
                        if(String(data[each].key) === String(identify)){
                            console.log("match!")
                            futureStateData = data[each];
                            break
                        }}
                        if(futureStateData !== ""){
                            let currentState = this.state.forms;
                            console.log(futureStateData)
                            currentState.editSelectedCat = true;
                            currentState.add.category.categoryTitle = futureStateData.title;
                            currentState.add.category.description = futureStateData.description;
                            this.setState({forms: currentState})
                        }                    
                }).catch(err => console.log(err))
            }else if(btnValue === 'post'){
                let instructions = identify.split('-');
                let cat = instructions[0];
                let key = instructions[1];
                axios.get(`https://dumpy-24fc9.firebaseio.com/${cat}.json`)
                .then(response => {console.log(response)})
                .catch(err => {console.log(err)})
            }
        }

    render() { 
        let pageContent = 
        <Aux>
            <Menu 
                menu={this.state.menu}
                selected={this.summonForm}/>

            {this.state.forms.display ? 
            <Forms
                authd={this.state.authd}
                forms={this.state.forms}
                addEventHandlers={{
                    'change': this.formOnChangeHandler,
                    'submit': this.addFormSubmitHandler,
                    'edit': this.editSelectOptiontHandler
                    }}/> 
                    : null}
        </Aux>
    if(this.state.loading){
        pageContent = <Spinner />
    }
    console.log(this.state.forms)
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
                {pageContent}
            </Aux>

         );
    }
}
 
export default Admin;
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
                editKey: -1,
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
        this.setState({loading: true});

        //check auth
        const token = localStorage.getItem('token');
        const tokenExpired = localStorage.getItem('tokenExpiration');
        if(token !== null && new Date(tokenExpired) > new Date()){
            const refreshToken = localStorage.getItem('refreshToken');
            const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_MACBLOG_API_KEY}`;
            const body = {"grant_type": "refresh_token", "refresh_token": refreshToken}
            axios.post(url, body)
            .then(response => {
                if(response.status === 200){
                    let tokenExpiration = new Date();
                    tokenExpiration.setHours(tokenExpiration.getHours() + 6);
                    localStorage.setItem('tokenExpiration', tokenExpiration);
                    localStorage.setItem('token', response.data.id_token);
                    localStorage.setItem('refreshToken', response.data.refresh_token);
                    this.setState({authd: true});
                }
            })
            .catch(err => {console.log("Token Not Refreshed-- " + err)})};
        axios.get('https://dumpy-24fc9.firebaseio.com/.json')
        .then(response => {    
            let data = response.data;
            data.WelcomeMenu = data.WelcomeMenu.filter(n => n);
            let menuCats = data.WelcomeMenu;
            let categories = [];
            for(let each in menuCats){
                categories.push(menuCats[each].title)
            };
            let formState = this.state.forms;
            formState.currentPosts = data;
            formState.currentCategories = categories;
            this.setState({
                loading: false,
                forms: formState
            })
        })
        .catch(err => {console.log("Data not pulled-- " + err)})
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
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_MACBLOG_API_KEY}`;
        let authData = {
            email: username,
            password: pw,
            returnSecureToken: true
        }
        axios.post(url, authData)
        .then(response => {
            let tokenExpiration = new Date();
            tokenExpiration.setHours(tokenExpiration.getHours() + 6);
            localStorage.setItem('tokenExpiration', tokenExpiration);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            if(response.status === 200){
                let adminState = this.state.layout;
                adminState.admin.loginDisplay = false
                adminState.admin.loginUserField = ''
                adminState.admin.loginPwField = ''
                this.setState({authd: true, admin: adminState})
            }
        }).catch(err => {
            console.log(err);
        })
    }

    summonForm = (t) => {
        this.setState({loading: true});
        let target = t.target.getAttribute('id');
        let currentState = this.state.forms;
        let toggle = currentState.display ? false : true;
        currentState.display = toggle;
        currentState.selected = currentState.selected === '' ? target :  '';
        currentState.editSelectedCat = false;
        currentState.editSelectedPost = false;
        currentState.editKey = -1;
        currentState.add = {
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
        let currentCategories = this.state.forms.currentCategories;

        let index = currentData.length;
        if(currentCategories.includes(formData.categoryTitle.toUpperCase())){
            let counter = -1;
            for(let each in currentData){
                counter++
                if(currentData[each]['title'] === formData.categoryTitle.toUpperCase()){
                    index = counter;
                    break
                }}
            };
        postData[index] = {
            'key': formData.categoryTitle.toUpperCase(),
            'title': formData.categoryTitle.toUpperCase(),
            'description': formData.description,
            'picture': ''
        }
        const token = localStorage.getItem('token');
        let url = `/WelcomeMenu.json?auth=` + token;
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
            let key = this.state.forms.editKey === -1 ? currentData['Articles'].length : this.state.forms.editKey;
            currentData['Articles'][key] = {
                'key': key,
                'title': formData.title.toUpperCase(),
                'text': formData.text,
                'images': ''
            }
            key = this.state.forms.editKey === -1 ? currentData['menuTags'].length : this.state.forms.editKey;
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

        const token = localStorage.getItem('token');
        let url = `/${category}.json?auth=` + token;
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
        let btnValue = event.target.value; // cat or post
        let identify = event.target.getAttribute('id'); // cat name or post name and ID
        let futureStateData = '';
        if(btnValue === 'cat'){
            axios.get('https://dumpy-24fc9.firebaseio.com/WelcomeMenu.json')
            .then(response => {
                let data = response.data.filter(n => n);
                for(let each in data){
                    if(String(data[each].key) === String(identify)){
                        futureStateData = data[each];
                        break
                    }}
                    if(futureStateData !== ''){
                        let currentState = this.state.forms;
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
            .then(response => { 
                let data = response.data;
                let article = data.Articles[key];
                let menuTag = data.menuTags[key];
                let currentState = this.state.forms;
                currentState.editSelectedPost = true;
                currentState.editKey = article.key;
                currentState.add.post.category = cat;
                currentState.add.post.title = article.title;
                currentState.add.post.subtitle = menuTag.description;
                currentState.add.post.text = article.text;
                this.setState({forms: currentState})
        }).catch(err => {console.log(err)});
        }
    }

    deleteHandler = (event) => {
        const token = localStorage.getItem('token');
        let btnValue = event.target.value; // cat or post
        let identify = event.target.getAttribute('id'); // cat name or post name and ID
        if(btnValue === 'cat'){
            let currentData = this.state.forms.currentPosts['WelcomeMenu'];
            let counter = -1;
            let index = null;
            for(let each in currentData){
                counter++
                if(currentData[each]['title'] === identify){
                    index = counter;
                    break
                }
            }
            axios.delete(`/WelcomeMenu/${index}.json?auth=` + token)
            .catch(err => {console.log(err)});
        }else if(btnValue === 'post'){
            let instructions = identify.split('-');
            let cat = instructions[0];
            let key = instructions[1];
            axios.delete(`/${cat}/Articles/${key}.json?auth=` + token)
            .catch(err => {console.log(err)})
            .then(() => {axios.delete(`/${cat}/menuTags/${key}.json?auth=` + token)
            .catch(err => {console.log(err)})
            })
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
                        'edit': this.editSelectOptiontHandler,
                        'delete': this.deleteHandler
                        }}/> 
                        : null}
            </Aux>
            if(this.state.loading){
                pageContent = <Spinner />
            }

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
import React, { Component } from 'react';

import Aux from '../Component/hoc/Auxiliary';
import Layout from '../Component/Layout/Layout';
import Spinner from   '../Component/UI/Spinner/Spinner';
import Menu from '../Component/Menu/Menu';
import DisplayContent from '../Component/DisplayContent/DisplayContent';

import axios from '../axios';

class Content extends Component {
    state = {
        loading: false,
        layout:{
            header: {
                title: '',
                backLink: '/' 
            },
            admin: {
                loginDisplay: false,
            }
        },
        menu: {
            containerType: 'Long',
            boxes: [
                {
                    key: '',
                    title: '',
                    description: '',
                    picture: '',
                }
            ]
        },
        content: {
            display: false,
            chosenArticle: false,
            articles: [
                {
                    key: '',
                    title: '',
                    text: '',
                    images: [],
                }
                    ],
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        if (this.props.location.search < 1) {
            this.props.history.goBack();
        }
        const query = new URLSearchParams(this.props.location.search)
        let selectedCat = ''
        for (let x of query.entries()) {
            selectedCat = x[0];
        }

        let initialState = this.state.layout;
        initialState.header.title = selectedCat; //set title

        let loadMenuState = this.state.menu; //set menu options blank state
        let loadContentState = this.state.content; //set content options blank state

        axios.get(`https://dumpy-24fc9.firebaseio.com/${selectedCat}/menuTags.json`) //menu options
            .then(response => {
                let data = response.data;
                try{
                    data = data.filter(n => n);
                }catch{
                    let dataArray  = []
                    let keys = Object.keys(data);
                    for(let x=0; x < keys.length; x++){
                        let key  = keys[x];
                        dataArray[key] = data[key];
                    }
                    data = dataArray.filter(n => n)
                };
                loadMenuState.boxes = data;
                axios.get(`https://dumpy-24fc9.firebaseio.com/${selectedCat}/Articles.json`) //content options
                    .then(response => {
                        let data = response.data;
                        try{
                            data = data.filter(n => n);
                        }catch{
                            let dataArray  = []
                            let keys = Object.keys(data);
                            for(let x=0; x < keys.length; x++){
                                let key  = keys[x];
                                dataArray[key] = data[key];
                            }
                            data = dataArray.filter(n => n)
                        };
                        loadContentState.articles = data;
                        this.setState({ //set everything as configured in fb
                            loading: false,
                            layout: initialState,
                            menu: loadMenuState,
                            content: loadContentState
                        })
                    })
            }).catch(err => this.props.history.goBack())
    }

    selectContentByMenuBoxHandler = (t) => {
        this.setState({loading: true})
        let target = t.target.getAttribute('id');
        let currentState = this.state.content;
        currentState.chosenArticle = String(currentState.chosenArticle) === String(target) ? false : Number(target);
        if(currentState.display === true &&
                currentState.chosenArticle !== false){
                    currentState.display = true
        }else{
            currentState.display = currentState.display === true ? false : true;
        }
        this.setState({
            loading: false,
            content: currentState
        });
    }
    
    adminRouteHandler = () => {
        this.props.history.push('/adminView')
    }


    render() {
        
        let pageContent = 
            <Aux>
                <Menu 
                    menu={this.state.menu}
                    selected={this.selectContentByMenuBoxHandler}
                />
            {this.state.content.display ? <DisplayContent content={this.state.content}/> : null}
            </Aux>
        if(this.state.loading){
            pageContent = <Spinner />
        }

        return ( 
            <Aux>
                <Layout 
                    layout={this.state.layout}
                    loginHandlers={{'toggleMode': this.adminRouteHandler}}/>
                {pageContent}

            </Aux>
         );
    }
}
 
export default Content;
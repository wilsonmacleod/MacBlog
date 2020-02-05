import React, { Component } from 'react';

import Aux from '../Component/hoc/Auxiliary';
import Layout from '../Component/Layout/Layout';
import Menu from '../Component/Menu/Menu';
import DisplayContent from '../Component/DisplayContent/DisplayContent';

import axios from '../axios';

class Content extends Component {
    state = {
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

        axios.get(`https://dumpy-24fc9.firebaseio.com/contentMenu-${selectedCat}/menu.json`) //menu options
            .then(response => {
                loadMenuState.boxes = response.data;
                axios.get(`https://dumpy-24fc9.firebaseio.com/contentArticles-${selectedCat}/articles.json`) //content options
                    .then(response => {
                        loadContentState.articles = response.data;
                        this.setState({ //set everything as configured in fb
                            layout: initialState,
                            menu: loadMenuState,
                            content: loadContentState
                        })
                    })
            }).catch(error => console.log(error))
    }

    selectContentByMenuBoxHandler = (t) => {
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
            content: currentState
        });
    }
    
    adminRouteHandler = () => {
        this.props.history.push('/adminView')
    }


    render() {
        return ( 
            <Aux>
                <Layout 
                    layout={this.state.layout}
                    loginHandlers={{'toggleMode': this.adminRouteHandler}}/>
                <Menu 
                    menu={this.state.menu}
                    selected={this.selectContentByMenuBoxHandler}/>

                    {this.state.content.display ? <DisplayContent content={this.state.content}/> : null}

            </Aux>
         );
    }
}
 
export default Content;
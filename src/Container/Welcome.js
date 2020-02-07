import React, { Component } from 'react';

import Aux from '../Component/hoc/Auxiliary';
import Layout from '../Component/Layout/Layout';
import Spinner from '../Component/UI/Spinner/Spinner';
import Menu from '../Component/Menu/Menu';

import axios from '../axios';

class Welcome extends Component {
    state = { 
        loading: false,
        layout:{
            header: {
                title: 'WELCOME',
                backLink: "https://wilsonmacleod.com/" 
            },
            admin:{
                loginDisplay: false
            }
        },
        menu: {
            containerType: 'Normal',
            boxes: [
                {
                    key: '',
                    title : '',
                    description: '',
                    picture: '',
                }
            ],
        }
     }

    componentDidMount = () => {
        this.setState({loading: true})
        let loadMenuState = this.state.menu;
        axios.get('https://dumpy-24fc9.firebaseio.com/WelcomeMenu.json')
        .then(response => {
            let data = response.data.filter(n => n);
            loadMenuState.boxes = data;
            this.setState({
                loading: false,
                menu: loadMenuState
            })});
    }

    selectCategoryByMenuBoxHandler = (t) => {
        let target = t.target.getAttribute('id');
        this.props.history.push({
            pathname: '/content',
            search: '?' + target
            });
    }

    adminRouteHandler = () => {
        this.props.history.push('/adminView')
    }

    render() { 
        let content = this.state.loading ? 
        <Spinner /> :                 
        <Menu 
            menu={this.state.menu}
            selected={this.selectCategoryByMenuBoxHandler}
        />
        return (
            <Aux>
                <Layout
                    layout={this.state.layout}
                    loginHandlers={{'toggleMode': this.adminRouteHandler}}/>
                {content}
            </Aux>
          );
    }
}
 
export default Welcome;
import React, { Component } from 'react';

import Aux from '../Component/hoc/Auxiliary';
import Layout from '../Component/Layout/Layout';
import Menu from '../Component/Menu/Menu';

import axios from '../axios';

class Welcome extends Component {
    state = { 
        layout:{
            header: {
                title: 'WELCOME',
                backLink: "https://wilsonmacleod.com/" 
            },
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
            ]
        }
     }

    componentDidMount = () => {
        let loadMenuState = this.state.menu;
        axios.get('https://dumpy-24fc9.firebaseio.com/welcomeMenu/-M-5rrTT7KGlf9COOum9/menu.json')
        .then(response => {
            loadMenuState.boxes = response.data;
            this.setState({
                menu: loadMenuState
            })
        });
    }

    selectCategoryByMenuBoxHandler = (t) => {
        let target = t.target.getAttribute('id');
        this.props.history.push({
            pathname: '/content',
            search: '?' + target
            });
    }

    render() { 
        return (
            <Aux>
                <Layout
                    layout={this.state.layout}
                />
                <Menu 
                    menu={this.state.menu}
                    selected={this.selectCategoryByMenuBoxHandler}
                />
            </Aux>
          );
    }
}
 
export default Welcome;
import React, { Component } from 'react';

import Aux from '../../Component/hoc/Auxiliary';
import Layout from '../../Component/Layout/Layout';
import Menu from '../../Component/Menu/Menu';

class Content extends Component {
    state = { 
        layout:{
            header: {
                title: 'WELCOME'
            },
            info: true, // project info tab
            createYourOwn: true, // create your own version mode
            backToWilson: false // back to default
        },
        menu: {
            boxes: [
                {
                    title: 'TRAVELS',
                    description: 'My trips and adventures!',
                    picture: 'https://cdn.cnn.com/cnnnext/dam/assets/181010131059-australia-best-beaches-cossies-beach-cocos3.jpg',
                },
                {
                    title: 'SPORTS',
                    description: 'Sports thoughts and interests',
                    picture: false,
                },
                {
                    title: 'Analyses',
                    description: 'Kaggle and web-scrape based analysis',
                    picture: false,
                },
                {
                    title: 'MEDIA',
                    description: 'Reflection and reviews of favorite shows, movies, podcasts',
                    picture: false,
                },
                {
                    title: 'GAMES',
                    description: '',
                    picture: false,
                },
                {
                    title: 'FOOD',
                    description: 'Some of my favorite food spots in Hawaii, Seattle and more..',
                    picture: false,
                },
                {
                    title: 'LEARNINGS',
                    description: 'Tech learnings and project rambling...',
                    picture: false,
                },
            ]
        }
     }
    render() { 
        return (
            <Aux>
                <Layout
                    layout={this.state.layout}
                />
                <Menu 
                    menu={this.state.menu}
                />
            </Aux>
          );
    }
}
 
export default Content;
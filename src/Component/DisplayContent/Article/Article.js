import React from 'react';

import classes from './Article.module.css';

const article = (props) => {
    let content = props.text.split('\n');
    content = 
        content.map(c  =>
            <p>{c}</p>
        )
    return ( 
            <div className={classes.Body}>
                <h1>{props.title}</h1>
                <p>{content}</p>
            </div>
     );
}
 
export default article;
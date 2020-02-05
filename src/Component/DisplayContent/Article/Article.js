import React from 'react';

import classes from './Article.module.css';

const article = (props) => {
    return ( 
            <div className={classes.Body}>
                <h1>{props.title}</h1>
                <p>{props.text}</p>
            </div>
     );
}
 
export default article;
import React from 'react';

import classes from './Title.module.css'

const title = (props) => {
    return ( 
        <span className={classes.Font}>{props.title}</span>
     );
}
 
export default title;
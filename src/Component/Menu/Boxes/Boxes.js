import React from 'react';

import classes from './Boxes.module.css';

const menuButton = (props) => {
    return ( 
    <div className={classes.Mb}>
        {props.children}
    </div>
     );
}
 
export default menuButton;
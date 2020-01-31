import React from 'react';

import classes from './MenuContainer.module.css';

const menuContainer = (props) => {
    return ( 
        <div className={classes.Container}>
            {props.children}
        </div>
     );
}
 
export default menuContainer;
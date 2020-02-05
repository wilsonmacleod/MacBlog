import React from 'react';

import classes from './DisplayContainer.module.css';

const displayContainer = (props) => {
    return ( 
        <div className={classes.Container}>
            {props.children}
        </div>
     );
}
 
export default displayContainer;
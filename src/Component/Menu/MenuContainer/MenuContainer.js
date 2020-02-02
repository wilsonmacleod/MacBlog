import React from 'react';

import classes from './MenuContainer.module.css';

const menuContainer = (props) => {
    let cssClass = props.containerType === 'Long' ? classes.LongContainer : classes.Container;
    return ( 
        <div className={cssClass}>
            {props.children}
        </div>
     );
}
 
export default menuContainer;
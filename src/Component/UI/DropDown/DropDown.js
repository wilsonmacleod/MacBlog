import React from 'react';

import Aux from '../../hoc/Auxiliary';

import classes from './DropDown.module.css';

const dropDown = (props) => {
    let cssClass = props.displayDropDown ? classes.Show : classes.Hidden;
    return ( 
        <Aux>
            <div className={[cssClass, classes[props.cssType]].join(' ')}>
                {props.children}
            </div>
        </Aux>
     );
}
 
export default dropDown;
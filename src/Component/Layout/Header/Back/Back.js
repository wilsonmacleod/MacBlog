import React from 'react';

import classes from './Back.module.css';



const back = (props) => {
    return ( 
            <a 
                href={props.link}
                className={classes.Arrow} 
            />
        );
}
 
export default back;
import React from 'react';

import classes from './Boxes.module.css';

const menuButton = (props) => {
    return ( 
    <div className={classes.Mb}>
    <div className={classes.TextContainer}>
        <span className={classes.Title}>{props.title}</span>
        <span className={classes.Desc}>{props.desc}</span>
    </div>
    <img src={props.pic} alt={''} />
    </div>
     );
}
 
export default menuButton;
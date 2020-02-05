import React from 'react';

import classes from './Boxes.module.css';

const menuButton = (props) => {
    return ( 
        <div className={classes.Mb} id={props.val} onClick={props.clicked}>
            <div className={classes.TextContainer} id={props.val}>
                <span className={classes.Title} id={props.val}>{props.title}</span>
                <span className={classes.Desc} id={props.val}>{props.desc}</span>
                {props.admin}
            </div>
            <img src={props.pic} alt={''} id={props.val}/>
        </div>
     );
}
 
export default menuButton;
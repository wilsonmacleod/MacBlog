import React from 'react';

import Button from '../Button/Button';

import classes from './Options.module.css';

const options = (props) => {
    return ( 
        <div key={props.key} val={props.key} className={classes.Container}>

                <h2 className={classes.Title}>{props.title}</h2>
                <h5>{props.cat}</h5>
                
                <p>{props.description}</p>

                <Button 
                    id={props.id}
                    clicked={props.clicked}
                    btnType={props.btnType}
                    val={props.val}
                    >
                        {props.btnType}
                </Button>
        </div>
     );
}
 
export default options;
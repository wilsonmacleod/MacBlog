import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
    <button
        id={props.id}
        value={props.val}
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}
        >{props.children}</button>
);

export default button;
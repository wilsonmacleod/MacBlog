import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
    <button
        value={props.val}
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}
        title={props.children}
        >{props.children}</button>
);

export default button;
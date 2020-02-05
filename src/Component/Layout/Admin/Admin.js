import React from 'react';

import Aux from '../../hoc/Auxiliary';

import classes from './Admin.module.css';

const admin = (props) => {
    return ( 
        <Aux>
            <form onSubmit={props.submit}>
                <input type="text" name="us" className={classes.AdminLoginFields} onChange={props.change}/>
                <input type="password" name="pw" className={classes.AdminLoginFields} onChange={props.change}/>
                <input type="submit" className={classes.EnterSubmit} />
            </form>
        </Aux>
     );
}
 
export default admin;
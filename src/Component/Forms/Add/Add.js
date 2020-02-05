import React from 'react';

import Button from '../../UI/Button/Button';

import classes from '../Forms.module.css';

const Add = (props) => {

    return ( 
        <div className={classes.Form}>

                <label className={classes.Container}>
                    <span className={classes.Title}>Category</span>
                    <select 
                    className={classes.Field} 
                    value={''}
                    onChange={''}
                    > 
                    <option value="Category">Category</option>
                    </select>
                </label>

                <label className={classes.Container}>

                    <span className={classes.Title}>Title</span>
                    <input className={classes.Field} 
                    type="text"
                    onChange={''}
                    value={''}/>

                </label>

                <label className={classes.Container}>

                        <span className={classes.Title}>Subtitle </span>
                        <input 
                            type="text" 
                            value={''} 
                            onChange={''}
                            className={classes.Field}/>

                    </label>

                <label className={classes.Container}>

                    <span className={classes.Title}>Content</span>
                    <textarea 
                        type="text" 
                        value={''} 
                        onChange={''}
                        className={classes.Field}/>

                </label>

                <label>
                    <Button 
                        disabled={true}
                        btnType={''}
                        clicked={''}
                        >
                            Submit
                        </Button>
                </label>
        </div>
     );
}
 
export default Add;
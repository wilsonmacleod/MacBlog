import React from 'react';

import Button from '../../UI/Button/Button';

import classes from '../Forms.module.css';

const categoryForm = (props) => {

    const config = {
        'title':  props.type === 'add' ? 'ADD CATEGORY' : 'EDIT CATEGORY',
        'btnType':  props.type === 'add' ? 'Add' : 'Edit',
        'titleValue': props.values.categoryTitle,
        'descriptionValue': props.values.description,
        'imageValue': 'UPLOAD',
        'changeHandler': props.handlers.change,
        'submitHandler': props.handlers.submit,
                }   

    return ( 
        <form>
        <div className={classes.Form}>

            <h5 className={classes.FormTitle}>{config.title}</h5>

            <label className={classes.Container}>

                <span className={classes.Title}>Title</span>
                <input className={classes.Field} 
                type="text"
                id={'categoryTitle'}
                name={'category'}
                value={config.titleValue}
                onChange={config.changeHandler}/>

            </label>

            <label className={classes.Container}>

                    <span className={classes.Title}>Description </span>
                    <input className={classes.Field}
                        type="text" 
                        id={'description'}
                        name={'category'}
                        value={config.descriptionValue} 
                        onChange={config.changeHandler}/>

                </label>

            <label className={classes.Container}>

                <span className={classes.Title}>Image</span>
                <input 
                    type="text" 
                    value={config.imageValue} 
                    className={classes.Field}
                    readOnly={true}
                    />

            </label>

                <Button 
                    btnType={config.btnType}
                    val={'cat'}
                    clicked={config.submitHandler}
                    >
                        Submit
                    </Button>
    </div>
    </form>
     );
}
 
export default categoryForm;
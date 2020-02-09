import React from 'react';

import Button from '../../UI/Button/Button';

import classes from '../Forms.module.css';

const postForm = (props) => {
    const config = {
        'title': props.type === 'add' ? 'ADD POST' : 'EDIT POST',
        'btnType':  props.type === 'add' ? 'Add' : 'Edit',
        'categoryValue': props.values.category,
        'titleValue': props.values.title,
        'subtitleValue': props.values.subtitle,
        'contentValue': props.values.text,
        'changeHandler': props.handlers.change,
        'submitHandler': props.handlers.submit,
                }

    let selectOptions = [];
    selectOptions.push(<option key={-1} value=''>----CATEGORY----</option>);
    for(let x = 0; x < props.cats.length; x++){
        let ele =  <option key={x} value={props.cats[x]}>{props.cats[x]}</option>
        selectOptions.push(ele);
    };

    return ( 
        <form>
            <div className={classes.Form}>

                <h5 className={classes.FormTitle}>{config.title}</h5>

                <label className={classes.Container}>
                    <span className={classes.Title}>Category</span>
                    <select
                    id={'category'}
                    name={'post'}
                    className={classes.Field} 
                    defaultValue={config.categoryValue}
                    onChange={config.changeHandler}
                        > 
                        {selectOptions}
                     </select>
                </label>

                <label className={classes.Container}>

                    <span className={classes.Title}>Title</span>
                    <input className={classes.Field} 
                    id={'title'}
                    name={'post'}
                    type="text"
                    value={config.titleValue}
                    onChange={config.changeHandler}
                    />

                </label>

                <label className={classes.Container}>

                        <span className={classes.Title}>Subtitle </span>
                        <input 
                            id={'subtitle'}
                            name={'post'}
                            type="text" 
                            value={config.subtitleValue} 
                            onChange={config.changeHandler}
                            className={classes.Field}/>

                    </label>

                <label className={classes.Container}>

                    <span className={classes.Title}>Content</span>
                    <textarea
                        id={'text'}
                        name={'post'} 
                        type="text" 
                        value={config.contentValue} 
                        onChange={config.changeHandler}
                        className={classes.Field}/>

                </label>

                <label>
                    <Button 
                        btnType={config.btnType}
                        val={'post'}
                        clicked={config.submitHandler}
                        >
                            Submit
                        </Button>
                </label>
        </div>
        </form>
     );
}
 
export default postForm;
     
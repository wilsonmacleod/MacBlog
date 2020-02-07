import React from 'react';

import Aux from '../hoc/Auxiliary';
import DisplayContainer from '../DisplayContent/DisplayContainer/DisplayContainer';
import CategoryForm from './FormStore/CategoryForm';
import PostForm from './FormStore/PostForm';
import SelectForm from './FormStore/SelectForm';

import classes from './Forms.module.css';

const forms = (props) => {
    let cssClass = props.authd ? classes.FormContainer : classes.FormContainerDisabled;
    let actionCurrentlySelected = props.forms.selected;
    let formContent  = null;
    if(actionCurrentlySelected !== ''){
        if(actionCurrentlySelected === 'add'){
            formContent = 
                <Aux>
                    <CategoryForm 
                        type={actionCurrentlySelected} // add, relevant because also used to submit edits
                        values={props.forms.add.category}  // forms values
                        handlers={props.addEventHandlers} // event handlers
                    />
                    <PostForm 
                        type={actionCurrentlySelected}
                        cats={props.forms.currentCategories} // list of our active cats
                        values={props.forms.add.post}
                        handlers={props.addEventHandlers}
                    />
                </Aux>
    }else{
        formContent = <Aux>
            <SelectForm 
                data={props.forms.currentPosts.WelcomeMenu}  // data for cat
                type={actionCurrentlySelected} // edit or delete 
                handlers={props.addEventHandlers} // forms event handlers 
                class={'cat'} // type of obj this form will effect
                />
            <SelectForm 
                data={props.forms.currentPosts} 
                type={actionCurrentlySelected}
                handlers={props.addEventHandlers}
                class={'post'}
                />
            </Aux>
    }}
    return ( 
        <DisplayContainer>
            <div className={cssClass}>
                {formContent}
            </div>
        </DisplayContainer>
     );
}
 
export default forms;

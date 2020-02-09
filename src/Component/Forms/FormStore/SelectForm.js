import React from 'react';

import Options from '../../UI/Options/Options';

import classes from '../Forms.module.css'

const selectForm = (props) => {

    const editConfig = {
            'title': props.class === 'cat' ? 'EDIT CATEGORY' : 'EDIT POST',
            'btnType': 'Edit',
            'btnClick': props.handlers.edit,
        }
    const deleteConfig = {
        'title': props.class === 'cat' ? 'DELETE CATEGORY' : 'DELETE POST',
        'btnType': 'Delete',
        'btnClick': props.handlers.delete
                }

    const editOrDelete = {'edit': editConfig, 'delete': deleteConfig}
    const config = editOrDelete[props.type];
    
    let propsInstructions = props.data;
    let keys = Object.keys(propsInstructions);
    let mapArray = []
    for(let x = 0; x < keys.length - 1; x++){
        if(props.class !== 'cat'){
            let subDict = propsInstructions[keys[x]];
            try{
                subDict = subDict.menuTags.values();
            }catch{
                let arr = Array(subDict.menuTags);
                subDict = arr.values();
            }
            for(let each of subDict){
                if(each !== null){
                    each['cat'] = keys[x]
                    mapArray.push(each);
                }
            }
        }else{
            mapArray = propsInstructions;
        }
    }
    let menuRender = 
    mapArray.map(i => 
        <Options
            key={`${i.cat}-${i.key}`} 
            val={props.class === 'cat' ? 'cat' : 'post'}
            id={props.class === 'cat' ? i.key : `${i.cat}-${i.key}`}
            cat={props.class === 'cat' ? null : i.cat}
            title={i.title}
            description={i.description}
            btnType={config.btnType}
            clicked={config.btnClick}
        />
    )
    return ( 
        <div className={classes.SubFormContainer}>
            <h1 className={classes.FormTitle}>{config.title}</h1>
            {menuRender}
        </div>
     );
}
 
export default selectForm;
import React from 'react';

import DisplayContainer from './DisplayContainer/DisplayContainer';
import Article from './Article/Article';

const display = (props) => {
    let articleEle = null;
    if(props.content.display){
        articleEle = 
            props.content.articles.map(i =>
                <Article 
                    key={i.key}
                    title={i.title}
                    text={i.text}
                    imgs={i.imgs}
                />
                )

    }
    let ele = null;
    for(let x = 0; x < articleEle.length; x++){
        if(String(articleEle[x].key) === String(props.content.chosenArticle)){
            ele = articleEle[x];
        }
    }
    return (
        <DisplayContainer>
            {ele}
        </DisplayContainer>
      );
}
 
export default display;


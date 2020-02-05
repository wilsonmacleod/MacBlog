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
    return (
        <DisplayContainer>
            {articleEle[props.content.chosenArticle]}
        </DisplayContainer>
      );
}
 
export default display;


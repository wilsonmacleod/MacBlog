import React from 'react';
 
import MenuContainer from '../Menu/MenuContainer/MenuContainer';
import Boxes from '../Menu/Boxes/Boxes';
//menu stateful or func?

const menu = (props) => {
    console.log(props.menu.boxes)
    let propsInstructions = props.menu.boxes;
    let menuBoxRender = 
        propsInstructions.map(i => 
            <Boxes
                key={i.title}
                title={i.title}
                desc={i.description}
                pic={i.picture}
            />
            )
    return ( 
        <MenuContainer>
            {menuBoxRender}
        </MenuContainer>
     );
}
 
export default menu;
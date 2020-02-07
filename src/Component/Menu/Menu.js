import React from 'react';

import MenuContainer from '../Menu/MenuContainer/MenuContainer';
import Boxes from '../Menu/Boxes/Boxes';

const menu = (props) => {
    let propsInstructions = props.menu.boxes;
    let menuBoxRender = 
        propsInstructions.map(i => 
            <Boxes
                key={i.key}
                val={i.key}
                title={i.title}
                desc={i.description}
                pic={i.picture}
                clicked={props.selected}
            />
        )
    return (
        <MenuContainer containerType={props.menu.containerType}
        >
            {menuBoxRender}
        </MenuContainer>
     );
}
 
export default menu;
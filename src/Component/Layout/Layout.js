import React from 'react';

import Aux from '../hoc/Auxiliary';
import Header from './Header/Header';
import Button from '../UI/Button/Button';

const layout = (props) => {
    return ( 
        <Aux>
            <Header
                layout={props.layout}
            />
        </Aux>
     );
}
 
export default layout;
import React from 'react';

import Aux from '../../hoc/Auxiliary';
import Title from './Title/Title';
import Back from './Back/Back';

const header = (props) => {
    return (
        <Aux>
            <Title 
                title={props.layout.header.title}
            />
            <Back />
        </Aux>
      );
}
 
export default header;
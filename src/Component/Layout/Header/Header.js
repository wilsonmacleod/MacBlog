import React from 'react';

import Aux from '../../hoc/Auxiliary';
import Title from './Title/Title';
import Back from './Back/Back';

const header = () => {
    return (
        <Aux>
            <Title />
            <Back />
        </Aux>
      );
}
 
export default header;
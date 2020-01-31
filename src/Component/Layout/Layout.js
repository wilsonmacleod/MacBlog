import React from 'react';

import Header from './Header/Header';

const layout = (props) => {
    return ( 
        <Header
            layout={props.layout}
        />
     );
}
 
export default layout;
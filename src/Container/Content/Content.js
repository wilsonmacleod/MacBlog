import React, { Component } from 'react';

import Aux from '../../Component/hoc/Auxiliary';
import Layout from '../../Component/Layout/Layout';
import Boxes from '../../Component/Menu/Boxes/Boxes';

const Content = () => {
    return ( 
        <Aux>
            <Layout />
            <Boxes>Wilson</Boxes>
        </Aux>
     );
}
 
export default Content;
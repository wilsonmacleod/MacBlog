import React from 'react';

import Aux from '../hoc/Auxiliary';
import Header from './Header/Header';
import Button from '../UI/Button/Button';
import DropDown from '../UI/DropDown/DropDown';
import Admin from './Admin/Admin';

const layout = (props) => {
    return ( 
        <Aux>
            <Header
                layout={props.layout}
            />
            <Aux>
                <Button
                    btnType={'AdminMode'}
                    clicked={props.loginHandlers.toggleMode}>
                        ADMIN
                </Button>
                <DropDown
                            cssType={'Admin'}
                            displayDropDown={props.layout.admin.loginDisplay}
                        >
                            <Admin 
                                change={props.loginHandlers.change}
                                submit={props.loginHandlers.submit}
                            />
                        </DropDown>
            </Aux>
        </Aux>
     );
}
 
export default layout;
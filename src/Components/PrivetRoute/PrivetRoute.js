import React from 'react';
import { Redirect, Route,  } from 'react-router-dom';


const PrivetRoute = ({ children, ...rest }) => {
   
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
                sessionStorage.getItem('email') ? (
                     children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivetRoute;
import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                rest.profile.username != 'ANON' ? (
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
}
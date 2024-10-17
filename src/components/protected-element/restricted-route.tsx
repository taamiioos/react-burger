import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RestrictedRouteProps} from './../types/components-types'

export const RestrictedRoute: React.FC<RestrictedRouteProps> = ({children}) => {
    const isAuth = useSelector((state: { authUser: { isAuth: boolean } }) => state.authUser.isAuth);

    if (isAuth) {
        return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
};

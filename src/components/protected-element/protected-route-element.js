import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import PropTypes from 'prop-types';

export const ProtectedRouteElement = ({children}) => {
    const {isAuth} = useSelector(state => state.authUser);
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    return children;
};

ProtectedRouteElement.propTypes = {
    children: PropTypes.node.isRequired,
};
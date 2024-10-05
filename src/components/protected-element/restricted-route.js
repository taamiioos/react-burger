import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

export const RestrictedRoute = ({ children }) => {
    const { isAuth } = useSelector(state => state.authUser);
    if (isAuth) {
        return <Navigate to="/" replace />;
    }
    return children;
};

RestrictedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
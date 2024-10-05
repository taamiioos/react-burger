import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import App from './app';

const AppWrapper = () => {
    return (
        <Router>
            <App/>
        </Router>
    );
}

export default AppWrapper;

import React from "react";
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import "../css/options.css";
import OptionsPage from './options/optionPage';

ReactDOM.render(
    <React.StrictMode >
        <Router >
            <OptionsPage />
        </Router>
    </React.StrictMode >,
    window.document.getElementById("options-container")
);

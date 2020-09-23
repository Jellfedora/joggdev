import React from 'react';
// Import Redux Store
import { Provider } from "react-redux";
import store from '../../store';
// Import Sass
import "../../styles/index.scss";
// Import Components
import Home from "../Home";

// Fontawesome 5
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faReact, faFontAwesomeFlag } from '@fortawesome/free-brands-svg-icons'; //For brand icons
library.add(faFontAwesomeFlag, faTimesCircle, faReact, faArrowCircleDown);

const App = () => {
    return (
        <Provider store={store} className="app"  >
            <Home />
        </Provider>
    );
};
export default App;
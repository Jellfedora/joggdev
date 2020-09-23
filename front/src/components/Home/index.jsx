import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { connect } from 'react-redux';

import Header from '../Header';
import Goals from '../Goals';
import Admin from '../Admin';

const adminRoute = process.env.REACT_APP_ADMIN_ROUTE;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log(adminRoute)
    }

    render() {
        return (
            <div className="home">
                <Router>
                    <Header />
                    <Switch>
                        <Route path={adminRoute}>
                            <Admin />
                        </Route>
                        <Route path="/">
                            <Goals />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        isStart: state.home.isStart,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);


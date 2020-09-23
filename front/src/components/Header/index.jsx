import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="header">
                <Link to="/"><h1>JoggDev_</h1></Link>
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);


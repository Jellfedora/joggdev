import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import AdminGoals from '../AdminGoals';

const apiUrl = process.env.REACT_APP_REST_API;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {

        return (
            <div className="admin">
                <AdminGoals />
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
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);


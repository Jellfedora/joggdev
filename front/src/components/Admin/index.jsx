import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_REST_API;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goals: [],
            oldGoals: []
        };
    }

    componentDidMount() {
        axios.get(apiUrl + 'get-goals'
        ).then(response => {
            let goals = [];
            let oldGoals = [];
            response.data.map(function (item, i) {
                if (item.is_old) {
                    oldGoals.push(item)
                } else {
                    goals.push(item)
                }
            })

            this.setState({
                goals: goals,
                oldGoals: oldGoals
            })
        })
    }

    render() {

        return (
            <div className="goals">
                <h2>test</h2>
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
export default connect(mapStateToProps, mapDispatchToProps)(Admin);


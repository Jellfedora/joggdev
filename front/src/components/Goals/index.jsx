import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_REST_API;

class Goals extends Component {
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
        let goals = null;
        let oldGoals = null;
        console.log(this.state.goals)
        if (this.state.goals.length > 0) {
            goals = this.state.goals.map(function (item, i) {
                return (
                    <li className="goals__current-goals__list__item" key={i}>
                        <h4 className="goals__current-goals__list__item__title">{item.title}:</h4>
                        <span className="goals__current-goals__list__item__goal">{item.value}</span>
                    </li>
                )
            })

        }
        if (this.state.oldGoals.length > 0) {
            oldGoals = this.state.oldGoals.map(function (item, i) {

                return (
                    <li className="goals__current-goals__list__item" key={i}>
                        <h4 className="goals__current-goals__list__item__title">{item.title}:</h4>
                        <span className="goals__current-goals__list__item__goal">{item.value}</span>
                    </li>
                )

            })
        }

        return (
            <div className="goals">
                <h2 className="goals__title">Objectifs :</h2>
                {goals !== null &&
                    <div className="goals__current-goals">
                        <h3 className="goals__current-goals__title">En cours</h3>
                        <ul className="goals__current-goals__list">
                            {goals}

                        </ul>
                    </div>
                }

                {oldGoals &&
                    <div className="goals__old-goals">
                        <h3 className="goals__old-goals__title">Terminés</h3>
                        <ul className="goals__old-goals__list">
                            {oldGoals}
                        </ul>
                    </div>
                }
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
export default connect(mapStateToProps, mapDispatchToProps)(Goals);


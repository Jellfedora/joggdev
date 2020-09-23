import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';

class Goals extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="goals">
                <h2 className="goals__title">Objectifs :</h2>
                <div className="goals__current-goals">
                    <h3 className="goals__current-goals__title">En cours</h3>
                    <ul className="goals__current-goals__list">
                        <li className="goals__current-goals__list__item">
                            <h4 className="goals__current-goals__list__item__title">Poids:</h4>
                            <span className="goals__current-goals__list__item__goal">90 KG</span>
                        </li>
                        <li className="goals__current-goals__list__item">
                            <h4 className="goals__current-goals__list__item__title">Courir:</h4>
                            <span className="goals__current-goals__list__item__goal">30 min</span>
                        </li>
                        <li className="goals__current-goals__list__item">
                            <h4 className="goals__current-goals__list__item__title">Nbr clopes:</h4>
                            <span className="goals__current-goals__list__item__goal">15</span>
                        </li>
                    </ul>
                </div>
                <hr />
                <div className="goals__old-goals">
                    <h3 className="goals__old-goals__title">Terminés</h3>
                    <ul className="goals__old-goals__list">
                        <li className="goals__current-goals__list__item">
                            <h4 className="goals__old-goals__list__item__title">Poids:</h4>
                            <span className="goals__current-goals__list__item__goal">90 KG</span>
                        </li>
                        <li className="goals__current-goals__list__item">
                            <h4 className="goals__old-goals__list__item__title">Courir:</h4>
                            <span className="goals__current-goals__list__item__goal">30 min</span>
                        </li>
                        <li className="goals__current-goals__list__item">
                            <h4 className="goals__old-goals__list__item__title">Nbr clopes:</h4>
                            <span className="goals__current-goals__list__item__goal">15</span>
                        </li>
                    </ul>
                </div>
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


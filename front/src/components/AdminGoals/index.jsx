import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const apiUrl = process.env.REACT_APP_REST_API;

class AdminGoals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goals: [],
            oldGoals: [],
            open: false,
            newGoal: "",
            newValueGoal: ""
        };
        this.deleteGoal = this.deleteGoal.bind(this);
    }

    componentDidMount() {
        this.getGoals();
    }

    getGoals = () => {
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

    addGoals = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleNewGoalChange = (e) => {
        let idTarget = e.target.value;
        this.setState({ newGoal: idTarget });
    }

    handleNewValueGoalChange = (e) => {
        let idTarget = e.target.value;
        this.setState({ newValueGoal: idTarget });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post(apiUrl + 'add-goal', {
            title: this.state.newGoal,
            value: this.state.newValueGoal
        })
            .then(response => {
                this.setState({ open: false });
                this.getGoals();
            })
            .catch(error => {
                console.log(error)
            });
    }

    deleteGoal = (id) => {
        axios.delete(apiUrl + 'delete-goal/' + id)
            .then(response => {
                this.getGoals();
            })
            .catch(error => {
                console.log(error)
            });
    }

    editGoal = (id) => {
        axios.post(apiUrl + 'edit-goal/' + id)
            .then(response => {
                this.getGoals();
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        const { open } = this.state;
        let goals = null;
        let oldGoals = null;
        if (this.state.goals.length > 0) {
            goals = this.state.goals.map(function (item, i) {
                return (
                    <li className="admin__goals__current-goals__list__item" key={i}>
                        <div className="admin__goals__current-goals__list__item__text">
                            <h4 className="admin__goals__current-goals__list__item__text__title">{item.title}:</h4>
                            <span className="admin__goals__current-goals__list__item__text__goal">{item.value}</span>
                        </div>
                        <div className="admin__goals__current-goals__list__item__buttons">
                            <button onClick={() => this.editGoal(item.id)}>
                                <FontAwesomeIcon
                                    icon="arrow-circle-down"
                                    size="1x"
                                />
                            </button>
                            <button onClick={() => this.deleteGoal(item.id)}>
                                <FontAwesomeIcon
                                    icon="times-circle"
                                    size="1x"
                                />
                            </button>
                        </div>
                    </li>
                )
            }, this)

        }
        if (this.state.oldGoals.length > 0) {
            oldGoals = this.state.oldGoals.map(function (item, i) {

                return (
                    <li className="admin__goals__current-goals__list__item" key={i}>
                        <div className="admin__goals__current-goals__list__item__text">
                            <h4 className="admin__goals__current-goals__list__item__text__title">{item.title}:</h4>
                            <span className="admin__goals__current-goals__list__item__text__goal">{item.value}</span>
                        </div>
                        <button onClick={() => this.deleteGoal(item.id)}>
                            <FontAwesomeIcon
                                icon="times-circle"
                                size="1x"
                            />
                        </button>
                    </li>
                )

            }, this)
        }
        return (
            <div className="admin__goals">
                <Modal open={open} onClose={this.onCloseModal} center showCloseIcon={false}>
                    <input type="text" placeholder="Objectif" value={this.state.newGoal} onChange={this.handleNewGoalChange} />
                    <input type="text" placeholder="Valeur" value={this.state.newValueGoal} onChange={this.handleNewValueGoalChange} />
                    <button onClick={this.handleSubmit}>Valider</button>
                </Modal>
                <h2 className="admin__goals__title">Objectifs</h2>
                <div className="admin__goals__content">
                    <div className="admin__goals__current-goals">
                        <div className="admin__goals__current-goals__header">
                            <h3 className="admin__goals__current-goals__title">En cours</h3>
                            <button onClick={this.addGoals}>+</button>
                        </div>
                        <ul className="admin__goals__current-goals__list">
                            {goals}
                        </ul>
                    </div>
                    <hr />
                    <div className="admin__goals__old-goals">
                        <h3 className="admin__goals__old-goals__title">Terminés</h3>
                        <ul className="admin__goals__old-goals__list">
                            {oldGoals}
                        </ul>
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminGoals);


import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import axios from 'axios';
import Header from '../Header';
import Goals from '../Goals';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post_content: null
        };
    }

    componentDidMount() {

        axios.get('http://localhost/running_wp/back/index.php/wp-json/wp/v2/posts/1'
        ).then(response => {
            console.log(response.data)
            this.setState({ post_content: response.data.content.rendered })
        })
            .catch(error => {
            });
    }

    render() {
        return (
            <div className="home">
                <Header />
                <Goals />
                <div className="example__component__title">


                    <div
                        dangerouslySetInnerHTML={{
                            __html: this.state.post_content
                        }}></div>
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
        isStart: state.home.isStart,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);


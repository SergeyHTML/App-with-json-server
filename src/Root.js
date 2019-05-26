import React, {Component} from 'react'
import PropTypes from 'prop-types'
import App from './App'
import {Provider} from 'react-redux'

class Root extends Component{
    static propTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        return (
            <Provider store = {this.props.store}>
                <App />
            </Provider>
        )
    }
}

export default Root

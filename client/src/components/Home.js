import React, { useEffect } from 'react'
import { setNightMode } from '../actions/stateActions'
import { getList } from '../actions/listActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Home.css'
import List from './List'

function Home(props) {

    Home.propTypes = {
        currentState: PropTypes.bool
    }

    const nightModeHandler = () => {
        // Get the checkbox
        var checkBox = document.querySelector(".button");
        if (checkBox.checked === true){
            props.setNightMode(true)
        } else {
            props.setNightMode(false)
        }
    }

    useEffect(() => {
        props.getList()
    })
    return (
        <div 
            className="home" 
            style={{
                background: props.currentState.nightMode === true ?
                    '#333' : 'skyblue'
            }}>
            <div className="homeHeader">
                <input class="button" onClick={nightModeHandler} type="checkbox"></input>
            </div>
            <div className="lists">
                <div className="section">
                    <List title="Habit" />
                    <List title="Daily" />
                </div>
                <div className="section">
                    <List title="To-Do" />
                    <List title="Reward" />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentState: state.state,
    Lists: state.list
})

export default connect(mapStateToProps, { setNightMode, getList } )(Home)
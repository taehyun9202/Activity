import React, { useState } from 'react'
import './List.css'
import Item from './Item'
import AddIcon from '@material-ui/icons/Add';
import { addList } from '../actions/listActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function List(props) {
    const [ name, setName ] = useState('')

    List.propTypes = {
        Lists: PropTypes.array
    }

    const createList = e => {
        e.preventDefault()
        props.addList(name, props.title)
        //// won't reset name
        setName('')
    }

    const changeColor = type => {
        if(type ==="Habit") {
            return [0, 255, 0]
        } else if(type === "Daily") {
            return [200, 255, 0]
        } else if(type === "To-Do") {
            return [0, 125, 255]
        }
        return [255, 0, 0]
    }

    return (
        <div className="list">
            <h1>{props.title}</h1>
            <form className="form" onSubmit={createList} >
                <input placeholder={`Enter ${props.title}`} onChange={e => setName(e.target.value)}/>
                <button ><AddIcon fontSize="large"/></button>
            </form>

            <div className="bar" />
            <div className="itemList">
                { props.Lists.map((item) => (
                    item.type === props.title ?
                    <div>
                        <Item item={item} color={changeColor(item.type)} />
                    </div> : null
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    Lists: state.list
})

export default connect(mapStateToProps, { addList } )(List)
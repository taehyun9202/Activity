import React, { useEffect, useState } from 'react'
import './Item.css'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EventIcon from '@material-ui/icons/Event';
import TimerIcon from '@material-ui/icons/Timer';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-modal';
import { editList } from '../actions/listActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Record from './Record';
import Checklist from './Checklist';

function Item(props) {
    const [ open, setOpen ] = useState(false)
    const [ modalIsOpen,setIsOpen ] = useState(false);
    const [ checkList, setCheckList ] = useState('')
    const [ count, setCount ] = useState(0)
    const [ counting, setCounting ] = useState(false)
    const [ percentage, setPercentage ] = useState(0)
    const [ completed, setCompleted ] = useState(false)

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        height                : '80%',
        width                 : '500px',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',

      },
      overlay: {
          zIndex: 1000,
          backgroundColor : `rgba(${props.color[0]},${props.color[1]}, ${props.color[2]}, 0.65)`
        }
    }

    Item.propTypes = {
        Lists: PropTypes.array
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }
    const createChecklist = (type) => {
        console.log(props.item)
        props.editList(props.item.id, type, checkList)
    }

    const startCount = () => {
        setCounting(true)
        setInterval(() => {
                setCount(previousCount => 
                    previousCount < props.item.duration ? previousCount + 1 : previousCount
                )
            },1000)
            setCounting(!counting)
        }
    useEffect(() => {
        if(props.item.duration) {
            setPercentage((count / props.item.duration * 100).toString())
            if(count >= props.item.duration) {
                setCompleted(true)
            }
        } else if(props.item.checklist) {
            setPercentage((count / props.item.checklist.length * 100).toString())
            if(count >= props.item.duration) {
                setCompleted(true)
            }
        }
    }, [count])
    
    const deleteItem = (id) => {
        

    }

    const completedChecklist = e => {
        setCount(e)
    }
    
    return (
        <div className="item">
            <div className="header" style={{border: `1px solid rgb(${props.color[0]},${props.color[1]}, ${props.color[2]})` }}>
                { open ?
                    <RemoveIcon fontSize="large" onClick={() => setOpen(!open)} style={{background: `rgb(${props.color[0]},${props.color[1]}, ${props.color[2]})`}} /> :
                    <AddIcon fontSize="large" onClick={() => setOpen(!open)} style={{background: `rgb(${props.color[0]},${props.color[1]}, ${props.color[2]})`}} />
                }
                <div className="title" onClick={() => openModal(!modalIsOpen)}>
                    <div className="bar" style={{background: `rgb(${props.color[0]},${props.color[1]}, ${props.color[2]})`,width: `calc(10px + ${percentage * 4 / 5}%)`}} />
                    <h3>
                        {props.item.name}
                        {props.item.duration ?
                            <span className="duration">
                                {count} / {props.item.duration}
                            </span> : null
                        }
                    </h3>
                </div>
            </div>
            
            <div className="content" style={{background: `rgba(${props.color[0]},${props.color[1]}, ${props.color[2]}, 0.4)`}}>
                <div className="buttons">
                    { props.item.duration && completed === false && counting === false ?
                        <PlayArrowIcon  onClick={startCount} fontSize="small"/>
                         : null
                    }
                    { props.item.duration && completed === false && counting ?
                        <PauseIcon fontSize="small"/>
                         : null
                    }
                    { props.item.duration && completed ?
                        <CheckIcon  onClick={startCount} fontSize="small"/> : null
                    }
                    <DeleteForeverIcon fontSize="small" onClick={() => deleteItem(props.item.id)}/>

                </div>
                <div>
                    { open ? 
                        <div>
                            { props.item.duration ? 
                                <Record record={[30, 27, 25, 21, 0, 28, 0, 28, 30, 26]} /> : null
                            }
                            { props.item.checklist ? 
                                <Checklist checklist={props.item.checklist} percentage={completedChecklist}/> : null
                            }
                        </div> : null
                    }
                </div>
            </div>





            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <div className="modalHeader" style={{backgroundColor: `rgb(${props.color[0]},${props.color[1]}, ${props.color[2]})`}}>
                    <div className="modalHeader_1">
                        <h2>{props.item.name}</h2>
                        <div className="modalHeaderButtons">
                            <button onClick={closeModal}>close</button>
                            <button >Save</button>
                        </div>
                    </div>
                    <div className="modalHeader_2">
                        <h3>Title*</h3>
                        <input placeholder={props.item.name}/>
                    </div>
                </div>
                <div className="modalContent">
                    <div className="checklists">
                        <h4>Checklist</h4>
                        {props.item.checklist?.map((item) => (
                            <input placeholder={item} />
                        ))}
                        <form>
                            <input placeholder="New Checklist Item" onChange={e => setCheckList(e.target.value)} />
                            <AddIcon onClick={() => createChecklist("checklist")}/>
                        </form>
                    </div>
                    <div className="checklists">
                        <h4>Start Date</h4>
                    </div>
                    <div className="checklists">
                        <h4>Due Date</h4>
                    </div>
                    <div className="checklists">
                        <h4>Duration</h4>
                    </div>
                    
                </div>
            </Modal>  
        </div>
    )
}

const mapStateToProps = state => ({
    Lists: state.list
})

export default connect(mapStateToProps, { editList } )(Item)
import React, { useState } from 'react'
import './Checklist.css'

function Checklist(props) {
    const [ percentage, setPercentage ] = useState(0)
    
    const onClickHandler = () => {
        var count = document.querySelectorAll('input[type="checkbox"]:checked').length
        props.percentage(count)
    }

    return (
        <div className="checklist">
            { props.checklist.map((item) => (
                <div className="checklistContent" style={{display:"flex", flexDirection:"row"}}>
                    <input id="inputbox" type="checkbox" onClick={onClickHandler}/>
                    <p>{item}</p>
                </div>
            ))}
        </div>
    )
}

export default Checklist

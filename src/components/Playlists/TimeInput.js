
import React, { useState, useEffect } from 'react'

const TimeForm = (props) => {
    const [TimeInput, setTimeInput] = useState(10)

    useEffect(() => {
        props.onTimeInputChange(TimeInput)
    })

    return(
        <div>
            <h2>now tell me the time</h2>
            <div className="time_input_area">
                <input
                    className="time_input"
                    value={TimeInput}
                    onChange={(event)=>setTimeInput(event.target.value)}
                    type="number"
                >
                </input>
                Minutes
            </div>
        </div>
    )
}

export default TimeForm
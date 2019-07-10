import React, { useState, useEffect } from 'react'

const NameForm = (props) => {
    const [NameInput, setNameInput] = useState()
    
   useEffect(() => {
        props.onNameInputChange(NameInput)
   })
   
    return(
        <div>
            <h3>Name the new playlist</h3>
            <input
                value={NameInput}
                onChange={(event)=>setNameInput(event.target.value)}
                >
            </input>
        </div>
    )
}
export default NameForm;
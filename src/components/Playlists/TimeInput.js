
import React, { Component } from 'react'

class TimeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeInput: 10
        }
    }

    handleTimeInputChange(event) {
        this.setState({
            timeInput: event.target.value
        }, this.props.onTimeInputChange(event.target.value))
    }
    
    render() {
        return (
            <div>
                <h2>...write down the time</h2>
                <div className="Pla_Inp_Chi">
                    <input
                        className="Tim_Inp"
                        value={this.state.timeInput}
                        onChange={(event) => this.handleTimeInputChange(event)}
                        type="number"
                    >
                    </input>
                    Min
            </div>

            </div>
        )
    }
}


export default TimeForm;

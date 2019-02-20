import React, { Component } from 'react'

class NameForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nameInput: ""
        }
    }

    handleNameInputChange(event) {
        this.setState({
            nameInput: event.target.value
        }, this.props.onNameInputChange(event.target.value))
    }

    render() {
        return (
            <div>
                <h3>Name the new playlist</h3>
                <input
                    value={this.state.nameInput}
                    onChange={(event) => this.handleNameInputChange(event)}
                >
                </input>

            </div>
        )
    }
}
export default NameForm;
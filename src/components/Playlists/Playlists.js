import React, { Component } from 'react'
import axios from 'axios';
import { getId, getPlaylists, createPlaylist, addTracks } from './requests';
import { newPlaylist } from './returnNewPlaylist'
import NameForm from './NameInput';
import TimeForm from './TimeInput';

class Playlists extends Component {
    constructor(props) {
        super(props)
        /*state will start with "method", where the user will select where 
        the new playlist will come from*/
        this.state = {
            id: "",
            playlists: "",
            timeInput: "",
            activePlaylist: "",
            showNameInput: false,
            requiredInput: false,
            showTimeInput: false,
            showDone: false
        }
    }

    getUserPlaylists = async (props) => {
        await axios(getId()).then(response => {
            this.setState({
                id: response.data.id
            })
        })

        await axios(getPlaylists(this.state.id)).then(response => {
            this.setState({
                playlists: {
                    dom: response.data.items.map(playlist => {
                        console.log(playlist)

                        return (
                            <li className="Pla_Lis"
                                key={playlist.id}
                                onClick={() => this.changeToSelected(playlist)}
                            >
                                <span>{playlist.name}</span>
                                <span>{playlist.tracks.total} tracks</span>
                            </li>)
                    }),
                    obj: response.data.items
                }
            })
        })
    }
    changeToSelected(playlist) {
        console.log(playlist)
        this.setState({
            playlists: {
                dom: <h3>{playlist.name} selected</h3>,
                obj: playlist
            },

            showTimeInput: true,
        })
    }
    handleTimeInputChange(event) {
        this.setState({
            timeInput: event.target.value
        })
    }

    handleButtonClick() {
        this.setState({
            showNameInput: true
        })
    }
    setTimeInput(value) {
        this.setState({
            timeInput: value
        })
    }
    setNameInput(value) {
        this.setState({
            nameInput: value
        })
    }
    componentDidMount() {
        this.getUserPlaylists(this.props)
    }

    async generatePlaylist() {
        await newPlaylist(this.state.playlists.obj.id, this.state.timeInput).then(value => {
            let tracks = []
            value.map((track) => {
                tracks.push(track.track.uri)
            })
            console.log("tracks", tracks)
            this.setState({
                newPlaylist: tracks
            })
        })


        await axios(createPlaylist(this.state.nameInput, this.state.id)).then(async (response) => {
            console.log(response.data.id)
            console.log("state obj", this.state)
            await axios(addTracks(this.state.newPlaylist, response.data.id)).then((response, error) => {
                this.setState({
                    showNameInput: false,
                    requiredInput: false,
                    showTimeInput: false,
                    showDone: true
                })
            })
        })
    }
    render() {
        return (
            <div className="Pla_Pan">
                <h1>Hello {this.state.id}!</h1>
                <div className="Pla_Pla">
                    <h2>Use one of your playlists:</h2>
                    <ul>{this.state.playlists.dom} </ul>

                </div>
                <div className="Pla_Inp">
                    {this.state.showTimeInput &&
                        <div>
                            <TimeForm onTimeInputChange={(value) => this.setTimeInput(value)} />
                            <button
                                onClick={() => this.handleButtonClick()}
                            >Done
                    </button>
                        </div>}
                    {this.state.showNameInput &&
                        <div>
                            <NameForm onNameInputChange={(value) => this.setNameInput(value)} />
                            <button className="Nam_But"
                                onClick={() => this.generatePlaylist()}
                            >Create Playlist
                            </button>
                        </div>
                    }
                    {this.state.showDone &&
                        <div>
                            <h1>Done!</h1>
                            <h2>Now you can listen to your new playlist</h2>
                        </div>
                        }
                </div>

            </div>
        )
    }

}

export default Playlists;
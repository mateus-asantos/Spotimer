import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { getId, getPlaylists, createPlaylist, addTracks } from './requests';
import { newPlaylist } from './returnNewPlaylist'
import NameForm from './NameInput';
import TimeForm from './TimeInput';


const Playlists = (props) => {
    const [State, setState] = useState({
        id: "",
        playlists: "",
        timeInput: "",
        activePlaylist: "",
        showNameInput: false,
        requiredInput: false,
        showTimeInput: false,
        showDone: false
    })

    const getUserPlaylists = async () => {
        await axios(getId()).then(response => {
            setState({ ...State, id: response.data.id })
        })

        await axios(getPlaylists(State.id)).then(response => {
            setState({
                ...State, playlists: {
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

    const changeToSelected = (playlist) => {
        console.log(playlist)
        setState({
            ...State,
            playlists: {
                dom: <h3>{playlist.name} selected</h3>,
                obj: playlist
            },
            showTimeInput: true
        })
    }


    const handleTimeInputChange = (event) => {
        setState({
            ...State,
            timeInput: event.target.value
        })
    }

    const handleButtonClick = () => {
        setState({
            ...State,
            showNameInput: true
        })
    }

    const setTimeInput = (value) => {
        setState({
            ...State,
            timeInput: value
        })
    }
    
    const setNameInput = (value) => {
        setState({
            ...State,
            nameInput: value
        })
    }

    useEffect(() => {
        getUserPlaylists(props)
    }, [])

    const generatePlaylist = async () => {
        await newPlaylist(State.playlists.obj.id, State.timeInput).then((value) => {
            let tracks = []
            value.map((track) => {
                tracks.push(track.track.uri)
            })
            setState({
                ...State,
                newPlaylist:tracks
            })
        })
        
        await axios(createPlaylist(State.nameInput, State.id)).then(async (response) => {
            console.log(response.data.id)
            console.log("State obj", State)
            await axios(addTracks(State.newPlaylist, response.data.id)).then((response, error) => {
                setState({
                    ...State,
                    showNameInput: false,
                    requiredInput: false,
                    showTimeInput: false,
                    showDone: true
                })
            })
        })
    }

    return(
        <div className="Pla_Pan">
        <h1>Hello {State.id}!</h1>
        <div className="Pla_Pla">
            <h2>Use one of your playlists:</h2>
            <ul>{State.playlists.dom} </ul>

        </div>
        <div className="Pla_Inp">
            {State.showTimeInput &&
                <div>
                    <TimeForm onTimeInputChange={(value) => setTimeInput(value)} />
                    <button
                        onClick={() => handleButtonClick()}
                    >Done
            </button>
                </div>}
            {State.showNameInput &&
                <div>
                    <NameForm onNameInputChange={(value) => setNameInput(value)} />
                    <button className="Nam_But"
                        onClick={() => generatePlaylist()}
                    >Create Playlist
                    </button>
                </div>
            }
            {State.showDone &&
                <div>
                    <h1>Done!</h1>
                    <h2>Now you can listen to your new playlist</h2>
                </div>
            }
        </div>

    </div>
   
    )
}


export default Playlists;
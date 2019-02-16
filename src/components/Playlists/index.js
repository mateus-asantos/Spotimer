import React, { Component } from 'react'
import axios from 'axios';

class Playlists extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:'',
            playlists: ''
        }
    }

    getUserPlaylists = async (props) => {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,

            q = props.access_token.substring(1);
        e = r.exec(q)

        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }

        /* --------------------------------------------------------------------------------------- */

        const options = {
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + hashParams.access_token
            },
        }

       await axios(options).then(response=>{
            this.setState({
                id:response.data.id
            })
        })

        /* --------------------------------------------------------------------------------------- */

        const options2 = {
            method: 'get',
            url: 'https://api.spotify.com/v1/users/' + this.state.id + '/playlists',
            headers: {
                'Authorization': 'Bearer ' + hashParams.access_token
            },
        };

        await axios(options2).then(response => {
            this.setState({
                playlists: response.data.items.map(playlist => {
                    return(<li key={playlist.id}>
                        {playlist.name}
                    </li>)
                })
            })
        })
    }

    componentDidMount() {

        this.getUserPlaylists(this.props)

    }



    render() {
        return (
            <div>
                <h1>{this.state.id}'s playlists</h1>
                <ul>
                    {this.state.playlists}
                </ul>
            </div>
        )
    }

}

export default Playlists;
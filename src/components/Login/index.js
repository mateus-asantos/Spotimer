import React from 'react'

const handleClick = () => {
    window.location.href = 'https://accounts.spotify.com/authorize?client_id=b622a56a0e12443a88d4b6e4a2c89d66&response_type=token&redirect_uri=https://spotimer.netlify.com&scope=playlist-read-private playlist-modify-private playlist-modify-public user-top-read user-read-recently-played user-library-read'
}


export const Login = () => {
    return (
        <div>
            <h1>I'll make a playlist with a set time duration for you</h1>
            <h1>Who are you again?</h1>
            <button onClick={() => handleClick()}>ENTER</button>
        </div>
    )
}

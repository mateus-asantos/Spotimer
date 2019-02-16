import React from 'react'

const handleClick = () => {
    window.location.href = 'https://accounts.spotify.com/authorize?client_id=b622a56a0e12443a88d4b6e4a2c89d66&response_type=token&redirect_uri=http://localhost:3000&scope=playlist-read-private playlist-modify-private'
}


export const Login = () => {
    return (<button onClick={() => handleClick()}>ENTRAR</button>)
}
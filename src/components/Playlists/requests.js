
//transform hash params on the url into a object
const getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)

    while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
    }
    return hashParams
}

//get the user id
export const getId = () => {
    const hashParams = getHashParams();

    const options = {
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + hashParams.access_token
        },
    }

    return options;
}

//get user's playlists
export const getPlaylists = (id) => {
    const hashParams = getHashParams();

    const options = {
        method: 'get',
        url: 'https://api.spotify.com/v1/users/' + id + '/playlists',
        headers: {
            'Authorization': 'Bearer ' + hashParams.access_token
        },
    };

    return options
}

//get playlist's tracks
export const getPlaylistTracks = (playlistId) => {
    const hashParams = getHashParams();

    const options = {
        method: 'get',
        url: 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks',
        headers: {
            'Authorization': 'Bearer ' + hashParams.access_token
        },
    }
    return options;
}

//create a new playlist
export const createPlaylist = (name, id) => {
    const hashParams = getHashParams();
    const options = {
        method: 'post',
        url: 'https://api.spotify.com/v1/users/' + id + '/playlists',
        headers: {
            'Authorization': 'Bearer ' + hashParams.access_token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            name: name, public: false
        }),
        json: true
    }
    return options;
}

//add tracks to playlist
export const addTracks = (tracks, playlistId) => {
    const hashParams = getHashParams();
    console.log('tracks', tracks)
    let options = {
        method: 'post',
        url: 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks',
        headers: {
            'Authorization': 'Bearer ' + hashParams.access_token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            uris: tracks,
        }),
        json: true
    }
    console.log('options',options)
    return options;
}
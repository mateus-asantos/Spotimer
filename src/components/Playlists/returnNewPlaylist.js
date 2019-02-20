import { getPlaylistTracks } from './requests';
import axios from 'axios';

export const newPlaylist = async (playlistId, time) => {
    let playlist = [];
    const ms = 60000; //1 minute

    await axios(getPlaylistTracks(playlistId)).then(response => {
        let playTime = time * ms;
        let maxTime = 0;

        response.data.items.every((item) => {
            if (maxTime+item.track.duration_ms >= playTime) {
                return false
            } else {
                playlist.push(item)
                maxTime = maxTime + item.track.duration_ms;
                return true
            }
        })
        const difference = Math.abs(maxTime - playTime)
        let closest = response.data.items.reduce((prev, curr) => {
            return (Math.abs(curr.track.duration_ms - difference) < Math.abs(prev.track.duration_ms - difference) ? curr : prev)
        })

        playlist.push(closest)
        console.log(playlist)
    })
    return playlist;
}
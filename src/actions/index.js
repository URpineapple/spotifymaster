import { PLAY_AUDIO, PAUSE_AUDIO, SWITCH_AUDIO, GET_URI } from '../constant.js'

export const playAudio = (previewUrl) => ({
    type: PLAY_AUDIO,
    payload: {
        playingUrl: previewUrl
    }
});

export const pauseAudio = () => ({
    type: PAUSE_AUDIO
})

export const switchAudio = (previewUrl) => ({
    type: SWITCH_AUDIO,
    payload: {
        playingUrl: previewUrl
    }
})


export const getURI = (uri) => ({
    type: GET_URI,
    payload: {
        uri: uri
    }
})
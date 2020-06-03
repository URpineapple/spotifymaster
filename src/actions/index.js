import { PLAY_AUDIO, PAUSE_AUDIO, SWITCH_AUDIO, PAUSE_CURRENT } from '../constant.js'

export const playAudio = (previewUrl) => ({
    type: PLAY_AUDIO,
    payload: {
        type: PLAY_AUDIO,
        previewUrl
    }
});

export const pauseAudio = () => ({
    type: PAUSE_AUDIO
})

export const switchAudio = (previewUrl) => ({
    type: SWITCH_AUDIO,
    payload: {
        previewUrl
    }
})

export const pauseCurrentAudio = () => ({
    type: PAUSE_CURRENT
})
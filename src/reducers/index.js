import { PLAY_AUDIO, PAUSE_AUDIO, SWITCH_AUDIO, GET_URI } from '../constant.js'

const initialState = {
    playing: false,
    playingUrl: '',
    audio: null,
    uri: ''
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case PLAY_AUDIO:
            let currAudio = new Audio(action.payload.playingUrl)
            currAudio.play()
            state = {
                playing: true,
                playingUrl: action.payload.playingUrl,
                audio: currAudio
            }
            return state;

        case PAUSE_AUDIO:
            if (state.audio != null) { state.audio.pause() }
            state = {
                ...reducers,
                playing: false
            }
            return state;

        case SWITCH_AUDIO:
            if (state.audio != null) { state.audio.pause() }
            let newAudio = new Audio(action.payload.playingUrl)
            state = {
                playing: true,
                playingUrl: action.payload.playingUrl,
                audio: newAudio
            }
            state.audio.play()
            return state;

        case GET_URI:
            let uri = action.payload.uri
            state ={
                ...state,
                uri
            }
            return state;
        default:
            return state;
    }

}

export default reducers;
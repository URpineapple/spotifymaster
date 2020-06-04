import { PLAY_AUDIO, PAUSE_AUDIO, SWITCH_AUDIO } from '../constant.js'

const initialState = {
    playing: false,
    playingUrl: '',
    audio: null
}

function playSong(currAudio, previewUrl) {
    this.setState({
        playingUrl: previewUrl,
        playing: true,
        audio: currAudio
    })
}


function pauseCurrentAudio() {
    this.state.audio.pause()
}

function switchSong(currAudio, previewUrl) {
    this.setState({
        playingUrl: previewUrl,
        audio: currAudio
    })
}

function handlePlay(previewUrl) {
    let audio = new Audio(previewUrl)
    if (!this.state.playing) {
        audio.play()
        playSong(audio, previewUrl)
    } else {
        if (this.state.playingUrl == previewUrl) {
            pauseCurrentAudio()
        } else {
            this.pauseCurrentAudio()
            audio.play()
            switchSong(audio, previewUrl)
        }
    }
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case PLAY_AUDIO:
            console.log('Action PLAY_AUDIO')
            console.log('action.playingUrl', action.payload.playingUrl)
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
            // newAudio.play()
            state = {
                playing: true,
                playingUrl: action.payload.playingUrl,
                audio: newAudio
            }
            state.audio.play()
            return state;

        default:
            return state;
    }

}

export default reducers;
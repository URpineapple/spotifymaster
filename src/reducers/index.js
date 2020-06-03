import { PLAY_AUDIO, PAUSE_AUDIO, SWITCH_AUDIO, PAUSE_CURRENT } from '../constant.js'

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
            let currAudio = new Audio(action.playingUrl)
            currAudio.play()
            state = {
                playing: true,
                playingUrl: action.playingUrl,
                audio: currAudio
            }
            break;

        case PAUSE_AUDIO:
            state.audio.pause()
            state = {
                ...reducers,
                playing: false
            }
            break;

        case SWITCH_AUDIO:
            state.audio.pause()
            let newAudio = new Audio(action.playingUrl)
            newAudio.play()
            state = {
                playing: true,
                playingUrl: action.playingUrl,
                audio: currAudio
            }
            break;

        case PAUSE_CURRENT:
            state = {
                ...reducers,
                playing: false
            }
            break;

        default:
            return state;
    }

}

export default reducers;
import * as actions from '../actions/types'

const initialState = {
    nightMode: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.NIGHT_MODE:
            return {
                ...state,
                nightMode: action.payload.nightMode
            }

        default:
            return state
    }
}
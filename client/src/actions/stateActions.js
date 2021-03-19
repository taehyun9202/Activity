import * as actions from './types'

export const setNightMode = mode => {
    return {
        type: actions.NIGHT_MODE,
        payload: { nightMode: mode }
    }
}
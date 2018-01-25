import C from './constants'
import { combineReducers } from 'redux'
import { GAME_STATE } from '../util/util';

export const context = (state = null, action) => {
    switch (action.type) {
        case C.SET_CONTEXT:
            return action.payload
        default:
            return state
    }
}

export const screen = (state = {}, action) => {
    switch (action.type) {
        case C.SET_SCREEN:
            return ({ width: action.payload.width, height: action.payload.height, ratio: action.payload.ratio })
        default:
            return state
    }
}

export const keys = (state = {}, action) => {
    switch (action.type) {
        case C.SET_EVENT_KEYS:
            return (action.payload)
        case C.RESET_EVENT_KEYS:
            return ({
                left: 0,
                right: 0,
                up: 0,
                down: 0
            }
            )
        default:
            return state
    }
}

export const game = (state = {}, action) => {
    switch (action.type) {
        case C.SET_GAME_STATE:
            return ({
                intro: (action.payload === GAME_STATE.INTRO) ? true : false,
                select: (action.payload === GAME_STATE.SELECT) ? true : false,
                inGame: (action.payload === GAME_STATE.CLASSIC) ? true : false,
                about: (action.payload === GAME_STATE.ABOUT) ? true : false,
                awards: (action.payload === GAME_STATE.AWARDS) ? true : false
            }
            )
        default:
            return state
    }
}

export const timeValue = (state = 0, action) => {
    switch (action.type) {
        case C.SET_TIME_VALUE:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const topScore = (state = 0, action) => {
    switch (action.type) {
        case C.SET_TOP_SCORE:
            return parseInt(action.payload)
        default:
            return state
    }
}

export const steps = (state = 0, action) => {
    switch (action.type) {
        case C.SET_STEPS:
            return parseInt(action.payload)
        default:
            return state
    }
}

export default combineReducers({
    context,
    screen,
    keys,
    game,
    stats: combineReducers({
        timeValue,
        steps,
        topScore
    })
})

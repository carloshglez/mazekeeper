import C from './constants'

/*----------------------------------------------------------*/
/*----------------------------------------------------------*/
export function setScreen(screen) {
    return {
        type: C.SET_SCREEN,
        payload: screen
    }
}

export function setEventKeys (keys) {
    return {
        type: C.SET_EVENT_KEYS,
        payload: keys
    }
}

export function resetEventKeys () {
    return {
        type: C.RESET_EVENT_KEYS
    }
}

export function setContext (context) {
    return {
        type: C.SET_CONTEXT,
        payload: context
    }
}

export function setGameState (gameState) {
    return {
        type: C.SET_GAME_STATE,
        payload: gameState
    }
}

/*----------------------------------------------------------*/
/*----------------------------------------------------------*/

export function setTimeValue (value) {
    return {
        type: C.SET_TIME_VALUE,
        payload: value
    }
}

export function setTopScore (score) {
    return {
        type: C.SET_TOP_SCORE,
        payload: score
    }
}

export function setSteps (value) {
    return {
        type: C.SET_STEPS,
        payload: value
    }
}

/*----------------------------------------------------------*/
/*----------------------------------------------------------*/
export function setCurrentMaze (currentMaze) {
    return {
        type: C.SET_CURRENT_MAZE,
        payload: currentMaze
    }
}

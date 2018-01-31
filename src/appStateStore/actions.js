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

export function setTimeCounter (value) {
    return {
        type: C.SET_TIME_COUNTER,
        payload: value
    }
}

export function setTopSteps (value) {
    return {
        type: C.SET_TOP_STEPS,
        payload: value
    }
}

export function setTopTime (value) {
    return {
        type: C.SET_TOP_TIME,
        payload: value
    }
}

export function setCurrentSteps (value) {
    return {
        type: C.SET_CURRENT_STEPS,
        payload: value
    }
}

export function setCurrentTime (value) {
    return {
        type: C.SET_CURRENT_TIME,
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

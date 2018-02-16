import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import Connector from './Connector';
import storefactory from './appStateStore'

const initialState = {
    context: null,
    screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
    },
    keys: {
        left: 0,
        right: 0,
        up: 0,
        down: 0
    },
    game: {
        intro: true,
        select: false,
        inGame: false,
        about: false
    },
    stats: {
        timeCounter: 0,
        topSteps: 0,
        topTime: 0,
        currentSteps: 0,
        currentTime: 0,
        currentPosition: [0,0]
    },
    currentMaze: {
        id: 0,
		maxTime: 60,
		maxSteps: 100,
		blockSize: 28,
		map: []
    }
}

render(
    <Provider store={storefactory(initialState)}>
        <Connector />
    </Provider>,
    document.getElementById('root')
);

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
        about: false,
        awards: false
    },
    stats: {
        topScore: 0,
        steps: 0,
        timeValue: 0,
    }
}

render(
    <Provider store={storefactory(initialState)}>
        <Connector />
    </Provider>,
    document.getElementById('root')
);

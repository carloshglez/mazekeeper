import React from 'react';
import { NEW_MAP } from '../util/util';

export default class Intro extends React.Component {
    render() {
        return (
            <div>
                <div className='title'>
                    KEEPER
                </div>
                <div className='intro'>
                    <button
                        className='infoButton'
                        onClick={this.props.gameSelect.bind(this, NEW_MAP)}>
                        S T A R T
                    </button>
                </div>
                <div className='help-info legal'>
                    v{this.props.appVersion} - &copy;2018
                </div>
            </div>
        );
    }
}

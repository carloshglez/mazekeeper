import React from 'react';
import { isMobileDevice } from '../util/util'
import MdArrowBack from 'react-icons/lib/md/arrow-back'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowForward from 'react-icons/lib/md/arrow-forward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'

export default class ButtonsPanel extends React.Component {
    render() {
        let buttonsLayer;
        let keysHelp;

        if(!isMobileDevice()) {
            keysHelp = (
                <div className='help-info instructions'>
                Use [A][W][S][D] or [<MdArrowBack />][<MdArrowUpward />][<MdArrowDownward />][<MdArrowForward />] to MOVE<br/>
                </div>
            );
        } else {
            buttonsLayer = (
                <div className='movelayer' {...this.props.customEvents}></div>
            );
        }
        return (
            <div>
				{keysHelp}
                {buttonsLayer}
            </div>
        );
    }
}

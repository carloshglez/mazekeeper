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
            /*buttonsLayer = (
                <div className='movelayer' {...this.props.customEvents}></div>
            );*/
            buttonsLayer = (
                <div>
                    <button id='left'   className='actionButton btnLeft' 	onClick={this.props.handleButtonTouch.bind(this, 'left')}> 	<MdArrowBack />		</button>
                    <button id='up'     className='actionButton btnUp' 		onClick={this.props.handleButtonTouch.bind(this, 'up')}>	<MdArrowUpward />	</button>
                    <button id='right'  className='actionButton btnRight' 	onClick={this.props.handleButtonTouch.bind(this, 'right')}>	<MdArrowForward />	</button>
                    <button id='down'   className='actionButton btnDown' 	onClick={this.props.handleButtonTouch.bind(this, 'down')}>	<MdArrowDownward />		</button>
                </div>
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

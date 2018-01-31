import React from 'react';
import MdAccessAlarm from 'react-icons/lib/md/access-alarm'
import MdStars from 'react-icons/lib/md/stars'
import GoSteps from 'react-icons/lib/go/steps'
import MdExitToApp from 'react-icons/lib/md/exit-to-app'
import Progress from 'react-progressbar';

export default class ScorePanel extends React.Component {
    render() {
        let timeValueForLabel = (this.props.time * 100) / 60;
		timeValueForLabel = (timeValueForLabel > 100) ? 100 : timeValueForLabel;
        return (
            <div className='scorelayer'>
                <span className='score top-score'>
                    <MdStars /> Top Steps: {new Intl.NumberFormat().format(this.props.steps)}
                </span>
                <span className='score current-score'>
                    <GoSteps /> Steps: {new Intl.NumberFormat().format(this.props.steps)} / {this.props.mazeMap.maxSteps}
                </span>
                <span className='score settings-score'>
                    <MdExitToApp onClick={this.props.endGame.bind(this)} />
                </span>
                <span className='score time-score'>
                    <div style={{ float: 'left' }}><MdAccessAlarm /></div>
                    <Progress className={(timeValueForLabel < 30 && timeValueForLabel > 0) ? 'time-meter flashit' : 'time-meter'} color='WhiteSmoke' completed={timeValueForLabel} />
                </span>
            </div>
        );
    }
}

import React from 'react';
import MdAccessAlarm from 'react-icons/lib/md/access-alarm'
import MdStars from 'react-icons/lib/md/stars'
import MdStarOutline from 'react-icons/lib/md/star-outline'
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
                    <MdStarOutline /> Steps: {new Intl.NumberFormat().format(this.props.steps)}
                </span>
                <span className='score time-score'>
                    <div style={{ float: 'left' }}><MdAccessAlarm /></div>
                    <Progress className='time-meter' color='WhiteSmoke' completed={timeValueForLabel} />
                </span>
            </div>
        );
    }
}

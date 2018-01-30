import React from 'react';

import FaRepeat from 'react-icons/lib/fa/repeat'
import MdExitToApp from 'react-icons/lib/md/exit-to-app'
import FaTrophy from 'react-icons/lib/fa/trophy'

export default class EndGame extends React.Component {
	render() {
        let message = 'message here...';

		return (
      		<div className='endgame'>
				<div className='stats'>
					<div className='stat-title'>
                        <br/>
						<h4>Results:</h4>
						<p>
							Your Steps:<br/>
                            Top Steps:<br/>
							<br/>
							Your Time:<br/>
							Top Time:<br/>
						</p>
						<hr/>
						<b>&nbsp;{ message }</b>
                        <br/>
                        <br/>
					</div>
					<div className='stat-value'>
						<h3>&nbsp;</h3>
						<p>
							{new Intl.NumberFormat().format(this.props.steps)}	<br/>
							{new Intl.NumberFormat().format(this.props.mazeMap.maxSteps)}	<br/>
							<br/>
							{this.props.time}	seg.<br/>
							{this.props.mazeMap.maxTime} seg.<br/>
						</p>
					</div>
				</div>
				<div className='retry'>
					<h2>Game Over!</h2>
					<button
						className='infoButton'
						onClick={ this.props.displayControlPanel.bind(this, this.props.mazeNumber) }>
						<FaRepeat/> Try again?
					</button>
					<button
						className='infoButton'
						onClick={ this.props.gameSelect.bind(this, 0) }>
						<MdExitToApp/> Exit
					</button>
				</div>
            </div>
		);
	}
}

import React from 'react';

import FaRepeat from 'react-icons/lib/fa/repeat'
import MdExitToApp from 'react-icons/lib/md/exit-to-app'
import FaTrophy from 'react-icons/lib/fa/trophy'

export default class EndGame extends React.Component {
	render() {
        let recordMessage = [
			<div><div className='got-award'><FaTrophy/></div>New record!</div>,
			'You Win!'
			]
		let winMessage = [
			<div>Great job! :)</div>,
			'Game Over!'
			]
		let lostMessage = [
			<div>:( So sad...</div>,
			'Game Over!'
			]
		let message = lostMessage;

		return (
      		<div className='endgame'>
				<div className='stats'>
					<div className='stat-title'>
						<h4>Results:</h4>
						<p>
							Your Steps:<br/>
                            Top Steps:<br/>
							<br/>
							Your Time:<br/>
							Top Time:<br/>
						</p>
						<br/>
						<br/>
                        <br/>
					</div>
					<div className='stat-value'>
						<h4>&nbsp;</h4>
						<p>
							{this.props.steps} / {this.props.mazeMap.maxSteps}	<br/>
							{0}	<br/>
							<br/>
							{this.props.time} / {this.props.mazeMap.maxTime}	seg.<br/>
							{0} seg.<br/>
						</p>
						<hr/>
						{message[0]}
					</div>
				</div>
				<div className='retry'>
					<h2>{message[1]}</h2>
					<button
						className='infoButton'
						onClick={ this.props.displayControlPanel.bind(this, this.props.mazeMap.id) }>
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

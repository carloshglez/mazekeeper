import React from 'react';

import FaRepeat from 'react-icons/lib/fa/repeat'
import MdExitToApp from 'react-icons/lib/md/exit-to-app'
import FaTrophy from 'react-icons/lib/fa/trophy'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'

export default class EndGame extends React.Component {
	exitFound() {
		return (this.props.currentPosition[0] === this.props.exitPosition.row
			&& this.props.currentPosition[1] === this.props.exitPosition.column);
	}
	timeOver() {
		return (this.props.time === 0);
	}
	stepsLimitExceeded() {
		return (this.props.steps > this.props.mazeMap.maxSteps);
	}
	giveUp() {
		return (!this.exitFound() && !this.timeOver() && !this.stepsLimitExceeded());
	}

	render() {
		let endGameMessage;
		console.log("endGame reason:");
		if (this.stepsLimitExceeded()) {
			console.log("stepsLimitExceeded");
			endGameMessage = [
				<div>:| You walked so much...</div>,
				'Game Over!'
			];
		} else if (this.exitFound()) {
			console.log("exitFound");
			endGameMessage = [
				<div><div className='got-award'><FaThumbsUp /></div>:) Great job!</div>,
				'You Win!'
			];
		} else if (this.giveUp()) {
			console.log("giveUp");
			endGameMessage = [
				<div>:O Give Up!</div>,
				'Game Over!'
			];
		} else if (this.timeOver()) {
			console.log("timeOver");
			endGameMessage = [
				<div>:( Time Over!...</div>,
				'Game Over!'
			];
		}

		return (
			<div className='endgame'>
				<div className='stats'>
					<div className='stat-title'>
						<h4>Results:</h4>
						<p>
							Your Steps:<br />
							Top Steps:<br />
							<br />
							Your Time:<br />
							Top Time:<br />
						</p>
						<br />
						<br />
						<br />
					</div>
					<div className='stat-value'>
						<h4>&nbsp;</h4>
						<p>
							{this.props.steps} / {this.props.mazeMap.maxSteps}	<br />
							{this.props.currentPosition[0]},{this.props.currentPosition[1]}	<br />
							<br />
							{this.props.time} / {this.props.mazeMap.maxTime}	seg.<br />
							{this.props.exitPosition.row},{this.props.exitPosition.column} seg.<br />
						</p>
						<hr />
						{endGameMessage[0]}
					</div>
				</div>
				<div className='retry'>
					<h2>{endGameMessage[1]}</h2>
					<button
						className='infoButton'
						onClick={this.props.displayControlPanel.bind(this, this.props.mazeMap.id)}>
						<FaRepeat /> Try again?
					</button>
					<button
						className='infoButton'
						onClick={this.props.gameSelect.bind(this, 0)}>
						<MdExitToApp /> Exit
					</button>
				</div>
			</div>
		);
	}
}

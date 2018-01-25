import React from 'react';

import IScroll from 'iscroll'
import MdStars from 'react-icons/lib/md/stars'
import MdStarOutline from 'react-icons/lib/md/star-outline'
import MdArrowBack from 'react-icons/lib/md/arrow-back'
import MdLock from 'react-icons/lib/md/lock'
import MdInfo from 'react-icons/lib/md/info'
import FaTrophy from 'react-icons/lib/fa/trophy'
import MdExitToApp from 'react-icons/lib/md/exit-to-app'
import { isPassive, isMobileDevice } from '../util/util';
import { MAZE_WORLD } from '../util/mazes'

export default class SelectGame extends React.Component {
	constructor(props) {
		super(props);
		this.myScroll = null;
		this.currentMaze = 3;
	}

	componentDidMount() {
		if (isMobileDevice()) {
			this.myScroll = new IScroll(this.refs.wrapper, { scrollX: true, scrollY: false, probeType: 3 });
			window.addEventListener('touchmove', function (e) { e.preventDefault(); },
				isPassive() ? {
					capture: false,
					passive: false
				} : false
			);
		}
	}

	componentWillUnmount() {
		if (isMobileDevice()) {
			this.destroy();
		}
	}

	destroy() {
		window.removeEventListener('touchmove', function (e) { e.preventDefault(); });
		this.myScroll.destroy();
		this.myScroll = null;
	}

	getMazeButton(mazeNumber) {
		var properStyle = 'mazeButton disabled';
		var icon = <MdStarOutline/>;
		if (mazeNumber < this.currentMaze) {
			properStyle = 'mazeButton visited';
			icon = <MdStars/>
		} else if (mazeNumber === this.currentMaze) {
			properStyle = 'mazeButton current';
		}

		return (
			<button className={properStyle} onClick={null}>{icon}Maze {mazeNumber}</button>
		);
	}

	render() {
		var indents = [];
		for (var i = 0; i < MAZE_WORLD.length; i++) {
			indents.push(
			<li key={i}>
				{this.getMazeButton(i)}<br />
				{(++i < MAZE_WORLD.length) ? this.getMazeButton(i) : null}
			</li>);
		}
		return (
			<div>
				<div className='iconPanel upper-corner-left-first'>
					<MdExitToApp onClick={this.props.displayIntro} />
				</div>
				<div className='iconPanel upper-corner-right-first'>
					<MdInfo onClick={this.props.displayAbout} />
				</div>

				<div className='selectgame'>
					<h3>Select a Maze:</h3>
				</div>
				<div id='wrapper' className='wrapper-sg' ref='wrapper'>
					<div id='scroller' className='scroller-sg'>
						<ul>
							{indents}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

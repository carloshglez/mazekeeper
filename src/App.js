import React, { Component } from 'react';
import MdAccessAlarm from 'react-icons/lib/md/access-alarm'
import MdStars from 'react-icons/lib/md/stars'
import MdStarOutline from 'react-icons/lib/md/star-outline'
import Progress from 'react-progressbar';

import './styles/style.css';
import Maze from './components/Maze'
import Intro from './views/Intro'
import SelectGame from './views/SelectGame'
import ScorePanel from './views/ScorePanel'
import ButtonsPanel from './views/ButtonsPanel'
import About from './views/About'
import { TITLE_MAP, ABOUT_MAP, KEY, GAME_STATE } from './util/util'

export default class App extends Component {
	constructor(props) {
		super(props);
		this.appVersion = '1.0.0';
		this.actions = props.actions;

		this.maze = [];
		this.blocks = [];

		this.createObject(new Maze({
			mazeMap: TITLE_MAP,
			create: this.createObject.bind(this),
			addSteps: this.addSteps.bind(this)
		}), 'maze');

	}

	getState() {
		return this.props.state;
	}

	componentDidMount() {
		window.addEventListener('keyup', this.handleKeys.bind(this, false));
		window.addEventListener('keydown', this.handleKeys.bind(this, true));
		window.addEventListener('resize', this.handleResize.bind(this, false));

		const context = this.refs.canvas.getContext('2d');
		this.actions.setContext(context);

		//this.startTimer(null, 30);
		requestAnimationFrame(() => { this.update() });
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.handleKeys);
		window.removeEventListener('keydown', this.handleKeys);
		window.removeEventListener('resize', this.handleResize);
	}

	handleResize(value, e) {
		this.actions.setScreen(
			{
				width: window.innerWidth,
				height: window.innerHeight,
				ratio: window.devicePixelRatio || 1,
			}
		);
	}

	handleKeys(value, e) {
		let keys = this.getState().keys;
		if (e.keyCode === KEY.LEFT || e.keyCode === KEY.A) keys.left = value;
		if (e.keyCode === KEY.RIGHT || e.keyCode === KEY.D) keys.right = value;
		if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value;
		if (e.keyCode === KEY.DOWN || e.keyCode === KEY.S) keys.down = value;
		this.actions.setEventKeys(keys);
	}

	getTouchEvents() {
		let touchEvents = {
			onTouchStart: this.handleTouch.bind(this, 'touchStart'),
			onTouchMove: this.handleTouch.bind(this, 'touchMove'),
			onTouchEnd: this.handleTouch.bind(this, 'touchEnd'),
			onMouseDown: this.handleTouch.bind(this, 'mouseDown'),
			onMouseMove: this.handleTouch.bind(this, 'mouseMove'),
			onMouseUp: this.handleTouch.bind(this, 'mouseUp')
		};
		return touchEvents;
	}

	setActiveKey(activeKey = 'none') {
		this.actions.setEventKeys({
			left: (activeKey === KEY.LEFT) ? true : false,
			right: (activeKey === KEY.RIGHT) ? true : false,
			up: (activeKey === KEY.UP) ? true : false,
			down: (activeKey === KEY.DOWN) ? true : false
		},
		);
	}

	handleTouch(value, e) {
		e.persist()
		let keys = this.getState().keys;
		let action = e.currentTarget.id;

		if (e.touches && (value === 'mouseDown' || value === 'touchStart')) {
			this.toucheY = e.touches[0].clientY;
			this.toucheX = e.touches[0].clientX;
		} else if (value === 'mouseUp' || value === 'touchEnd') {
			this.setActiveKey();
		} else if (value === 'onMouseMove' || value === 'touchMove') {
			var changeToucheY = e.changedTouches[0].clientY;
			var changeToucheX = e.changedTouches[0].clientX;
			if (Math.abs(this.toucheX - changeToucheX) < 10 && this.toucheY > changeToucheY) {
				this.setActiveKey(KEY.UP);
			}
			else if (Math.abs(this.toucheX - changeToucheX) < 10 && this.toucheY < changeToucheY) {
				this.setActiveKey(KEY.DOWN);
			}
			else if (Math.abs(this.toucheY - changeToucheY) < 10 && this.toucheX > changeToucheX) {
				this.setActiveKey(KEY.LEFT);
			}
			else if (Math.abs(this.toucheY - changeToucheY) < 10 && this.toucheX < changeToucheX) {
				this.setActiveKey(KEY.RIGHT);
			} else {
				this.setActiveKey();
			}
		}
	}

	update() {
		const context = this.getState().context;
		context.save();
		context.scale(this.getState().screen.ratio, this.getState().screen.ratio);

		// Motion trail
		context.fillStyle = 'Green';
		context.globalAlpha = 0.4;
		context.fillRect(0, 0, this.getState().screen.width, this.getState().screen.height);
		context.globalAlpha = 1;

		this.updateObjects(this.maze, 'maze')
		this.updateObjects(this.blocks, 'blocks')

		context.restore();

		// Next frame
		requestAnimationFrame(() => { this.update() });
	}

	createObject(item, group) {
		this[group].push(item);
	}

	updateObjects(items, group) {
		let index = 0;
		for (let item of items) {
			if (item.delete) {
				this[group].splice(index, 1);
			} else {
				items[index].render(this.getState());
			}
			index++;
		}
	}

	deleteBlocks() {
		this.blocks.forEach(block => {
			block.destroy();
		});
	}

	addSteps() {
		this.actions.setSteps(this.getState().stats.steps + 1);
	}

	increaseTimeCounter(time) {
		this.actions.setTimeValue(this.getState().stats.timeValue + time);
	}

	startTimer(item, time) {
		this.increaseTimeCounter(time);
		clearInterval(this.timerID);
		this.timerID = setInterval(
			() => this.tick(item),
			1000
		);
	}

	tick(item) {
		if (this.getState().stats.timeValue > 0) {
			this.increaseTimeCounter(-1);
		} else {
			clearInterval(this.timerID);
			console.log('Lose!')
			//item.disableAllPowerUp();
		}
	}

	displayIntro() {
		this.deleteBlocks();
		this.actions.setGameState(GAME_STATE.INTRO);
		this.maze[0].updateBackgroundMaze(TITLE_MAP, GAME_STATE.INTRO);
	}

	displayGameSelect(mazeNumber) {
		this.deleteBlocks();
		this.actions.setGameState(GAME_STATE.SELECT);
		this.maze[0].updateMaze(mazeNumber, GAME_STATE.SELECT);
	}

	displayAbout() {
		this.deleteBlocks();
		this.actions.setGameState(GAME_STATE.ABOUT);
		this.maze[0].updateBackgroundMaze(ABOUT_MAP, GAME_STATE.ABOUT);
	}

	render() {
		let introGame;
		let selectGame;
		let controlPanel;
		let endGame;
		let about;
		let awards;

		if (this.getState().game.intro) {
			introGame = <Intro appVersion={this.appVersion} gameSelect={this.displayGameSelect.bind(this)}/>
		}
		if (this.getState().game.select) {
			selectGame = <SelectGame displayIntro={this.displayIntro.bind(this)} displayAbout={this.displayAbout.bind(this)} updateMaze={this.displayGameSelect.bind(this)}/>
		}
		if (this.getState().game.about) {
			about = <About gameSelect={this.displayGameSelect.bind(this)} appversion={this.appVersion} />
		}
		return (
			<div>
				{
					/*
					<ScorePanel time={this.getState().stats.time} steps={this.getState().stats.steps} />
					<ButtonsPanel customEvents={this.getTouchEvents()} />
					*/
				}
				{introGame}
				{selectGame}
				{controlPanel}
				{endGame}
				{about}
				{awards}

				<canvas ref='canvas'
					width={this.getState().screen.width * this.getState().screen.ratio}
					height={this.getState().screen.height * this.getState().screen.ratio} />
			</div>
		);
	}
}

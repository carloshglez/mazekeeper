import { BLOCK_TYPE, randomNumBetween } from '../util/util'

export default class Block {
	constructor(args) {
		this.visible = false;
		this.blockSize = args.blockSize;
		this.translate = args.translate;
		this.position = args.position;
		this.type = args.type;
		this.fillColor = args.fillColor;
		this.strokeColor = args.strokeColor;
		this.shadowBlur = args.shadowBlur || 0;
		this.shadowColor = args.shadowColor || 'none';
		this.globalAlpha = args.globalAlpha || 1;
	}

	destroy() {
		this.timerID = setTimeout(
			() => {this.delete = true;},
			randomNumBetween(100, 700)
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render(state) {
		// Draw
		const context = state.context;
		context.save();
		context.translate(this.translate.x, this.translate.y);
		context.fillStyle = this.fillColor;
		context.strokeStyle = this.strokeColor;

		context.beginPath();
		context.rect(
			this.position.x,
			this.position.y,
			this.blockSize,
			this.blockSize);
		context.shadowBlur = this.shadowBlur;
		context.shadowColor = this.shadowColor;
		context.globalAlpha = this.globalAlpha;

		context.closePath();
		context.stroke();
		context.fill();

		context.restore();
	}
}

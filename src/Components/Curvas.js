
import { isOverState } from "./Utils";
import Bezcurve from './Classes/Bezcurve';
import Coord from './Classes/Coord';

/*
* 
* Description:
*   Some functions for drawing curves 
* Authors:
*   Andres Alletez Duran, ID: 117520958
*   Joaquin Barrientos Monge, ID: 117440348
*   Oscar Ortiz Chaletria, ID: 208260347
*   David Zarate Marin, ID: 116770797
*   Group: 01
*   Schedule: 10am 
* 
*/



const STATE={
	RADIUS:20
}

const clean=(context)=>{
	
      if(context){
		context.clearRect(0, 0, 600, 600);
		context.lineWidth = 3;
		context.globalAlpha=0.3;
	  }
}


//temporal, works for self loop and curves among the canvas rectangle
export const  drawTempTransition = (state, mousePos, context3, hoveredState) =>{

	clean(context3);


	context3.strokeStyle = context3.fillStyle = "rgb(6, 11, 16)";

	let src = {x:state.x,y: state.y};
	//let dst = {x:mousePos.x, y:mousePos.y};

	let aux_angle = Math.atan2(mousePos.y - src.y, mousePos.x - src.x);
	let multiplier = 20;//20;
	mousePos.x = mousePos.x - Math.cos(aux_angle) * multiplier;
	mousePos.y = mousePos.y - Math.sin(aux_angle) * multiplier;
	src.x = src.x + Math.cos(aux_angle) * multiplier;
	src.y = src.y + Math.sin(aux_angle) * multiplier;

	//let vector2_dir = {x:dst.x - src.x,
	//	y: dst.y - src.y};
	//vector2_dir = normalizeVector(vector2_dir); //***** */
	//vector2_dir = multiplyVector(vector2_dir, 20);

	let middle_pt1 = {x:src.x + (mousePos.x - src.x)/3,
		y:src.y + (mousePos.y - src.y)/3};

	let middle_pt2 = {x:src.x + 2*(mousePos.x - src.x)/3,
		y:src.y + 2*(mousePos.y - src.y)/3};

	let vector2_ort = {x:src.y - mousePos.y,
		y:mousePos.x - src.x};
	vector2_ort = normalizeVector(vector2_ort); //** */
	vector2_ort = multiplyVector(vector2_ort, 7.5);

	//let arrow_pt = {x:dst.x - (vector2_dir.x * 2) + vector2_ort.x * 2,
	//	y:dst.y - (vector2_dir.y * 2) + vector2_ort.y};

	let aux_mlt = Math.sqrt(Math.pow(mousePos.x - src.x, 2) + Math.pow(mousePos.y - src.y, 2)) / 40;

	let quadPoint1 = {x:middle_pt1.x + vector2_ort.x * aux_mlt,
		y: middle_pt1.y + vector2_ort.y * aux_mlt};

	let quadPoint2 = {x:middle_pt2.x + vector2_ort.x * aux_mlt,
		y:middle_pt2.y + vector2_ort.y * aux_mlt};

	//line
	context3.moveTo(src.x, src.y);
	context3.bezierCurveTo(quadPoint1.x,
		quadPoint1.y,
		quadPoint2.x,
		quadPoint2.y,
		mousePos.x,
		mousePos.y);

	
	
		if ( isOverState(state,mousePos) ) {
			context3.beginPath();
			context3.globalAlpha = 0.3;
			context3.arc(state.x - 20,
				state.y - 20,
				20,
				39.3,
				12,
				false);
			context3.stroke();

			let arrow_p1 = {x:state.x,
				y:state.y - 20};
			let arrow_p2 = {x:arrow_p1.x - 20 / 3 - 2,
				y:arrow_p1.y - 20 / 2};
			let arrow_p3 = {x:arrow_p1.x + 20 / 3 - 3,
				y:arrow_p1.y - 20 / 2 - 3};
			context3.beginPath();
			context3.moveTo(arrow_p1.x, arrow_p1.y);
			context3.lineTo(arrow_p2.x, arrow_p2.y);
			context3.lineTo(arrow_p3.x, arrow_p3.y);
			//context3.closePath();
			context3.fill();
			return;
		}


		context3.stroke();

		context3.beginPath();
	
		let arrowAngle = Math.atan2(quadPoint2.x - mousePos.x, quadPoint2.y - mousePos.y) + Math.PI;
		let arrowWidth = 13;
	
		context3.moveTo(mousePos.x - (arrowWidth * Math.sin(arrowAngle - Math.PI / 6)), 
		mousePos.y - (arrowWidth * Math.cos(arrowAngle - Math.PI / 6)));
	
		context3.lineTo(mousePos.x, mousePos.y);
	
		context3.lineTo(mousePos.x - (arrowWidth * Math.sin(arrowAngle + Math.PI / 6)), 
		mousePos.y - (arrowWidth * Math.cos(arrowAngle + Math.PI / 6)));
	
		context3.fill();
}


export const drawTransitionCircle=(context3, tr, text, clear=true)=> {
	
	if(clear) clean(context3);
	context3.globalAlpha=1;
	if(!clear)	context3.lineWidth = 3;
	//if(tr.color!==undefined)context3.strokeStyle = context3.fillStyle = "rgb(6, 11, 16)";
	//context3.strokeStyle = context3.fillStyle = "rgb(194, 95, 0)";
	tr.color!==undefined? context3.strokeStyle = context3.fillStyle = "rgb(6, 11, 16)" :context3.strokeStyle = context3.fillStyle = "rgb(194, 95, 0)";
	let center = {x:tr.x,
		y:tr.y};
	//let arrow_tilt = new Coord(10, 3);
	let arrow_p1 = {x:0,y: 0};
	let arrow_p2 = {x:0, y:0};
	let arrow_p3 = {x:0,y: 0};



		context3.font = "15px Georgia";

		center = {x: tr.x - STATE.RADIUS,
			y: tr.y - STATE.RADIUS};

		arrow_p1 = { x:tr.x,
			y: tr.y - STATE.RADIUS};
		arrow_p2 = {x: arrow_p1.x - STATE.RADIUS / 3 - 2,
			y: arrow_p1.y - STATE.RADIUS / 2};
		arrow_p3 = {x: arrow_p1.x + STATE.RADIUS / 3 - 3,
			y: arrow_p1.y - STATE.RADIUS / 2 - 3};

		//tr.cyclealignment = "topleft";

		context3.textAlign = "right";
		context3.textBaseline = "top";
		context3.fillText(text===undefined?'':text,
			center.x - STATE.RADIUS - 2,
			center.y - STATE.RADIUS / 2);
	




	context3.beginPath();

	context3.arc(center.x,
		center.y,
		STATE.RADIUS,
		39.3,
		12,
		false);

	context3.stroke();

	context3.beginPath();
	context3.moveTo(arrow_p1.x, arrow_p1.y);
	context3.lineTo(arrow_p2.x, arrow_p2.y);
	context3.lineTo(arrow_p3.x, arrow_p3.y);
	context3.closePath();
	context3.fill();
	//tr.curve = new Bezcurve(tr, quadPoint1, quadPoint2, tr);
	//symbol
	if(!clear)tr.curve=new Bezcurve({x:tr.x,y:tr.y}, 0, 0, {x:tr.x,y:tr.y},{id: tr.id, symbol: text });
	context3.font = "15px Georgia";
}

export const drawTransitionOver=(ctx, tr, naming=false, clear=true)=> {
	if(clear) clean(ctx);
	ctx.globalAlpha=1;

	if(naming)ctx.strokeStyle = ctx.fillStyle = "rgb(194, 95, 0)";
	if(!naming)ctx.strokeStyle = ctx.fillStyle = "rgb(6, 11, 16)";
	ctx.beginPath();
	//if(naming)console.log(tr)
	let src = new Coord(tr.state_src.x,
		tr.state_src.y);
	let dst = new Coord(tr.state_dst.x,
		tr.state_dst.y);

	let aux_angle = Math.atan2(dst.y - src.y, dst.x - src.x);
	let multiplier = STATE.RADIUS;
	dst.x = dst.x - Math.cos(aux_angle) * multiplier;
	dst.y = dst.y - Math.sin(aux_angle) * multiplier;
	src.x = src.x + Math.cos(aux_angle) * multiplier;
	src.y = src.y + Math.sin(aux_angle) * multiplier;



	let middle_pt1 = new Coord(src.x + (dst.x - src.x)/3,
		src.y + (dst.y - src.y)/3);

	let middle_pt2 = new Coord(src.x + 2*(dst.x - src.x)/3,
		src.y + 2*(dst.y - src.y)/3);

	let vector2_ort = new Coord(src.y - dst.y,
		dst.x - src.x);
	vector2_ort = normalizeVector(vector2_ort);
	vector2_ort = multiplyVector(vector2_ort, 7.5);

	//let arrow_pt = new Coord(dst.x - (vector2_dir.x * 2) + vector2_ort.x * 2,
		//dst.y - (vector2_dir.y * 2) + vector2_ort.y);

	let aux_mlt = Math.sqrt(Math.pow(dst.x - src.x, 2) + Math.pow(dst.y - src.y, 2)) / 40;

	let quadPoint1 = new Coord(middle_pt1.x + vector2_ort.x * aux_mlt,
		middle_pt1.y + vector2_ort.y * aux_mlt);

	let quadPoint2 = new Coord(middle_pt2.x + vector2_ort.x * aux_mlt,
		middle_pt2.y + vector2_ort.y * aux_mlt);

	//line
	ctx.moveTo(src.x, src.y);
	ctx.bezierCurveTo(quadPoint1.x,
		quadPoint1.y,
		quadPoint2.x,
		quadPoint2.y,
		dst.x,
		dst.y);

	tr.curve = new Bezcurve(src, quadPoint1, quadPoint2, dst, {id: tr.id, symbol: tr.symbol, src_info : {x : tr.state_src.x, y : tr.state_src.y}, dst_info : {x : tr.state_dst.x, y : tr.state_dst.y} } );

	ctx.stroke();

	//arrow
	ctx.beginPath();
	// ctx.moveTo(arrow_pt.x - vector2_ort.x,
	// 	arrow_pt.y - vector2_ort.y);
	// ctx.lineTo(arrow_pt.x + vector2_ort.x,
	// 	arrow_pt.y + vector2_ort.y);
	// ctx.lineTo(arrow_pt.x + vector2_dir.x,
	// 	arrow_pt.y + vector2_dir.y);
	// ctx.closePath();

	let arrowAngle = Math.atan2(quadPoint2.x - dst.x, quadPoint2.y - dst.y) + Math.PI;
	let arrowWidth = 13;

	ctx.moveTo(dst.x - (arrowWidth * Math.sin(arrowAngle - Math.PI / 6)), 
	           dst.y - (arrowWidth * Math.cos(arrowAngle - Math.PI / 6)));

	ctx.lineTo(dst.x, dst.y);

	ctx.lineTo(dst.x - (arrowWidth * Math.sin(arrowAngle + Math.PI / 6)), 
	           dst.y - (arrowWidth * Math.cos(arrowAngle + Math.PI / 6)));

	ctx.fill();
	drawTrText(ctx, src, dst, tr.symbol, aux_mlt, vector2_ort)


}
const normalizeVector=(vec) =>{
	let aux = Math.pow(vec.x, 2) + Math.pow(vec.y, 2);
	aux = Math.sqrt(aux);

	return {x:vec.x / aux, y:vec.y / aux};
}


const multiplyVector=(vec, value)=> {
	return {x:vec.x * value,y: vec.y * value};
}

const drawTrText=(ctx, src, dst, symbol, aux_mlt, vector2_ort)=>{
	let text_pos = new Coord(0, 0);
	text_pos = new Coord(src.x + (dst.x - src.x)/2 + vector2_ort.x * aux_mlt,
		src.y + (dst.y - src.y)/2 + vector2_ort.y * aux_mlt);

	if (Math.abs(src.y - dst.y) < 40) {
		if (src.x < dst.x) {
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
		}
		else {
			ctx.textAlign = "center";
			ctx.textBaseline = "bottom";
		}
	}
	else {
		if (src.y < dst.y) {
			ctx.textAlign = "right";
			ctx.textBaseline = "middle";
		}
		else {
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
		}
	}

	//symbol
	ctx.font = "15px Georgia";
	ctx.fillText(symbol,
		text_pos.x,
		text_pos.y);
}

export const  drawHoverTrans=(ctx,src, dst, quadPoint1,quadPoint2, symbol)=>{

	ctx.lineWidth = 3;
	ctx.globalAlpha=1;
	ctx.strokeStyle = ctx.fillStyle = "rgb(145, 127, 49)";
	ctx.beginPath();
	ctx.moveTo(src.x, src.y);
	ctx.bezierCurveTo(quadPoint1.x,
		quadPoint1.y,
		quadPoint2.x,
		quadPoint2.y,
		dst.x,
		dst.y);
		ctx.stroke();

		//arrow
		ctx.beginPath();
		let arrowAngle = Math.atan2(quadPoint2.x - dst.x, quadPoint2.y - dst.y) + Math.PI;
		let arrowWidth = 13;

		ctx.moveTo(dst.x - (arrowWidth * Math.sin(arrowAngle - Math.PI / 6)), 
	           dst.y - (arrowWidth * Math.cos(arrowAngle - Math.PI / 6)));

		ctx.lineTo(dst.x, dst.y);

		ctx.lineTo(dst.x - (arrowWidth * Math.sin(arrowAngle + Math.PI / 6)), 
	           dst.y - (arrowWidth * Math.cos(arrowAngle + Math.PI / 6)));

		ctx.fill();
		let vector2_ort = new Coord(src.y - dst.y,
			dst.x - src.x);
		vector2_ort = normalizeVector(vector2_ort);
		vector2_ort = multiplyVector(vector2_ort, 7.5);
		let aux_mlt = Math.sqrt(Math.pow(dst.x - src.x, 2) + Math.pow(dst.y - src.y, 2)) / 40;
		drawTrText(ctx, src, dst, symbol, aux_mlt, vector2_ort)

}


export const hoverSelfLoop = (context3, tr, text, clear=true) => {
	if(clear) clean(context3);
	
	if(!clear)	context3.lineWidth = 3;
	context3.globalAlpha=1;
	context3.strokeStyle = context3.fillStyle = "rgb(145, 127, 49)";
	let center = {x:tr.x,
		y:tr.y};

	let arrow_p1 = {x:0,y: 0};
	let arrow_p2 = {x:0, y:0};
	let arrow_p3 = {x:0,y: 0};



		context3.font = "15px Georgia";

		center = {x: tr.x - STATE.RADIUS,
			y: tr.y - STATE.RADIUS};

		arrow_p1 = { x:tr.x,
			y: tr.y - STATE.RADIUS};
		arrow_p2 = {x: arrow_p1.x - STATE.RADIUS / 3 - 2,
			y: arrow_p1.y - STATE.RADIUS / 2};
		arrow_p3 = {x: arrow_p1.x + STATE.RADIUS / 3 - 3,
			y: arrow_p1.y - STATE.RADIUS / 2 - 3};

		//tr.cyclealignment = "topleft";

		context3.textAlign = "right";
		context3.textBaseline = "top";
		context3.fillText(text,
			center.x - STATE.RADIUS - 2,
			center.y - STATE.RADIUS / 2);
	




	context3.beginPath();

	context3.arc(center.x,
		center.y,
		STATE.RADIUS,
		39.3,
		12,
		false);

	context3.stroke();

	context3.beginPath();
	context3.moveTo(arrow_p1.x, arrow_p1.y);
	context3.lineTo(arrow_p2.x, arrow_p2.y);
	context3.lineTo(arrow_p3.x, arrow_p3.y);
	context3.closePath();
	context3.fill();

	context3.font = "15px Georgia";
}
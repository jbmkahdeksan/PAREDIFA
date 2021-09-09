
import { isOverState } from "./Utils";
import Coord from './Classes/Coord';
import Bezcurve from './Classes/Bezcurve';

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



export const  drawTempTransition = (state, mousePos, context3, hoveredState) =>{
	// context=context3;
	clean(context3);
   // if(temporaryTransition.object){
		//console.log(temporaryTransition.object)
		//clean(context3);
		//drawState(context3,{...temporaryTransition.object,final:temporaryTransition.final,name:temporaryTransition.name},null,null,temporaryTransition);
		//setTemporaryTransition({...temporaryTransition,chosen:true,object:null})
	//	console.log("wecome")
	//}

	
	//drawState(context3Main,state,null,null,true);

	context3.strokeStyle = context3.fillStyle = "rgb(6, 11, 16)";

	let src = {x:state.x,y: state.y};
	let dst = {x:mousePos.x, y:mousePos.y};

	let aux_angle = Math.atan2(dst.y - src.y, dst.x - src.x);
	let multiplier = 20;//20;
	dst.x = dst.x - Math.cos(aux_angle) * multiplier;
	dst.y = dst.y - Math.sin(aux_angle) * multiplier;
	src.x = src.x + Math.cos(aux_angle) * multiplier;
	src.y = src.y + Math.sin(aux_angle) * multiplier;

	//let vector2_dir = {x:dst.x - src.x,
	//	y: dst.y - src.y};
	//vector2_dir = normalizeVector(vector2_dir); //***** */
	//vector2_dir = multiplyVector(vector2_dir, 20);

	let middle_pt1 = {x:src.x + (dst.x - src.x)/3,
		y:src.y + (dst.y - src.y)/3};

	let middle_pt2 = {x:src.x + 2*(dst.x - src.x)/3,
		y:src.y + 2*(dst.y - src.y)/3};

	let vector2_ort = {x:src.y - dst.y,
		y:dst.x - src.x};
	vector2_ort = normalizeVector(vector2_ort); //** */
	vector2_ort = multiplyVector(vector2_ort, 7.5);

	//let arrow_pt = {x:dst.x - (vector2_dir.x * 2) + vector2_ort.x * 2,
	//	y:dst.y - (vector2_dir.y * 2) + vector2_ort.y};

	let aux_mlt = Math.sqrt(Math.pow(dst.x - src.x, 2) + Math.pow(dst.y - src.y, 2)) / 40;

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
		dst.x,
		dst.y);

	
	
		if ( isOverState(state,mousePos) ) {
			context3.beginPath();
			context3.globalAlpha = 0.3;
			context3.arc(state.x - 20,
				state.y - 20,
				20,
				0,
				Math.PI * 2,
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
			context3.closePath();
			context3.fill();
			return;
		}


	context3.stroke();

	context3.beginPath();

	let arrowAngle = Math.atan2(quadPoint2.x - dst.x, quadPoint2.y - dst.y) + Math.PI;
	let arrowWidth = 13;

	context3.moveTo(dst.x - (arrowWidth * Math.sin(arrowAngle - Math.PI / 6)), 
	           dst.y - (arrowWidth * Math.cos(arrowAngle - Math.PI / 6)));

	context3.lineTo(dst.x, dst.y);

	context3.lineTo(dst.x - (arrowWidth * Math.sin(arrowAngle + Math.PI / 6)), 
	           dst.y - (arrowWidth * Math.cos(arrowAngle + Math.PI / 6)));

	context3.fill();
}


export const drawTransitionCircle=(context3, tr, text)=> {
	console.log("circle drwaing")
	clean(context3);
	context3.globalAlpha=1;
	context3.strokeStyle = context3.fillStyle = "rgb(194, 95, 0)";
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
		0,
		Math.PI * 2,
		false);

	context3.stroke();

	context3.beginPath();
	context3.moveTo(arrow_p1.x, arrow_p1.y);
	context3.lineTo(arrow_p2.x, arrow_p2.y);
	context3.lineTo(arrow_p3.x, arrow_p3.y);
	context3.closePath();
	context3.fill();

	//symbol
	context3.font = "15px Georgia";
}

function drawTransitionOver(ctx, tr) {
	ctx.beginPath();

	let src = new Coord(tr.state_src.Coord.x,
		tr.state_src.Coord.y);
	let dst = new Coord(tr.state_dst.Coord.x,
		tr.state_dst.Coord.y);

	let aux_angle = Math.atan2(dst.y - src.y, dst.x - src.x);
	let multiplier = tr.state_src.radius;
	dst.x = dst.x - Math.cos(aux_angle) * multiplier;
	dst.y = dst.y - Math.sin(aux_angle) * multiplier;
	src.x = src.x + Math.cos(aux_angle) * multiplier;
	src.y = src.y + Math.sin(aux_angle) * multiplier;

	let vector2_dir = new Coord(dst.x - src.x,
		dst.y - src.y);
	vector2_dir = normalizeVector(vector2_dir);
	vector2_dir = multiplyVector(vector2_dir, 20);

	let middle_pt1 = new Coord(src.x + (dst.x - src.x)/3,
		src.y + (dst.y - src.y)/3);

	let middle_pt2 = new Coord(src.x + 2*(dst.x - src.x)/3,
		src.y + 2*(dst.y - src.y)/3);

	let vector2_ort = new Coord(src.y - dst.y,
		dst.x - src.x);
	vector2_ort = normalizeVector(vector2_ort);
	vector2_ort = multiplyVector(vector2_ort, 7.5);

	let arrow_pt = new Coord(dst.x - (vector2_dir.x * 2) + vector2_ort.x * 2,
		dst.y - (vector2_dir.y * 2) + vector2_ort.y);

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

	tr.curve = new Bezcurve(src, quadPoint1, quadPoint2, dst);

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
	ctx.fillText(tr.symbols,
		text_pos.x,
		text_pos.y);
}
const normalizeVector=(vec) =>{
	let aux = Math.pow(vec.x, 2) + Math.pow(vec.y, 2);
	aux = Math.sqrt(aux);

	return {x:vec.x / aux, y:vec.y / aux};
}


const multiplyVector=(vec, value)=> {
	return {x:vec.x * value,y: vec.y * value};
}
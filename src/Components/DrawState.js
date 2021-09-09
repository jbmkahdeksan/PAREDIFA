/*
* Description:
*   Some functions for drawing states  
* Authors:
*   Andres Alvarez Duran, ID: 117520958
*   Joaquin Barrientos Monge, ID: 117440348
*   Oscar Ortiz Chavarria, ID: 208260347
*   David Zarate Marin, ID: 116770797
*   Group: 01
*   Schedule: 10am 
* 
*/
export const drawStart = (context, x, y) => {
    
    context.font = "20px Georgia";
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.fillStyle = "rgb(6, 11, 16)";
    context.fillText("I ==>",
        x - 20,
        y);
}



export const drawFinal = (context, x, y) => {
    context.beginPath();
    context.arc(x,
        y,
        20* 10 / 8,
        0,
        Math.PI * 2,
        false);
    context.stroke();
}


export const drawStateCircle = (context, item, {isNaming, isNamingTr}) => {
    context.beginPath();
    context.arc(item.x,
        item.y,
        20,
        0,
        Math.PI * 2,
        false);

        context.globalAlpha = (isNaming || isNamingTr) && ( !item.selected || isNamingTr) ? 0.5 : 1;
}


export const drawStateText = (context,item) => {

                    context.font = "15px Georgia";
                    context.textAlign = "center";
                    context.textBaseline = "middle";
                    context.fillStyle = "rgb(6, 11, 16)";
                    context.fillText(item.name,
                        item.x,
                        item.y);
}

const drawStateOutColor=(context,item, {isNaming, isNamingTr},stateOver, transitioning)=>{
   // context.globalAlpha = 0.5;
   // context.globalAlpha = isNaming ? 0.5 : 1;
    //afuera mientras hace transicion "rgb(6, 65, 126)"
    if(transitioning!==undefined){
        context.strokeStyle ="rgb(6, 65, 126)"
        context.stroke();
        context.globalAlpha = 1;
        return;
    }
 context.strokeStyle ="rgb(217, 187, 58)"
  if( item.id===stateOver.id ) context.strokeStyle ="rgb(145, 127, 49)"
  if(item.selected ) context.strokeStyle ="rgb(194, 95, 0)"
     context.stroke();
     context.globalAlpha =  (isNaming || isNamingTr) && ( !item.selected || isNamingTr)? 0.5 : 1;
     //context.globalAlpha = 1;
}
export const drawColor=(context,item,isNaming,stateOver, transitioning) => {
      
                   //adentro mientras hace transicion :"rgb(28, 105, 185)"
                   if(transitioning!==undefined) {
                    context.fillStyle="rgb(28, 105, 185)"
                    context.fill();
                    return;
                   }
                  context.fillStyle="rgb(255, 232, 136)";
               
                 if( item.id===stateOver.id ) context.fillStyle ="rgb(211, 195, 128)";
      
          
                if(item.selected ) context.fillStyle ="rgb(255, 135, 20)"
                    
                 
                     context.fill();
}



export const drawState=(context, item, {isNaming=false, isNamingTr=false}, stateOver, transitioning)=>{
    
    drawStateCircle(context, item ,{isNaming, isNamingTr});
    drawColor(context,item, isNaming, stateOver, transitioning);
    drawStateOutColor(context, item,  {isNaming, isNamingTr}, stateOver, transitioning);
    drawStateText(context, item);
        
    if (item.final)  drawFinal(context, item.x, item.y, transitioning);

                    
    if(item.start) drawStart(context, item.x, item.y, transitioning);

}


/*
* 
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


export const drawStateCircle = (context, x,  y) => {
    context.beginPath();
    context.arc(x,
        y,
        20,
        0,
        Math.PI * 2,
        false);

        context.globalAlpha = 1;
}


export const drawStateText = (context,item,isNaming,stateOver) => {
                    context.globalAlpha = 1;
    //                context.strokeStyle = "rgb(255, 135, 20)";
                   // context.strokeStyle = "rgb(145, 127, 49)";
                   context.strokeStyle ="rgb(217, 187, 58)"
                   if( item.id===stateOver|| (isNaming && !item.selected)) context.strokeStyle ="rgb(145, 127, 49)"
                   if(item.selected ) context.strokeStyle ="rgb(194, 95, 0)"
                    context.stroke();
                    context.globalAlpha = 1;
                    context.font = "15px Georgia";
                    context.textAlign = "center";
                    context.textBaseline = "middle";
                    context.fillStyle = "rgb(6, 11, 16)";
                    context.fillText(item.name,
                        item.x,
                        item.y);
}


export const drawColor=(context,item,isNaming,stateOver) => {
                       // context.fillStyle="rgb(255, 232, 136)"
                    //if(item.id===selectedState)context.fillStyle ="rgb(211, 195, 128)";
                   //if(  item.id===stateOver && selectedState!==stateOver)context.fillStyle ="rgb(211, 195, 128)";
                   context.fillStyle="rgb(255, 232, 136)";
                   ///   if( stateOver===item.id || isNaming && !item.selected) context.fillStyle ="rgb(211, 195, 128)";
                   if( item.id===stateOver|| (isNaming && !item.selected)) context.fillStyle ="rgb(211, 195, 128)";
                   // if( (item.id===stateOver   && mouseDown) || item.id===selectedState  ) context.fillStyle ="rgb(255, 135, 20)";
          
                    if(item.selected ) context.fillStyle ="rgb(255, 135, 20)"
                    
                 
                     context.fill();
}



export const drawState=(context,item,isNaming,stateOver)=>{
    drawStateCircle(context, item.x,item.y);
    drawColor(context,item,isNaming,stateOver)
    drawStateText(context, item,isNaming,stateOver);
        
    if (item.final)  drawFinal(context, item.x, item.y);

                    
    if(item.start) drawStart(context, item.x, item.y);

}
import {useEffect,useState} from 'react';


const Circle = ({x,y,context,selected}) => {

    useEffect(() => {
        context.lineWidth = 3;
        context.beginPath();
        context.arc(x,
            y,
            20,
            0,
            Math.PI * 2,
            false);

            context.globalAlpha = 1;
            context.fillStyle="rgb(255, 232, 136)"
           // if(item.id===selectedState)context.fillStyle ="rgb(211, 195, 128)";
           // if(mouseDown && item.id===selectedState)context.fillStyle ="rgb(255, 135, 20)";
           
            context.fill();
            

            context.globalAlpha = 1;
//                context.strokeStyle = "rgb(255, 135, 20)";
            context.strokeStyle = "rgb(145, 127, 49)";
            
            context.stroke();
            context.globalAlpha = 1;
            context.font = "15px Georgia";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "rgb(6, 11, 16)";
            context.fillText('0',
            x,
            y);
    },[x,y])

    return ( 
       null
     );
}
 
export default Circle;
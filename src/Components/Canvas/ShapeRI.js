import { Shape } from "react-konva";
import ThemeContextRunInfo from "../Context/ContextRunInfo";
import {useContext} from 'react'
const ShapeRI = ({input,currentChar}) => {

    const { runInfo, setRunInfo}= useContext(ThemeContextRunInfo);
    console.log('input',input)
  return (
    <>

      <Shape
        sceneFunc={(ctx, shape) => {
            ctx.textAlign = "left"
            ctx.textBaseline = "top"
            ctx.font = "40px Georgia"
            
            let x = 0;
            let start_pos = {x:0,y: 0};
            
            [...input].forEach((ch, index) => {
                ctx.fillStyle = 
                    (index < currentChar) ? "rgb(169, 78, 234)" : "black"
                ctx.fillText(ch, start_pos.x + x, start_pos.y);
                x += ctx.measureText(ch).width;
            })
          // (!) Konva specific method, it is very important
          ctx.fillStrokeShape(shape);
        }}
      />

    </>
  );
};

export default ShapeRI;

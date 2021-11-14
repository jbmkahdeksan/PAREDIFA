import { Shape } from "react-konva";

/*
 *
 * Description:
 *  Component for results, paints the input to evaluate
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const ShapeRI = ({input,currentChar}) => {

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

import { Shape } from "react-konva";

/*
 *
 * Description:
 *  Component for results, paints a check or an X inside canvas after evaluation the automata
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const ResultShape = ({ch}) => {

 
  return (
    <>
      <Shape
        sceneFunc={(ctx, shape) => {
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          ctx.font = "40px Georgia";

          let x = 0;
          let start_pos = { x: 0, y: 10 };


            ctx.fillText(ch, start_pos.x + x, start_pos.y);
          // (!) Konva specific method, it is very important
          ctx.fillStrokeShape(shape);
        }}
      />
    </>
  );
};

export default ResultShape;

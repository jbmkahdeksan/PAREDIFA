import { Shape } from "react-konva";

/*
 *
 * Description:
 *  Component for results, paints a check or an X inside canvas after evaluation the automata
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
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

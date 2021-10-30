import { Shape } from "react-konva";
const ResultShape = ({ch}) => {

    console.log(ch,'ch')
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

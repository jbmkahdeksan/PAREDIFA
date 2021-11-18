import { Arrow, Shape, Group, Arc } from "react-konva";
import { useState } from "react";
import {
  textEdge,
  arrowStart as startArrow,
  arrowCurve as curveArrow,
  arrowEnd as endArrow,
} from "./EdgeUtil";
/*
 *
 * Description:
 *  Edge component
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const Edge = ({
  id,
  symbol,
  node1,
  node2,
  type,
  selectedTr,
  isNamingTr,
  isNamingState,
  running,
  isRunning,
  currentChar,
  w
}) => {
  const [flag, setFlag] = useState(false);
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 20;

  const arrowStart = startArrow(node2, angle);

  const arrowEnd = endArrow(node1, angle);

  const arrowCurve = curveArrow(angle, node1, node2, w);

  const COLOR =
    running && running === id
      ? "#6c5ce7"
      : type === "temporary"
      ? "#8c7ae6"
      : id === selectedTr
      ? "#e17055"
      : !flag
      ? "#000"
      : "green";
  return (
    <Group
      listening={!isRunning}
      onMouseEnter={() => setFlag(true)}
      onMouseOut={() => setFlag(false)}
      opacity={
        (isNamingState || isNamingTr !== "-1") && isNamingTr !== id ? 0.5 : 1
      }
    >
      {node1.id !== node2.id && (
        <Arrow
          id={id}
          type="arrow"
          tension={0.5}
          points={[
            arrowStart.x,
            arrowStart.y,
            arrowCurve.x,
            arrowCurve.y,
            arrowEnd.x,
            arrowEnd.y,
          ]}
          stroke={COLOR}
          fill={COLOR}
          strokeWidth={3}
          pointerWidth={5}
          pointerLength={5}
        />
      )}
      {node1.id === node2.id && (
        <>
          <Arc
            id={id}
            type="arrow"
            x={node1.x - radius * (Math.PI / 4)}
            y={node1.y - radius * (Math.PI / 4) - 4}
            innerRadius={17.5}
            outerRadius={17.5}
            strokeWidth={2.5}
            stroke={COLOR}
            angle={125}
            rotation={-20}
            clockwise={true}
          />
          <Arrow
            id={id}
            type="arrow"
            x={node1.x + 1}
            y={node1.y - radius - 4}
            rotation={70}
            stroke={COLOR}
            fill={COLOR}
            strokeWidth={3}
            pointerWidth={5}
            pointerLength={5}
          />
        </>
      )}
      <Shape
        sceneFunc={(ctx, shape) => {
          textEdge(
            ctx,
            node1,
            node2,
            running && running === id ? "\u{1F449}" + currentChar : symbol,
            id,
            selectedTr,
            flag,
            running && running === id
          );
          // (!) Konva specific method, it is very important
          ctx.fillStrokeShape(shape);
        }}
      />
    </Group>
  );
};

export default Edge;

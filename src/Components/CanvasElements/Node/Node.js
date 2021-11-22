import { Circle, Group, Shape } from "react-konva";
import { useState } from "react";
/*
 *
 * Description:
 *  Node component
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const Node = ({
  nodeInfo,
  updateCoordNode,
  isNamingState,
  setSelected,
  selected,
  setMouseCoord,
  updateCoordEdges,
  isNamingTr,
  addingTr,
  setMouseDown,
  nodeRunningId,
  running,
  stageWidth,
  displaying = false,
}) => {
  //the radius of the node
  const RADIUS = 20;
  //stage information
  const STAGE = {
    height: 450,
    width: stageWidth,
  };

  const [color, setColor] = useState("#ffeaa7");
  /**
   * This method is to update node/edge coord on dragEnd
   * Makes sure to check if the node is outside of canvas bounds
   * @param e the event
   * */
  const handleDragEnd = (e) => {
    setMouseDown(false);
    const coords = {
      x: e.target.position().x + nodeInfo.x,
      y: e.target.position().y + nodeInfo.y,
    };

    //user is out of bounds
    if (coords.y < 19) coords.y = 23;
    if (coords.x < 19) coords.x = 23;
    if (coords.y > STAGE.height) coords.y = STAGE.height - 30;
    if (coords.x > STAGE.width) coords.x = STAGE.width - 30;

    updateCoordNode(coords, nodeInfo.id);
    updateCoordEdges(coords, nodeInfo.id);
    setSelected("-1");
  };

  const SHADOWVAL = nodeInfo.final ? 0 : selected === nodeInfo.id ? 10 : 5
  return (
    <>
      <Group
        type="nodo"
        id={nodeInfo.id}
        draggable={!displaying && !isNamingState && !addingTr.state}
        listening={!running}
        onMouseEnter={() => setColor("#95b6f0")}
        onMouseOut={() => setColor("#ffeaa7")}
        opacity={
          (isNamingState || isNamingTr !== "-1") && selected !== nodeInfo.id
            ? 0.5
            : 1
        }
        onDragEnd={(e) => handleDragEnd(e)}
        onDragMove={(e) => {
          if (selected !== nodeInfo.id) setSelected(nodeInfo.id);
          setMouseDown(true);
          const coords = {
            x: e.target.position().x + nodeInfo.x,
            y: e.target.position().y + nodeInfo.y,
          };

          setMouseCoord(coords);
        }}
      >
        <Circle
          id={nodeInfo.id}
          {...nodeInfo}
          shadowOffsetX={SHADOWVAL}
          shadowOffsetY={SHADOWVAL}
          fill={
            nodeRunningId && nodeRunningId === nodeInfo.id
              ? "#a29bfe"
              : selected === nodeInfo.id && addingTr.state
              ? "#0097e6"
              : selected === nodeInfo.id
              ? "#e17055"
              : color
          }
        />
        {(nodeInfo.start ||
          (nodeRunningId && nodeRunningId === nodeInfo.id)) && (
          <Shape
            id={nodeInfo.id}
            sceneFunc={(ctx, shape) => {
              ctx.font = "25px Georgia";
              ctx.textAlign = "right";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "black";
              ctx.fillText(
                nodeRunningId && nodeRunningId === nodeInfo.id
                  ? "\u{1F449}"
                  : nodeInfo.start
                  ? "\u{25B7}"
                  : "",
                nodeInfo.final ? nodeInfo.x - RADIUS - 5 : nodeInfo.x - RADIUS,
                nodeInfo.y
              );
              // (!) Konva specific method, it is very important
              ctx.fillStrokeShape(shape);
            }}
          />
        )}

        {nodeInfo.final && (
          <Shape
            type="nodo"
            id={nodeInfo.id}
            sceneFunc={(ctx, shape) => {
              ctx.beginPath();
              ctx.arc(
                nodeInfo.x,
                nodeInfo.y,
                (RADIUS * 10) / 8,
                0,
                Math.PI * 2,
                false
              );
              ctx.stroke();
              // (!) Konva specific method, it is very important
              ctx.fillStrokeShape(shape);
            }}
          />
        )}
        <Shape
          id={nodeInfo.id}
          type="nodo"
          coord={{ x: nodeInfo.x, y: nodeInfo.y }}
          sceneFunc={(ctx, shape) => {
            ctx.font = "15px Georgia";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "rgb(6, 11, 16)";
            ctx.fillText(
              addingTr.state &&
                selected === nodeInfo.id &&
                addingTr.state &&
                color === "#95b6f0"
                ? "\u{1f6a9}\u{1F3C1}"
                : addingTr.state && selected === nodeInfo.id
                ? "\u{1f6a9}"
                : addingTr.state && color === "#95b6f0"
                ? "\u{1F3C1}"
                : nodeInfo.name,
              nodeInfo.x,
              nodeInfo.y
            );
            // (!) Konva specific method, it is very important
            ctx.fillStrokeShape(shape);
          }}
        />
      </Group>
    </>
  );
};

export default Node;

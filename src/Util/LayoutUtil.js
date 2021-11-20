import d3 from "d3";
/*
 *
 * Description:
 * Utils for laying out the dfa
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */

const nodeProperties = {
  selected: false,
  width: 40,
  height: 40,
  type: "circle",
  shadowColor: "black",
  shadowBlur: 10,
  shadowOpacity: 0.6,
};

/**  This method lay outs the dfa
 * @param nodos the nodes to be painted in the canvas
 * @param ed the edges to be painted in the canvas
 * @param witdh the witdh of the canvas
 * @param cbMsg a msg to let the user know that the layout has finished
 * @param  setLayingDFA to set the laying out to true / false
 * @param setNodes a setter for the nodes
 * @param setEdge a setter for the edges
 * @returns void
 */
export const layout = (
  nodos,
  ed,
  width,
  cbMsg,
  setLayingDFA,
  setNodes,
  setEdge
) => {
  const dataset = {
    nodes: nodos,
    edges: ed,
  };
  var force = d3.layout
    .force()
    .nodes(dataset.nodes)
    .links(dataset.edges)
    .size([width, 450])
    .linkDistance(200)
    .charge(-900)
    .gravity(0.2)
    .theta(0.8)
    .alpha(0.1)
    .start();

  force.on("end", cbMsg);

  setLayingDFA(true);
  force.on("tick", function () {
    const arrayNodes = [];
    const arrayEdge = [];
    dataset.nodes.forEach((nod, index) =>
      arrayNodes.push({
        id: nod.id,
        name: nod.label,
        final: nod.final,
        start: nod.start,
        x: nod.x,
        y: nod.y,
        ...nodeProperties,
      })
    );

    dataset.edges.forEach((ed, index) =>
      arrayEdge.push({
        id: ed.id,
        symbol: ed.symbol,
        type: "fixed",
        from: {
          id: `${arrayNodes[ed.source.index].id}`,
          x: arrayNodes[ed.source.index].x,
          y: arrayNodes[ed.source.index].y,
        },
        to: {
          id: `${arrayNodes[ed.target.index].id}`,
          x: arrayNodes[ed.target.index].x,
          y: arrayNodes[ed.target.index].y,
        },
      })
    );

    setNodes(arrayNodes);
    setEdge(arrayEdge);
  });
};

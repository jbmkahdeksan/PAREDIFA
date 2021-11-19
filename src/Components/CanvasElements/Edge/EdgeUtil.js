/*
 *
 * Description:
 *  Some mathematical functions
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */

//the radius of the node
const radius = 20;

/**  Where should the arrow start
 * @param node2 node2 where the arrow begings
 * @param angle the angle of the arrow
 */
export const arrowStart = (node2, angle) => ({
  x: node2.x + -radius * Math.cos(angle + Math.PI),
  y: node2.y + radius * Math.sin(angle + Math.PI),
});

/**  Where should the arrow end
 * @param node1 node1 where the arrow ends
 * @param angle the angle of the arrow
 */
export const arrowEnd = (node1, angle) => ({
  x: node1.x + -radius * Math.cos(angle),
  y: node1.y + radius * Math.sin(angle),
});

/** Handles the arrow curve
 * @param node2 node2 where the arrow is pointing to
 * @param angle the angle of the arrow
 */
export const arrowCurve = (angle, node1, node2, witdh) => {
  let proximity_coeficient =
    Math.sqrt(Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2)) /
    Math.sqrt(Math.pow(450 - 0, 2) + Math.pow(witdh - 0, 2));
  const curvePower = 100 * proximity_coeficient;

  const arrowStarts = arrowStart(node2, angle);
  const arrowEnds = arrowEnd(node1, angle);
  return {
    x:
      (arrowStarts.x + arrowEnds.x) / 2 +
      curvePower * Math.cos(angle + Math.PI / 2),
    y:
      (arrowStarts.y + arrowEnds.y) / 2 +
      curvePower * Math.sin(angle - Math.PI / 2),
  };
};

/**
 * This method is used to make adjustments
 * to the coordenates
 * @param vec a coordenate instance
 * @param value a value to multiply the components of
 * the given coordenate
 * @returns a coordinate
 */
const multiplyVector = (vec, value) => ({ x: vec.x * value, y: vec.y * value });

/**
 * This method is used to make adjustments
 * to the coordenates by applying a
 * some trigonometry to the given coordenate
 * @param vec a coordenate instance
 * @returns a coordinate
 */
const normalizeVector = (vec) => {
  let aux = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
  return { x: vec.x / aux, y: vec.y / aux };
};

/**
 * This method is to draw the text on the edge
 * @param ctx the canvas context
 * @param src node src
 *  @param dst node dst
 *  @param aux_mlt a trigonometric parameter
 *  @param vector2_ort a vector
 *  @param txt symbol of the edge being added
 *  @param id the id of the transition
 *  @param selectedTr the id of the selected  transition
 *   @param flag is the mouse currently on the transition
 *  @param running if the automata being evaluated
 * */
export const drawTrText = (
  ctx,
  src,
  dst,
  aux_mlt,
  vector2_ort,
  txt,
  id,
  selectedTr,
  flag,
  running
) => {
  let text_pos = { x: 0, y: 0 };
  text_pos = {
    x: src.x + (dst.x - src.x) / 2 + vector2_ort.x * aux_mlt,
    y: src.y + (dst.y - src.y) / 2 + vector2_ort.y * aux_mlt,
  };

  if (Math.abs(src.y - dst.y) < 60) {
    if (src.x < dst.x) {
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
    } else {
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
    }
  } else {
    if (src.y < dst.y) {
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
    } else {
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
    }
  }

  //symbol
  fillColor(ctx, running, id, selectedTr, flag);
  ctx.fillText(txt, text_pos.x, text_pos.y);
};

/**
 * This method is to the text on the edge
 * @param ctx the canvas context
 * @param src node src
 *  @param dst node dst
 *  @param txt symbol of the edge being added
 *  @param id the id of the transition
 *  @param selectedTr the id of the selected  transition
 *   @param flag is the mouse currently on the transition
 *  @param running if the automata being evaluated
 * */
export const textEdge = (ctx, src, dst, txt, id, selectedTr, flag, running) => {
  if (src.id !== dst.id) {
    let vector2_ort = { x: src.y - dst.y, y: dst.x - src.x };
    vector2_ort = normalizeVector(vector2_ort);
    vector2_ort = multiplyVector(vector2_ort, 7.5);
    let aux_mlt =
      Math.sqrt(Math.pow(dst.x - src.x, 2) + Math.pow(dst.y - src.y, 2)) / 60;
    drawTrText(
      ctx,
      src,
      dst,
      aux_mlt,
      vector2_ort,
      txt,
      id,
      selectedTr,
      flag,
      running
    );
  } else {
    let center = { x: src.x, y: dst.y };
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    fillColor(ctx, running, id, selectedTr, flag);
    ctx.fillText(
      txt,
      center.x - 20 + txt.length * 3,
      center.y - radius / 2 - 50
    );
  }
};

/**
 * This method is to fill the color of the text and font
 * @param ctx the canvas context
 *  @param id the id of the transition
 *  @param selectedTr the id of the selected  transition
 *   @param flag is the mouse currently on the transition
 *  @param running if the automata being evaluated
 * */
const fillColor = (ctx, running, id, selectedTr, flag) => {
  ctx.font = "15px Georgia";
  ctx.strokeStyle = ctx.fillStyle = running
    ? "#6c5ce7"
    : id === selectedTr
    ? "#e17055"
    : flag
    ? "green"
    : "#000000";
};

/**
 * This method is to check whether the current mouse coord is on the node
 * @param state the state currently being point to
 * @param mouseCoord current coordinates of the mouse
 *  @returns boolean
 * */
export const isMouseOverState = (state, mouseCoord) =>
  Math.sqrt(
    Math.pow(mouseCoord.x - state.x, 2) + Math.pow(mouseCoord.y - state.y, 2)
  ) < radius;

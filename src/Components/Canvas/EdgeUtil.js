const radius = 20;
//const CANVAS={
 // width:900,
 // height:500
//}
export const arrowStart = (node2, angle) => ({
  x: node2.x + -radius * Math.cos(angle + Math.PI),
  y: node2.y + radius * Math.sin(angle + Math.PI),
});

export const arrowEnd = (node1, angle) => ({
  x: node1.x + -radius * Math.cos(angle),
  y: node1.y + radius * Math.sin(angle),
});

export const arrowCurve = (angle, node1, node2) => {
  let proximity_coeficient =
    Math.sqrt(Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2)) /
    1273;
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

const multiplyVector = (vec, value) => ({ x: vec.x * value, y: vec.y * value });

const normalizeVector = (vec) => {
  let aux = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
  return { x: vec.x / aux, y: vec.y / aux };
};

export const drawTrText = (
  ctx,
  src,
  dst,
  aux_mlt,
  vector2_ort,
  txt,
  id,
  selectedTr,
  flag
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
  ctx.font = "15px Georgia";
  ctx.strokeStyle = ctx.fillStyle =
    id === selectedTr ? "#e17055" : flag ? "green" : "#000000";
  ctx.fillText(txt, text_pos.x, text_pos.y);
};
export const textEdge = (ctx, src, dst, txt, id, selectedTr, flag) => {
  if (src.id !== dst.id) {
    let vector2_ort = { x: src.y - dst.y, y: dst.x - src.x };
    vector2_ort = normalizeVector(vector2_ort);
    vector2_ort = multiplyVector(vector2_ort, 7.5);
    let aux_mlt =
      Math.sqrt(Math.pow(dst.x - src.x, 2) + Math.pow(dst.y - src.y, 2)) / 60;
    drawTrText(ctx, src, dst, aux_mlt, vector2_ort, txt, id, selectedTr, flag);
  } else {
    let center = { x: src.x, y: dst.y };
    ctx.font = "15px Georgia";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.strokeStyle = ctx.fillStyle =
      id === selectedTr ? "#e17055" : flag ? "green" : "#000000";
    ctx.fillText(
      txt,
      center.x - 20 + txt.length * 3,
      center.y - radius / 2 - 50
    );
  }
};

export const isMouseOverState = (state, mouseCoord) =>
  Math.sqrt(
    Math.pow(mouseCoord.x - state.x, 2) + Math.pow(mouseCoord.y - state.y, 2)
  ) < radius;

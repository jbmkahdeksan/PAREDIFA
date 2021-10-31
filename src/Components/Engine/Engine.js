import {
  modifyIterator,
  getIterator,
  newQueue,
  getQueue,
} from "../Classes/Queue";
import frameInfo from "../Classes/FrameInfo";
import Transition from "../Classes/Transition";
/**
 * This method generates the sequence
 * the automata follows when testing the
 * the input and stores it in `queue` which
 * then will become an animation.
 * `This replaces the run for vgarcia.v0`
 */
export function preProcessAutomata(
  nodes,
  edge,
  inputString,
  runInfo,
  setRunInfo,
  cb,
  type
) {
  const nodesMapped = nodes.map((nod) => ({
    coord: { x: nod.x, y: nod.y },
    final: nod.final,
    start: nod.start,
    id: nod.id,
    name: nod.name,
    transitionsIn: [],
    transitionsOut: [],
  }));

  edge.map(
    (ed) =>
      new Transition(
        ed.id,
        nodesMapped.find((node) => node.id === ed.from.id),
        nodesMapped.find((node) => node.id === ed.to.id),
        ed.symbol.split(",")
      )
  );

  let input = [...inputString];
  const objInfo = { ...runInfo, input: input.join("") };
  setRunInfo({ ...runInfo, input: input.join("") });
  let queue = newQueue();
  let currentState = nodesMapped.find((nod) => nod.start);

  input.forEach((char) => {
    queue.push(new frameInfo(currentState.id, null));

    let currentTransition = currentState.transitionsOut.find((transition) =>
      transition.symbols.some((symbol) => symbol === char)
    );

    let nextState = currentTransition.state_dst;
    queue.push(new frameInfo(null, currentTransition.id));
    currentState = nextState;
  });

  queue.push(new frameInfo(currentState.id, null));
  setRunInfo({ ...objInfo, transitionID: null, stateID: null });

  if (type === "cont") {
    runAnimation(queue, objInfo, setRunInfo, cb);
  }
  if (type === "step") {
    modifyIterator(queue);
    setRunInfo({ ...objInfo, nowRunning: true, currentChar: 0 });
  }
}

/**
 * This method iterates through the queue param to process
 * a nice animation of the automata running.
 * @param queue An instance of `class Queue` that contains the trail the
 * automata will follow to process the input string.
 */
export const runAnimation = (queue, runInfo, setRunInfo, cb) => {
  //modifyRunInfo({ ...getRunInfo(), nowRunning: true })
  let objInfoAux = { ...runInfo, nowRunning: true, currentChar: 0 };
  setRunInfo(objInfoAux);
  //modifyRunInfo({ ...getRunInfo(), currentChar: 0 })
  console.log(runInfo, "runinfo");
  const timeSkipAmount = 800;
  let timeSkipCount = 0;
  queue.forEach((item) => {
    setTimeout(() => {
      if (item.stateID != null) {
        objInfoAux = {
          ...objInfoAux,
          transitionID: null,
          stateID: item.stateID,
        };
        setRunInfo(objInfoAux);
      }
      if (item.transitionID != null) {
        objInfoAux = {
          ...objInfoAux,
          currentChar: objInfoAux.currentChar + 1,
          transitionID: item.transitionID,
          stateID: null,
        };
        setRunInfo(objInfoAux);
      }
    }, timeSkipAmount * timeSkipCount++);
  });

  setTimeout(() => {
    const obj = {
      nowRunning: false,
      transitionID: null,
      stateID: null,
      input: null,
      currentChar: null,
      finalState: `${objInfoAux.input}:${queue.at(-1).stateID}`,
      prevPressed:false
    };
    setRunInfo(obj);
    //let endingState = getStateByID(queue.at(-1).stateID)
    cb(obj);

    //logResult(endingState.name, endingState.end);
  }, timeSkipAmount * timeSkipCount++);

  setTimeout(() => {
    const obj = {
      nowRunning: false,
      transitionID: null,
      stateID: null,
      input: null,
      currentChar: null,
      finalState: ``,
      prevPressed:false
    };
    console.log("fuck this");
    setRunInfo(obj);
  }, timeSkipAmount * timeSkipCount++ + 100);
};

/**
 * This method is used when the users want to
 * run the automata by steps.
 * It will take a step forward in the sequencen when
 * the correct button is click
 * and a step backwards when the users click
 * on the 'previous' button.
 * @returns void
 */
export function runBySteps(id, runInfo, setRunInfo, byStepCb, setDisablePrev) {
  console.log(id, "id");
  let runInfoObj = runInfo;
  if (id === "run-prev" && getIterator().index >= 0) {
    console.log("fuck u");

    let { value } = getIterator().prev();
    if (value?.stateID) {
      runInfoObj = {
        ...runInfoObj,
        transitionID: null,
        stateID: value?.stateID,
        prevPressed:true
      };
      setRunInfo(runInfoObj);
    }
    if (
      value?.transitionID ||
      (!getIterator().index && runInfoObj.currentChar > 0)
    ) {
      console.log(
        runInfoObj.input[runInfoObj.currentChar - 1],
        "current char transition"
      );
      runInfoObj = {
        ...runInfoObj,
        transitionID: value?.transitionID,
        stateID: null,
        currentChar: runInfoObj.currentChar - 1,
        prevPressed:true
      };

      setRunInfo(runInfoObj);
    }
  }

  if (id === "run-next" && getIterator().index < getQueue().length) {
    console.log("fuck u 2");

    let { value, done } = getIterator().next();

    if (done || getIterator().index === getQueue().length) {
      runInfoObj = {
        nowRunning: false,
        transitionID: null,
        stateID: null,
        input: null,
        currentChar: null,
        finalState: `${runInfoObj.input}:${getQueue().at(-1).stateID}`,
        prevPressed:false
      };

      setRunInfo(runInfoObj);
      byStepCb(runInfoObj);
      setTimeout(() => {
        const obj = {
          nowRunning: false,
          transitionID: null,
          stateID: null,
          input: null,
          currentChar: null,
          finalState: ``,
          prevPressed:false
        };

        setRunInfo(obj);
      }, 600);

      return;
    } else {
      setDisablePrev(false);
      if (value.stateID) {
        runInfoObj = {
          ...runInfoObj,
          transitionID: null,
          stateID: value.stateID,
          prevPressed:false
        };
        setRunInfo(runInfoObj);
      }
      if (value.transitionID) {
        runInfoObj = {
          ...runInfoObj,
          transitionID: value.transitionID,
          stateID: null,
          currentChar: runInfoObj.currentChar + 1,
          prevPressed:false
        };
        setRunInfo(runInfoObj);
      }
    }
  }
}
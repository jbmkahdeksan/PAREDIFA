import { newQueue } from "../Classes/Queue";
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
  setNodes,
  edge,
  inputString,
  setEdge,
  runInfo,
  setRunInfo,
  cb,
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
  runAnimation(queue, objInfo, setRunInfo, cb);
}

/**
 * This method iterates through the queue param to process
 * a nice animation of the automata running.
 * @param queue An instance of `class Queue` that contains the trail the
 * automata will follow to process the input string.
 */
export const runAnimation = (
  queue,
  runInfo,
  setRunInfo, 
  cb
) => {
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

    const obj ={
      nowRunning: false,
      transitionID: null,
      stateID: null,
      input: null,
      currentChar: null,
      finalState:`${objInfoAux.input}:${queue.at(-1).stateID}`
    }
    setRunInfo(obj);
    //let endingState = getStateByID(queue.at(-1).stateID)
    cb(obj)

    //logResult(endingState.name, endingState.end);
  }, timeSkipAmount * timeSkipCount++);

  setTimeout(() => {
    const obj ={
      nowRunning: false,
      transitionID: null,
      stateID: null,
      input: null,
      currentChar: null,
      finalState:``
    }
    console.log('fuck this')
    setRunInfo(obj);
  },(timeSkipAmount * timeSkipCount++)+100)
};

/**
 * This method is used when the users want to 
 * run the automata by steps. 
 * It will take a step forward in the sequencen when
 * the correct button is click
 * and a step backwards when the users click
 * on the 'previous' button. 
 * @returns void
 
 export function runBySteps() {
	if (this.id === "run-prev" && getIterator().index >= 0) {
		let { value } = getIterator().prev()
		if (value?.stateID) {
			modifyRunInfo({ ...getRunInfo(), transitionID: null })
			modifyRunInfo({ ...getRunInfo(), stateID: value?.stateID })
		}
		if (value?.transitionID || !getIterator().index && getRunInfo().currentChar > 0) {
			modifyRunInfo({ ...getRunInfo(), transitionID: value?.transitionID })
			modifyRunInfo({ ...getRunInfo(), stateID: null })
			modifyRunInfo({ ...getRunInfo(), currentChar: getRunInfo().currentChar - 1 })
		}
	}

	if (this.id === "run-next" && getIterator().index < getQueue().length) {
		let { value, done } = getIterator().next()

		if (done || getIterator().index === getQueue().length) {
			modifyRunInfo({ ...getRunInfo(), nowRunning: false })
			let endingState = getStateByID(getQueue().at(-1).stateID)
			document.getElementById("run-next").setAttribute("disabled", "disabled")
			document.getElementById("run-prev").setAttribute("disabled", "disabled")
			logResult(endingState.name, endingState.end)
			return
		} else {
			document.getElementById("run-prev").removeAttribute("disabled")
			if (value.stateID) {
				modifyRunInfo({ ...getRunInfo(), transitionID: null })
				modifyRunInfo({ ...getRunInfo(), stateID: value.stateID })
			}
			if (value.transitionID) {
				modifyRunInfo({ ...getRunInfo(), transitionID: value.transitionID })
				modifyRunInfo({ ...getRunInfo(), stateID: null })
				modifyRunInfo({ ...getRunInfo(), currentChar: getRunInfo().currentChar + 1 })
			}
		}
	}
}
*/

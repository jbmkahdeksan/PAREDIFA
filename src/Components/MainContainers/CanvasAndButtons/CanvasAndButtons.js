import Canvas from "../../Canvas/Canvas";
import { useRef, useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import DefaultAlphabetModal from "../../Modals/AlphabetModals/DefaultAlphabetModal";
import Message from "../../Message/Message";
import ThemeContext from "../../Context/ContextStates";
import ThemeContextTr from "../../Context/ContextTransitions";
import ThemeContextMsgInfo from "../../Context/ContextMsg";
import ThemeContextMsg from "../../Context/ContextMessage";
import ThemeContextGeneral from "../../Context/GeneralInfo";
import ThemeContextRunInfo from "../../Context/ContextRunInfo";
import Reactive from "../../ReactLogo/Reactive";
import ThemeContextStage from "../../Context/StageInfo";
import { preProcessAutomata, runBySteps } from "../../Engine/Engine";
import d3 from "d3";
import Spinner from "react-bootstrap/Spinner";
import AlphabetButton from "./Buttons/Alphabet/AlphabetButton";
import DfaRun from "./Buttons/RunDFA/DfaRun";
import BySteps from "./Buttons/RunDFA/BySteps";
import CurrentDfa from "./Buttons/CurrentDfa/CurrentDfa";
import DownloadOrSave from "./Buttons/CR/DownloadOrSave";
import ClearOrSend from "./Buttons/WipeOrSend/ClearOrSend";
/*
 *
 * Description:
 * This component holds the canvas and buttons / inputs for the canvas
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const CanvasAndButtons = ({
  handleIncorrectSymbolChanges,
  inputString,
  setInputString,
  ready,
  cb,
}) => {
  const stageRef = useRef(null);

  //application information

  const { nodes, setNodes } = useContext(ThemeContext);
  const { edge, setEdge } = useContext(ThemeContextTr);
  const { setMsgShow } = useContext(ThemeContextMsg);
  const { setMsgInfo } = useContext(ThemeContextMsgInfo);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const [addingTr, setAddingTr] = useState({ state: false, tr: "-1" });
  const [isByStep, setIsByStep] = useState(false);
  const [disablePrev, setDisablePrev] = useState(true);
  //
  //default alphabet modal
  const handleCloseDefaultAlphabetModal = () =>
    setGeneralInfo({ ...generalInfo, showAlphabetDefault: false });

  //runInfo
  const { runInfo, setRunInfo } = useContext(ThemeContextRunInfo);
  //stage info
  const { stageInfo } = useContext(ThemeContextStage);

  //current dfa downloaded
  const [currentDfa, setCurrentDfa] = useState({ id: null });

  //updateing dfa
  const [fetchingUpdateDfa, setFetchingUpdateDfa] = useState(false);

  /** This method displays a success message to the user
   * @param msg the msg to be displayed in the toast
   * @returns void
   */
  const displaySuccessMsg = (msg) => {
    displayMessage("success", "Success!", msg);
  };

  /** This method displays a fail message to the user
   * @param msg the msg to be displayed in the toast
   * @returns void
   */
  const displayFailMessage = (msg) => {
    displayMessage("warning", "Warning!", msg);
  };

  /** This method wipes application data
   * @returns void
   */
  const wipeApplicationData = () => {
    //wipe data
    setNodes([]);
    setEdge([]);
    setGeneralInfo({
      alphabet: [],
      useDefault: false,
      wipeData: true,
      showAlphabetDefault: false,
      result: false,
    });
    setCurrentDfa({ id: null });
    //
  };

  const algo = () => {
    var w = stageInfo.w;
    // var h = 450;

    var dataset = {
      nodes: [
        { name: 0 },
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
        { name: 5 },
        { name: 6 },
        { name: 7 },
        { name: 8 },
        { name: 9 },
      ],
      edges: [
        { source: 0, target: 0, symbol: "Z" },
        { source: 0, target: 2, symbol: "Z" },
        { source: 0, target: 3, symbol: "Z" },
        { source: 0, target: 4 },
        { source: 1, target: 5 },
        { source: 2, target: 5 },
        { source: 2, target: 5 },
        { source: 3, target: 4 },
        { source: 5, target: 8 },
        { source: 5, target: 9 },
        { source: 6, target: 7 },
        { source: 7, target: 8 },
        { source: 8, target: 9 },
        { source: 9, target: 1 },
      ],
    };

    const algo = {
      start: false,
      selected: false,
      final: false,
      width: 40,
      height: 40,
      type: "circle",
      shadowColor: "black",
      shadowBlur: 10,
      shadowOpacity: 0.6,
    };
    var force = d3.layout
      .force()
      .nodes(dataset.nodes)
      .links(dataset.edges)
      .size([w, 450])
      .linkDistance(50)
      .charge(-900)
      .gravity(0.2)
      .theta(0.8)
      .alpha(0.1)
      .start();

    force.on("end", () => console.log("fuck u"));

    force.on("tick", function () {
      const array = [];
      const arrayEdge = [];
      dataset.nodes.forEach((nod, index) =>
        array.push({
          id: index.toString(),
          name: `S${index}`,
          x: nod.x,
          y: nod.y,
          ...algo,
        })
      );

      dataset.edges.forEach((ed, index) =>
        arrayEdge.push({
          id: index.toString(),
          symbol: "1",
          type: "fixed",
          from: {
            id: `${array[ed.source.index].id}`,
            x: array[ed.source.index].x,
            y: array[ed.source.index].y,
          },
          to: {
            id: `${array[ed.target.index].id}`,
            x: array[ed.target.index].x,
            y: array[ed.target.index].y,
          },
        })
      );

      setNodes(array);
      setEdge(arrayEdge);
    });
  };

  /** This method shows a toast with very important information to the user.
   * @param bg the color of the Toast
   * @param header the header of the Toast
   * @param body the body of the Toast
   * @returns void
   */
  const displayMessage = (bg, header, body) => {
    setMsgShow(true);
    setMsgInfo({
      bg: bg,
      header: header,
      body: body,
    });
  };

  /** This effect wipes some application data when genralInfpo.wipeData is true
   * @returns void
   */
  useEffect(() => {
    if (generalInfo.wipeData) {
      setAddingTr((e) => ({ state: false, tr: "-1" }));
      setIsByStep((e) => false);
      setDisablePrev((e) => true);
    }
  }, [generalInfo.wipeData]);

  /** This method handle input changes on the string to be evaluated
   * @param e the event
   * @returns void
   */
  const handleInputChanges = (e) => {
    handleIncorrectSymbolChanges(e.target.value);
    setInputString(e.target.value);
  };

  /** This method is triggered when the user selects either run by steps or continuously and proceds to the evaluation
   * @param type the evaluating that should be runned (by steps or continuously)
   * @returns void
   */
  const handleInput = (type) => {
    let edgesTmp = edge;
    // user is adding a tmp tr
    if (addingTr.state) {
      setAddingTr({ state: false, tr: "-1" });
      edgesTmp = edge.filter((ed) => ed.type === "fixed");
    }

    setEdge(edgesTmp);
    if (type === "step") {
      setIsByStep(true);
    }
    if (type === "cont") {
      if (isByStep) setIsByStep(false);
    }
    preProcessAutomata(
      nodes,
      edgesTmp,
      inputString,
      runInfo,
      setRunInfo,
      cb,
      type
    );
  };

    /** This callback is used when the user is evaluating the automata by steps
   * @param runInfoObj
   * @returns void
   */
  const byStepCb = (runInfoObj) => {
    setIsByStep(false);
    setDisablePrev(true);
    cb(runInfoObj);
  };

  return (
    <div className="h-100 col-9">
      <div className="d-flex justify-content-center my-4">
        <AlphabetButton
          nowRunning={runInfo.nowRunning}
          fetchingUpdateDfa={fetchingUpdateDfa}
        />

        <div className="d-grid col-5 mx-0 text-center border-start border-2">
          {runInfo.nowRunning && !isByStep && (
            <div className="automataRun m-auto">
              <h4>Automata is running...</h4>
              <div className="spinner">
                <Reactive />
              </div>
            </div>
          )}
          {runInfo.nowRunning && isByStep && (
            <BySteps
              disablePrev={disablePrev}
              runBySteps={runBySteps}
              runInfo={runInfo}
              setRunInfo={setRunInfo}
              byStepCb={byStepCb}
              setDisablePrev={setDisablePrev}
            />
          )}
          {!runInfo.nowRunning && (
            <DfaRun
              inputString={inputString}
              handleInputChanges={handleInputChanges}
              handleInput={handleInput}
              ready={ready}
            />
          )}
        </div>

        <Button
          variant="primary"
          disabled={runInfo.nowRunning}
          className="mx-1"
          id="jsonUpload"
          onClick={algo}
        >
          {" "}
          Upload JSON
        </Button>
      </div>

      <div>
        <div className="d-flex text-center">
          <Canvas
            stageRef={stageRef}
            addingTr={addingTr}
            setAddingTr={setAddingTr}
          />
        </div>

        <div className="row my-2">
          <div id="bottomCanvas">
            <div className="bottomCanvasStyle">
              <div className="dataBaseActions d-grid gap-2 d-md-flex justify-content-md-start">
                {!runInfo.nowRunning && !fetchingUpdateDfa && (
                  <>
                    <DownloadOrSave
                      setCurrentDfa={setCurrentDfa}
                      displayMessage={displayMessage}
                      currentDfaId={currentDfa.id}
                    />

                    <CurrentDfa
                      setFetchingUpdateDfa={setFetchingUpdateDfa}
                      wipeApplicationData={wipeApplicationData}
                      displaySuccessMsg={displaySuccessMsg}
                      displayFailMessage={displayFailMessage}
                      dfaId={currentDfa.id}
                    />
                  </>
                )}
                {fetchingUpdateDfa && (
                  <>
                    <Spinner animation="grow" size="sm" />
                    <h5>Updating current DFA....</h5>{" "}
                  </>
                )}
              </div>
              <ClearOrSend
                stageRef={stageRef}
                nowRunning={runInfo.nowRunning}
                fetchingUpdateDfa={fetchingUpdateDfa}
                displayMessage={displayMessage}
                displaySuccessMsg={displaySuccessMsg}
                displayFailMessage={displayFailMessage}
                currentDfa={currentDfa}
                setCurrentDfa={setCurrentDfa}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <DefaultAlphabetModal handleClose={handleCloseDefaultAlphabetModal} />
        <Message />
      </div>
    </div>
  );
};

export default CanvasAndButtons;

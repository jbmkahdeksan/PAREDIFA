import Canvas from "../../Canvas/Canvas";
import { useRef, useState, useContext, useEffect } from "react";
import DefaultAlphabetModal from "../../Modals/AlphabetModals/DefaultAlphabetModal";
import Message from "../../Message/Message";
import ThemeContext from "../../Context/ContextStates";
import ThemeContextTr from "../../Context/ContextTransitions";
import ThemeContextMsgInfo from "../../Context/ContextMsg";
import ThemeContextMsg from "../../Context/ContextMessage";
import ThemeContextGeneral from "../../Context/GeneralInfo";
import ThemeContextRunInfo from "../../Context/ContextRunInfo";
import ThemeContextCurrentDFA from "../../Context/ContextCurrentDFA";
import ThemeContextLayingDFA from "../../Context/ContextLayingDFA";
import Reactive from "../../ReactLogo/Reactive";
import { preProcessAutomata, runBySteps } from "../../Engine/Engine";
import Spinner from "react-bootstrap/Spinner";
import DfaRun from "./Buttons/RunDFA/DfaRun";
import BySteps from "./Buttons/RunDFA/BySteps";
import CurrentDfa from "./Buttons/CurrentDfa/CurrentDfa";
import DownloadOrSave from "./Buttons/CR/DownloadOrSave";
import ClearOrSend from "./Buttons/WipeOrSend/ClearOrSend";
import AnimationLayingDfa from "../../LayingDFA/AnimationLayingDfa";
import AlphabetOrCompile from "./Buttons/SetAlphabetOrCompileToDfa/AlphabetOrCompile";

/*
 *
 * Description:
 * This component holds the canvas and buttons / inputs for the canvas
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const CanvasAndButtons = ({
  handleIncorrectSymbolChanges,
  inputString,
  setInputString,
  ready,
  cb,
  canCompileToDfa,
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

  //current dfa downloaded
  const { currentDfa, setCurrentDfa } = useContext(ThemeContextCurrentDFA);

  //updateing dfa
  const [fetchingUpdateDfa, setFetchingUpdateDfa] = useState(false);

  //application laying out dfa
  const { layingDFA } = useContext(ThemeContextLayingDFA);

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
      <div className="d-flex justify-content-center mt-2 mb-1">
        {layingDFA && <AnimationLayingDfa />}
        {!layingDFA && (
          <>
            <AlphabetOrCompile
              nowRunning={runInfo.nowRunning}
              fetchingUpdateDfa={fetchingUpdateDfa}
              canCompileToDfa={canCompileToDfa}
              addingTr={addingTr}
            />

            <div className="d-grid col-5 mx-0 text-center border-start border-2">
              {runInfo.nowRunning && !isByStep && (
                <div className="automataRun m-auto mb-4">
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
          </>
        )}
      </div>

      <div>
        <div className="d-flex text-center">
          <Canvas
            stageRef={stageRef}
            addingTr={addingTr}
            setAddingTr={setAddingTr}
          />
        </div>
        {!layingDFA && (
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
                        addingTr={addingTr}
                      />

                      <CurrentDfa
                        setFetchingUpdateDfa={setFetchingUpdateDfa}
                        wipeApplicationData={wipeApplicationData}
                        displaySuccessMsg={displaySuccessMsg}
                        displayFailMessage={displayFailMessage}
                        dfaId={currentDfa.id}
                        addingTr={addingTr}
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
        )}
      </div>

      <div>
        <DefaultAlphabetModal handleClose={handleCloseDefaultAlphabetModal} />
        <Message />
      </div>
    </div>
  );
};

export default CanvasAndButtons;

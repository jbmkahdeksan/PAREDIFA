import Canvas from "./Canvas";
import { useRef, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InformationModal from "../Modals/InformationModal";
import WipeDataModal from "../Modals/WipeDataModal";
import AlphabetModal from "../Modals/AlphabetModal";
import DefaultAlphabetModal from "../Modals/DefaultAlphabetModal";
import Message from "../Message/Message";
import ThemeContext from "../Context/ContextStates";
import ThemeContextTr from "../Context/ContextTransitions";
import ThemeContextMsgInfo from "../Context/ContextMsg";
import ThemeContextMsg from "../Context/ContextMessage";
import ThemeContextGeneral from "../Context/GeneralInfo";
import Spinner from 'react-bootstrap/Spinner';
const CanvasContainer = () => {
  const stageRef = useRef(null);
  // modal information handlers
  const [showInformationModal, setShowInformationModal] = useState(false);
  const handleCloseInformation = () => setShowInformationModal(false);
  //modal wipedata handlers
  const [showWipeModal, setShowWipeModal] = useState(false);
  const handleCloseWipeData = () => setShowWipeModal(false);
  //setAlphabet modals
  const [showAlphabetModal, setShowAlphabetModal] = useState(false);
  const handleCloseAlphabetModal = () => setShowAlphabetModal(false);


  //application information

  const { nodes, setNodes } = useContext(ThemeContext);
  const { edge, setEdge } = useContext(ThemeContextTr);
  const { msgShow, setMsgShow } = useContext(ThemeContextMsg);
  const { msgInfo, setMsgInfo } = useContext(ThemeContextMsgInfo);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  //
  //default alphabet modal
  const handleCloseDefaultAlphabetModal = () =>
  setGeneralInfo({...generalInfo, showAlphabetDefault:false });


  const [jsonInfo, setJsonInfo] = useState("");

  // some states for handling fetching
  const [fetching, setFeching] = useState(false);
  const [progress, setProgress] = useState(0);

  const downloadURI = async (uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    console.log(link.href, "href");
    setFeching(true);
    setProgress(90);
    // await axios.post('http://localhost:3001/',{file:link.href});

    link.click();
    document.body.removeChild(link);
  };
  const handleImage = (firstName, lastName, id, time) => {
    const uri = stageRef.current.toDataURL();

    downloadURI(uri, `${id}_${time}_${firstName}_${lastName}.png`);
  };

  const downloadApplicationInfo = () => {
    if(nodes.length > 0)
    setJsonInfo(JSON.stringify(nodes));
  };

  const handleCopyClipboard = () => {
    if (jsonInfo.length > 0) {
      navigator.clipboard.writeText(jsonInfo);
      setMsgShow(true);
      setMsgInfo({
        bg: "light",
        header: "Copied text to clipboard",
        body: "The text in this input field was copied into clipboard for your use",
      });
    }
  };

  const validateOpening=()=>{
    if(nodes.length>0){
      setShowWipeModal(true)
    }else{
      setMsgShow(true);
      setMsgInfo({
        bg: "light",
        header: "No data detected",
        body: "You havent drawn anything!",
      });
    }
    
  }
  return (
    <>
      <div className="canvasContainer">
        {false && 
          <>
            <div className="automataRun">
              <h1>Automata is running...</h1>
              <div className='spinner'>
              <Spinner animation="grow" variant="info" />
              </div>
    
            </div>
          </>
        }
        {true && (
          <div className="canvasExtra">
            <div className="alphabet">
              <div className="btn-group-sm">
                <Button
                  onClick={() => setShowAlphabetModal(true)}
                  variant="outline-info"
                  id="setAlphabet"
                  title="(e.g.: 1, 0)"
                >
                  Set Alphabet
                </Button>
              </div>
            </div>
            <div className="inputString">
              <Form.Control
                type="text"
                id="testString"
                placeholder="Test string"
              />
              <div className="btn-group-sm">
                <Button variant="primary" className="runByStep">
                  {" "}
                  Run by steps
                </Button>
                <Button variant="primary" className="runCont">
                  {" "}
                  Run continuously
                </Button>
              </div>
            </div>
            <div className="jsonInput">
              <Form.Control
                type="text"
                id="jsonInput"
                value={jsonInfo}
                onChange={(e) => setJsonInfo(e.target.value)}
                placeholder="JSON"
                onDoubleClick={handleCopyClipboard}
              />
              <div className="btn-group-sm json">
                <Button
                  variant="primary"
                  onClick={downloadApplicationInfo}
                  className="jsonDownload"
                >
                  {" "}
                  Download JSON
                </Button>
                <Button variant="primary" className="jsonUpload">
                  {" "}
                  Upload JSON
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="canvas">
          <Canvas stageRef={stageRef} />
          <div className="buttonsCanvas">
            <Button variant="warning" onClick={validateOpening}>
              Clear canvas
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowInformationModal(true)}
            >
              Save as PNG
            </Button>
          </div>
        </div>
      </div>
      <InformationModal
        cb={handleImage}
        show={showInformationModal}
        handleClose={handleCloseInformation}
        fetching={fetching}
        progress={progress}
      />
      <WipeDataModal show={showWipeModal} handleClose={handleCloseWipeData} />
      <AlphabetModal
        show={showAlphabetModal}
        handleClose={handleCloseAlphabetModal}
      />
      <DefaultAlphabetModal
        
        handleClose={handleCloseDefaultAlphabetModal}
      />
      <Message />
    </>
  );
};

export default CanvasContainer;

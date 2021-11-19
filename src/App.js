import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useState} from "react";
import ThemeContext from "./Components/Context/ContextStates";
import ThemeContextMsg from "./Components/Context/ContextMessage";
import ThemeContextTr from "./Components/Context/ContextTransitions";
import ThemeContextMsgInfo from "./Components/Context/ContextMsg";
import ThemeContextGeneral from "./Components/Context/GeneralInfo";
import ThemeContextRunInfo from "./Components/Context/ContextRunInfo";
import ThemeContextStage from "./Components/Context/StageInfo";
import ThemeContextCurrentDFA from "./Components/Context/ContextCurrentDFA";
import ThemeContextLayingDFA from "./Components/Context/ContextLayingDFA";
import NavBar from "./Components/Navbar/NavBar";
import Body from "./Components/MainContainers/Body";
/*
 *
 * Description:
 *   Handles routing && context information
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
function App() {
  const [nodes, setNodes] = useState([]);
  const [edge, setEdge] = useState([]);
  const [msgShow, setMsgShow] = useState(false);
  const [msgInfo, setMsgInfo] = useState({ bg: "", header: "", body: "" });
  const [currentDfa, setCurrentDfa] = useState({ id: null });
  const [layingDFA, setLayingDFA]=useState(false)
  const [generalInfo, setGeneralInfo] = useState({
    alphabet: [],
    useDefault: false,
    wipeData: false,
    showAlphabetDefault: false,
    result: false,
  });
  const [runInfo, setRunInfo] = useState({
    nowRunning: false,
    transitionID: null,
    stateID: null,
    input: null,
    currentChar: null,
    finalState: "",
    prevPressed: false,
  });

  const [stageInfo, setStageInfo] = useState({ w: 900, h: 450 });

  return (
    <BrowserRouter>
      <ThemeContextMsg.Provider value={{ msgShow, setMsgShow }}>
        <ThemeContextMsgInfo.Provider value={{ msgInfo, setMsgInfo }}>
          <ThemeContextTr.Provider value={{ edge, setEdge }}>
            <ThemeContext.Provider value={{ nodes, setNodes }}>
              <ThemeContextGeneral.Provider
                value={{ generalInfo, setGeneralInfo }}
              >
                <ThemeContextRunInfo.Provider value={{ runInfo, setRunInfo }}>
                  <ThemeContextStage.Provider
                    value={{ stageInfo, setStageInfo }}
                  >
                    <ThemeContextCurrentDFA.Provider
                      value={{ currentDfa, setCurrentDfa }}
                    >
                      <ThemeContextLayingDFA.Provider value={{layingDFA, setLayingDFA}}>
                      <NavBar />
                      <Switch>
                        <Route exact path="/" component={Body} />
                        <Redirect exact to="/" />
                      </Switch>
                      </ThemeContextLayingDFA.Provider>
                    </ThemeContextCurrentDFA.Provider>
                  </ThemeContextStage.Provider>
                </ThemeContextRunInfo.Provider>
              </ThemeContextGeneral.Provider>
            </ThemeContext.Provider>
          </ThemeContextTr.Provider>
        </ThemeContextMsgInfo.Provider>
      </ThemeContextMsg.Provider>
    </BrowserRouter>
  );
}

export default App;

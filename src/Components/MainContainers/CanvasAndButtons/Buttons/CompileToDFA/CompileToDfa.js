import Button from "react-bootstrap/Button";
import ThemeContext from "../../../../Context/ContextStates";
import ThemeContextTr from "../../../../Context/ContextTransitions";
import ThemeContextGeneral from "../../../../Context/GeneralInfo";
import ThemeContextLayingDFA from "../../../../Context/ContextLayingDFA";
import ThemeContextStage from "../../../../Context/StageInfo";
import ThemeContextMsgInfo from "../../../../Context/ContextMsg";
import ThemeContextMsg from "../../../../Context/ContextMessage";
import { useContext } from "react";
import { queryNfaToDfa } from "../../../../../Util/graphQLQueryUtil";
import { layout } from "../../../../../Util/LayoutUtil";
import axios from "axios";
const CompileToDfa = ({ canCompileToDfa }) => {
  /*
   *
   * Description:
   * Component for compiling a DFA to a NFA
   * EIF400 -- Paradigmas de Programacion
   * @since II Term - 2021
   * @authors Team 01-10am
   *  - Andres Alvarez Duran 117520958
   *  - Joaquin Barrientos Monge 117440348
   *  - Oscar Ortiz Chavarria 208260347
   *  - David Zarate Marin 116770797
   *
   */
  const { nodes, setNodes } = useContext(ThemeContext);
  const { edge, setEdge } = useContext(ThemeContextTr);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const { setLayingDFA } = useContext(ThemeContextLayingDFA);
  const { setMsgShow } = useContext(ThemeContextMsg);
  const { setMsgInfo } = useContext(ThemeContextMsgInfo);
  const { stageInfo } = useContext(ThemeContextStage);
  const NfaToDfa = async () => {
    const data = await axios.post(process.env.REACT_APP_BACK_END, {
      query: queryNfaToDfa(generalInfo.alphabet, nodes, edge),
    });
    console.log(data, "respuesta dfa");
    const res = data.data.data.convertNFA_into_DFA;
    setGeneralInfo({
      alphabet: res.alphabet,
      useDefault: false,
      wipeData: true,
      showAlphabetDefault: false,
      result: false,
    });
    //if (currentDfa.id) setCurrentDfa({ id: null });

    layout(
      res.nodes.map((nod, index) => ({
        ...nod,
        id: `${Date.now() + index}`,
        final: nod.final,
        start: nod.initial,
      })),
      res.edges.map((e, index) => ({
        id: `${Date.now() + index}`,
        source: e.source,
        target: e.target,
        symbol: e.symbol,
      })),
      stageInfo.w,
      cbMsg,
      setLayingDFA,
      setNodes,
      setEdge
    );
  };

  const cbMsg = () => {
    setLayingDFA(false);
    setMsgShow(true);
    setMsgInfo({
      bg: "light",
      header: "Information",
      body: "Im done",
    });
  };

  return (
    <>
      {canCompileToDfa && (
        <Button onClick={NfaToDfa} variant="outline-warning">
          Convert to DFA
        </Button>
      )}
    </>
  );
};

export default CompileToDfa;

import { useContext } from "react";
import ThemeContext from "../Context/ContextStates";
import ThemeContextTr from "../Context/ContextTransitions";
import ThemeContextGeneral from "../Context/GeneralInfo";

const Errors = ({ inputString, setReady, ready, errorsSymbols}) => {
  const { nodes, setNodes } = useContext(ThemeContext);
  const { edge, setEdge } = useContext(ThemeContextTr);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);

  const INITALSTATE = nodes.find((node) => node.start) ?? false;
  const FINALSTATE = nodes.find((node) => node.final) ?? false;

  const isAutomataComplete = () => {
    const state_symbols = nodes.reduce((stored, current) => {
      stored.push(
        edge
          .filter((ed) => ed.from.id === current.id)
          .map((ed) =>
            ed.symbol.length === 1 ? ed.symbol : ed.symbol.split(",")
          )
          .flat()
      );
      return stored;
    }, []);

    const error = nodes.reduce((stored, state, index) => {
      let exitSymbols = generalInfo.alphabet.filter(
        (elem) => !state_symbols[index].includes(elem)
      );

      if (exitSymbols.length) {
        stored.push(
          <p>
            state # {state.name} has no exit transition containing the symbols{" "}
            {exitSymbols.toString()}.
          </p>
        );
      }

      return stored;
    }, []);

    return error.length === 0
      ? ""
      : [
          <>
            {" "}
            <b>
              ERROR - <i> AUTOMATA NOT COMPLETE </i>
            </b>
            <br></br>
            {error.map((ms, index) => (
              <div key={index}>
                {ms}
                <br></br>
              </div>
            ))}
            <br></br>
            <br></br>
          </>,
          false,
        ];
  };

  const createError = (type, msg) => {
    if (ready) {
      setTimeout(() => {
        setReady(false);
      }, 0);
    }
    return (
      <p>
        <b>
          ERROR - <i> {type} </i>
        </b>
        <br></br> {msg} <br></br>
        <br></br>
      </p>
    );
  };

  const automataReady = () => {
    if (!ready) {
      setTimeout(() => {
        setReady(true);
      }, 0);
    }

    const obj = (
      <div>
        <b>
          ERROR - <i> NONE </i>
        </b>
        <br></br> automata is good to go <br></br>
        <br></br>
      </div>
    );
    return obj;
  };

  return (
    <div className={""}>
      {generalInfo.alphabet.length === 0 && (
        <p>{createError("NO ALPHABET", "alphabet has not been set")}</p>
      )}

      {!INITALSTATE && nodes.length>0 && (
        <p>
          {createError(
            "NO INITIAL STATE",
            `automata doesn't have an initial state`
          )}
        </p>
      )}
      {!nodes.length && 
          <p>
            <b>
              ERROR - <i> NO STATES </i>
            </b>
            <br></br> no states have been added yet <br></br>
            <br></br>
          </p>
      }
      {!FINALSTATE && nodes.length>0 && (
        <p>
          {createError(
            "NO FINAL STATE",
            `automata doesn't have a final state.`
          )}
        </p>
      )}
      {isAutomataComplete()[0]}

      {!inputString.length &&
        !isAutomataComplete().length &&
        FINALSTATE &&
        INITALSTATE && (
          <p>
            {createError(
              "INPUT MISSING",
              "enter an input string to test the automata."
            )}
          </p>
        )}

      {inputString.length > 0 &&  !errorsSymbols.length && 
        FINALSTATE &&
        INITALSTATE &&
        !isAutomataComplete().length && <p>{automataReady()}</p>}
    </div>
  );
};

export default Errors;

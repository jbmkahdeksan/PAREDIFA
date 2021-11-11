import { useContext } from "react";
import ThemeContext from "../Context/ContextStates";
import ThemeContextTr from "../Context/ContextTransitions";
import ThemeContextGeneral from "../Context/GeneralInfo";
/*
 *
 * Description:
 * Main component for showing errors on the right left of the screen
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const Errors = ({ inputString, setReady, ready, errorsSymbols }) => {
  const { nodes } = useContext(ThemeContext);
  const { edge } = useContext(ThemeContextTr);
  const { generalInfo } = useContext(ThemeContextGeneral);

  const INITALSTATE = nodes.find((node) => node.start) ?? false;
  const FINALSTATE = nodes.find((node) => node.final) ?? false;

  /**
   * This method is to check whether automata is ready to go
   * @returns html code
   * */
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
          <>
            state # {state.name} has no exit transition containing the symbols{" "}
            {exitSymbols.toString()}.
          </>
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

  /**
   * This method is to create an error
   * @returns html code
   * */
  const createError = (type, msg) => {
    if (ready) {
      setTimeout(() => {
        setReady(false);
      }, 0);
    }
    return (
      <>
        <b>
          ERROR - <i> {type} </i>
        </b>
        <br></br> {msg} <br></br>
        <br></br>
      </>
    );
  };

  /**
   * This method is to display on the screen that the automata is ready to go
   * @returns html code
   * */
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
  const automataComplete = isAutomataComplete();
  return (
    <div className={""}>
      {generalInfo.alphabet.length === 0 && (
        <p>{createError("NO ALPHABET", "alphabet has not been set")}</p>
      )}

      {!INITALSTATE && nodes.length > 0 && (
        <>
          {createError(
            "NO INITIAL STATE",
            `automata doesn't have an initial state`
          )}
        </>
      )}
      {!nodes.length && (
        <>
          <b>
            ERROR - <i> NO STATES </i>
          </b>
          <br></br> no states have been added yet <br></br>
          <br></br>
        </>
      )}
      {!FINALSTATE && nodes.length > 0 && (
        <>
          {createError(
            "NO FINAL STATE",
            `automata doesn't have a final state.`
          )}
        </>
      )}
      {automataComplete[0]}

      {!inputString.length &&
        !automataComplete.length &&
        FINALSTATE &&
        INITALSTATE && (
          <>
            {createError(
              "INPUT MISSING",
              "enter an input string to test the automata."
            )}
          </>
        )}

      {inputString.length > 0 &&
        errorsSymbols.length === 0 &&
        FINALSTATE &&
        INITALSTATE &&
        !automataComplete.length && <>{automataReady()}</>}
    </div>
  );
};

export default Errors;

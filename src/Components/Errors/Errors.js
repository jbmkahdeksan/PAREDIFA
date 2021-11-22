import { useContext } from "react";
import ThemeContext from "../Context/ContextStates";
import ThemeContextGeneral from "../Context/GeneralInfo";
/*
 *
 * Description:
 * Main component for showing errors on the right left of the screen
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const Errors = ({
  inputString,
  setReady,
  ready,
  errorsSymbols,
  INITALSTATE,
  FINALSTATE,
  automataComplete,
  createError,
}) => {
  const { nodes } = useContext(ThemeContext);
  const { generalInfo } = useContext(ThemeContextGeneral);

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

    return (
      <div>
        <b>
          ERROR - <i> NONE </i>
        </b>
        <br></br> automata is good to go <br></br>
        <br></br>
      </div>
    );
  };

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

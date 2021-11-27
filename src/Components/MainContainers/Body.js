import CanvasAndButtons from "./CanvasAndButtons/CanvasAndButtons";
import { useState, useContext, useEffect } from "react";
import ThemeContext from "../Context/ContextStates";
import ThemeContextTr from "../Context/ContextTransitions";
import ThemeContextGeneral from "../Context/GeneralInfo";
import Errors from "../Errors/Errors";
/*
 *
 * Description:
 * Body components has the canvas container and errors
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const Body = () => {
  const [errors, setErrors] = useState({
    incorrectSymbol: "",
  });
  const { nodes } = useContext(ThemeContext);
  const { edge } = useContext(ThemeContextTr);
  const { generalInfo } = useContext(ThemeContextGeneral);
  const [inputString, setInputString] = useState("");
  const [ready, setReady] = useState(false);
  const [finalResultInfo, setFinalResult] = useState("");
  const INITALSTATE = nodes.find((node) => node.start) ?? false;
  const FINALSTATE = nodes.find((node) => node.final) ?? false;

  /**  This method checks if string to test is valid
   * @param inputString the input the user entered
   */
  const handleIncorrectSymbolChanges = (inputString) => {
    if (inputString.length >= 0 && generalInfo.alphabet.length > 0) {
      const input = [...inputString];

      let incorrect_symbols = [
        ...new Set(
          input.filter((elem) => !generalInfo.alphabet.includes(elem))
        ),
      ];
      if (incorrect_symbols.length && input.length) {
        setErrors((e) => ({
          ...errors,
          incorrectSymbol: (
            <>
              <b>
                ERROR - <i> IMPOSSIBLE INPUT </i>
              </b>
              <br></br>
              the symbols '{incorrect_symbols.toString()}' don't exist in the
              alphabet<br></br>
              <br></br>
            </>
          ),
        }));
        if (ready) setReady(false);

        // result = false; <---------------------------------------------
      }
      if (incorrect_symbols.length === 0) {
        setErrors((e) => ({ ...errors, incorrectSymbol: "" }));
      }
    }
  };

  /**  This method show the final result of the DFA evaluation
   * @param runInfo run information
   */
  const finalResult = (runInfo) => {
    if (runInfo.finalState.length && nodes.length) {
      const infoFinal = runInfo.finalState.split(":");

      const state = nodes.find((nod) => nod.id === infoFinal[1]);

      const acceptance = state.final ? (
        <>
          {" "}
          <span style={{ color: "green" }}>accepted.</span>
          <br></br>
          <br></br>
        </>
      ) : (
        <>
          {" "}
          <span style={{ color: "red" }}> rejected.</span>
          <br></br>
          <br></br>
        </>
      );
      const htmlResult = (
        <>
          <br></br>
          <b>RESULTS:</b>
          <br></br> [input: "{infoFinal[0]}" , end state: "{state.name}"]
          &#x279C;
          {acceptance}
        </>
      );
      setFinalResult(htmlResult);
      setInputString("");
    }
  };

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
      setReady(false);
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

  const automataComplete = isAutomataComplete();

  /**  This effect watches if user is reloading page and if the regex inside session storage is not null, wipes it.
   * @returns void
   */
  useEffect(() => {
    window.onbeforeunload = () => {
      if (sessionStorage.getItem("regex")) sessionStorage.clear();
    };
  }, []);
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CanvasAndButtons
          handleIncorrectSymbolChanges={handleIncorrectSymbolChanges}
          inputString={inputString}
          setInputString={setInputString}
          cb={finalResult}
          ready={ready}
          canCompileToDfa={
            INITALSTATE && FINALSTATE && automataComplete.length > 0
          }
        />
        <div className="h-100 col-3 mx-auto border-start border-5 mt-4 ps-2">
          <div className="errors">
            {errors.incorrectSymbol}
            <Errors
              inputString={inputString}
              ready={ready}
              setReady={setReady}
              errorsSymbols={errors.incorrectSymbol}
              INITALSTATE={INITALSTATE}
              FINALSTATE={FINALSTATE}
              automataComplete={automataComplete}
              createError={createError}
            />
          </div>
          <div className="accepted">{finalResultInfo}</div>
        </div>
      </div>
    </div>
  );
};

export default Body;

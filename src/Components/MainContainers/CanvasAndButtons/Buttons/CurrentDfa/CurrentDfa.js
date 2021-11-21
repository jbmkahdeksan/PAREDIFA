import { FcProcess, FcFullTrash } from "react-icons/fc";
import ThemeContext from "../../../../Context/ContextStates";
import ThemeContextTr from "../../../../Context/ContextTransitions";
import ThemeContextGeneral from "../../../../Context/GeneralInfo";
import axios from "axios";
import { useContext, useState } from "react";
import {
  queryMutationUpdate,
  queryMutationDelete,
} from "../../../../../Util/graphQLQueryUtil";
import DeleteAutomataModal from "../../../../Modals/DeleteDFAModal/DeleteAutomataModal";
/*
 *
 * Description:
 * this component allows the user to delete or update the current DFA downloaded
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const CurrentDfa = ({
  dfaId,
  displayFailMessage,
  displaySuccessMsg,
  wipeApplicationData,
  setFetchingUpdateDfa,
  addingTr,
}) => {
  const { nodes } = useContext(ThemeContext);
  const { edge } = useContext(ThemeContextTr);
  const { generalInfo } = useContext(ThemeContextGeneral);
  const [showDeleteCurrentDfa, setShowDeleteCurrentDfa] = useState(false);
  const [fetchingDelete, setFetchingDelete] = useState(false);
  const handleShowDeleteCurrentDfa = () => setShowDeleteCurrentDfa(false);

  /** Updates current DFA
   * @returns void
   */
  const handleCurrentDfaUpdate = async () => {
    try {
      setFetchingUpdateDfa(true);
      await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryMutationUpdate(
          dfaId,
          nodes,
          addingTr.state
            ? edge.filter((ed) => ed.type === "fixed" && ed.symbol.length !== 0)
            : edge,
          generalInfo.alphabet,
          sessionStorage.getItem("regex") ?? ""
        ),
      });
      wipeApplicationData();
      if (sessionStorage.getItem("regex")) sessionStorage.clear()
      displaySuccessMsg("The DFA was updated successfully!");
    } catch (e) {
      displayFailMessage(`There was an while updating the DFA:  ${e.message}`);
    } finally {
      setFetchingUpdateDfa(false);
    }
  };

  /** Deletes current DFA
   * @returns void
   */
  const deleteCurrentDfaFromDB = async () => {
    try {
      setFetchingDelete(true);
      await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryMutationDelete(dfaId),
      });
      displaySuccessMsg(`The DFA was successfully deleted!`);
      if (sessionStorage.getItem("regex")) sessionStorage.clear()
      wipeApplicationData();
    } catch (e) {
      displayFailMessage(
        `Oops! Looks like we got an error while deleteing the DFA: ${e.message}`
      );
    } finally {
      setFetchingDelete(false);
      handleShowDeleteCurrentDfa();
    }
  };

  return (
    <>
      {dfaId && (
        <>
          <FcFullTrash
            title="Delete the current DFA"
            className="trashCurrentDfa"
            onClick={() => setShowDeleteCurrentDfa(true)}
            size={23}
          />
          <FcProcess
            className="updateCurrentDFA"
            onClick={handleCurrentDfaUpdate}
            title="Update current DFA"
            size={23}
          />
        </>
      )}
      <DeleteAutomataModal
        show={showDeleteCurrentDfa}
        handleClose={handleShowDeleteCurrentDfa}
        cbDelete={deleteCurrentDfaFromDB}
        fetchingDelete={fetchingDelete}
        title="Are you sure you want to delete this DFA? This action cannot be undone!"
      />
    </>
  );
};

export default CurrentDfa;

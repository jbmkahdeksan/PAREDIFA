import { FcProcess, FcEmptyTrash } from "react-icons/fc";
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
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
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
          generalInfo.alphabet
        ),
      });
      wipeApplicationData();
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
          <FcEmptyTrash
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

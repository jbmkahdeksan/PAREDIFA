import axios from "axios";
import { useState } from "react";
import { queryDeleteByRe } from "../../../../../Util/graphQLQueryUtil";
import Button from "react-bootstrap/Button";
import DeleteAutomataModal from "../../../../Modals/DeleteDFAModal/DeleteAutomataModal";
const DeleteByRegex = ({
  length,
  fetching,
  fetchingDelete,
  displayErrorMsg,
  idDfa,
  handleShow,
  displaySuccessMsg,
  wipeApplicationData,
}) => {
  //YOU DELETE IS THE CURRENT DFA IN THE SCREEN???????????AD?A?D?A?SDA?SD
  const [fetchingDeleteByRe, setDeleteFetchingByRe] = useState(false);
  //deleta automata by re info
  const [showDeleteDfaModalByRe, setShowDeleteDfaModalByRe] = useState(false);
  const handleCloseShowDeleteDfaModalByRe = () => {
    setShowDeleteDfaModalByRe(false);
  };
  const deleteAutomataByRegex = async () => {
    if (idDfa === 0) return;
    try {
      setDeleteFetchingByRe(true);
      const res = await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryDeleteByRe(idDfa),
      });

      if (!res.data.data.deleteAutomataByRegex) {
        throw new Error("Couldnt find a DFA associated to the REGEX");
      }
      if (sessionStorage.getItem("regex") === idDfa) {
        wipeApplicationData();
        sessionStorage.removeItem("regex");
      }
      displaySuccessMsg("DFA deleted successfully");
    } catch (e) {
      displayErrorMsg(e);
    } finally {
      setDeleteFetchingByRe(false);
      setShowDeleteDfaModalByRe(false);
      handleShow();
    }
  };
  return (
    <>
      {length === 0 && (
        <Button
          onClick={() => setShowDeleteDfaModalByRe(true)}
          variant="warning"
          disabled={fetching || fetchingDelete || fetchingDeleteByRe}
        >
          Delete by REGEX
        </Button>
      )}
      <DeleteAutomataModal
        show={showDeleteDfaModalByRe}
        title={
          sessionStorage.getItem("regex") === idDfa
            ? "Are you sure you want to delete this DFA? The current DFA displayed matches the RE youre about to delete!"
            : "Are you sure you want to delete this DFA? This action cannot be undone!"
        }
        handleClose={handleCloseShowDeleteDfaModalByRe}
        cbDelete={deleteAutomataByRegex}
        fetchingDelete={fetchingDeleteByRe}
      />
    </>
  );
};

export default DeleteByRegex;

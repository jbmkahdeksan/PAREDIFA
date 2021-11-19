import Button from "react-bootstrap/Button";
import axios from "axios";
import { querySingleAutomata } from "../../../../../Util/graphQLQueryUtil";
const DfaDownload = ({
  idDfa,
  setIdDfa,
  setDbDAta,
  handleShow,
  displayErrorMsg,
  setFetching,
  fetchingDelete,
  fetching 
}) => {
  const handleSingleDfaDownload = async () => {
    if (idDfa.length === 0) return;

    try {
      setFetching(true);
      const data = await axios.post(process.env.REACT_APP_BACK_END, {
        query: querySingleAutomata(idDfa),
      });
      if (!data.data.data.singleAutomata) {
        throw new Error("Couldnt find an automata with the given ID");
      }

      setDbDAta([data.data.data.singleAutomata]);
    } catch (e) {
      handleShow();
      displayErrorMsg(e);
    } finally {
      setFetching(false);
      setIdDfa("");
    }
  };
  return (
    <>
      <Button
        onClick={handleSingleDfaDownload}
        disabled={fetching || fetchingDelete}
      >
        Retrieve by ID
      </Button>
    </>
  );
};

export default DfaDownload;

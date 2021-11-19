import axios from "axios";
import { FcMultipleInputs } from "react-icons/fc";
import { queryAllAutomatas } from "../../../../../Util/graphQLQueryUtil";
const ListAllDfa = ({
  setFetching,
  setDbDAta,
  displayErrorMsg,
  handleShow,
}) => {
  const fetchData = async () => {
    try {
      setFetching(true);
      const res = await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryAllAutomatas,
      });

      setDbDAta(res.data.data.allAutomatas);
    } catch (e) {
      displayErrorMsg(e);
      handleShow();
    } finally {
      setFetching(false);
    }
  };
  return (
    <>
      <FcMultipleInputs
        size={33}
        title="Click here to list them all"
        onClick={fetchData}
        className="downloadAllDfa"
      />
    </>
  );
};

export default ListAllDfa;

import axios from "axios";
import { FcMultipleInputs, FcFilledFilter } from "react-icons/fc";
import { queryAllAutomatas } from "../../../../../Util/graphQLQueryUtil";
/*
 *
 * Description:
 * Component for the list of the DFAS stored in the dB
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const ListAllDfa = ({
  setFetching,
  setDbDAta,
  displayErrorMsg,
  handleShow,
  setFilterByRe,
  dbData
}) => {
  /**  This method fetches all the DFAs stored in the dB
   * @returns void
   */
  const fetchData = async () => {
    try {
      setFilterByRe(false);
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
      />{" "}
      {dbData.length > 1 && (
        <FcFilledFilter
          onClick={() => setFilterByRe(true)}
          size={30}
          className="filterData"
          title="Filter by regex only"
        />
      )}
    </>
  );
};

export default ListAllDfa;

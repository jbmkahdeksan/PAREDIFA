import ListGroup from "react-bootstrap/ListGroup";
import { BsEye, BsDownload, BsTrash } from "react-icons/bs";


/*
 *
 * Description:
 * The list of the DFA to be displayed
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const DfaList = ({
  dbData,
  setOptionTodo,
  setShowDeleteDfaModal,
  setSelectedDFA,
  checkForDisplayData,
  handleDisplayData,
  currentDfaId,
}) => {

  return (
    <div className="dfaDisplayContainer">
      {dbData.length > 0 && (
        <ListGroup as="ol" numbered>
          {dbData.map((data, index) => (
            <ListGroup.Item
              key={index}
              as="li"
              variant={
                currentDfaId &&
                currentDfaId === data.id &&
                data.regex.length > 0
                  ? "primary"
                  : currentDfaId && currentDfaId === data.id
                  ? "success"
                  : data.regex.length > 0
                  ? "secondary"
                  : ""
              }
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{data.id}</div>
                {currentDfaId &&
                currentDfaId === data.id &&
                data.regex.length > 0
                  ? `Currently being displayed && regex made --> ${data.regex}`
                  : currentDfaId && currentDfaId === data.id
                  ? "Currently being displayed"
                  : data.regex.length > 0
                  ? `Regex made --> ${data.regex}`
                  : ""}
              </div>
              <BsTrash
                size={23}
                title="Click here to delete this DFA"
                className="deleteFASpecific"
                onClick={() => {
                  setOptionTodo(1);
                  setShowDeleteDfaModal(true);
                  setSelectedDFA(data.id);
                }}
              />{" "}
              <BsDownload
                title="Click here to download this DFA"
                onClick={() => {
                  setSelectedDFA(data.id);
                  checkForDisplayData(data.id);
                }}
                className="downloadFaSpecific"
                size={23}
              />
              {"   "}
              <BsEye
                title="Click here to preview this DFA"
                className="displayFa"
                onClick={() => handleDisplayData(data.id)}
                size={23}
              />{" "}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default DfaList;

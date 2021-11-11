import ListGroup from "react-bootstrap/ListGroup";
import { BsEye, BsDownload, BsTrash } from "react-icons/bs";

/*
 *
 * Description:
 * The list of the DFA to be displayed
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const DfaList = ({
  dbData,
  setOptionTodo,
  setShowDeleteDfaModal,
  setSelectedDFA,
  checkForDisplayData,
  handleDisplayData,
}) => {
  return (
    <div className="dfaDisplayContainer">
      {dbData.length > 0 && (
        <ListGroup as="ol" numbered>
          {dbData.map((data, index) => (
            <ListGroup.Item
              key={index}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{data.id}</div>
                {data.name === "NONE" ? "Unnamed" : data.name}
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

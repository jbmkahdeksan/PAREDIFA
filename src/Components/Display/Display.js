import { Stage, Layer } from "react-konva";
import Modal from "react-bootstrap/Modal";
import Node from "../Canvas/Node";
import Edge from '../Canvas/Edge'

const Display = ({ show, handleClose, nodes, edges }) => {

  return (
    <>
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Displaying DFA{ " " }
            *View only mode*
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="displayDFA">
            <Stage height={450} width={900}>
              <Layer>
                {nodes.map((node, index) => (
                  <Node
                    setSelected={() => {}}
                    selected="-1"
                    key={index}
                    nodeInfo={node}
                    updateCoordNode={() => {}}
                    isNamingState={false}
                    setMouseCoord={() => {}}
                    updateCoordEdges={() => {}}
                    isNamingTr="-1"
                    addingTr={{ state: false }}
                    setMouseDown={() => {}}
                    nodeRunningId="-1"
                    running={false}
                    stageWidth={900}
                    displaying={true}
                  />
                ))}
                {edges
                  .map((edge, index) => (
                    <Edge
                      selectedTr='-1'
                      type='fixed'
                      id={edge.id}
                      symbol={edge.symbol}
                      isNamingState={false}
                      isNamingTr='-1'
                      running={false}
                      isRunning={false}
                      w={900}
                      key={index}
                      currentChar=""
                      node1={
                        edge.to
                      }
                      node2={
                       edge.from
                      }
                    />
                  ))}
              </Layer>
            </Stage>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Display;

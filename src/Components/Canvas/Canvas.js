import React, { useEffect, useState, useCallback, useContext } from "react";
import ThemeContextMsgInfo from "../Context/ContextMsg";
import ThemeContextMsg from "../Context/ContextMessage";
import InformationModal from "../Modals/InformationModal";
import { Stage, Layer } from "react-konva";
import TemporaryEdge from "./TemporaryEdge";
import Node from "./Node";
import Edge from "./Edge";
import axios from 'axios'

/*
 *
 * Description:
 *
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const Canvas = () => {
  //const { msgShow, setMsgShow } = useContext(ThemeContextMsg);
  //const { msgInfo, setMsgInfo } = useContext(ThemeContextMsgInfo);
  const [mouseCoord, setMouseCoord] = useState({});
  const [mouseDown, setMouseDown] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edge, setEdge] = useState([]);
  const [selected, setSelected] = useState("-1");
  const [selectedTr, setSelectedTr] = useState("-1");
  const [showModal, setShowModal] = useState(false);
  const [namingState, setIsNamingState] = useState(false);
  const { msgShow, setMsgShow } = useContext(ThemeContextMsg);
  const { msgInfo, setMsgInfo } = useContext(ThemeContextMsgInfo);
  const [isFillingSymbol, setIsFillingSymbol] = useState(false);
  const [addingTr, setAddingTr] = useState({ state: false, tr: "-1" });
  const stageRef = React.useRef(null);

  const handleClose = () => setShowModal(false);

  const updateCoordEdges = (coord, id) => {
    setEdge(
      edge.map((arrow) => {
        if (arrow.from.id === id && arrow.to.id === id) {
          return {
            ...arrow,
            from: { ...arrow.from, ...coord },
            to: { ...arrow.to, ...coord },
          };
        }
        if (arrow.from.id === id) {
          return {
            ...arrow,
            from: { ...arrow.from, ...coord },
            to: { ...arrow.to },
          };
        }
        if (arrow.to.id === id) {
          return {
            ...arrow,
            from: { ...arrow.from },
            to: { ...arrow.to, ...coord },
          };
        }
        return arrow;
      })
    );
  };
  const handleKeyDown = useCallback(
    (e) => {
      if (selectedTr !== "-1") {
        if (e.key === "Enter") {
          if (addingTr.state) {
            setAddingTr({ state: false, id: "-1" });
          }
          setIsFillingSymbol(false);
          setEdge(edge.filter((ed) => ed.symbol.length > 0));
          setSelectedTr("-1");
        }
        if (e.key === "Backspace") {
          setEdge(
            edge.map((ed) =>
              ed.id === selectedTr
                ? { ...ed, symbol: ed.symbol.slice(0, ed.symbol.length - 1) }
                : ed
            )
          );
        }
        if (e.key.length === 1) {
          setEdge(
            edge.map((ed) =>
              ed.id === selectedTr ? { ...ed, symbol: ed.symbol + e.key } : ed
            )
          );
        }
       
        if (e.key === "Delete") {
          setEdge(edge.filter((ed) => ed.id !== selectedTr));
          setSelectedTr("-1");
          if(isFillingSymbol) setIsFillingSymbol(false);
        }

        return;
      }

      if (namingState) {
        if (e.key === "Enter") {
          setIsNamingState(false);
          return;
        }
        if (e.key === "Backspace") {
          setNodes(
            nodes.map((node) =>
              node.id === selected
                ? {
                    ...node,
                    name:
                      node.name.length === 1
                        ? node.name
                        : node.name.slice(0, node.name.length - 1),
                  }
                : node
            )
          );
        }
        if (e.key.length === 1) {
          setNodes(
            nodes.map((node) =>
              node.id === selected && node.name.length < 4
                ? { ...node, name: node.name + e.key }
                : node
            )
          );
        }
        return;
      }
      if (e.key === "q") {
        setNodes([
          ...nodes,
          {
            id: Date.now().toString(),
            x: mouseCoord.x,
            y: mouseCoord.y,
            start: false,
            selected: false,
            final: false,
            width: 40,
            height: 40,
            type: "circle",
            shadowColor: "black",
            shadowBlur: 10,
            shadowOpacity: 0.6,
            name: `S${nodes.length}`,
          },
        ]);
      }
      if (selected === "-1") return;
      
      if (e.key === "Delete" && !addingTr.state) {
        setSelected("-1");
        setNodes([]);
        setNodes(nodes.filter((node) => node.id !== selected));
        setEdge(
          edge.filter((ed) => ed.from.id !== selected && ed.to.id !== selected)
        );
      }

      if (e.key === "f") {
        setNodes(
          nodes.map((node) =>
            node.id === selected ? { ...node, final: !node.final } : node
          )
        );
      }
      if (e.key === "s") {
        setNodes(
          nodes.map((node) =>
            node.id === selected
              ? { ...node, start: true }
              : { ...node, start: false }
          )
        );
      }
      if (e.key === "r") {
        setIsNamingState(true);
      }
    },
    [nodes, mouseCoord, selected, namingState, edge, selectedTr, addingTr.state, isFillingSymbol]
  );

  const modifyCoordNodo = (coords, id) => {
    setNodes([]);
    setNodes(
      nodes.map((nodo) => (nodo.id === id ? { ...nodo, ...coords } : nodo))
    );
  };


  const handleSelection = (e) => {
    if (namingState) {
      setIsNamingState(false);
      return;
    }

    if (e.target.attrs.type === "nodo") {
      const selectedNode = e.target.attrs;
      if (isFillingSymbol) return;
      if (addingTr.state) {
        setIsFillingSymbol(true);
        
        if (isFillingSymbol) return;

        //****AQUIIII */
    
        const edgeTo = edge.reduce((stored, current) => {
          if (selected === selectedNode.id) {
            if (
              current.from.id === selectedNode.id &&
              current.to.id === selectedNode.id
            ) {
              stored++;
            }
          }
          console.log(selected,selectedNode.id)
          if (selected !== selectedNode.id) {
            if (current.from.id !== current.to.id) {
              if (
                current.to.id === selectedNode.id &&
                current.from.id === selected
              ) {
                stored++;
              }
            }
          }
          return stored;
        }, 0);
        
        if (edgeTo) {
          setMsgShow(true);
          setMsgInfo({
            bg: "info",
            header: "Repeated transition",
            body: "You already have a transition going to this node!",
          });

          setEdge(edge.filter((ed) => ed.type !== "temporary"));
          setAddingTr({ state: false, tr: "-1" });
          setIsFillingSymbol(false);
          
          return;
        }

        setEdge(
          edge.map((ed) =>
            ed.id === addingTr.tr
              ? {
                  ...ed,
                  type: "fixed",
                  to: {
                    id: selectedNode.id,
                    x: selectedNode.coord.x,
                    y: selectedNode.coord.y,
                  },
                }
              : ed
          )
        );
        console.log(edge)
        console.log('wtf')
        setSelectedTr(addingTr.tr);
        setAddingTr({ state: false, tr: "-1" });
        setSelected("-1");
              
        return;
      }
      if(selectedTr!=='-1'){
        setEdge(edge.filter(ed=> ed.symbol.length!==0))
      }
      setSelectedTr("-1");
      setSelected(e.target.attrs.id);
    }
    if (e.target.attrs.type === "stage") {
      setIsFillingSymbol(false);
      setSelected("-1");
      setSelectedTr("-1");
      if (selectedTr !== "-1") {
        setEdge(edge.filter((ed) => ed.symbol.length !== 0));
      }
      if (addingTr.state) {
        setAddingTr({ state: false, id: "-1" });
        setEdge(edge.filter((ed) => ed.id !== addingTr.tr));
      }
      setNodes(nodes.map((node) => ({ ...node, selected: false })));
    }

    if (e.target.attrs.type === "arrow") {
      setSelectedTr(e.target.attrs.id);
      setSelected("-1");
      if (addingTr.state || isFillingSymbol) {
        if (isFillingSymbol) setIsFillingSymbol(false);
        setAddingTr({ state: false, id: "-1" });
        setEdge(
          edge.filter((ed) => ed.id !== addingTr.tr && ed.symbol.length !== 0)
        );
      }
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const downloadURI =async (uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    console.log(link.href,'href')

     await axios.post('http://localhost:3001/',{file:link.href});

    
    
    link.click();
    document.body.removeChild(link);
  };
  const handleImage = (firstName, lastName, id, time) => {
    const uri = stageRef.current.toDataURL();

    downloadURI(uri, `${id}_${time}_${firstName}_${lastName}.png`);
  };

  const handleTmpTr = (e) => {
    if (e.target.attrs.type !== "nodo") return;
    if (selectedTr !== "-1") return;
    const coord = e.target.attrs.coord;

    if (isFillingSymbol) return;
   
    const id = Date.now().toString();
    setAddingTr({ state: true, tr: id });
    setEdge([
      ...edge,
      {
        id: id,
        symbol: "",
        type: "temporary",
        coordTemp: { x: coord.y, y: coord.y },
        from: {
          id: e.target.attrs.id,
          x: coord.x,
          y: coord.y,
        },
        to: {
          id: "-100",
          x: coord.x,
          y: coord.y,
        },
      },
    ]);
  };
  return (
    <>
      
      <Stage
        onDblClick={handleTmpTr}
        ref={stageRef}
        className='stageCanva'
      
        onMouseMove={(e) => {
          setMouseCoord({ x: e.evt.offsetX, y: e.evt.offsetY });
        }}
        type="stage"
        onclick={(e) => handleSelection(e)}
        width={900}
        height={500}
      >
        <Layer >
          {nodes.map((node, index) => (
            <Node
              mouseCoord={mouseCoord}
              listaNodos={nodes}
              setSelected={setSelected}
              selected={selected}
              key={index}
              nodeInfo={node}
              updateCoordNode={modifyCoordNodo}
              isNamingState={namingState}
              setMouseCoord={setMouseCoord}
              updateCoordEdges={updateCoordEdges}
              isNamingTr={selectedTr}
              addingTr={addingTr}
              setMouseDown={setMouseDown}
            />
          ))}
        </Layer>
        <Layer>
          {addingTr.state &&
            edge
              .filter((edge) => edge.type === "temporary")
              .map((edge, index) => (
                <TemporaryEdge
                  mouseCoord={mouseCoord}
                  id={edge.id}
                  x={edge.to.x}
                  y={edge.to.y}
                  key={index}
                  node2={
                    edge.to.id === selected && edge.id === addingTr.tr
                      ? { ...edge.to, ...mouseCoord }
                      : edge.to
                  }
                  node1={
                    edge.from.id === selected && edge.id === addingTr.tr
                      ? { ...edge.from, ...mouseCoord }
                      : edge.from
                  }
                />
              ))}
          {edge
            .filter((edge) => edge.type === "fixed")
            .map((edge, index) => (
              <Edge
                addingTr={addingTr}
                mouseCoord={mouseCoord}
                selectedTr={selectedTr}
                type={edge.type}
                id={edge.id}
                symbol={edge.symbol}
                isNamingState={namingState}
                isNamingTr={selectedTr}
                key={index}
                node1={
                  edge.to.id === selected && mouseDown
                    ? { ...edge.to, ...mouseCoord }
                    : edge.to
                }
                node2={
                  edge.from.id === selected && mouseDown
                    ? { ...edge.from, ...mouseCoord }
                    : edge.from
                }
              />
            ))}
        </Layer>
      </Stage>
      <InformationModal
        cb={handleImage}
        show={showModal}
        handleClose={handleClose}
      />
    </>
  );
};

export default Canvas;

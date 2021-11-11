import React, { useEffect, useState, useCallback, useContext } from "react";
import ThemeContextMsgInfo from "../Context/ContextMsg";
import ThemeContextMsg from "../Context/ContextMessage";
import ThemeContext from "../Context/ContextStates";
import ThemeContextTr from "../Context/ContextTransitions";
import ThemeContextGeneral from "../Context/GeneralInfo";
import ThemeContextRunInfo from "../Context/ContextRunInfo";
import ThemeContextStage from "../Context/StageInfo";
import { Stage, Layer } from "react-konva";
import TemporaryEdge from "../CanvasElements/Edge/TemporaryEdge";
import Node from "../CanvasElements/Node/Node";
import Edge from "../CanvasElements/Edge/Edge";
import ShapeRI from "../CanvasElements/Shapes/ShapeRI";
import ResultShape from "../CanvasElements/Shapes/ResultShape";

/*
 *
 * Description:
 *  Main component for painting canvas
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const Canvas = ({ stageRef, addingTr, setAddingTr }) => {
  const [mouseCoord, setMouseCoord] = useState({}); //HANDLE AFTER DELETEDAOSKDOASKD
  const [mouseDown, setMouseDown] = useState(false);
  const { nodes, setNodes } = useContext(ThemeContext);
  const { edge, setEdge } = useContext(ThemeContextTr);
  const [selected, setSelected] = useState("-1");
  const [selectedTr, setSelectedTr] = useState("-1");
  const [namingState, setIsNamingState] = useState(false);
  const { setMsgShow } = useContext(ThemeContextMsg);
  const { setMsgInfo } = useContext(ThemeContextMsgInfo);
  const { runInfo } = useContext(ThemeContextRunInfo);
  const [isFillingSymbol, setIsFillingSymbol] = useState(false);
  const [mouseIn, setMouseIn] = useState(false);
  const { stageInfo, setStageInfo } = useContext(ThemeContextStage);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);

  const displayMessage = useCallback(
    (bg, header, body) => {
      setMsgShow(true);
      setMsgInfo({
        bg: bg,
        header: header,
        body: body,
      });
    },
    [setMsgInfo, setMsgShow]
  );
  /**  Makes sure automata stays as DFA
   * @param id the state were looking for
   * @param key the current character user entered
   */
  const findKeyRepeat = useCallback(
    (id, key) => {
      const letterRepeat =
        edge.reduce((stored, current) => {
          if (
            current.from.id === id &&
            current.symbol?.split(",").indexOf(key) !== -1
          ) {
            stored++;
          }
          return stored;
        }, 0) >= 1;

      if (letterRepeat) {
        displayMessage(
          "warning",
          "Repeated letter",
          `This state already has an exit transition with the letter \u{279C} '${key}' `
        );
      }
      return letterRepeat;
    },
    [edge, displayMessage]
  );

  /** Updates the state coords of an edge
   * @param coord coords -> {x,y}
   * @param id id of the state where the state coord should be updated
   */
  const updateCoordEdges = (coord, id) => {
    setEdge(
      edge.map((arrow) => {
        return arrow.from.id === id && arrow.to.id === id
          ? {
              ...arrow,
              from: { ...arrow.from, ...coord },
              to: { ...arrow.to, ...coord },
            }
          : arrow.from.id === id
          ? {
              ...arrow,
              from: { ...arrow.from, ...coord },
              to: { ...arrow.to },
            }
          : arrow.to.id === id
          ? {
              ...arrow,
              from: { ...arrow.from },
              to: { ...arrow.to, ...coord },
            }
          : arrow;
      })
    );
  };

  const handleKeyDownStates = useCallback(
    (e) => {
      console.log("handingKeyDown states");
      if (e.keyCode === 81) {
        if (generalInfo.alphabet.length === 0) {
          setGeneralInfo({ ...generalInfo, showAlphabetDefault: true });
          return;
        }
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
            running: false,
          },
        ]);
      }
      if (selected === "-1") return;

      //DELETE
      if (e.keyCode === 46 && !addingTr.state) {
        setSelected("-1");
        setNodes([]);
        setNodes(nodes.filter((node) => node.id !== selected));
        setEdge(
          edge.filter((ed) => ed.from.id !== selected && ed.to.id !== selected)
        );
      }

      //F
      if (e.keyCode === 70) {
        setNodes(
          nodes.map((node) =>
            node.id === selected ? { ...node, final: !node.final } : node
          )
        );
      }
      //S
      if (e.keyCode === 83) {
        setNodes(
          nodes.map((node) =>
            node.id === selected
              ? { ...node, start: true }
              : { ...node, start: false }
          )
        );
      }

      //R
      if (e.keyCode === 82) {
        setIsNamingState(true);
      }
    },
    [
      addingTr.state,
      edge,
      generalInfo,
      nodes,
      selected,
      setEdge,
      setGeneralInfo,
      setNodes,
      mouseCoord,
    ]
  );

  const handleNamingState = useCallback(
    (e) => {
      console.log("ahndingNaming");
      //ENTER
      if (e.keyCode === 13) {
        setIsNamingState(false);
        return;
      }
      //BACKSPACE
      if (e.keyCode === 8) {
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
    },
    [nodes, selected, setNodes]
  );
  const handleKeyDownEdges = useCallback(
    (e) => {
      //ENTER
      if (e.keyCode === 13) {
        if (addingTr.state) {
          setAddingTr({ state: false, id: "-1" });
        }
        setIsFillingSymbol(false);
        setEdge(edge.filter((ed) => ed.symbol.length > 0));
        setSelectedTr("-1");
      }
      //BACKSPACE
      if (e.keyCode === 8) {
        setEdge(
          edge.map((ed) =>
            ed.id === selectedTr
              ? { ...ed, symbol: ed.symbol.slice(0, ed.symbol.length - 2) }
              : ed
          )
        );
      }
      if (e.key.length === 1) {
        if (generalInfo.alphabet.indexOf(e.key) === -1) {
          displayMessage(
            "light",
            "Information message",
            "The letter you are trying to add to the transition is not defined in the alphabet."
          );

          return;
        }

        setEdge(
          edge.map((ed) => {
            if (ed.id === selectedTr) {
              const charAlreadyFound = findKeyRepeat(ed.from.id, e.key);
              if (charAlreadyFound) return ed;
              return {
                ...ed,
                symbol:
                  ed.symbol.length === 0 ? e.key : ed.symbol + "," + e.key,
              };
            }
            return ed;
          })
        );
      }

      //DELETE
      if (e.keyCode === 46) {
        setEdge(edge.filter((ed) => ed.id !== selectedTr));
        setSelectedTr("-1");
        if (isFillingSymbol) setIsFillingSymbol(false);
      }
    },
    [
      addingTr.state,
      displayMessage,
      edge,
      findKeyRepeat,
      generalInfo.alphabet,
      isFillingSymbol,
      selectedTr,
      setAddingTr,
      setEdge,
    ]
  );
  /** Handles key down and does logic based in the e.key
   * @param e  e the event of the key down
   */
  const handleKeyDown = useCallback(
    (e) => {
      if (runInfo.nowRunning) return;
      const idTarget = e.target.id;
      if (
        !mouseIn &&
        (idTarget === "testString" ||
          idTarget === "jsonInput" ||
          idTarget === "alphabetInput")
      )
        return;
      if (!mouseIn) return;
      if (selectedTr !== "-1") {
        handleKeyDownEdges(e);
        return;
      }
      console.log("HANDING CB GENERAL 1");
      if (namingState) {
        handleNamingState(e);
        return;
      }
      handleKeyDownStates(e);
    },
    [
      namingState,
      selectedTr,
      runInfo.nowRunning,
      mouseIn,
      handleKeyDownEdges,
      handleNamingState,
      handleKeyDownStates,
    ]
  );

  /** Wipes some data that are not needed during the evalutiation of the automata
   *
   */
  useEffect(() => {
    if (runInfo.nowRunning) {
      setSelected((e) => "-1");
      setIsNamingState((e) => false);
      setSelectedTr((e) => "-1");
    }
  }, [runInfo.nowRunning]);

  /** Updates the coord of the node currently selected and that is moving
   *@param id id of the node selected 
   /*@param coord coord of the node that should be updated 
   */
  const modifyCoordNodo = (coords, id) => {
    setNodes([]);
    setNodes(
      nodes.map((nodo) => (nodo.id === id ? { ...nodo, ...coords } : nodo))
    );
  };

  /** Handles selection of any component of the canvas, such as: Edge, Node...
   *@param e e, the event
   */
  const handleSelection = (e) => {
    if (runInfo.nowRunning) return;
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
        addTrDestination(selectedNode);
        return;
      }
      if (selectedTr !== "-1") {
        setEdge(edge.filter((ed) => ed.symbol.length !== 0));
      }
      setSelectedTr("-1");
      setSelected(e.target.attrs.id);
    }
    if (e.target.attrs.type === "stage") {
      handleStageClick();
    }

    if (e.target.attrs.type === "arrow") {
      handleArrowClick(e);
    }
  };

  const addTrDestination = (selectedNode) => {
    const edgeTo = edge.reduce((stored, current) => {
      if (selected === selectedNode.id) {
        if (
          current.from.id === selectedNode.id &&
          current.to.id === selectedNode.id
        ) {
          stored++;
        }
      }
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
      displayMessage(
        "warning",
        "Repeated transition",
        "You already have a transition going to this node, remember you can edit any transition by just CLICKING it!"
      );

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
    setSelectedTr(addingTr.tr);
    setAddingTr({ state: false, tr: "-1" });
    setSelected("-1");
  };

  const handleStageClick = () => {
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
  };

  const handleArrowClick = (e) => {
    setSelectedTr(e.target.attrs.id);
    setSelected("-1");
    if (addingTr.state || isFillingSymbol) {
      if (isFillingSymbol) setIsFillingSymbol(false);
      setAddingTr({ state: false, id: "-1" });
      setEdge(
        edge.filter((ed) => ed.id !== addingTr.tr && ed.symbol.length !== 0)
      );
    }
  };
  /** Adds an event listener to the window on window opening
   */
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /** Wipes data when user presses ' Clear Canvas'
   */
  useEffect(() => {
    if (generalInfo.wipeData) {
      setIsFillingSymbol((e) => false);
      setIsNamingState((e) => false);
      setSelectedTr((e) => "-1");
      setSelected((e) => "-1");
      setMouseDown((e) => false);
    }
  }, [generalInfo.wipeData]);

  /** Handles temporary transition, meaning user is adding a transition
   *@param e e, the event
   */
  const handleTmpTr = (e) => {
    if (e.target.attrs.type !== "nodo") return;
    if (selectedTr !== "-1") return;
    if (isFillingSymbol) return;

    const coord = e.target.attrs.coord;
    const id = Date.now().toString();
    setAddingTr({ state: true, tr: id });
    setEdge([
      ...edge,
      {
        running: false,
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
  /** Handles canvas resizing
   * @param e e,the event
   */
  const handleWindowResize = (e) => {
    const witdth = e.target.outerWidth * 0.653;
    setStageInfo((e) => ({ ...stageInfo, w: witdth }));
  };

  /** Adds an event listener -> On windows resize
   */
  useEffect(() => {
    window.addEventListener("resize", (e) => handleWindowResize(e));

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return (
    <Stage
      className="mx-auto"
      onDblClick={handleTmpTr}
      ref={stageRef}
      onMouseMove={(e) => setMouseCoord({ x: e.evt.offsetX, y: e.evt.offsetY })}
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
      type="stage"
      onclick={(e) => handleSelection(e)}
      //proporcion de 1h:2w
      width={stageInfo.w || 900}
      height={450}
    >
      <Layer id="1">
        {runInfo.nowRunning && (
          <ShapeRI input={runInfo.input} currentChar={runInfo.currentChar} />
        )}
        {runInfo.finalState.length > 0 && (
          <ResultShape
            ch={
              nodes.find((nod) => nod.id === runInfo.finalState.split(":")[1])
                ?.final
                ? "\u{2705}"
                : "\u{274C}"
            }
          />
        )}
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
            nodeRunningId={runInfo.stateID}
            running={runInfo.nowRunning}
            stageWidth={stageInfo.w || 900}
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
                w={stageInfo.w || 900}
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
              running={runInfo.transitionID}
              isRunning={runInfo.nowRunning}
              w={stageInfo.w || 900}
              key={index}
              currentChar={
                runInfo.input
                  ? runInfo.prevPressed
                    ? runInfo.input[runInfo.currentChar]
                    : runInfo.input[runInfo.currentChar - 1]
                  : ""
              }
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
  );
};

export default Canvas;

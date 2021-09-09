import React, { useRef, useEffect ,useState, useCallback, useContext} from 'react';
import ThemeContext from './Context';
import { drawState } from './DrawState';
import {drawTempTransition, drawTransitionCircle} from './Curvas'
import Transition from './Classes/Transition';
import { isOverState, cleanCanvas, handleMouseEvent,  commitStateChanges, setNamingSymbol, commitTemporaryTransition} from './Utils';
import Layers from './Layers';
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
const Canvas = (props) => {

    
    const [inputWord,setInputWord]=useState('');
    const canvasRefStates = useRef(null)
    const [contextStates,setCanvasState]=useState(null);
    const canvasRefTr = useRef(null)
    const [contextTransitions,setCanvasTransitions]=useState(null);
    const canvasRefAux1 = useRef(null)
    const [contextAux1,setCanvasAux1]=useState(null);
    const canvasRefAux2 = useRef(null)
    const [contextAux2,setCanvasAux2]=useState(null);
    const {states,setStates} = useContext(ThemeContext);
    const [mouseDown,setMouseDown]=useState(false)
    const [mouseCoord,setMouseCoord]=useState({});
    const [selected,setSelected]=useState(-1);
    const [isNaming,setIsNaming]=useState(false);
    const [stateOver,setStateOver]=useState({id:-1});
    const [temporaryTransition,setTemporaryTransition]=useState({chosen:false,object:null,final:false,name:'',count:0});
    const [isNamingTr,setIsNamingTr]=useState(false);
    const [symbol,setSymbol]=useState('');
    const [transitions,setTranstions]=useState([]);
    /*
        Adds a state, property name should be changed once the algo for evaluating the dfa is complete
    
    */
  
    const addState = () => {
        if( !getState() )  setStates( [...states, {id:Date.now(), ...mouseCoord, final:false, start:false, name:'x' } ] );
    }


    
    /*
        Modifies state attributes: final, start, name 
    */
    const modifyState = (state, final, start, letter) => {
        commitStateChanges(isNaming, state, final , 
            start, letter, temporaryTransition, 
            setTemporaryTransition, states, setStates, selected, setSelected, contextAux2);
    }

     
   
    /*
        Creates a new array of states without the deleted one
    */    
    const deleteState = (id) => setStates(states.filter( state => state.id !== id ) );



    /*
        VGarcia way of checking if in the current mouse position theres a state
    */
    const isMouseOverState = (state)  => isOverState(mouseCoord,state);
            
    /*
        Returns null if there isnt a state in the current mouse position
    */
    const getState = () => states.find(states => isMouseOverState(states) ) ?? null;


    const updateTemporaryTransition = (selected) => {
        commitTemporaryTransition(selected, contextAux1, contextAux2, 
            temporaryTransition, setTemporaryTransition, setIsNamingTr  );

    }
    /*
        Handles methods such as:
            -Adding state
            -Deleting a state
            -Modfies state:  Makes is final or initial, changes its name
            -Handles isNaming useState 

    */
    const handleKeyDown = useCallback( (e) => {
        
        if( e.key === 'q' && !isNaming && !isNamingTr) { 
            if(!getState()) addState();
        }
        const estadoSeleccionado = selected;
        if(!isNaming &&  !isNamingTr && estadoSeleccionado !==-1){
   
            if(e.key === 'Delete' ) deleteState(estadoSeleccionado.id);
            if(e.key === 'f' ) modifyState(estadoSeleccionado, true, null);
            if(e.key === 's' ) modifyState(estadoSeleccionado, null, true);
            if(e.key === 'r' )    setIsNaming(true);
            if(e.key === 'e' )   updateTemporaryTransition(selected,stateOver)    
          //  setTemporaryTransition({chosen:true,object:selected,final:selected.final,name:selected.name});
        }
  
        if(e.key === 'Enter' && isNaming){ 
            setIsNaming(false)
            return;
        }
        if(e.key === 'Enter' && isNamingTr){ 
            console.log(symbol)
            if(symbol.length>0){
            
                setTranstions([...transitions, new Transition(Date.now(), selected,selected, symbol)]);
                setSymbol('');
            }
            cleanCanvas(contextAux1);
           setIsNamingTr(false);
            return;
        }
        if(isNaming) modifyState(estadoSeleccionado, estadoSeleccionado.final, estadoSeleccionado.start, e.key);
        if (isNamingTr) setNamingSymbol(e, symbol, setSymbol, selected, contextAux1);
    
      
    }, [transitions, deleteState, addState, getState, states, isNaming, selected,temporaryTransition, stateOver, updateTemporaryTransition, isNamingTr, symbol, contextAux1])    
    
 
  

    /*
        Cleans canvas
    */
    const clean=useCallback(()=>{
        
            contextStates.clearRect(0, 0, 600, 600);
            contextStates.lineWidth = 3;

    }, [contextStates])


    /*
        On window opening the following happens:
            -Retrieves canvas reference  
            - Adds keydown listener to the window
        On window closing the following happens:
            -Removes keydown listener
    */
    useEffect(() => { 
        setCanvasState( canvasRefStates.current.getContext('2d') );          
        setCanvasTransitions( canvasRefTr.current.getContext('2d') );     
        setCanvasAux1( canvasRefAux1.current.getContext('2d') );    
        setCanvasAux2( canvasRefAux2.current.getContext('2d') );    
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown])

    /*
        This listens to any change on states and other useStates
        Paints canvas based on any change of the listeners
    */
  useEffect(()=>{
        if(contextStates){
            clean();
           // if(states.length>0)console.log("im oging in")
            states.forEach( item => drawState(contextStates, item, { isNaming , isNamingTr},stateOver, undefined, ) )        
        }
    }, [states, clean, contextStates , isNaming, stateOver, isNamingTr]);
    
    useEffect(() => {
        if(selected!==-1 &&  temporaryTransition.chosen)
        { drawTempTransition(selected, mouseCoord, contextAux1);
            
        }
        },[mouseCoord, selected, temporaryTransition, contextAux1])



const modifyStateInfo = (e) =>{
      
       
    setMouseCoord({ x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY });

    const state = getState();
    if(isNamingTr && e.type==='click' ) 
    {
        setIsNamingTr(false);
        cleanCanvas(contextAux1);
        setSymbol('');
    }
    if((mouseDown || e.type==='click') && state && !isNaming ){
       handleMouseEvent(e, state, states, selected, setStates, setSelected, mouseDown, 
                                     temporaryTransition, contextAux2, contextAux1, setTemporaryTransition
                                    );
         return;
    }


if(isNaming)return;
if(state){
    if(state.id !== stateOver.id){
        if(selected !== -1 &&  state.id === selected.id )return;
        setStateOver(state)
    }
}else{
    if(selected !== -1 && e.type === 'click'){
      
        setStates( states.map( (estado) => estado.id === selected.id ? {...estado, selected : false } : estado ) );
        setSelected(-1);
     
        if(temporaryTransition.chosen){
            cleanCanvas(contextAux2);
            cleanCanvas(contextAux1);
           
          
            setTemporaryTransition({chosen:false,object:null,final:false,name:'',count:0})
        }
        return;
    }
    if(stateOver.id !== -1){
        setStateOver({id:-1})
       // console.log("wii")
       
    }
  
   
}
   }


    return (             
        <div id = "c2">
            <div id="canvas" >
             
            
                {props.showRunBotton && 
                    <React.Fragment>
                        <input 
                            type = "text" 
                            onChange={ (e) => setInputWord(e.target.value) } 
                            value = {inputWord}   
                            id = "input-word"
                        /> 
                        <input 
                                id = "run-button" 
                                type = "submit" 
                                disabled = { inputWord !== '' ? false : true }  
                                className = "button"  
                                value = "Run" 
                            />
                            <br></br><br></br>
                    </React.Fragment>
                }
            
        
                   <div  
                        className="canvitas"
                        onClick = { (e) => modifyStateInfo(e) }
                        onMouseMove = { (e) => modifyStateInfo(e) } 
                        onMouseDown = { (e) => { setMouseDown(true); modifyStateInfo(e) } } 
                        onMouseUp = { () => { setMouseDown(false) } }  
                        style={{position: "relative",background:"#f7f1e3",width:"600px",height:"600px"}}
                   >
                       <Layers  
                                    canvasRefStates={ canvasRefStates } 
                                    canvasRefTr={ canvasRefTr} 
                                    canvasRefAux1={ canvasRefAux1 } 
                                    canvasRefAux2={ canvasRefAux2 }
                        />
                   </div>

                 
                   <button onClick={()=>{contextAux1.clearRect(0, 0, 600, 600); contextAux1.globalAlpha=0.3}}> eeee</button>
   
              
            </div>
        </div>
     );
}
 
export default Canvas;
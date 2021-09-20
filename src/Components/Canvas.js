import React, { useRef, useEffect ,useState, useCallback, useContext} from 'react';
import ThemeContext from './ContextStates';
import ThemeContextTr from './ContextTransitions';
import { drawState} from './DrawState';
import {drawTempTransition, drawTransitionCircle, drawTransitionOver} from './Curvas'
import Transition from './Classes/Transition';
import { isOverState, cleanCanvas, handleMouseEvent, 
     commitStateChanges, setNamingSymbol, commitTemporaryTransition, 
     commitTrChanges, commitSymbolChangesTr, handleEnterTr, handleMouseClickTr, handleDeleteTs} from './Utils';
import Layers from './Layers';
import ThemeContextMsgInfo from '../User_Interface_New/ContextMsg';
import ThemeContextMsg from './ContextMessage';

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
    //const [transitions,setTranstions]=useState([]);
    const {transitions, setTranstions} = useContext(ThemeContextTr);
    const [selectedStates,setSelectedStates]=useState({});
    const [auxState, setAuxState]=useState(-1);
    const [bezCurve,setBezCurv]=useState([]);
    const [transOver,setTransOver]=useState(-1);
    const [namingFixedTr,setNamingFixedTr]=useState(false);
    const [selectedTr, setSelectedTr]=useState(-1);

    const {msgShow, setMsgShow} = useContext(ThemeContextMsg);
    const {msgInfo, setMsgInfo} = useContext(ThemeContextMsgInfo);
    
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
    const deleteState = (id) => 
    {
        setStates(states.filter( state => state.id !== id ) );
        if(transitions.length > 0) 
        {
            setBezCurv([]);
            const newTransitions = transitions.filter(tr => !(tr.state_dst.id === id || tr.state_src.id === id));
            setTranstions(newTransitions);
            if(newTransitions.length === 0) cleanCanvas(contextTransitions);
            setMsgInfo({bg:'danger', header:'WOW!',body:'cuidado perro!'})
            setMsgShow(true);
         
        }

        
        
    }


    /*
        VGarcia way of checking if in the current mouse position theres a state
    */
  
    const isMouseOverState = (state)  => isOverState(mouseCoord, state);
            
    /*
        Returns null if there isnt a state in the current mouse position
    */
  
    const getState = () => states.find(states => isMouseOverState(states) ) ?? null;


    const updateTemporaryTransition = (selected, stateOver) => {
        commitTemporaryTransition(selected, contextAux1, contextAux2, 
            temporaryTransition, setTemporaryTransition, setIsNamingTr ,
             selectedStates, setSelectedStates , stateOver, symbol, auxState, mouseCoord);

    }
    /*
        Handles methods such as:
            -Adding state
            -Deleting a state
            -Modfies state:  Makes is final or initial, changes its name
            -Handles isNaming useState 

    */
    const handleKeyDown = useCallback( (e) => {
        
        if( e.key === 'q' && !isNaming && !isNamingTr && !namingFixedTr) { 
            if(!getState()) addState();
        }
        const estadoSeleccionado = selected;
        if(namingFixedTr  && selectedTr!==-1 && e.key==='Delete')
        {
            handleDeleteTs(selectedTr, transitions, setTranstions, setBezCurv, setNamingFixedTr, setSelectedTr, setSymbol, contextAux1);
            return;
        }
        if(!isNaming &&  !isNamingTr && !namingFixedTr && estadoSeleccionado !==-1)
        {
   
            if(e.key === 'Delete' ) deleteState(estadoSeleccionado.id);
            if(e.key === 'f' ) modifyState(estadoSeleccionado, true, null);
            if(e.key === 's' ) modifyState(estadoSeleccionado, null, true);
            if(e.key === 'r' )    setIsNaming(true);
            if(e.key === 'e' )   updateTemporaryTransition(selected,stateOver)    
          //  setTemporaryTransition({chosen:true,object:selected,final:selected.final,name:selected.name});
        }
  
        if(e.key==='Enter' && namingFixedTr){
            handleEnterTr(symbol, transitions,  setTranstions, setBezCurv, setNamingFixedTr, setSelectedTr, contextAux1, selectedTr, bezCurve, setSymbol) 

       return;
    }
        if(e.key === 'Enter' && isNaming){ 
            setIsNaming(false)
            return;
        }
        if(e.key === 'Enter' && isNamingTr){ 
    
            
            if(symbol.length>0){
            
                if(selectedStates.from.id===selectedStates.to.id)
                { 
                    setTranstions([...transitions, new Transition(Date.now(),selectedStates.from,selectedStates.to,symbol)]);
                   
                }
                 if( selectedStates.from.id!==selectedStates.to.id )setTranstions([...transitions, new Transition(Date.now(), selectedStates.from, selectedStates.to, symbol)]);
                setSymbol('');
            }
            cleanCanvas(contextAux1);
           setIsNamingTr(false);
           setSelectedStates({});
          
            return;
        }
        if(namingFixedTr) commitSymbolChangesTr(e, selectedTr, symbol, setSymbol, contextAux1);
        if(isNaming) modifyState(estadoSeleccionado, estadoSeleccionado.final, estadoSeleccionado.start, e.key);
        if (isNamingTr) setNamingSymbol(e, symbol, setSymbol, selected, contextAux1, selectedStates);
    
      
    }, [setTranstions, bezCurve, selectedTr, namingFixedTr, selectedStates, transitions, deleteState, addState, getState, states, isNaming, selected,temporaryTransition, stateOver, updateTemporaryTransition, isNamingTr, symbol, contextAux1])    
    
 
  
useEffect(() => {
    if(contextTransitions){
        if(transitions.length>0) {
            cleanCanvas(contextTransitions);
        
           contextTransitions.lineWidth = 3;
          
            transitions.forEach(trans=> {
             
                const obj=trans.state_src.id===trans.state_dst.id?{...trans.state_src, color:true,id:trans.id}:{state_src: trans.state_src ,state_dst: trans.state_dst, symbol: trans.symbols, id:trans.id};
            
            
                trans.state_src.id===trans.state_dst.id? drawTransitionCircle(contextTransitions, obj , trans.symbols, false) : drawTransitionOver(contextTransitions, obj,false,false)
           
              setBezCurv(items => [...items, obj.curve])
             }
              )
        }
    }
},[transitions, contextTransitions])

useEffect(()=>{
    //console.log(bezCurve)
},[bezCurve])
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
            states.forEach( item => drawState(contextStates, item, { isNaming , isNamingTr, namingFixedTr}, stateOver, undefined, ) )        
        }
    }, [states, clean, contextStates , isNaming, stateOver, isNamingTr, namingFixedTr]);
    
    useEffect(() => {
        if(selected!==-1 &&  temporaryTransition.chosen)
        { 
            drawTempTransition(selected, mouseCoord, contextAux1);
        
        }
        },[mouseCoord, selected, temporaryTransition, contextAux1])



const HoverTrans=(state, e,mousedown)=>{
  //  if(namingFixedTr && state && (e.type==='click' || mousedown || e.type=='mousemove') && selectedTr!==-1 ){
      //  setSelected( {...state, x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY  } );
      //  setNamingFixedTr(bef=> !bef);
       // setSelectedTr(-1);
       // return;
   // }
    if(e.type==='click' && namingFixedTr && !state && selectedTr!==-1 ) {
       
        handleMouseClickTr(symbol, transitions,  setTranstions, setBezCurv, setNamingFixedTr, setSelectedTr, contextAux1 , selectedTr, bezCurve, setSymbol)      
        return;
    }
    if(e.type==='click' && transOver!==-1 && !state) {
        cleanCanvas(contextTransitions)
        setNamingFixedTr(true);
        setSelectedTr(transOver);
        setSymbol(transOver.trInfo.symbol);
       
        return;
    }

        if(namingFixedTr)return;
  
    let shouldClear={answer:false};
   
    
        bezCurve.forEach(item => 
            commitTrChanges(item, setTransOver, e, temporaryTransition.chosen? contextAux2 : contextAux1, state, temporaryTransition,shouldClear ) 
            
        )
   
    if(!shouldClear.answer && !temporaryTransition.chosen){
       
        cleanCanvas(contextAux1)
        setTransOver(-1)
    }
    if(!shouldClear.answer  && temporaryTransition.chosen)
{
    
    cleanCanvas(contextAux2)
    setTransOver(-1)
}
    
}


const modifyStateInfo =(e)=>{
      
       
    setMouseCoord({ x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY });
   
    const state = getState();
    
    if(!isNaming && !isNamingTr && bezCurve.length>0) HoverTrans(state,e,mouseDown)
    if(isNamingTr && (e.type==='click' )) 
    {
        setIsNamingTr(false);
        cleanCanvas(contextAux1);
        setSelectedStates({});
        setSymbol('');
        setAuxState(-1);
    }
    if((mouseDown || e.type==='click') && state && !isNaming ){
       handleMouseEvent(e, state, states, selected, setStates, setSelected, mouseDown, 
                                     temporaryTransition, contextAux2, contextAux1, setTemporaryTransition, 
                                     contextTransitions, transitions, bezCurve, setBezCurv
                                    );
         return;
    }

    
if(isNaming)return;

if(state){
    
    if(state.id !== stateOver.id){

        if(selected !== -1 &&  state.id === selected.id ){
            setAuxState(selected);
            return;
        }
        if(stateOver.id!==-1 && stateOver.id===state.id)return;
        if(stateOver.id!==-1 && stateOver.id!==state.id)setStateOver(state)
        if(stateOver.id===-1){setStateOver(state)}
   
       // setStateOver(state)
       //drawHoverPrueba(state, isNaming, isNamingTr, contextAux1);
 
    }
}else{
    if(selected !== -1 && e.type === 'click'){
      
        setStates( states.map( (estado) => estado.id === selected.id ? {...estado, selected : false } : estado ) );
        setSelected(-1);
        setAuxState(-1);
     
        if(temporaryTransition.chosen){
            cleanCanvas(contextAux2);
            cleanCanvas(contextAux1);
            setSelectedStates({});
          
            setTemporaryTransition({chosen:false,object:null,final:false,name:'',count:0})
        }
        return;
    }
    if(stateOver.id !== -1){
    
        setStateOver({id:-1})
        setAuxState(-1);
      
       
    }
  
   
}
   }

   const handleMouseUp=(e)=>{
    setMouseDown(false);
    if( !isOverState(selected, {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY } ) )return;
   
    //nothing to repaint if its the same x and y
    const shouldUpdateTr=transitions.find(tr=> (selected.x === tr.state_src.x && selected.y===tr.state_src.y) || (selected.x === tr.state_dst.x && selected.y===tr.state_dst.y));
    if(shouldUpdateTr!==undefined) return;
    setTranstions(transitions.map(item=>{
        //console.log(item.state_src, e.nativeEvent.offsetX, e.nativeEvent.offsetY)  
        
        if(item.state_src.id===selected.id ){
         // if(selected.x ===item.state_src.x && selected.y===item.state_src.y)return {...item, state_rc:{...item.state_src, x:selected.x, y: selected.y}};     
            return {...item, state_src:{...item.state_src,  x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY  }}
        }
        if(item.state_dst.id===selected.id ){
            //if(selected.x ===item.state_dst.x && selected.y===item.state_dst.y)return {...item, state_rc:{...item.state_src, x:selected.x, y: selected.y}};
            return {...item, state_dst:{...item.state_dst,  x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY  }}
        }
       // if(item.state_src.id===selected.id){
          //  return {...item, state_src:{...item.state_src,  x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY  }}
       // }
        return item;
        

    } ))
   
    //cleanCanvas(contextAux1)
   }


    return (             
        <div id = "c2">
            <div id="canvas" >
             
            
                {false && 
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
                        id="canvitas"
                        onClick = { (e) => modifyStateInfo(e) }
                        onMouseMove = { (e) => modifyStateInfo(e) } 
                        onMouseDown = { (e) => { setMouseDown(true); modifyStateInfo(e) } } 
                        onMouseUp = { (e) => handleMouseUp(e)  }  
                       
                   >
                       <Layers  
                                    canvasRefStates={ canvasRefStates } 
                                    canvasRefTr={ canvasRefTr} 
                                    canvasRefAux1={ canvasRefAux1 } 
                                    canvasRefAux2={ canvasRefAux2 }
                        />
                   </div>

          
   
              
            </div>
        </div>
     );
}
 
export default Canvas;
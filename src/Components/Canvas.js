import React, { useRef, useEffect ,useState, useCallback, useContext} from 'react';
import ThemeContext from './Context';
import { drawState } from './DrawState';
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
    const canvasRef = useRef(null)
    const [context,setCanvasObj]=useState(null);
    //const [states,setStates]=useState([]);
    const {states,setStates} = useContext(ThemeContext);
    const [mouseDown,setMouseDown]=useState(false)
    const [mouseCoord,setMouseCoord]=useState({});
    const [selected,setSelected]=useState(-1);
    const [isNaming,setIsNaming]=useState(false);
    const [stateOver,setStateOver]=useState(null);
    

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
            if( isNaming 
                &&  
                (state.name.length === 4 && letter !== 'Backspace') 
                || 
                (typeof letter === 'string' && letter.length > 3 && letter !== 'Backspace') ) return; 
            if( isNaming &&  (state.name.length === 1 && letter === 'Backspace' )) return; 
            const name = letter === undefined ?
            state.name : letter === 'Backspace' ?
            state.name.slice(0, state.name.length-1) : 
             state.name.length < 4 ? state.name + letter : state.name;
             setSelected({...selected,name:name})
           
            setStates( states.map(estado => state.id === estado.id? {...estado, final:final, start:start, name:name} : estado ) )
        }

     
    /*
        Creates a new array of states without the deleted one
    */    
    const deleteState = (id) => setStates(states.filter( state => state.id !== id ) );



    /*
        VGarcia way of checking if in the current mouse position theres a state
    */
    const isMouseOverState =(state)  => ( Math.sqrt(Math.pow (mouseCoord.x - state.x, 2) + Math.pow (mouseCoord.y- state.y, 2) ) < 20 );
            
    /*
        Returns null if there isnt a state in the current mouse position
    */
    const getState = ()=>states.find(states => isMouseOverState(states) ) ?? null;

    /*
        Handles methods such as:
            -Adding state
            -Deleting a state
            -Modfies state:  Makes is final or initial, changes its name
            -Handles isNaming useState 

    */
    const handleKeyDown =useCallback( (e) => {
        

        if( e.key === 'q' && !isNaming) { 
            if(!getState()) addState();
        }
        const estadoSeleccionado = selected;
        if(!isNaming && estadoSeleccionado !==-1){
   
            if(e.key === 'Delete' ) deleteState(estadoSeleccionado.id);
            if(e.key === 'f')    modifyState(estadoSeleccionado, true, false);
            if(e.key === 's')    modifyState(estadoSeleccionado, false, true);
            if(e.key === 'r')    setIsNaming(true);
        }
  
        if(e.key === 'Enter'){ 
            setIsNaming(false)
            return;
        }
        if(isNaming) modifyState(estadoSeleccionado, estadoSeleccionado.final, estadoSeleccionado.start, e.key);
     
    
      
    }, [deleteState, addState, getState, states, isNaming, selected])    
    

    /*
        Cleans canvas
    */
    const clean=useCallback(()=>{
      
            context.clearRect(0, 0, 600, 600);
            context.globalAlpha = 0.2;
            context.fillStyle = "white";
            context.fillRect(0, 0, 600, 600);
            context.globalAlpha = 1;
            context.lineWidth = 3;

    }, [context])


    /*
        On window opening the following happens:
            -Retrieves canvas reference  
            - Adds keydown listener to the window
        On window closing the following happens:
            -Removes keydown listener
    */
    useEffect(() => { 
        setCanvasObj( canvasRef.current.getContext('2d') );          
  
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown])

    /*
        This listens to any change on states and other useStates
        Paints canvas based on any change of the listeners
    */
  useEffect(()=>{
    
        if(context){
            clean();
          
            states.forEach( item => drawState(context,item,isNaming,stateOver) )        
    }

    }, [states, clean, context, stateOver, isNaming]);
    


/*
    Sets the selected state and returns a new state mapped with some 
    properties that were changed
*/
const mapEstado = (id, estado, coordinates) => {
    if(id === estado.id){
        setSelected( {...estado, ...coordinates} );
        return  {...estado, ...coordinates, selected:true} 
    }else{
        return {...estado, selected:false}
    }
}

   
const modifyStateInfo = (e) =>{
      
       
    setMouseCoord({ x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY });

    const state = getState();
   
    if((mouseDown || e.type==='click') && state && !isNaming ){
    let coordinates=e.type === 'click' ? {x:state.x, y:state.y} : {x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY};
        const selecionada = selected;
        let id = state.id;
        let should = false;
        if(selecionada !== -1 && state.id !== selecionada.id){
            should = ( Math.sqrt(Math.pow (selecionada.x - state.x, 2) + Math.pow (selecionada.y - state.y, 2) ) < 20 );
        }
        if(should){
            id = selecionada.id;
            coordinates = {x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY};
        }
        setStates( states.map( (estado) => mapEstado(id, estado, coordinates) ) )
        
         return;
 }

 /*

 */
if(isNaming)return;
 if(state){
    if(state.id !== stateOver){
        if(selected!==-1 &&  state.id===selected.id )return;
        setStateOver(state.id)
    }
}else{
    if(selected!==-1 && e.type==='click'){
      
        setStates(states.map((estado)=>estado.id===selected.id?{...estado,selected:false}:estado));
        setSelected(-1);
        return;
    }
    if(stateOver !== -1){
        setStateOver(-1)
       
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
            
        
                    <canvas 
                        
                        onClick = { (e)=>modifyStateInfo(e) }
                        onMouseMove = { (e) => modifyStateInfo(e) } 
                        onMouseDown = { (e) => { setMouseDown(true); modifyStateInfo(e) } } 
                        onMouseUp = { () => { setMouseDown(false) } }  
                        ref = { canvasRef }  
                        style = { { background : props.showRunBotton ? "#f7f1e3" : "" } } 
                        id = "main-canvas" width = "600" height = "600" 
                    />
                 
                
                       
                 
                   
                
            </div>
        </div>
     );
}
 
export default Canvas;
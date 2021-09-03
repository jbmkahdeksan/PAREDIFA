import React, { useRef, useEffect ,useState, useCallback} from 'react';
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
    const [states,setStates]=useState([]);
    const [mouseDown,setMouseDown]=useState(false)
    const [mouseCoord,setMouseCoord]=useState({});
  
    const [isNaming,setIsNaming]=useState(false);
    const [stateOver,setStateOver]=useState(null);
    


    const addState = () => {
     
        if( !getState() )   {
        setStates( [...states, {id:Date.now(), ...mouseCoord, final:false, start:false, name:'x' } ] );
        }
    }

        const modifyState = (state, final, start, letter) => {
            const name = letter === undefined ?
            state.name : letter === 'Backspace' ?
            state.name.slice(0, state.name.length-1) : 
             state.name.length < 4 ? state.name + letter : state.name;
            setStates( states.map(estado => state.id === estado.id? {...estado, final:final, start:start, name:name} : estado ) )
        }

    const deleteState = (id) => setStates(states.filter( state => state.id !== id ) );



    const isMouseOverState =(state)  => ( Math.sqrt(Math.pow (mouseCoord.x - state.x, 2) + Math.pow (mouseCoord.y- state.y, 2) ) < 20 );
            
    const getState = ()=>states.find(states => isMouseOverState(states) ) ?? null;

    const handleKeyDown =useCallback( (e) => {
         const estado = getState();

        if(!estado && e.key === 'q' && !isNaming) addState();
        //const estadoSeleccionado = states.find(state => state.id === selectedState);
        const estadoSeleccionado = states.find(state => state.selected); //maybe use the index
        if(!isNaming && estadoSeleccionado !== undefined){
   
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
     
    
      
    }, [deleteState, addState, getState, states, isNaming ])    
    

    const clean=useCallback(()=>{
      
            context.clearRect(0, 0, 600, 600);
            context.globalAlpha = 0.2;
            context.fillStyle = "white";
            context.fillRect(0, 0, 600, 600);
            context.globalAlpha = 1;
            context.lineWidth = 3;

    }, [context])


    useEffect(() => { 
        setCanvasObj( canvasRef.current.getContext('2d') );          
  
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown])

  useEffect(()=>{
    
        if(context){
            clean();
            if(states.length>0)console.log("im going in")
            states.forEach( item => drawState(context,item,isNaming,stateOver) )        
    }

    }, [states, clean, context, stateOver, isNaming]);
    

    
    

   
    const modifyStateInfo = (e) =>{
      
       
        setMouseCoord({ x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY });
    
        const state =getState();
        if((mouseDown || e.type==='click') && state && !isNaming ){
         const coordinates=e.type==='click'?{x:state.x,y:state.y}:{x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY};
         
            setStates(states.map(estado => state.id === estado.id ? {...estado, ...coordinates,selected:true} : {...estado,selected:false} ) )
             return;
     }

    if(state){
        if(state.id !== stateOver){
            
            setStateOver(state.id)
        }
    }else{
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
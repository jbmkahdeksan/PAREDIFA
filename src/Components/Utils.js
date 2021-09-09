import { drawTransitionCircle } from './Curvas';
import { drawState } from './DrawState';
/*
* 
* Description:
*   Some methods for handling events
* Authors:
*   Andres Alvarez Duran, ID: 117520958
*   Joaquin Barrientos Monge, ID: 117440348
*   Oscar Ortiz Chavarria, ID: 208260347
*   David Zarate Marin, ID: 116770797
*   Group: 01
*   Schedule: 10am 
* 
*/

export const isOverState=(state,mousePos)=>( Math.sqrt(Math.pow (state.x - mousePos.x, 2) + Math.pow (state.y - mousePos.y, 2) ) < 20 );

export const getStateName=(state,letter)=>{
    return letter === undefined ?
    state.name : letter === 'Backspace' ?
    state.name.slice(0, state.name.length-1) : 
     state.name.length < 4 ? state.name + letter : state.name;
}


export const cleanCanvas=(context)=>context.clearRect(0, 0, 600, 600);

export const cleanCanvasTemporary=(e, temporaryTransition, context2, context3, mouseDown, setTemporaryTransition)=>{

    if(e.type==='click' && temporaryTransition.chosen){
        cleanCanvas(context3);
        cleanCanvas(context2);
        //context3.clearRect(0, 0, 600, 600);
        //context2.clearRect(0, 0, 600, 600);
        setTemporaryTransition({chosen:false,object:null,final:false,name:'',count:0})
    }
    if( (e.type==='mousemove' || mouseDown) && temporaryTransition.chosen){
        cleanCanvas(context2);
        setTemporaryTransition({chosen:false,object:null,final:false,name:'',count:0})
        cleanCanvas(context3);
      
        //context3.clearRect(0, 0, 600, 600);
    }
}


/*
    Sets the selected state and returns a new state mapped with some 
    properties that were changed
*/
export const mapEstado = (id, estado, coordinates, setSelected) => {
    if(id === estado.id){
       setSelected( {...estado, ...coordinates} );
        return  {...estado, ...coordinates, selected:true} 
    }else{
        return {...estado, selected:false}
    }
}



export const handleMouseEvent=(e, state, states, selected, setStates, setSelected, mouseDown, temporaryTransition, context2, context3, setTemporaryTransition)=>{
    let coordinates=e.type === 'click' ? {x:state.x, y:state.y} : {x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY};
    const selecionada = selected;
    let id = state.id;
    let shouldUpdateHover = false;
    if(selecionada !== -1 && state.id !== selecionada.id){
        shouldUpdateHover  = isOverState(selecionada, state);
    }
    if(shouldUpdateHover ){
        id = selecionada.id;
        coordinates = {x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY};
    }
 
   cleanCanvasTemporary(e,temporaryTransition,context2,context3,mouseDown,setTemporaryTransition);
   setStates( states.map( (estado) => mapEstado(id, estado, coordinates, setSelected) ) )
}



export const commitStateChanges=(isNaming, state, final, start, letter, temporaryTransition, setTemporaryTransition, states, setStates, selected, setSelected, contextAux2) => {
    if( isNaming &&  
        ( (state.name.length === 4 && letter !== 'Backspace') || 
        (typeof letter === 'string' && letter.length > 3 && letter !== 'Backspace') ) ) return; 

    if( isNaming &&  (state.name.length === 1 && letter === 'Backspace' )) return; 
    
    const name = getStateName(state,letter);
     
    setSelected({...selected,name:name,final:final?!selected.final:selected.final})

        if(temporaryTransition.chosen && (final || isNaming)){
            cleanCanvas(contextAux2);
            contextAux2.lineWidth = 3;
            drawState(contextAux2,{...temporaryTransition.object,object:state,final:isNaming?temporaryTransition.final:!temporaryTransition.final,name:name},{},null,temporaryTransition);
            setTemporaryTransition({...temporaryTransition,object:state,final:isNaming?temporaryTransition.final:!temporaryTransition.final,name:name})
        }
     // comentar si dejar si el estripar denuevo s o f se deja como el brasielno
    setStates( states.map(estado => state.id === estado.id? {...estado, final: final ? !estado.final : estado.final, start : start ? !estado.start : estado.start, name: name} : {...estado,start:false} ) )
}




export const commitTemporaryTransition=(selected, contextAux1,  contextAux2, temporaryTransition, setTemporaryTransition, setIsNamingTr) => {
    if (temporaryTransition.count<=2) 
    {

        // hace un si es el mismo estado, sino ......
        if(temporaryTransition.count===1){
            cleanCanvas(contextAux1);
            cleanCanvas(contextAux2);
            setTemporaryTransition({chosen:false,object:null,final:false,name:'',count:0});
            setIsNamingTr(true);
            drawTransitionCircle(contextAux1, selected);
            return;
        }

        if(temporaryTransition.count===0){
            contextAux2.lineWidth = 3;
            drawState(contextAux2,{...temporaryTransition.object,...selected},{},null,temporaryTransition);
        }
        setTemporaryTransition({chosen:true,object:selected,final:selected.final,name:selected.name,count:++temporaryTransition.count});
        
    }
}


// Here we have to make sure the letter entered by the user are valid **********************************
export const setNamingSymbol=(e, symbol, setSymbol, selected, contextAux1)=>{
    if(e.key==='Backspace'){
        
        if(symbol.length===0) return;
        if(symbol.length===1) {
            setSymbol('');
            drawTransitionCircle(contextAux1, selected, '');
            return;
        }
        const word= symbol.slice(0,symbol.length-2);
        setSymbol(word);
        drawTransitionCircle(contextAux1, selected, word);
        return;
    } 
    if(e.key.length>1 && e.key !=='Backspace')return

    const word=symbol===''?e.key:symbol+','+e.key;
    setSymbol(word);
    console.log(symbol, e.key)
    drawTransitionCircle(contextAux1, selected, word);
};
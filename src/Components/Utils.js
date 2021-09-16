import { drawTransitionCircle,   drawTransitionOver,  drawHoverTrans, hoverSelfLoop } from './Curvas';
import { drawState } from './DrawState';
import Coord from './Classes/Coord'
import {_distanceFromCurve} from './jsbezier/jsbezier';
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

export const isOverState = (state, mousePos) => ( Math.sqrt(Math.pow (state.x - mousePos.x, 2) + Math.pow (state.y - mousePos.y, 2) ) < 20 );

export const getStateName = (state, letter) => {
    return letter === undefined ?
    state.name : letter === 'Backspace' ?
    state.name.slice(0, state.name.length-1) : 
     state.name.length < 4 ? state.name + letter : state.name;
}


export const cleanCanvas = (context) => context.clearRect(0, 0, 600, 600);

export const cleanCanvasTemporary = (e, temporaryTransition, context2, context3, mouseDown, setTemporaryTransition, bezCurve) => {

    if(e.type==='click' && temporaryTransition.chosen){
      if(bezCurve.length===0)  cleanCanvas(context3);
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



export const handleMouseEvent = (e, state, states, selected, setStates, setSelected, mouseDown, temporaryTransition, context2, context3, setTemporaryTransition,contextTransitions, transitions, bezCurve, setBezCurv) =>
{
  

    //if(e.type==='click' && selected!==-1 && selected.id===state.id)return;
   
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

    
    //curvas de bezier
    if(e.type==='mousemove' && mouseDown)
    {
        
         if(transitions.length>0) 
         {
            setBezCurv([]);
            handleALgo(contextTransitions, transitions, coordinates, {...state,id:id}, context3)
       
         }
    }
   
   cleanCanvasTemporary(e, temporaryTransition, context2, context3, mouseDown, setTemporaryTransition, bezCurve);
   setStates( states.map( (estado) => mapEstado(id, estado, coordinates, setSelected) ) )
    
}

export const handleALgo = (context, trans, coordinates, state,context3) => 
{
   
    if(context){
		context.clearRect(0, 0, 600, 600);
        context3.clearRect(0, 0, 600, 600);
        context3.lineWidth = 3;
		context.lineWidth = 3;
        context3.globalAlpha=0.3;
		context.globalAlpha=0.3;
	  }
    trans.forEach(tr => {
        if(tr.state_src.id === tr.state_dst.id){
        
            if(state.id===tr.state_dst.id) {drawTransitionCircle(context, {...tr.state_src,  ...coordinates, color:true}, tr.symbols,false)}
            else {drawTransitionCircle(context, {...tr.state_src, color:true}, tr.symbols,false)}
          
            return;
            
        }
        
     
        if(tr.state_src && tr.state_src.id===state.id && tr.state_src.id!==tr.state_dst.id ) {
      
     
            drawTransitionOver(context,{...tr, state_src: {...coordinates},symbol:tr.symbols}, false, false) 
   
            return;
            
        }
        if(tr.state_dst &&  tr.state_dst.id===state.id && tr.state_src.id!==tr.state_dst.id) {
            
            drawTransitionOver(context,{...tr, state_dst: {...coordinates},symbol:tr.symbols}, false, false)
        
            return;
            
        } 
        drawTransitionOver(context3,{...tr,symbol:tr.symbols}, false, false)
    }
    );
}

export const commitStateChanges = (isNaming, state, final, start, letter, temporaryTransition, setTemporaryTransition, states, setStates, selected, setSelected, contextAux2) => {
    if( isNaming &&  
        ( (state.name.length === 4 && letter !== 'Backspace') || 
        (typeof letter === 'string' && letter.length > 3 && letter !== 'Backspace') ) ) return; 

    if( isNaming &&  (state.name.length === 1 && letter === 'Backspace' )) return; 
    
    const name = getStateName(state, letter);
     
    setSelected( {...selected, name:name, final:final ? !selected.final : selected.final} )

        if(temporaryTransition.chosen && (final || isNaming)){
            cleanCanvas(contextAux2);
            contextAux2.lineWidth = 3;
            drawState(contextAux2, {...temporaryTransition.object, object:state, final:isNaming ? temporaryTransition.final : !temporaryTransition.final, name:name}, {} , null, temporaryTransition);
            setTemporaryTransition({...temporaryTransition,object:state,final:isNaming?temporaryTransition.final:!temporaryTransition.final,name:name})
        }
     // comentar si dejar si el estripar denuevo s o f se deja como el brasielno
    setStates( states.map(estado => state.id === estado.id? {...estado, final: final ? !estado.final : estado.final, start : start ? !estado.start : estado.start, name: name} : {...estado,start:start && !final?false:estado.start} ) )
}




export const commitTemporaryTransition = (selected, contextAux1,  contextAux2, temporaryTransition, setTemporaryTransition, setIsNamingTr, selectedStates, setSelectedStates, stateOver, symbol, auxState, e) => 
{

 
    if (temporaryTransition.count<=2) 
    {

        // hace un si es el mismo estado, sino ......
        if(temporaryTransition.count===1){
            if(!isOverState(selected, e)  && stateOver.id===-1)return; 
            cleanCanvas(contextAux1);
            cleanCanvas(contextAux2);
            setTemporaryTransition( {chosen:false, object:null, final:false, name:'', count:0} );
            setIsNamingTr(true);
            if(isOverState(selected, e) ){
                 drawTransitionCircle(contextAux1, selected, '', true);
                 setSelectedStates( {...selectedStates, to:selected} )
                 return;
            }
            //if(selected.id===stateOver.id) drawTransitionCircle(contextAux1, selected,'',true);
            if(selected.id!==stateOver.id)
            {
                 drawTransitionOver(contextAux1,{state_src:selected, state_dst: stateOver,symbol:symbol},true)
            }
            setSelectedStates({...selectedStates,to:stateOver})
    
            return;
        }

        if(temporaryTransition.count === 0){
            contextAux2.lineWidth = 3;
            setSelectedStates( {from: selected} )
            drawState(contextAux2, {...temporaryTransition.object, ...selected}, {} , null, temporaryTransition);
        }
        setTemporaryTransition( {chosen:true, object:selected, final:selected.final, name:selected.name, count: ++temporaryTransition.count} );
        
    }
}


// Here we have to make sure the letter entered by the user are valid **********************************
//quedmos aqui asegurese que agrega self loops y no self loops en el array en carvas.js
export const setNamingSymbol = (e, symbol, setSymbol, selected, contextAux1, selectedStates) =>
{

    if(e.key==='Backspace'){
        
        if(symbol.length===0) return;
        if(symbol.length===1) {
            setSymbol('');

            if(selectedStates.from.id===selectedStates.to.id) drawTransitionCircle(contextAux1, selected, '');
            if(selectedStates.from.id!==selectedStates.to.id){
                drawTransitionOver(contextAux1,{state_src:selectedStates.from, state_dst: selectedStates.to, symbol:''}, true)
            }
            return;
        }
        const word= symbol.slice(0,symbol.length-2);
        setSymbol(word);
        selectedStates.from.id===selectedStates.to.id ? drawTransitionCircle(contextAux1, selected, word, true) : drawTransitionOver(contextAux1,{state_src:selectedStates.from, state_dst: selectedStates.to,symbol:word}, true);
        return;
    } 
    if(e.key.length > 1 && e.key !== 'Backspace')return

    const word = symbol === '' ? e.key : symbol + ',' + e.key;
    setSymbol(word);
   
    selectedStates.from.id===selectedStates.to.id ? drawTransitionCircle(contextAux1, selected, word, true) : drawTransitionOver(contextAux1,{state_src:selectedStates.from, state_dst: selectedStates.to,symbol:word}, true);
};

export const commitSymbolChangesTr = (e, selectedTr, symbol, setSymbol, contextAux1 ) => 
{
    
    if(selectedTr.curve[0].x===selectedTr.curve[3].x && selectedTr.curve[0].y===selectedTr.curve[3].y)
    {
        const from={id:0, x:selectedTr.curve[0].x, y:selectedTr.curve[0].y}
        const to={id:0, x:selectedTr.curve[3].x , y:selectedTr.curve[3].y}

        setNamingSymbol(e, symbol, setSymbol, {x:selectedTr.curve[0].x, y:selectedTr.curve[0].y}, contextAux1, {from,to})
    }
    else
    {
        
        const from={id:0, x : selectedTr.trInfo.src_info.x, y : selectedTr.trInfo.src_info.y}
        const to={id:1, x : selectedTr.trInfo.dst_info.x, y : selectedTr.trInfo.dst_info.y}

        setNamingSymbol(e, symbol, setSymbol, {x:selectedTr.curve[0].x, y:selectedTr.curve[0].y}, contextAux1, {from,to})
    }
}







export const namingTr = (setIsNamingTr, cleanCanvas, setSelectedStates, setSymbol, contextAux1) => 
{
    setIsNamingTr(false);
    cleanCanvas(contextAux1);
    setSelectedStates({});
    setSymbol('');
}









export const hoverSelfTr = (mouseX, mouseY, state) => 
{
   const offset = new Coord(20 , 20);
    let distance = Math.sqrt(Math.pow(mouseX - state.x + offset.x, 2) +
    Math.pow(mouseY - state.y + offset.y, 2));
    distance = Math.abs(distance - 20);
    return distance;
}



/*************************************************************************************************** */
export const commitTrChanges = (item, setTransOver, e, contextAux1, state, temporaryTransition, shouldClear) => 
{
   // if(!temporaryTransition.chosen)cleanCanvas(contextAux1)//***************************************** SI ESTA NOMBRANDO Y HAY OTRA TRANSIITON*/
    if(item.curve[0].x === item.curve[3].x && item.curve[0].y === item.curve[3].y)
    {
    
      if(!state &&  hoverSelfTr(e.nativeEvent.offsetX, e.nativeEvent.offsetY, {x : item.curve[0].x, y : item.curve[0].y} ) < 8)
      {
        if(!temporaryTransition.chosen) {cleanCanvas(contextAux1);}
      
            shouldClear.answer=true;
            hoverSelfLoop(contextAux1, item.curve[0], item.trInfo.symbol, false)
            setTransOver(item)
      }
    }
    if(_distanceFromCurve({ x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY}, item.curve).distance < 7)
    {
         if(!temporaryTransition.chosen){cleanCanvas(contextAux1);}
        drawHoverTr(item.curve,item.trInfo.symbol, contextAux1)
        setTransOver(item)
        shouldClear.answer=true;
        
    }
}


const drawHoverTr = (item, symbol, contextAux1) => 
{
  
    drawHoverTrans(contextAux1, {...item[0]},{ ...item[3]}, {...item[1]}, {...item[2]}, symbol)
}


export const handleEnterTr = (symbol, transitions,  setTranstions, setBezCurv, setNamingFixedTr, setSelectedTr, contextAux1 , selectedTr, bezCurve, setSymbol) => 
{
    if(symbol.length===0){
    
 
        setTranstions( transitions.filter( tr => selectedTr.trInfo.id !== tr.id) )
        setBezCurv( bezCurve.filter( bz => bz.trInfo.id !== selectedTr.trInfo.id ) );
        setNamingFixedTr(false);
        setSelectedTr(-1);
    }else{
        setBezCurv([]);
        setTranstions( transitions.map(tr => selectedTr.trInfo.id === tr.id? { ...tr, symbols:symbol } : tr ));
        setNamingFixedTr(false);
        setSelectedTr(-1);
        setSymbol('');
    }
    cleanCanvas(contextAux1);
    
}


export const handleMouseClickTr = (symbol, transitions,  setTranstions, setBezCurv, setNamingFixedTr, setSelectedTr, contextAux1 , selectedTr, bezCurve, setSymbol) => 
{
    handleEnterTr(symbol, transitions,  setTranstions, setBezCurv, setNamingFixedTr, setSelectedTr, contextAux1 , selectedTr, bezCurve, setSymbol)
}


export const handleDeleteTs = (selectedTr, transitions, setTransitions, setBezCurv, setNamingFixedTr, setSelectedTr, setSymbol, contextAux1) => 
{

    setBezCurv([]);
    setTransitions( transitions.filter( tr => tr.id !== selectedTr.trInfo.id ) );
    setNamingFixedTr(false);
    setSelectedTr(-1);
    setSymbol('');
    cleanCanvas(contextAux1);
}
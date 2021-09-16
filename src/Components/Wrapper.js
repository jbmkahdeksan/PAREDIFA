import Canvas from './Canvas'
import Error from './Error'
import {useState,useContext} from 'react'
import ThemeContext from './ContextStates';
import ThemeContextTr from './ContextTransitions';
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
const Wrapper = () => {

    
    const [alphabet,setAlphabetWord]=useState('');
    const [showRunButton,setShowRunButton]=useState(false);
    const {states,setStates} = useContext(ThemeContext);
    const {transitions,setTranstions} = useContext(ThemeContextTr);
    const [statesStringify,setStatesStringify]=useState('');
    const setAlphabet = () => 
    {
        if(alphabet!==''){
            setShowRunButton(true);
        } 
       alert("To be implemented")
    }    

    const mapState=(item)=>{
        return {id:item.id,x:item.x,y:item.y,start:item.start,final:item.final,name:item.name};
    }
    const exportJson = () => {
        const object={states: states.map(item=>mapState(item)), transitions: transitions}
        setStatesStringify(JSON.stringify(object));
    }
    

    const importJson = () => {
       setStates([{"id":1631757420473,"x":132,"y":96,"start":false,"final":true,"name":"x"},
                        {"id":1631757420816,"x":241,"y":100,"start":false,"final":false,"name":"x"}]);
                        setTranstions([{"id":1631757423465,
                        "state_src":{"id":1631757420473,"x":132,"y":96,"final":false,"start":false,"name":"x"},
                        "state_dst":{"id":1631757420816,"x":241,"y":100,"final":false,"start":false,"name":"x","selected":false},"symbols":"1"}]);

    }
    return (
        <div id="wrapper">
        <div id="c1">
            <input type="text" id="alphabet" value={alphabet} onChange={(e)=>setAlphabetWord(e.target.value)}/> 
            <input type="submit" className="button" value="Set Alphabet"  onClick={setAlphabet} />  (e.g.: "1, 0")<br></br>
            <input type="text" id="json-area" value={statesStringify} readOnly/>
            <input type="submit" className="button" value="Download JSON" onClick={exportJson} />
            <input type="submit" className="button" value="Upload JSON" onClick={importJson} /><br></br>
            <div id="instructions">
            <br></br>
                <b>CREATE STATE (Q key):</b> create a state on the mouse position.<br></br>
                <b>SELECT TRANSITION / STATE:</b> left-click on a state or transition.<br></br>
                <b>MOVE STATE:</b> hold left-click on a state and move the cursor.<br></br>
                <b>CREATE TRANSITION (E key):</b> once a state is selected, press E and select another state.<br></br>
                <b>REMOVE TRANSITION / STATE (DEL key):</b> once a state or transition is selected, press DEL to remove it.<br></br>
                <b>RENAME STATE (R key):</b> once a state is selected, press R to enter the renaming mode. In the renaming mode, press ENTER to set the state name.<br></br>
                <b>SET FINAL STATE (F key):</b> once a state is selected, press F to set it as a final state.<br></br>
                <b>SET INITIAL STATE (S key):</b> once a state is selected, press S to set it as the start state.<br></br>
            </div>
        </div>
        <Canvas  showRunBotton={true}/>
        <Error/>
    </div>
      );
}
 
export default Wrapper;
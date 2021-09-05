import Canvas from './Canvas'
import Error from './Error'
import {useState,useContext} from 'react'
import ThemeContext from './Context';
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
    const [statesStringify,setStatesStringify]=useState('');
    const setAlphabet = () => 
    {
        if(alphabet!==''){
            setShowRunButton(true);
        } 
       alert("To be implemented")
    }    

    const exportJson = () => {
        setStatesStringify(JSON.stringify(states));
    }
    

    const importJson = () => {
       setStates([{"id":1630816682698,"x":233,"y":185,"final":false,"start":false,"name":"x","selected":false},{"id":1630816682835,"x":200,"y":155,"final":false,"start":false,"name":"x","selected":false},{"id":1630816682986,"x":168,"y":220,"final":false,"start":false,"name":"x","selected":false},{"id":1630816683293,"x":117,"y":204,"final":false,"start":false,"name":"xxxx","selected":true},{"id":1630816683442,"x":83,"y":328,"final":false,"start":false,"name":"x","selected":false}])
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
import React,{useState} from 'react';

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

    const run = () =>  alert("To be implemented")
    const [inputWord,setInputWord]=useState('');
    
    
    return (             
        <div id = "c2">
            <div id="canvas" >
                <br></br>
     
                {props.showRunBotton && 
                    <React.Fragment>
                    <input type="text" onChange={(e)=>setInputWord(e.target.value)} value={inputWord} id="input-word"/> <input id="run-button" type="submit" disabled={inputWord!==''?false:true} className="button" value="Run" onClick={run} /><br></br><br></br>
                    </React.Fragment>
                }
          
                <canvas style={{background:props.showRunBotton?"#f7f1e3":""}} id="main-canvas" width="600" height="600"></canvas>
            </div>
        </div>
     );
}
 
export default Canvas;
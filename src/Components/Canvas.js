
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
const Canvas = () => {

    const run = () =>  alert("To be implemented")
    

    
    return (             
        <div id = "c2">
            <div id="canvas">
                <br></br>
                <input type="text" id="input-word"/> <input id="run-button" type="submit" className="button" value="Run" onClick={run} /><br></br><br></br>
                <canvas id="main-canvas" width="600" height="600"></canvas>
            </div>
        </div>
     );
}
 
export default Canvas;
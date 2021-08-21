import React, { useRef, useEffect ,useState} from 'react'
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
    const canvasRef = useRef(null)
    const [context,setCanvasObj]=useState(null);

    const algo=(e)=>{
        //Our first draw
        context.clearRect(0, 0, 600, 600);
        context.globalAlpha = 0.2;
        context.fillStyle = "white";
        context.fillRect(0, 0, 600, 600);
        context.globalAlpha = 1;
        
      
        context.beginPath();

        context.arc(e.nativeEvent.offsetX,
            e.nativeEvent.offsetY,
            20,
            0,
            Math.PI * 2,
            false);
            context.globalAlpha = 1;
            context.fillStyle = "rgb(211, 195, 128)";
            context.fill();
            context.globalAlpha = 1;
            context.strokeStyle = "rgb(145, 127, 49)";
            context.stroke();
            context.globalAlpha = 1;
            context.font = "15px Georgia";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "rgb(6, 11, 16)";
            context.fillText('0',
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY);
           
        }
    useEffect(() => {
     
      setCanvasObj(canvasRef.current.getContext('2d'));
    
    }, [])
    
    return (             
        <div id = "c2">
            <div id="canvas" >
                <br></br>
     
                {props.showRunBotton && 
                    <React.Fragment>
                    <input type="text" onChange={(e)=>setInputWord(e.target.value)} value={inputWord} id="input-word"/> <input id="run-button" type="submit" disabled={inputWord!==''?false:true} className="button" value="Run" onClick={run} /><br></br><br></br>
                    </React.Fragment>
                }
            
                <canvas onClick={(e)=>algo(e)} ref={canvasRef}  style={{background:props.showRunBotton?"#f7f1e3":""}} id="main-canvas" width="600" height="600"/>
            </div>
        </div>
     );
}
 
export default Canvas;
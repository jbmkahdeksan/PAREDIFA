import React from "react";

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
const Layers = (props) => {
    return (
        <React.Fragment>
                <canvas 
                                            
                        
                    ref = { props.canvasRefAux2 }  
                    style = { { background : "transparent", position: "absolute", left: 0, top: 0, zIndex:4}  } 
                    width = "500" height = "500" 
                                            
                />
                <canvas 
                                            
                        
                    ref = { props.canvasRefAux1 }  
                    style = { { background : "transparent", position: "absolute", left: 0, top: 0, zIndex:3}  } 
                    width = "500" height = "500" 
                    
                />
                <canvas 
                                            
                        
                    ref = { props.canvasRefStates }  
                    style = { { background : "transparent", position: "absolute", left: 0, top: 0, zIndex:2}  } 
                    width = "500" height = "500" 
                  
                />

             
                <canvas 
                    

                    ref = { props.canvasRefTr}  
                    style = { { background : "transparent", position: "absolute", left: 0, top: 0, zIndex:1}  } 
                    width = "500" height = "500" 
                   
                />
      </React.Fragment>
      );
}
 
export default Layers;

import CanvasContainer from './CanvasContainer'
import Botoncito  from './Botoncito';

const Body = () => {
    
    return (
        <>
            <div className="item">
            <div className="screen1" style={{height: '100%', width: '33.33%'}}>Hola
                <Botoncito/>
            </div>
            <div className="divCanvitas">
                <CanvasContainer/>
                </div>
            <div className="screen2" style={{height: '100%', width: '19%'}}>Hola</div>
            
            </div>
            
        </>
      );
}
 
export default Body;

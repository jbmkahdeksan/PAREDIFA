
import CanvasContainer from './CanvasContainer'
import Botoncito  from './Botoncito';
import FaResults from './FaResults';
import TxtEditor from './TxtEditor';
const Body = () => {
    
    return (
        <>
            <div className="item">
            <div className="screen1" style={{width: '33.33%'}}>
                <TxtEditor/>
               
            </div>
            <div className="divCanvitas">
                <CanvasContainer/>
                </div>
            <div className="FaResults" style={{ width: '19%'}}>
                
                <FaResults/>
            </div>

            </div>
            
        </>
      );
}
 
export default Body;

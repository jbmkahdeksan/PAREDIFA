import Canvas from '../Components/Canvas';
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { BsBookmarkPlus } from "react-icons/bs";
import {useState} from 'react'
import GuideModal from './GuideModal'
import Todo from './Todo'
import FaSaveModal from './FaSaveModal'
const CanvasContainer = () => {
    const [lgShow, setLgShow] = useState(false);
    const [showSaveFa, setShowSaveFa] = useState(false);
    const handleShowIns=()=>setLgShow(!lgShow);
    const handleShowSaveFa=()=>setShowSaveFa(!showSaveFa);
    return ( 
        <>
            <div className="guideContainer">
                    <Todo/>
                    <BsFillQuestionCircleFill className="guide"  onClick={handleShowIns} title="Instructions" size={23}/>
                    <BsBookmarkPlus className="saveFa" size={23} title="Save FA" onClick={handleShowSaveFa}/>
            </div>
            <GuideModal handleShow={handleShowIns}  lgShow={lgShow}/>
            <FaSaveModal   show={showSaveFa}  handleClose={handleShowSaveFa}/>
            <Canvas showRunBotton={true}/>
        </>
     );
}
 
export default CanvasContainer;
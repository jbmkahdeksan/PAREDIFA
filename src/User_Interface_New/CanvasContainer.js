import Canvas from '../Components/Canvas';
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { BsCloudDownload } from "react-icons/bs";
import {useState} from 'react'
import GuideModal from './GuideModal'
import FaSaveModal from './FaSaveModal'
import { BsCloudUpload } from "react-icons/bs";
import FAmodal from './FAmodal'

const CanvasContainer = () => {
    const [lgShow, setLgShow] = useState(false);
    const [showSaveFa, setShowSaveFa] = useState(false);
    const handleShowIns=()=>setLgShow(!lgShow);
    const handleShowSaveFa=()=>setShowSaveFa(!showSaveFa);

    const [showFaDownloads, setShowFaDownloads]=useState(false);

    const handleDownload=()=>setShowFaDownloads(!showFaDownloads);

    return ( 
        <>
            <div className="guideContainer">
                    
                    <BsFillQuestionCircleFill className="guide"  onClick={handleShowIns} title="Instructions" size={23}/>{ ' ' }
                    <BsCloudUpload className="saveFa" size={23} title="Save FA" onClick={handleShowSaveFa}/>{ ' ' }
                    <BsCloudDownload onClick={handleDownload} className="downloadFa" size={23} title="Download FA"  />
            </div>
            <GuideModal handleShow={handleShowIns}  lgShow={lgShow}/>
            <FAmodal handleShowFA={handleDownload} viewFA={showFaDownloads}/>
            <FaSaveModal   show={showSaveFa}  handleClose={handleShowSaveFa}/>
            <Canvas showRunBotton={true}/>
            
        </>
     );
}
 
export default CanvasContainer;
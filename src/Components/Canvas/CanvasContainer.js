import Canvas from "./Canvas";
import { BsCloudDownload } from "react-icons/bs";
import { useState } from "react";
import FaSaveModal from "../Modals/FaSaveModal";
import { BsCloudUpload } from "react-icons/bs";
import FAmodal from "../Modals/FAmodal";

const CanvasContainer = () => {
  const [showSaveFa, setShowSaveFa] = useState(false);

  const handleShowSaveFa = () => setShowSaveFa(!showSaveFa);

  const [showFaDownloads, setShowFaDownloads] = useState(false);

  const handleDownload = () => setShowFaDownloads(!showFaDownloads);

  return (
    <>
      <div className="guideContainer">
        <BsCloudUpload
          className="saveFa"
          size={23}
          title="Save FA"
          onClick={handleShowSaveFa}
        />{" "}
        <BsCloudDownload
          onClick={handleDownload}
          className="downloadFa"
          size={23}
          title="Download FA"
        />
      </div>

      <FAmodal handleShowFA={handleDownload} viewFA={showFaDownloads} />
      <FaSaveModal show={showSaveFa} handleClose={handleShowSaveFa} />
      <Canvas showRunBotton={true} />
    </>
  );
};

export default CanvasContainer;

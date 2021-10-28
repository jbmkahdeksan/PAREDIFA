import CanvasContainer from "./Canvas/CanvasContainer";
const Body = () => {
  return (
    <>
      <div className="item">
        <div className='canvasFlex'>
          <CanvasContainer />
        </div>
        <div className='outPutsFlex'>
            <div className='errors'>hello</div>
            <div className='accepted'>Hello2</div>
        </div>
      </div>
    </>
  );
};

export default Body;

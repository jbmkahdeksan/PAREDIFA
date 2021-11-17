import { BsHammer } from "react-icons/bs";
import { FcMindMap } from "react-icons/fc";
const AnimationLayingDfa = () => {
  return (
    <div className="layingDFA">
      <FcMindMap size={40} id="hammer" className="" />
      <BsHammer size={40} id="gear1" className="fa fa-5x fa-gear spin" />
      <h4>Laying out DFA, please wait...</h4>
    </div>
  );
};

export default AnimationLayingDfa;

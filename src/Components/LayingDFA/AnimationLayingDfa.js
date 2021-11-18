import { BsHammer } from "react-icons/bs";
import { FcMindMap } from "react-icons/fc";
const AnimationLayingDfa = () => {
  return (
    <div className="layingDFA">
      <FcMindMap size={40} id="dfaIcon" />
      <BsHammer size={40}  className="spin" />
      <h4>Laying out DFA, please wait...</h4>
    </div>
  );
};

export default AnimationLayingDfa;

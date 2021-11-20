import { BsHammer } from "react-icons/bs";
import { FcMindMap } from "react-icons/fc";
const AnimationLayingDfa = () => {
  /*
   *
   * Description:
   * A lovely hammer and a graph anmation  which are displayed while the DFA is  being layed out
   * EIF400 -- Paradigmas de Programacion
   * @since II Term - 2021
   * @authors Team 01-10am
   *  - Andres Alvarez Duran 117520958
   *  - Joaquin Barrientos Monge 117440348
   *  - Oscar Ortiz Chavarria 208260347
   *  - David Zarate Marin 116770797
   *
   */
  return (
    <div className="layingDFA">
      <FcMindMap size={40} id="dfaIcon" />
      <BsHammer size={40} className="spin" />
      <h4>Laying out DFA, please wait...</h4>
    </div>
  );
};

export default AnimationLayingDfa;

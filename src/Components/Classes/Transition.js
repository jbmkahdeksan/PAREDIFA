/*
 * Description:
 *   Transition class
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */

export default class Transition {
  constructor(id, state_src, state_dst, symbols) {
    this.id = id;
    this.state_src = state_src;
    this.state_dst = state_dst;
    this.symbols = symbols;
    state_src.transitionsOut[state_src.transitionsOut.length] = this;
    state_dst.transitionsIn[state_dst.transitionsIn.length] = this;
  }
}

/**
 * Some sort of capsule that will store the ID of
 * each of the components the automata uses to 
 * process the input string
 *  EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */

export default class frameInfo {
	constructor(stateID, transitionID) {
		this.stateID = stateID;
		this.transitionID = transitionID;
	}
}

/**
 * Some sort of capsule that will store the ID of
 * each of the components the automata uses to 
 * process the input string
 */

export default class frameInfo {
	constructor(stateID, transitionID) {
		this.stateID = stateID;
		this.transitionID = transitionID;
	}
}

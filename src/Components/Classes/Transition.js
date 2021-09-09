/*
    Representa las transiciones que hará el automata, se utilizará para la graficación en el canvas
    
    Se está migrando a una versión superior de javascript
*/

export   default class Transition{
	constructor(id, state_src, state_dst, symbols){
		this.id = id;
		this.state_src = state_src;
		this.state_dst = state_dst;
		this.symbols = symbols;
	}
}

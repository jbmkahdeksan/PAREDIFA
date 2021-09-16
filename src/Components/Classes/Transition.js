/*
* Description:
*   Transition class
* Authors:
*   Andres Alvarez Duran, ID: 117520958
*   Joaquin Barrientos Monge, ID: 117440348
*   Oscar Ortiz Chavarria, ID: 208260347
*   David Zarate Marin, ID: 116770797
*   Group: 01
*   Schedule: 10am 
* 
*/

export   default class Transition{
	constructor(id, state_src, state_dst, symbols){
		this.id = id;
		this.state_src = state_src;
		this.state_dst = state_dst;
		this.symbols = symbols;
	}
}

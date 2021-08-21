let stateList = [];
/*
	Esta archivo contiene las funciones que representa los estados del automata, su función es la de encapsular
	los elementos que formarán parte del automata en el Canvas principal

	Se está migrando a una versión superior de javascript
*/
const coord = () => {
	this.x = x;
	this.y = y;
};

const State = (id, name, coord, radius, end, start, transitionsIn, transitionsOut) => {
	this.id = id;
	this.name = name;
	this.coord = coord;
	this.radius = radius;
	this.end = end;
	this.start = start;
	this.transitionsIn = transitionsIn;
	this.transitionsOut = transitionsOut;
};

const createState = () => {
	stateList[stateList.length] = new state(stateList.length,
		stateList.length.toString(),
		new coord(mousePos.x, mousePos.y),
		20,
		false,
		false,
		[],
		[]);
};

export default {State, createState, coord};
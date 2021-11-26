require('dotenv').config();
const express = require("Express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./schemas/schema.js");
const path = require("path");
const open = require('open');
const app = express();
const port = process.env.PORT || 3000;
/*
 * Description:
 * Main file of Express server
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "build")));


app.post("/gql", graphqlHTTP({ schema: schema, graphiql: true }));

app.listen(port, async() => {
  await open(`http://localhost:${port}`, {
	app: {
		name: open.apps.chrome
	}
});
  console.log(`Server running on port ${port}`);
});

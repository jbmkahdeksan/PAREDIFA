const express = require("Express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./schemas/schema.js");
const path = require("path");
const open = require('open');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.post("/gql", graphqlHTTP({ schema: schema, graphiql: true }));

app.listen(port, async() => {
  await open(`http://localhost:${port}`, {
	app: {
		name: open.apps.chrome
	}
});
  console.log(`Server running on port ${port}`);
});

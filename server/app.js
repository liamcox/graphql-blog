const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        graphiql: true,
        schema,
    }),
);

app.listen(4001, () => {
    console.log("Listening for requests on port 4001");
});

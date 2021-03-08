const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        graphiql: true,
    }),
);

app.listen(4001, () => {
    console.log("Listening for requests on port 4001");
});

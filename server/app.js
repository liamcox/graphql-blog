require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const db_url = process.env.DB_URL;

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
mongoose.connection.once("open", () => {
    console.log("Yes We are connected");
});

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

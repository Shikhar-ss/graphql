const express = require('express');
const graphqlHTTP = require('express-graphql') //should prefferably called by using destructuring notation as per dox
const app = express();
const schema = require("./schema/schema")
app.use('/graphql', graphqlHTTP.graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Listening for request at port 4000 ! ")
})

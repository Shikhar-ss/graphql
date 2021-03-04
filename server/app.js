const express = require('express');
const graphqlHTTP = require('express-graphql') //should prefferably called by using destructuring notation as per dox
const app = express();
const schema = require("./schema/schema")
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config();

const connectionString = `mongodb+srv://graphqlserver:${process.env.DB_PASSWORD}@cluster0.js6xz.mongodb.net/graphql?retryWrites=true&w=majority`;


mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to database!!!!!')
});

app.use('/graphql', graphqlHTTP.graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Listening for request at port 4000 ! ")
})

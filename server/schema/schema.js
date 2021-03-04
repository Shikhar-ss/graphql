// 3 responsibilities of schema

// 1. define schema types
// 2. define relationships
// 3. define root queries. i.e how user can jump into the graph and get the data

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema,GraphQLID } = graphql;
const _ = require('lodash');
// Dummy data
var books = [
    { name: 'Name of the wind', genre: 'Fantasy', id: '1' },
    { name: 'The final empire', genre: 'Fantasy', id: '2' },
    { name: 'The long earth', genre: 'Sci-fi', id: '3' }
];

const BookType = new GraphQLObjectType({
    name: 'Books',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // 1. query for a single book
        //      example: book(id:'123'){name,genre,author}
        book: {
            type: BookType, //type of data we are querying for
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from DB/other source
                return _.find(books, { id: args.id })
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})


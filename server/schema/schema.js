const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Books',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})
// 3 responsibilities of schema

// 1. define schema types
// 2. define relationships
// 3. define root queries. i.e how user can jump into the graph and get the data

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author')

// Dummy data
// const books = [
//     { name: 'Name of the wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The final empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The long earth', genre: 'Sci-fi', id: '3', authorId: '3' },
//     { name: 'Gate of days', genre: 'Sci-fi', id: '1', authorId: '1' },
//     { name: 'Around the world in 80 days', genre: 'adventure', id: '1', authorId: '2' },
//     { name: 'Pride and prejudice', genre: 'Fantasy', id: '1', authorId: '3' },
// ];
// const authors = [
//     { name: 'Chetan bhagat', age: '45', id: '1' },
//     { name: 'Any rand', age: '65', id: '2' },
//     { name: 'John keats', age: '36', id: '3' }
// ]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // return _.find(authors, { id: parent.authorId })
                return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, { authorId: parent.id })
                return Book.find({ authorId: parent.id })
            }
        }
    })
})

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
                // return _.find(books, { id: args.id })
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id })
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors
                return Author.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})


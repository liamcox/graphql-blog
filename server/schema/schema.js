const graphql = require("graphql");
const _ = require("lodash");

//dummy data
let usersData = [
    { id: "2", name: "Kat", age: 33, profession: "Doctor" },
    { id: "3", name: "Dave", age: 44, profession: "Coder" },
    { id: "4", name: "Pete", age: 22, profession: "Teacher" },
];
let hobbyData = [
    { id: "2", title: "Play music", description: "Guitar" },
    { id: "3", title: "Play Music", description: "Celllo" },
    { id: "4", title: "Play music", description: "drums" },
];
let postData = [
    { id: "2", comment: "Yes!!!" },
    { id: "3", comment: "To be " },
    { id: "4", comment: "How to change" },
];

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Documentation for user ...",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
    }),
});

const HobbyType = new GraphQLObjectType({
    name: "Hobby",
    description: "Hobby description",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
    }),
});

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "Post description",
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
    }),
});

//Root Queary
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Description",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },

            resolve(parent, args) {
                return _.find(usersData, { id: args.id });
            },
        },
        hobby: {
            type: HobbyType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                return _.find(hobbyData, { id: args.id });
            },
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                return _.find(postData, { id: args.id });
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});

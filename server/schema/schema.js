const graphql = require("graphql");
const _ = require("lodash");

//dummy data
let usersData = [
    { id: "2", name: "Kat", age: 33, profession: "Doctor" },
    { id: "3", name: "Dave", age: 44, profession: "Coder" },
    { id: "4", name: "Pete", age: 22, profession: "Teacher" },
];
let hobbyData = [
    { id: "2", title: "Play music", description: "Guitar", userId: "2" },
    { id: "3", title: "Play Music", description: "Celllo", userId: "2" },
    { id: "4", title: "Play music", description: "drums", userId: "3" },
];
let postData = [
    { id: "2", comment: "Yes!!!", userId: "2" },
    { id: "3", comment: "To be", userId: "2" },
    { id: "4", comment: "How to change", userId: "3" },
];

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Documentation for user ...",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postData, { userId: parent.id });
            },
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbyData, { userId: parent.id });
            },
        },
    }),
});

const HobbyType = new GraphQLObjectType({
    name: "Hobby",
    description: "Hobby description",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, { id: parent.userId });
            },
        },
    }),
});

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "Post description",
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, { id: parent.userId });
            },
        },
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

        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return usersData;
            },
        },

        hobby: {
            type: HobbyType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                return _.find(hobbyData, { id: args.id });
            },
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbyData;
            },
        },

        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                return _.find(postData, { id: args.id });
            },
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return postData;
            },
        },
    },
});

//Mutations
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                profession: { type: GraphQLString },
            },

            resolve(parent, args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession,
                };
                return user;
            },
        },
        createPost: {
            type: PostType,
            args: {
                comment: { type: GraphQLString },
                userId: { type: GraphQLID },
            },

            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userId: args.userId,
                };
                return post;
            },
        },
        createHobby: {
            type: HobbyType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                userId: { type: GraphQLID },
            },

            resolve(parent, args) {
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                };
                return hobby;
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

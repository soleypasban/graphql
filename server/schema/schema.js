const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema } = graphql
const { GraphQLString, GraphQLInt, GraphQLID, GraphQLList } = graphql
const _ = require('lodash')
const { FakeProducts, FakeFactories } = require('./fake')

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        amount: { type: GraphQLInt },
        factory: {
            type: FactoryType,
            resolve(parent, args) {
                return _.find(FakeFactories, { id: parent.factory })
            }
        },
    })
})

const FactoryType = new GraphQLObjectType({
    name: 'Factory',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return _.filter(FakeProducts, { factory: parent.id })
            }
        },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return FakeProducts
            }
        },
        factories: {
            type: new GraphQLList(FactoryType),
            resolve(parent, args) {
                return FakeFactories
            }
        },
        product: {
            type: ProductType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(FakeProducts, { id: args.id })
            }
        },
        factory: {
            type: FactoryType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(FakeFactories, { id: args.id })
            }
        },
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

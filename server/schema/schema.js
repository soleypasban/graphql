const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema } = graphql
const { GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLNonNull } = graphql
const Product = require('../models/product')
const Factory = require('../models/factory')

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        amount: { type: GraphQLInt },
        factory: {
            type: FactoryType,
            resolve(parent, args) {
                return Factory.findById(parent.factory)
            }
        },
    })
})

const FactoryType = new GraphQLObjectType({
    name: 'Factory',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({ id: parent.factory })
            }
        },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        products: {
            type: new GraphQLList(ProductType),
            args: {
                first: { type: GraphQLInt },
                offset: { type: GraphQLInt }
            },
            resolve(parent, args) {
                const first = Math.max(Number(args.first), 1)
                const offset = Math.max(Number(args.offset), 1)
                console.log({ first, offset, args })
                return Product.find({})
                    .skip(offset * (first - 1))
                    .limit(offset)
                // return Product.find({})
            }
        },
        factories: {
            type: new GraphQLList(FactoryType),
            resolve(parent, args) {
                return Factory.find({})
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Product.findById(args.id)
            }
        },
        factory: {
            type: FactoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Factory.findById(args.id)
            }
        },
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                amount: { type: new GraphQLNonNull(GraphQLInt) },
                factory: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const product = new Product({
                    name: args.name,
                    amount: args.amount,
                    factory: args.factory
                });
                return product.save()
            }
        },
        addFactory: {
            type: FactoryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const factory = new Factory({
                    name: args.name,
                    location: args.location,
                });
                return factory.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

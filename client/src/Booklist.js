import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'
import { ProductDetail } from './ProductDetail';

const getProductsQuery =
    gql`
        {
        products (first: 1, offset: 5) {
            _id
            name,
            factory{
                _id
                name
            }
        }
        }
    `

const addProductsQuery =
    gql`
    mutation($name:  String!, $amount: Int!, $factory: ID!){
        addProduct(name: $name, amount: $amount, factory: $factory){
            _id
            name
            factory{
                name
            }
        }
    }
    `
let Booklist = props => {
    const [productId, setproductId] = useState(null)
    // <Query query={query}>
    //     {props => {
    // console.log(props)

    const products = props.getProducts
    if (products.loading) return <div>Loading...</div>;
    if (products.error) return <div>{products.error}</div>;
    const productsList = products.products.map(product => <li key={product._id} onClick={() => setproductId(product._id)}>{product.name} <i>({product.factory.name})</i></li>)
    return (
        <div>
            <h3>Producs:</h3>
            <ul>
                {productsList}
            </ul>
            <button onClick={() => props.addProducts({
                variables: {
                    name: 'earplug',
                    amount: 5,
                    factory: '5ce7b06f2520ad590022290b'
                },
                refetchQueries: [{ query: getProductsQuery }]
            })}>Add new product</button>

            <hr />
            <ProductDetail id={productId} />
        </div>
    )
}

Booklist = compose(
    graphql(getProductsQuery, { name: 'getProducts' }),
    graphql(addProductsQuery, { name: 'addProducts' })
)(Booklist)

export { Booklist }
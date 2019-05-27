import React from 'react'
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'

const getProductQuery =
    gql`
        query($id: ID!){
        product(id: $id) {
            _id
            name,
            factory{
                _id
                name
            }
        }
        }
`

let ProductDetail = props => {
    if (props.getProduct.loading) return <h3>loading...</h3>
    return (
        <h2>
            {props.getProduct.product && props.getProduct.product.name}
        </h2>
    )
}

ProductDetail = compose(
    graphql(getProductQuery, {
        name: 'getProduct', options: props => ({ variables: { id: props.id } })
    })
)(ProductDetail)

export { ProductDetail }
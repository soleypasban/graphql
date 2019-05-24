const app = require('express')()
const graphqlHttp = require('express-graphql')
const schema = require('./schema/schema')
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')

const uri = "";

mongoose.connect(uri,
    { useNewUrlParser: true },
    err => console.log('Connection error', { err }))

app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true
}))

app.listen(PORT, () => console.log(`now listening to requests on port ${PORT}`))
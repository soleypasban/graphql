const cors = require('cors')
const app = require('express')()
const graphqlHttp = require('express-graphql')
const schema = require('./schema/schema')
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')

const uri = "mongodb+srv://soley:x123456789@my-warehouse-7dy5o.mongodb.net/test?retryWrites=true";

mongoose.connect(uri,
    { useNewUrlParser: true },
    err => console.log('Connection error', { err }))

app.use(cors())
app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true
}))

app.listen(PORT, () => console.log(`now listening to requests on port ${PORT}`))
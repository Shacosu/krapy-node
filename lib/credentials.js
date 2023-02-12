require('dotenv').config()

const port = process.env.PORT || 3000
const mongoUri = process.env.MONGODB_URI
const sqlServerUri = process.env.MSSQL_URI

module.exports = { port, mongoUri, sqlServerUri }
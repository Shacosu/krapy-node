const sql = require('mssql')
const { sqlServerUri } = require('./credentials')

module.exports = async () => {
    try {
        return await sql.connect(sqlServerUri)
    } catch (err) {
        console.log(err);
    }
}
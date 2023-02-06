const express = require('express')
const app = express()
const { port } = require('../lib/credentials')
const cors = require('cors')

app.use(cors())
app.use('/api', require('../routes/index.routes'))
app.use('/api', require('../routes/scrap.routes'))

app.listen(port, () => console.log(`Servidor encendido y escuchando el puerto ${port}!`))
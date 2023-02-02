const express = require('express')
const app = express()
const { port } = require('../lib/credentials')

app.use('/api', require('../routes/index.routes'))

app.listen(port, () => console.log(`Servidor encendido y escuchando el puerto ${port}!`))
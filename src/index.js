const express = require('express');
require('./db/mongoose')
const categoryRouter = require('./routers/category');

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(categoryRouter)

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto: ' + port);
})
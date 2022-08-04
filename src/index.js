const express = require('express');
require('./db/mongoose')
var cors = require('cors')
const categoryRouter = require('./routers/category');
const postRouter = require('./routers/post');

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

app.use(express.json())
app.use(categoryRouter)
app.use(postRouter)

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto: ' + port);
})
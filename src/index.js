const express = require('express');
require('./db/mongoose')
const categoryRouter = require('./routers/category');
const postRouter = require('./routers/post');

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(categoryRouter)
app.use(postRouter)

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto: ' + port);
})
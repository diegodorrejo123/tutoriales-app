const mongoose = require('mongoose')
const dataBaseName = 'develop'
const uri = 'mongodb+srv://diego123:diegodorrejo123@cluster0.6x5yi.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(uri).then((result) => {
    console.log("Base de Datos conectada");/* 
    mongoose.connection.db.dropCollection('post')
    mongoose.connection.db.dropCollection('category') */
}).catch((error) => {
    console.log("Error al conectar con la base de datos");
})
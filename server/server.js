require('./config/config')

const express = require('express')
const mongoose = require('mongoose')

const app = express()
const bodyParser = require('body-parser')
const { request } = require('express')



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(require('./rutas/index'))


 
  mongoose.connect('mongodb+srv://stand:Nwn460qHkz8T8wcG@cluster0.mrumd.mongodb.net/<cafe>?retryWrites=true&w=majority', 
  {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true },
  (err, res) =>{
    if (err) throw err;

    console.log('Base de datos ONLINE');

  });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
})
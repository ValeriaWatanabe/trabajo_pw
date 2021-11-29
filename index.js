const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./dao/models')

const PORT = 4444;
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(express.static('assets')) // configurando soporte de archivos estaticos
app.set("view engine", "ejs") // configurando motor de templates
app.use(session({
    secret : "sesion",
    resave : false,
    saveUninitialized : false
})) // Configuramos servidor para trabajar con sesiones

app.get('/', async (req, res)=>{
    const partidas = await db.Apuesta.findAll({
        
        order :[
            ['id', 'ASC']
        ]
    });

    //console.log(torneos);
    res.render('historial_apuestas',{
        partido: partidas,
    })

})



app.get('/historial_apuestas', async (req, res) => {
    const partidas = await db.Partida.findAll({
        order : [
            ['id', 'ASC']
        ]
    });
    res.render('historial_apuestas', {
        partido :partidas
        
    })
})





app.listen(PORT, () => {
    console.log('Se ha iniciado el servidor en el puerto ' + PORT)
})
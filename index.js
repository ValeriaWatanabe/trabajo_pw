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

app.get("/registro1", (req, res) => {
    res.render('registro1')
})

app.get("/registro2", (req, res) => {
    res.render('registro2')
})

app.get("/registro3", (req, res) => {
    res.render('registro3')
})

app.get("/registro4", async (req, res) => {
    res.render('registro4')
})

app.get("/registro5", (req, res) => {
    res.render('registro5')
})

app.post("/crearRegistro", (req, res) => {
    const nombre = req.body.nombre_cliente
    const apellido = req.body.apellido_cliente
    const dni = req.body.dni_cliente
    const correo = req.body.correo_cliente
    const contrasena = req.body.contrasena_cliente
    const telefono = req.body.telefono_cliente

})

app.get("/reg_vali", (req, res) => {
    res.render('reg_vali')
})

app.get("/reglas", (req, res) => {
    res.render('reglas')
})

app.listen(PORT, () => {
    console.log('Se ha iniciado el servidor en el puerto ' + PORT)
})
//https://www.npmjs.com/package/express-fileupload
//https://sequelize.org/master/manual/model-querying-basics.html#operators
//https://www.youtube.com/watch?v=8jNB0UXOfZo
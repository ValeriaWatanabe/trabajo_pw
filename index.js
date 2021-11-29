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

app.get("/registro4", (req, res) => {
    res.render('registro4')
})

app.get("/registro5", (req, res) => {
    res.render('registro5')
})

app.get("/reg_vali", (req, res) => {
    res.render('reg_vali')
})

app.get("/reglas", (req, res) => {
    res.render('reglas')
})

app.get('/clienteVsimple', async (req, res) => {
    const clientes = await db.Cliente.findAll({
        order : [
            ['id', 'DESC']
        ]
    });

    res.render('cliente_vsimple', {
        clientes : clientes
    })
})

app.get('/clienteVcompleta', async (req, res) => {
    const clientes = await db.Cliente.findAll({
        order : [
            ['id', 'ASC']
        ]
    });
    let nuevaListaClientes = []
        for (let cliente of clientes) {
            const distrito = await cliente.getdistrito()
            const provincia = await cliente.getprovincia()
            const departamento = await cliente.getdepartamento()
            nuevaListaClientes.push({
                id : cliente.id,
                nombre : cliente.nombre,
                apellido: cliente.apellido,
                dni: cliente.dni,
                correo: cliente.correo,
                telefono: cliente.numero,
                direccion: cliente.direccion,
                distritoNombre : distrito.nombre,
                provinciaNombre: provincia.nombre,
                departamentoNombre: departamento.nombre,
                pep: cliente.pep,
                estado: cliente.estado
            })
        }
    res.render('cliente_vcompleta', {
        clientes : nuevaListaClientes
    })
})

app.get('/categorias-juegos', async (req, res) => {
    const categorias = await db.Categoria.findAll({
        order : [
            ['id', 'ASC']
        ]
    });

    res.render('categorias-juegos', {
        categorias : categorias
    })
})

app.get('/categoria/new', (req, res) => {
    res.render('categorias-juegos_new')
})

app.get('/categoria/modificar/:codigo', async (req, res) => {
    const idCategoria = req.params.codigo

    const categoria = await db.Categoria.findOne({
        where : {
            id : idCategoria
        }
    })

    res.render('categorias-juego_update', {
        categoria : categoria,
    })
})

app.get('/categoria/eliminar/:codigo', async (req, res) => {
    const idCategoria = req.params.codigo
    await db.Categoria.destroy({
        where : {
            id : idCategoria
        }
    })

    res.redirect('categorias-juego')
})

app.listen(PORT, () => {
    console.log('Se ha iniciado el servidor en el puerto ' + PORT)
})

app.get("/", async (req, res)  =>{
    const banners = await db.Banners.findAll({
        order : [
            ['id', 'ASC']
        ]
    });
    res.render('pagina_inicio', {
        banners : banners
    })
})

app.get('/', async (req, res)=>{
    const partida = await db.Partida.findAll({
        order :[
            ['id', 'ASC']
        ]
    });

    //console.log(partidas);
    res.render('lista_partidas',{
        partida: partida
    })

})

app.get('/iniciosesion', (req, res) => {
    res.render('iniciosesion')
})

app.post('/iniciosesion',(req,res) => {
    console.log("data_form",req.body)
    res.render('respuesta_iniciosesion', {
        correo: req.body.frm_correo,
        contraseña: req.body.frm_contraseña
    })
})


app.get('/nosotros', (req, res) => {
    res.render('nosotros')
})

app.get('/terminos', (req, res) => {
    res.render('terminos')
})

app.get('/juego_listar', (req, res) => {
    res.render('juego_listar')
})

app.get('/juego_crear', (req, res) => {
    res.render('juego_crear')
})

app.get('/juego_editar', (req, res) => {
    res.render('juego_editar')
})
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

app.get('/cliente_vsimple/modificar/:codigo', async (req, res) => {
    const idCliente = req.params.codigo

    const cliente = await db.Clientes.findOne({
        where : {
            id : idCliente
        }
    })

    res.render('cliente_vsimple_update', {
        cliente : cliente,
    })
})

app.post('/cliente_vsimple/modificar', async (req, res) => {
    const idCliente = req.body.cliente_id
    const nombre =req.body.cliente_nombre
    const apellido = req.body.cliente_apellido
    const dni = req.body.cliente_id
    const correo = req.body.cliente_correo
    const telefono = req.body.cliente_numero

    const cliente = await db.Clientes.findOne({
        where : {
            id : idCliente
        }
    })
    cliente.nombre = nombre
    cliente.apellido = apellido
    cliente.dni = dni
    cliente.correo = correo
    cliente.telefono = telefono

    await cliente.save()

    res.redirect('/clienteVsimple')

})

app.get('/clienteVcompleta', async (req, res) => {
    const clientes = await db.Cliente.findAll({
        order : [
            ['id', 'DESC']
        ]
    });

    let nuevaListaClientes = []
        for (let cliente of clientes) {
            const distrito = await cliente.getid_dist()
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

app.post('/categoria/new', async (req, res) => {
    const categoriaNombre = req.body.categoria_nombre

    await db.Categoria.create({
        nombre : categoriaNombre,
    })

    res.redirect('/categorias-juegos')
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

app.post('/categoria/modificar', async (req, res) => {
    const idCategoria = req.body.categoria_id
    const nombre =req.body.categoria_nombre

    const categoria = await db.Categoria.findOne({
        where : {
            id : idCategoria
        }
    })


    categoria.nombre = nombre

    await categoria.save()

    res.redirect('/categorias-juegos')

})

app.get('/categoria/eliminar/:codigo', async (req, res) => {
    const idCategoria = req.params.codigo
    await db.Categoria.destroy({
        where : {
            id : idCategoria
        }
    })

    res.redirect('categorias-juegos')
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

app.get('/banners', async (req, res) => {
    const banners = await db.Banners.findAll({
        order : [
            ['id', 'ASC']
        ]
    });

    res.render('banners', {
        banners : banners
    })
})

app.get('/banner/new', (req, res) => {
    res.render('banners_new')
})

app.post('/banner/new', async (req, res) => {
    const bannerNombre = req.body.banner_nombre
    const bannerurl_destino = req.body.banner_url_destino
    const bannerEstado = req.body.banner_estado
    const bannerurl = req.body.banner_url

    await db.Banners.create({
        nombre : bannerNombre,
        estado : bannerEstado,
        url : bannerurl,
        url_destino : bannerurl_destino,
    })

    res.redirect('/banners')
})

app.get('/banner/modificar/:codigo', async (req, res) => {
    const idBanner = req.params.codigo

    const banner = await db.Banners.findOne({
        where : {
            id : idBanner
        }
    })

    res.render('banners_update', {
        banner : banner,
    })
})

app.post('/banner/modificar', async (req, res) => {
    const idBanner = req.body.banner_id
    const nombre = req.body.banner_nombre
    const url_destino = req.body.banner_url_destino
    const estado = req.body.banner_estado
    const url = req.body.banner_url

    const banner = await db.Banners.findOne({
        where : {
            id : idBanner
        }
    })
    banner.nombre = nombre
    banner.url_destino = url_destino
    banner.estado = estado
    banner.url = url

    await banner.save()

    res.redirect('/banners')

})

app.get('/banner/eliminar/:codigo', async (req, res) => {
    const idBanner = req.params.codigo
    await db.Banners.destroy({
        where : {
            id : idBanner
        }
    })
    res.redirect('/banners')
})


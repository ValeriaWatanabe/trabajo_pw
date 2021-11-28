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

//-----------------------------------------------------------
//---------------------Vista Simple--------------------------
//-----------------------------------------------------------
app.get('/partidas/admin', async (req, res) => {
    const partidas = await db.Partida.findAll({
        order : [
            ['fecha','hora_inicio','DESC']
        ]
    });


    let listaSimplePartida = []
    for (let partida of partidas) {
        const juego = await partida.getJuego()
        listaSimplePartida.push({
            id : partida.id,
            juego : juego.nombre,
            fecha : partida.fecha,
            hora_inicio : partida.hora_inicio,
            duracion : partida.duracion,
            estado : partida.estado
        })
    }    

    res.render('partidas-ad-simple', {
        partidas : listaSimplePartida
    })
})

//-----------------------------------------------------------
//---------------------Vista Avanzada------------------------
//-----------------------------------------------------------
app.get('/partidas/admcompleta', async (req, res) => {
    const partidas = await db.Partida.findAll({
        order : [
            ['fecha','hora_inicio','DESC']
        ]
    });


    let listaAvPartida = []
    for (let partida of partidas) {
        const juego = await partida.getJuego()
        listaAvPartida.push({
            id : partida.id,
            juego : juego.nombre,
            fecha : partida.fecha,
            hora_inicio : partida.hora_inicio,
            duracion : partida.duracion,
            estado : partida.estado,
            equipo_A : partida.equipo_A,
            equipo_B : partida.equipo_B,
            factor_A : partida.factor_A,
            factor_X : partida.factor_X,
            factor_B : partida.factor_B,
            resultado : partida.resultado
        })
    }    

    res.render('partidas-ad-avanzada', {
        partidas : listaAvPartida
    })
})

//-----------------------------------------------------------
//---------------------CREAR PARTIDA-------------------------
//-----------------------------------------------------------
app.get('/partidas/admin/crear', async (req, res) => {
    const partida = await db.Partida.findAll()

    res.render('partida-ad-crear',{
        partida : partida
    })
})

app.post('/partida/admin/crear', async (req, res) => {
    const partidaJuegoId = req.body.partida_juego_id
    const partidaFecha = req.body.partida_fecha
    const partidaHoraInicio = req.body.partida_hora_inicio
    const partidaDuracion = req.body.partida_duracion
    const partidaEstado = req.body.partida_estado
    const partidaEA = req.body.partida_ea
    const partidaEB = req.body.partida_eb
    const partidaFA = req.body.partida_fa
    const partidaFX = req.body.partida_fx
    const partidaFB = req.body.partida_fb
    const partidaResultado = req.body.partida_resultado


    await db.Partida.create({
        id_juego : partidaJuegoId,
        fecha : partidaFecha,
        hora_inicio : partidaHoraInicio,
        duracion : partidaDuracion,
        estado : partidaEstado,
        equipo_A : partidaEA,
        equipo_B : partidaEB,
        factor_A : partidaFA,
        factor_X : partidaFX,
        factor_B : partidaFB,
        resultado : partidaResultado
    })

    res.redirect('/partidas/admin')
})

//-----------------------------------------------------------
//--------------------EDITAR PARTIDA-------------------------
//-----------------------------------------------------------
app.get('/partidas/admin/editar/:codigo', async (req, res) => {
    const id_partida = req.params.codigo

    const partida = await db.Partida.findOne({
        where : {
            id : id_partida
        }
    })
    res.render('partida-ad-editar', {
        partida : partida
    })
})

app.post('/partidas/editar', async (req, res) => {
    const partidaJuegoId = req.body.partida_juego_id
    const partidaFecha = req.body.partida_fecha
    const partidaHoraInicio = req.body.partida_hora_inicio
    const partidaDuracion = req.body.partida_duracion
    const partidaEstado = req.body.partida_estado
    const partidaEA = req.body.partida_ea
    const partidaEB = req.body.partida_eb
    const partidaFA = req.body.partida_fa
    const partidaFX = req.body.partida_fx
    const partidaFB = req.body.partida_fb
    const partidaResultado = req.body.partida_resultado

    const partida = await db.Partida.findOne({
        where : {
            id : id_partida
        }
    })
    partida.id_juego = partidaJuegoId
    partida.fecha = partidaFecha
    partida.hora_inicio = partidaHoraInicio
    partida.duracion = partidaDuracion
    partida.estado = partidaEstado
    partida.equipo_A = partidaEA
    partida.equipo_B = partidaEB
    partida.factor_A = partidaFA
    partida.factor_X = partidaFX
    partida.factor_B = partidaFB
    partida.resultado = partidaResultado

    await partida.save()

    res.redirect('/partidas/admin')

})

//-----------------------------------------------------------
//--------------------ELIMINAR PARTIDA-----------------------
//-----------------------------------------------------------
app.get('/partidas/admin/eliminar/:codigo', async (req, res) => {
    const id_partida = req.params.codigo
    await db.Partida.destroy({
        where : {
            id : id_partida
        }
    })

    res.redirect('/partidas/admin')
})

app.listen(PORT, () => {
    console.log('Se ha iniciado el servidor en el puerto ' + PORT)
})

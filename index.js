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
    const partidas = await db.Partida.findAll({
        order :[
            ['id', 'ASC']
        ]
    });

    //console.log(partidas);
    res.render('lista_partidas',{
        partidas: partidas
    })

})

app.get("/lista_partidas" , async (req,res) =>{
    //const estadopartida = req.Params.estado
    const factA = req.body.factorA
    console.log(factA)
    const partidas = await db.Partida.findAll({

        where : {
        estado : "pendiente"
        }
    })


    res.render('lista_partidas', {partidas : partidas})

})



app.get("/hojaapuestas", async (req, res)  =>{
    const banners = await db.Partida.findAll({
        order : [
            ['id', 'ASC']
        ]
    });
    res.render('hojaapuestas', {
        banners : banners
    })
})

app.get("/lista_partidas" , async (req,res) =>{
    const partidas2 = await db.Partida.findAll({

        where : {
        categoria : "futbol"
        }
    })

    res.render('lista_partidas', {partidas2 : partidas2})

})

app.get("/lista_partidas/leja_cerca", async (req, res) => {
    const lista_partidas = await db.Partida.findAll({
        order : [
            ['fecha', 'DESC']
        ]
    });
    res.render('lista_partidas', {
        partidas : lista_partidas
    })
})

app.get('/historial_apuestas', async (req, res)=>{
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

app.get("/registro", (req, res) => {
    res.render('registro')
})

app.post("/crearRegistro", async (req, res) => {
    const nombre = req.body.nombre_cliente
    const apellido = req.body.apellido_cliente
    const dni = req.body.dni_cliente
    const correo = req.body.correo_cliente
    const numero = req.body.telefono_cliente
    const departamento = req.body.departamento_cliente
    const provincia = req.body.provincia_cliente
    const distrito = req.body.distrito_cliente
    const direccion = req.body.direccion_cliente
    const pep = req.body.pep
    const estado = 'Validado'
    const contrasena = req.body.contrasena_cliente
    const c2 = req.body.contrasena_2

    if (c2 == contrasena) {
        await db.Cliente.create({
            nombre : nombre,
            apellido : apellido,
            dni : dni,
            correo : correo,
            numero : numero,
            departamento : departamento,
            provincia : provincia,
            distrito : distrito,
            direccion : direccion,
            pep : pep,
            estado : estado,
            contrasena : contrasena
        })
        res.redirect('/reg_vali')
    } else {
        console.log('Contrasena incorrecta')
        res.redirect('/registro')
    }


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
            ['id', 'ASC']
        ]
    });

    res.render('cliente_vsimple', {
        clientes : clientes
    })
})

app.get('/cliente_vsimple/modificar/:codigo', async (req, res) => {
    const idCliente = req.params.codigo

    const cliente = await db.Cliente.findOne({
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
    const dni = req.body.cliente_dni
    const correo = req.body.cliente_correo
    const telefono = req.body.cliente_numero

    const cliente = await db.Cliente.findOne({
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

app.get('/cliente_vsimple/eliminar/:codigo', async (req, res) => {
    const idCliente = req.params.codigo
    await db.Cliente.destroy({
        where : {
            id : idCliente
        }
    })
    res.redirect('cliente_vsimple')
})

app.get('/clienteVcompleta', async (req, res) => {
    const clientes = await db.Cliente.findAll({
        order : [
            ['id', 'ASC']
        ]
    });

    let nuevaListaClientes = []
        for (let cliente of clientes) {
            nuevaListaClientes.push({
                id : cliente.id,
                nombre : cliente.nombre,
                apellido: cliente.apellido,
                dni: cliente.dni,
                correo: cliente.correo,
                numero: cliente.numero,
                direccion: cliente.direccion,
                distrito : cliente.distrito,
                provincia: cliente.provincia,
                departamento: cliente.departamento,
                pep: cliente.pep,
                estado: cliente.estado
            })
        }
    res.render('cliente_vcompleta', {
        clientes : nuevaListaClientes
    })
})

app.get('/cliente_vcompleta/modificar/:codigo', async (req, res) => {
    const idCliente = req.params.codigo

    const cliente = await db.Cliente.findOne({
        where : {
            id : idCliente
        }
    })

    res.render('cliente_vcompleta_update', {
        cliente : cliente,
    })
})

app.post('/cliente_vcompleta/modificar', async (req, res) => {
    const idCliente = req.body.cliente_id
    const nombre =req.body.cliente_nombre
    const apellido = req.body.cliente_apellido
    const dni = req.body.cliente_dni
    const correo = req.body.cliente_correo
    const telefono = req.body.cliente_numero
    const direccion = req.body.cliente_direccion
    const distrito = req.body.cliente_distrito
    const provincia = req.body.cliente_provincia
    const departamento = req.body.cliente_departamento
    const pep = req.body.cliente_pep
    const estado = req.body.cliente_estado

    const cliente = await db.Cliente.findOne({
        where : {
            id : idCliente
        }
    })
    cliente.nombre = nombre
    cliente.apellido = apellido
    cliente.dni = dni
    cliente.correo = correo
    cliente.telefono = telefono
    cliente.direccion = direccion
    cliente.distrito = distrito
    cliente.provincia = provincia
    cliente.departamento = departamento
    cliente.pep = pep
    cliente.estado = estado

    await cliente.save()

    res.redirect('/clienteVcompleta')

})

app.get('/cliente_vcompleta/eliminar/:codigo', async (req, res) => {
    const idCliente = req.params.codigo
    await db.Cliente.destroy({
        where : {
            id : idCliente
        }
    })
    res.redirect('cliente_vcompleta')
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

//-----------------------------------------------------------
//---------------------Vista Simple--------------------------
//-----------------------------------------------------------
app.get('/partidasadmin', async (req, res) => {
    const partidas = await db.Partida.findAll({
        order : [
            ['fecha','DESC'],
            ['hora_inicio','DESC']
        ]
    });

    let listaSimplePartida = []
        for (let partida of partidas) {
            listaSimplePartida.push({
                id : partida.id,
                id_juego : partida.id_juego,
                fecha : partida.fecha,
                hora_inicio : partida.hora_inicio,
                duracion : partida.duracion,
                estado : partida.estado
            })
        }
            

    res.render('partida-ad-simple', {
        partidas : listaSimplePartida
    })
})

//-----------------------------------------------------------
//---------------------Vista Avanzada------------------------
//-----------------------------------------------------------
app.get('/partidasadmcompleta', async (req, res) => {
    const partidas = await db.Partida.findAll({
        order : [
            ['fecha','DESC'],
            ['hora_inicio','DESC']
        ]
    });


    let listaAvPartida = []
        for (let partida of partidas) {
            listaAvPartida.push({
                id : partida.id,
                id_juego : partida.id_juego,
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

    res.render('partida-ad-avanzada', {
        partidas : listaAvPartida
    })
})

//-----------------------------------------------------------
//---------------------CREAR PARTIDA-------------------------
//-----------------------------------------------------------
app.get('/partidasadmin/crear', async (req, res) => {
    const juego = await db.Juego.findAll()
    const partida = await db.Partida.findAll()

    res.render('partida-ad-crear',{
        juego : juego,
        partida : partida
    })
})

app.post('/partidasadmin/crear', async (req, res) => {
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
    const partidaJuegoId = req.body.partidaJuegoId


    await db.Partida.create({
        fecha : partidaFecha,
        hora_inicio : partidaHoraInicio,
        duracion : partidaDuracion,
        estado : partidaEstado,
        equipo_A : partidaEA,
        equipo_B : partidaEB,
        factor_A : partidaFA,
        factor_X : partidaFX,
        factor_B : partidaFB,
        resultado : partidaResultado,
        id_juego : partidaJuegoId,
        id_categoria : 1
    })

    res.redirect('/partidasadmin')
})

//-----------------------------------------------------------
//--------------------EDITAR PARTIDA-------------------------          
//-----------------------------------------------------------
app.get('/partidasadmin/editar/:codigo', async (req, res) => {
    const id_partida = req.params.codigo

    const partida = await db.Partida.findOne({
        where : {
            id : id_partida
        }
    })

    const juego = await db.Juego.findAll()

    res.render('partida-ad-editar', {
        partida : partida,
        juego : juego
    })
})

app.post('/partidasadmin/editar', async (req, res) => {
    const partidaFecha = req.body.partida_fecha
    const partidaHoraInicio = req.body.partida_hora_inicio
    const partidaDuracion = req.body.partida_duracion
    const partidaFA = req.body.partida_fa
    const partidaFB = req.body.partida_fb
    const partidaFX = req.body.partida_fx
    const partidaEA = req.body.partida_ea
    const partidaEB = req.body.partida_eb
    const partidaEstado = req.body.partida_estado
    const partidaResultado = req.body.partida_resultado
    const partidaJuegoId = req.body.partidaJuegoId

    const partida = await db.Partida.findOne({
        where : {
            id : partidaJuegoId
        }
    })
    

    partida.fecha = partidaFecha
    partida.hora_inicio = partidaHoraInicio
    partida.duracion = partidaDuracion
    partida.factor_A = partidaFA
    partida.factor_X = partidaFX
    partida.factor_B = partidaFB
    partida.equipo_A = partidaEA
    partida.equipo_B = partidaEB
    partida.estado = partidaEstado
    partida.resultado = partidaResultado
    partida.id_juego = partidaJuegoId

    await partida.save()

    res.redirect('/partidasadmin')

})

//-----------------------------------------------------------
//--------------------ELIMINAR PARTIDA-----------------------
//-----------------------------------------------------------
app.get('/partidasadmin/eliminar/:codigo', async (req, res) => {
    const idPartida = req.params.codigo
    await db.Partida.destroy({
        where : {
            id : idPartida
        }
    })
    res.redirect('/partidasadmin')
})

//-----------------------------------------------------------
//----------------------MENU---------------------------------
//-----------------------------------------------------------
app.get('/menu', async (req,res) => {
    const banners = await db.Banners.findAll({
        order : [
            ['id', 'ASC']
        ]
    });
    res.render('menu', {
        banners : banners
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

app.get('/iniciosesion', (req, res) => {
    res.render('iniciosesion')
})


app.post('/iniciosesion',(req,res) => {
    const frm_correo = req.body.frm_correo
    const frm_contraseña = req.body.frm_contraseña

    if(frm_correo == "admin@gmail.com" && frm_contraseña == "123") {
        res.redirect("/logeado")
    }else {
        res.redirect('/iniciosesion')
    }
})


app.get("/logeado", async (req, res)  =>{
    const banners = await db.Banners.findAll({
        order : [
            ['id', 'ASC']
        ]
    });
    res.render('logeado', {
        banners : banners
    })
})


app.get('/nosotros', (req, res) => {
    res.render('nosotros')
})

app.get('/terminos', (req, res) => {
    res.render('terminos')
})

app.get('/juego_listar', async (req, res) => {
    const juegos = await db.Juego.findAll({
        order : [
            ['id', 'ASC']
        ]
    });

    res.render('juego_listar', {
        juegos : juegos
    })
})

app.get('/juego_listar/juego_crear', (req, res) => {
    res.render('juego_crear')
})

app.post('/juego_listar/juego_crear', async (req, res) => {
    const juegoNombre = req.body.juego_nombre
    const juegoCategoria_id = req.body.juego_categoria_id
   
    await db.Juego.create({
        nombre : juegoNombre,
        id_categoria : juegoCategoria_id,
    })
    res.redirect('/juego_listar')
})


app.get('/juego_listar/juego_editar/:codigo', async (req, res) => {
    const idJuego = req.params.codigo

    const juego = await db.Juego.findOne({
        where : {
            id : idJuego
        }
    })

    res.render('juego_editar', {
        juego : juego,
    })
})

app.post('/juego_listar/juego_editar', async (req, res) => {
    const idJuego = req.body.juego_id
    const nombre = req.body.juego_nombre
    const categoria = req.body.juego_id_categoria

    const juego = await db.Juego.findOne({
        where : {
            id : idJuego
        }
    })
    juego.nombre = nombre
    juego.id_categoria = categoria
    

    await juego.save()

    res.redirect('/juego_listar')

})

app.get('/juego_listar/juego_eliminar/:codigo', async (req, res) => {
    const juego = req.params.codigo
    await db.Juego.destroy({
        where : {
            id : juego
        }
    })
    res.redirect('/juego_listar')
})



app.listen(PORT, () => {
    console.log('Se ha iniciado el servidor en el puerto ' + PORT)
})



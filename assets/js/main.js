
let $departemento = document.getElementById('departamento')
let $provincia = document.getElementById('provincia')
let $distrito = document.getElementById('distrito')

let departamentos = ['Lima','Cuzco','Junin']
let provincias = ['Lima','Cieneguilla','Paruro','Urubamba','Jauja','Tarma']
let distritos = ['San Borja', 'Jesus Maria', 'Cieneguilla','Accha', 'Omacha', 'Maras','Marco', 'Canchayllo', 'Acobamba']

function mostrarLugares(arreglo, lugar) {
    let elementos = '<option selected disables>-----Seleccione uno-----</option>'

    for(let i = 0; i < arreglo.length; i++) {
        elementos += '<option value="' + arreglo[i] +'">' + arreglo[i] +'</option>'
    }

    lugar.innerHTML = elementos
}

mostrarLugares(departamentos, $departemento)

function recortar(array, inicio, fin, lugar) {
    let recortar = array.slice(inicio, fin)
    mostrarLugares(recortar, lugar)
}

$departemento.addEventListener('change', function() {
    let valor = $departemento.value

    switch(valor) {
        case 'Lima':
            recortar(provincias, 0, 2, $provincia)
        break
        case 'Cuzco':
            recortar(provincias, 2, 4, $provincia)
            console.log(valor)
        break
        case 'Junin':
            recortar(provincias, 4, 6, $provincia)
            console.log(valor)
        break
    }

    $distrito.innerHTML = ''
})

$provincia.addEventListener('change', function() {
    let valor = $provincia.value

    if(valor == 'Lima') {
        recortar(distritos, 0, 2, $distrito)
    } else if(valor == 'Cieneguilla') {
        recortar(distritos, 2, 3, $distrito)
    } else if(valor == 'Paruro') {
        recortar(distritos, 3, 5, $distrito)
    } else if(valor == 'Urubamba') {
        recortar(distritos, 5, 6, $distrito)
    } else if(valor == 'Jauja') {
        recortar(distritos, 6, 8, $distrito)
    } else if(valor == 'Tarma') {
        recortar(distritos, 8, 9, $distrito)
    } 
})

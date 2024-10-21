const vehiculosStr = `[
    {"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},
    {"id":51, "modelo":"Dodge Viper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},
    {"id":67, "modelo":"Boeing CH-47 Chinook", "anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},
    {"id":666, "modelo":"Aprilia RSV 1000 R", "anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},
    {"id":872, "modelo":"Boeing 747-400", "anoFab":1989, "velMax":988, "altMax":13, "autonomia":13450},
    {"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953, "velMax":174, "altMax":3, "autonomia":870}
]`;

const vehiculos = JSON.parse(vehiculosStr);

window.onload = function() {
    cargarTabla(vehiculos);
};
function cargarTabla(vehiculos) {
    const tbody = document.querySelector('#tablaVehiculos tbody');
    tbody.innerHTML = ''; 

    vehiculos.forEach((vehiculo, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${vehiculo.id}</td>
            <td>${vehiculo.modelo}</td>
            <td>${vehiculo.anoFab}</td>
            <td>${vehiculo.velMax}</td>
            <td>${vehiculo.cantPue || ''}</td>
            <td>${vehiculo.cantRue || ''}</td>
            <td>${vehiculo.altMax || ''}</td>
            <td>${vehiculo.autonomia || ''}</td>
            <td>
                <button onclick="eliminarVehiculo(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}
function agregarVehiculo() {
    const id = generarID(); 
    const modelo = document.getElementById('modelo').value;
    const anoFab = parseInt(document.getElementById('anoFab').value);
    const velMax = parseInt(document.getElementById('vel-max').value);
    const tipo = document.getElementById('tipo').value;

    const nuevoVehiculo = {
        id: id,
        modelo: modelo,
        anoFab: anoFab,
        velMax: velMax
    };

    if (tipo === 'terrestre') {
        nuevoVehiculo.cantPue = parseInt(document.getElementById('cantPue').value) || 0;
        nuevoVehiculo.cantRue = parseInt(document.getElementById('cantRue').value) || 0;
    } else {
        nuevoVehiculo.altMax = parseInt(document.getElementById('altMax').value) || 0;
        nuevoVehiculo.autonomia = parseInt(document.getElementById('autonomia').value) || 0;
    }

    vehiculos.push(nuevoVehiculo); 
    cargarTabla(vehiculos); 
    document.getElementById('vehiculoForm').reset(); 
    mostrarCampos(); 
    document.getElementById('mensaje').innerText = 'Vehículo agregado correctamente!';
}


function filtrarDatos() {
    const filtro = document.getElementById('filtro').value;

    let vehiculosFiltrados;

    if (filtro === 'terrestre') {
        vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo.cantRue !== undefined);
    } else if (filtro === 'aereos') {
        vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo.altMax !== undefined);
    } else {
        vehiculosFiltrados = vehiculos; 
    }

    cargarTabla(vehiculosFiltrados);
}

function calcularVelocidadPromedio() {
    const filtro = document.getElementById('filtro').value;
    
    const vehiculosFiltrados = vehiculos.filter(vehiculo => {
        if (filtro === 'todos') return true; 
        if (filtro === 'terrestre') return vehiculo.cantRue && vehiculo.cantRue > 0;
        if (filtro === 'aereos') return vehiculo.altMax && vehiculo.altMax > 0; 
    });

    if (vehiculosFiltrados.length === 0) {
        document.getElementById('Resultado').innerText = 'No hay vehículos para calcular.';
        return;
    }

    const sumaVelocidades = vehiculosFiltrados
        .map(vehiculo => vehiculo.velMax) 
        .reduce((suma, vel) => suma + vel, 0);

    const promedio = sumaVelocidades / vehiculosFiltrados.length;
    
    document.getElementById('Resultado').innerText = `Velocidad promedio: ${promedio.toFixed(2)} km/h`;
}

function eliminarVehiculo(index) {
    vehiculos.splice(index, 1);
    
    cargarTabla(vehiculos);
}

function mostrarCampos() {
    const tipo = document.getElementById('tipo').value;
    const camposTerrestres = document.getElementById('camposTerrestres');
    const camposAereos = document.getElementById('camposAereos');

    if (tipo === 'terrestre') {
        camposTerrestres.style.display = 'block';
        camposAereos.style.display = 'none';
    } else {
        camposTerrestres.style.display = 'none';
        camposAereos.style.display = 'block';
    }
}


function generarID() {
    return Math.floor(Math.random() * 10000); // Genera una ID aleatoria.
}


function cargarDatosEnFormulario(id) {
    const vehiculo = vehiculos.find(v => v.id === id);
    if (vehiculo) {
        document.getElementById('id').value = vehiculo.id;
        document.getElementById('modelo').value = vehiculo.modelo;
        document.getElementById('anoFab').value = vehiculo.anoFab;
        document.getElementById('vel-max').value = vehiculo.velMax;

        if (vehiculo.cantRue !== undefined) {
            document.getElementById('tipo').value = 'terrestre';
            document.getElementById('cantPue').value = vehiculo.cantPue || '';
            document.getElementById('cantRue').value = vehiculo.cantRue || '';
            mostrarCampos();
        } else {
            document.getElementById('tipo').value = 'aereo';
            document.getElementById('altMax').value = vehiculo.altMax || '';
            document.getElementById('autonomia').value = vehiculo.autonomia || '';
            mostrarCampos();
        }
    }
}

function modificarVehiculo() {
    const id = parseInt(document.getElementById('id').value);
    const vehiculoIndex = vehiculos.findIndex(v => v.id === id);

    if (vehiculoIndex !== -1) {
        const modelo = document.getElementById('modelo').value;
        const anoFab = parseInt(document.getElementById('anoFab').value);
        const velMax = parseInt(document.getElementById('vel-max').value);
        const tipo = document.getElementById('tipo').value;

        const vehiculoModificado = {
            id: id,
            modelo: modelo,
            anoFab: anoFab,
            velMax: velMax 
        };

        if (tipo === 'terrestre') {
            vehiculoModificado.cantPue = parseInt(document.getElementById('cantPue').value) || 0;
            vehiculoModificado.cantRue = parseInt(document.getElementById('cantRue').value) || 0;
        } else {
            vehiculoModificado.altMax = parseInt(document.getElementById('altMax').value) || 0;
            vehiculoModificado.autonomia = parseInt(document.getElementById('autonomia').value) || 0;
        }

        vehiculos[vehiculoIndex] = vehiculoModificado; 
        cargarTabla(vehiculos); 
        document.getElementById('vehiculoForm').reset();
        mostrarCampos(); 
        document.getElementById('mensaje').innerText = 'Vehículo modificado correctamente!';
    } else {
        document.getElementById('mensaje').innerText = 'ID no encontrado.';
    }
}

let ordenAscendente = true;

function ordenarTabla(columna) {
    vehiculos.sort((a, b) => {
        let valorA = a[columna] !== undefined ? a[columna] : (typeof a[columna] === 'string' ? '' : 0);
        let valorB = b[columna] !== undefined ? b[columna] : (typeof b[columna] === 'string' ? '' : 0);

        if (typeof valorA === 'number' && typeof valorB === 'number') {
            return ordenAscendente ? valorA - valorB : valorB - valorA;
        }
        
        if (typeof valorA === 'string' && typeof valorB === 'string') {
            return ordenAscendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
        }

        return 0;
    });

    ordenAscendente = !ordenAscendente;

    cargarTabla(vehiculos);
}

function alternarColumna(checkbox) {
    const columna = checkbox.getAttribute('data-column');
    const tabla = document.getElementById('tablaVehiculos');

    for (let i = 0; i < tabla.rows.length; i++) {
        const celda = tabla.rows[i].cells[columna];
        if (checkbox.checked) {
            celda.style.display = ''; 
        } else {
            celda.style.display = 'none';
        }
    }
}






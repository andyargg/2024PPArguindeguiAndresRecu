const jsonData = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"Dodge Viper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook", "anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R", "anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989, "velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953, "velMax":174, "altMax":3, "autonomia":870}]';

// Parsear la cadena JSON para convertirla en un array de objetos
const datos = JSON.parse(jsonData);
const tablaDatos = document.getElementById('tabla-datos');

// Función para crear y agregar una fila a la tabla
function agregarFila(obj) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${obj.id}</td>
        <td>${obj.modelo}</td>
        <td>${obj.anoFab || ''}</td>
        <td>${obj.velMax || ''}</td>
        <td>${(obj.altMax || '') + '/' + (obj.autonomia || '')}</td>
        <td>${(obj.cantPue || '') + ' / ' + (obj.cantRue || '')}</td>
        <td>
            <button onclick="cargarRegistroParaEdicion(${obj.id})">Editar</button>
            <button onclick="eliminarRegistro(${obj.id})">Eliminar</button>
        </td>
    `;
    tablaDatos.appendChild(fila);
}

// Cargar todos los datos inicialmente
function cargarDatos() {
    tablaDatos.innerHTML = ''; // Limpiar la tabla antes de cargar datos
    datos.forEach(agregarFila);
    console.log("Datos cargados");
}

// Filtrar datos según el tipo seleccionado
function filtrarDatos() {
    const tipoSeleccionado = document.getElementById('tipo-info').value;
    tablaDatos.innerHTML = ''; // Limpiar la tabla antes de cargar datos filtrados

    const datosFiltrados = datos.filter(obj => {
        return (tipoSeleccionado === 'terrestres' && obj.cantRue !== undefined) ||
               (tipoSeleccionado === 'aereos' && obj.altMax !== undefined) ||
               tipoSeleccionado === 'todos';
    });

    datosFiltrados.forEach(agregarFila);
}

// Función para calcular y mostrar la velocidad máxima promedio
function calcularVelocidadMaximaPromedio() {
    const tipoSeleccionado = document.getElementById('tipo-info').value;

    const datosFiltrados = datos.filter(obj => {
        return (tipoSeleccionado === 'terrestres' && obj.cantRue !== undefined) ||
               (tipoSeleccionado === 'aereos' && obj.altMax !== undefined) ||
               tipoSeleccionado === 'todos';
    });

    if (datosFiltrados.length === 0) {
        document.getElementById('resultado-velocidad').textContent = 'No hay datos para calcular.';
        return;
    }

    const velocidadesMaximas = datosFiltrados.map(obj => obj.velMax);

    const totalVelocidad = velocidadesMaximas.reduce((acc, velocidad) => acc + velocidad, 0);
    const velocidadPromedio = totalVelocidad / velocidadesMaximas.length;

    // Mostrar el resultado
    document.getElementById('resultado-velocidad').textContent = `Velocidad Máxima Promedio: ${velocidadPromedio.toFixed(2)} km/h`;
}



// Actualizar el formulario según el tipo de registro
function actualizarFormulario() {
    const tipoRegistro = document.getElementById('tipo-registro').value;
    document.getElementById('datos-aereo').style.display = tipoRegistro === 'Aereo' ? 'block' : 'none';
    document.getElementById('datos-terrestre').style.display = tipoRegistro === 'Terrestre' ? 'block' : 'none';
}

// Generar un ID aleatorio
function generarID() {
    return Math.floor(Math.random() * 10000); // Genera un número random entre 1 y 10,000
}

// Agregar un nuevo registro a la lista de datos
function agregarRegistro() {
    const tipoRegistro = document.getElementById('tipo-registro').value;
    const id = generarID(); // Generar un ID aleatorio para el registro
    let nuevoRegistro;

    if (tipoRegistro === 'Terrestre') {
        nuevoRegistro = crearRegistroTerrestre(id);
    } else if (tipoRegistro === 'Aereo') {
        nuevoRegistro = crearRegistroAereo(id);
    } else {
        console.error("Tipo de registro no reconocido:", tipoRegistro);
        return; // Salir si el tipo no es válido
    }

    datos.push(nuevoRegistro);
    agregarFila(nuevoRegistro);
}

// Crear un registro de vehículo terrestre
function crearRegistroTerrestre(id) {
    return {
        id,
        modelo: document.getElementById('modelo-terrestre').value,
        anoFab: parseInt(document.getElementById('año-terrestre').value),
        velMax: parseInt(document.getElementById('velmax-terrestre').value),
        cantPue: parseInt(document.getElementById('cant-pue').value),
        cantRue: parseInt(document.getElementById('cant-rue').value),
    };
}

// Crear un registro de vehículo aéreo
function crearRegistroAereo(id) {
    return {
        id,
        modelo: document.getElementById('modelo-aereo').value,
        anoFab: parseInt(document.getElementById('año-aereo').value),
        velMax: parseInt(document.getElementById('velmax-aereo').value),
        altMax: parseInt(document.getElementById('alt-max').value),
        autonomia: parseInt(document.getElementById('autonomia').value),
    };
}

// Eliminar un registro
function eliminarRegistro(id) {
    const index = datos.findIndex(obj => obj.id === id);
    if (index !== -1) {
        datos.splice(index, 1);
    }
    filtrarDatos();
}

function cargarRegistroParaEdicion(id) {
    const registro = datos.find(obj => obj.id === id);
    if (registro) {
        document.getElementById('tipo-registro').value = registro.altMax !== undefined ? 'Aereo' : 'Terrestre';
        actualizarFormulario(); // Muestra el formulario correspondiente

        // Cargar los datos en el formulario
        if (registro.altMax !== undefined) { // Vehículo Aéreo
            document.getElementById('modelo-aereo').value = registro.modelo;
            document.getElementById('año-aereo').value = registro.anoFab;
            document.getElementById('velmax-aereo').value = registro.velMax;
            document.getElementById('alt-max').value = registro.altMax;
            document.getElementById('autonomia').value = registro.autonomia;
        } else { // Vehículo Terrestre
            document.getElementById('modelo-terrestre').value = registro.modelo;
            document.getElementById('año-terrestre').value = registro.anoFab;
            document.getElementById('velmax-terrestre').value = registro.velMax;
            document.getElementById('cant-pue').value = registro.cantPue;
            document.getElementById('cant-rue').value = registro.cantRue;
        }

        // Eliminar el registro original de datos para evitar duplicados
        eliminarRegistro(id);
    }
}
function toggleColumna(index) {
    const celdas = tablaDatos.getElementsByTagName('tr');
    for (let i = 0; i < celdas.length; i++) {
        const celda = celdas[i].getElementsByTagName('td')[index];
        if (celda) {
            celda.style.display = celda.style.display === 'none' ? '' : 'none'; // Alterna entre mostrar y ocultar
        }
    }
    // También ocultar la cabecera de la columna
    const headerCelda = tablaDatos.parentElement.getElementsByTagName('th')[index];
    if (headerCelda) {
        headerCelda.style.display = headerCelda.style.display === 'none' ? '' : 'none'; // Alterna entre mostrar y ocultar
    }
}


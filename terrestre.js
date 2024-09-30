import vehiculo from './vehiculo.js'

class VehiculoTerrestre extends Vehiculo {
    constructor(id, modelo, añoFabricacion, velMax, cantPuertas, cantRuedas) {
        super(id, modelo, añoFabricacion, velMax);
        
        if (cantPuertas < 0) {
            throw new Error("La cantidad de puertas debe ser mayor o igual a 0.");
        }
        if (cantRuedas <= 0) {
            throw new Error("La cantidad de ruedas debe ser mayor a 0.");
        }

        this.cantPuertas = cantPuertas;
        this.cantRuedas = cantRuedas;
    }

    toString() {
        return `${super.toString()}, Cantidad de Puertas: ${this.cantPuertas}, Cantidad de Ruedas: ${this.cantRuedas}`;
    }
}

// Ejemplo de uso:
const auto = new VehiculoTerrestre(1, "Modelo X", 2022, 200, 4, 4);
console.log(auto.toString());

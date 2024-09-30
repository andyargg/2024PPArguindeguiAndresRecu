import vehiculo from './vehiculo.js'

class VehiculoAereo extends Vehiculo {
    constructor(id, modelo, añoFabricacion, velMax, alturaMax, autonomia) {
        super(id, modelo, añoFabricacion, velMax);
        
        if (alturaMax <= 0) {
            throw new Error("La altura máxima debe ser un número mayor a 0.");
        }
        if (autonomia <= 0) {
            throw new Error("La autonomía debe ser un número mayor a 0.");
        }

        this.alturaMax = alturaMax;
        this.autonomia = autonomia;
    }

    toString() {
        return `${super.toString()}, Altura Máxima: ${this.alturaMax} metros, Autonomía: ${this.autonomia} kilómetros`;
    }
}



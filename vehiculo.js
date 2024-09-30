class Vehiculo {
    constructor(id, modelo, añoFabricacion, velMax) {
        if (id <= 0) {
            throw new Error("El id debe ser un número mayor a 0.");
        }
        if (!modelo || typeof modelo !== 'string') {
            throw new Error("El modelo debe ser una cadena de texto no vacía.");
        }
        if (añoFabricacion <= 1885) {
            throw new Error("El año de fabricación debe ser un número mayor a 1885.");
        }
        if (velMax <= 0) {
            throw new Error("La velocidad máxima debe ser un número mayor a 0.");
        }

        this.id = id;
        this.modelo = modelo;
        this.añoFabricacion = añoFabricacion;
        this.velMax = velMax;
    }

    toString() {
        return `ID: ${this.id}, Modelo: ${this.modelo}, Año de Fabricación: ${this.añoFabricacion}, Velocidad Máxima: ${this.velMax} km/h`;
    }
}
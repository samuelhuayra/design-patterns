class Juego {
    private nombre:string
    private checkpoint:number

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getCheckpoint(): number {
        return this.checkpoint;
    }

    public setCheckpoint(checkpoint: number): void {
        this.checkpoint = checkpoint;
    }
}

// Guarda el momento
class Memento {
    private estado:Juego
    
    constructor(estado:Juego){
        this.estado = estado
    }
    getEstado():Juego{
        return this.estado
    }
}

// Guarda el estado y devuelve un memento [admin]
class Originator {
    private estado:Juego

    public getEstado(): Juego {
        return this.estado;
    }

    public setEstado(estado: Juego): void {
        this.estado = estado;
    }

    guardar():Memento{
        return new Memento(this.estado)
    }

    restaurar(m:Memento){
        this.estado = m.getEstado()
    }
}

// Almacena a una lista
class Caretaker {
    private mementos:Array<Memento> = new Array<Memento>()

    addMemento(m:Memento){
        this.mementos.push(m)
    }
    getMemento(index:number):Memento{
        return this.mementos[index]
    }
}

// Main
var nombre:string = 'Crash Bandicoot'

var juego:Juego = new Juego()
juego.setNombre(nombre)
juego.setCheckpoint(1)

var caretaker:Caretaker = new Caretaker()
var originator:Originator = new Originator()

juego = new Juego()
juego.setNombre(nombre)
juego.setCheckpoint(2)
// originator guarda el estado pisando
originator.setEstado(juego)


juego = new Juego()
juego.setNombre(nombre)
juego.setCheckpoint(3)
// originator guarda el estado pisando
originator.setEstado(juego)

// Estado posicion 0
caretaker.addMemento(originator.guardar())

juego = new Juego()
juego.setNombre(nombre)
juego.setCheckpoint(4)
// originator guarda el estado pisando
originator.setEstado(juego)
// Estado posicion 1
caretaker.addMemento(originator.guardar())

juego = new Juego()
juego.setNombre(nombre)
juego.setCheckpoint(5)
// originator guarda el estado pisando
originator.setEstado(juego)
//restaurar lo guardado
originator.restaurar(caretaker.getMemento(0))

juego = originator.getEstado()
console.log('juego',juego);
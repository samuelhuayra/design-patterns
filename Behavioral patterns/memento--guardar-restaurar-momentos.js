var Juego = /** @class */ (function () {
    function Juego() {
    }
    Juego.prototype.getNombre = function () {
        return this.nombre;
    };
    Juego.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Juego.prototype.getCheckpoint = function () {
        return this.checkpoint;
    };
    Juego.prototype.setCheckpoint = function (checkpoint) {
        this.checkpoint = checkpoint;
    };
    return Juego;
}());
// Guarda el momento
var Memento = /** @class */ (function () {
    function Memento(estado) {
        this.estado = estado;
    }
    Memento.prototype.getEstado = function () {
        return this.estado;
    };
    return Memento;
}());
// Guarda el estado y devuelve un memento [admin]
var Originator = /** @class */ (function () {
    function Originator() {
    }
    Originator.prototype.getEstado = function () {
        return this.estado;
    };
    Originator.prototype.setEstado = function (estado) {
        this.estado = estado;
    };
    Originator.prototype.guardar = function () {
        return new Memento(this.estado);
    };
    Originator.prototype.restaurar = function (m) {
        this.estado = m.getEstado();
    };
    return Originator;
}());
// Almacena a una lista
var Caretaker = /** @class */ (function () {
    function Caretaker() {
        this.mementos = new Array();
    }
    Caretaker.prototype.addMemento = function (m) {
        this.mementos.push(m);
    };
    Caretaker.prototype.getMemento = function (index) {
        return this.mementos[index];
    };
    return Caretaker;
}());
// Main
var nombre = 'Crash Bandicoot';
var juego = new Juego();
juego.setNombre(nombre);
juego.setCheckpoint(1);
var caretaker = new Caretaker();
var originator = new Originator();
juego = new Juego();
juego.setNombre(nombre);
juego.setCheckpoint(2);
// originator guarda el estado pisando
originator.setEstado(juego);
juego = new Juego();
juego.setNombre(nombre);
juego.setCheckpoint(3);
// originator guarda el estado pisando
originator.setEstado(juego);
// Estado posicion 0
caretaker.addMemento(originator.guardar());
juego = new Juego();
juego.setNombre(nombre);
juego.setCheckpoint(4);
// originator guarda el estado pisando
originator.setEstado(juego);
// Estado posicion 1
caretaker.addMemento(originator.guardar());
juego = new Juego();
juego.setNombre(nombre);
juego.setCheckpoint(5);
// originator guarda el estado pisando
originator.setEstado(juego);
//restaurar lo guardado
originator.restaurar(caretaker.getMemento(0));
juego = originator.getEstado();
console.log('juego', juego);

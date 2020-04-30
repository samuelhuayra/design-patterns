// Receiver
var Cuenta = /** @class */ (function () {
    function Cuenta(id, saldo) {
        this.id = id;
        this.saldo = saldo;
    }
    Cuenta.prototype.retirar = function (monto) {
        this.saldo = this.saldo - monto;
        console.log("[COMANDO RETIRAR] Cuenta: " + this.id + " saldo: " + this.saldo);
    };
    Cuenta.prototype.depositar = function (monto) {
        this.saldo = this.saldo + monto;
        console.log("[COMANDO DEPOSITAR] Cuenta: " + this.id + " saldo: " + this.saldo);
    };
    return Cuenta;
}());
var DepositarImpl = /** @class */ (function () {
    function DepositarImpl(cuenta, monto) {
        this.cuenta = cuenta;
        this.monto = monto;
    }
    DepositarImpl.prototype.execute = function () {
        this.cuenta.depositar(this.monto);
    };
    return DepositarImpl;
}());
var RetirarImpl = /** @class */ (function () {
    function RetirarImpl(cuenta, monto) {
        this.cuenta = cuenta;
        this.monto = monto;
    }
    RetirarImpl.prototype.execute = function () {
        this.cuenta.retirar(this.monto);
    };
    return RetirarImpl;
}());
var Invoker = /** @class */ (function () {
    function Invoker() {
        this.operaciones = new Array();
    }
    Invoker.prototype.recibirOperacion = function (operacion) {
        this.operaciones.push(operacion);
    };
    Invoker.prototype.realizarOperaciones = function () {
        this.operaciones.map(function (x) { return x.execute(); });
        this.operaciones = new Array();
    };
    return Invoker;
}());
var cuenta = new Cuenta(1, 200);
// Todos son comandos
var opDepositar = new DepositarImpl(cuenta, 100);
var opRetirar = new RetirarImpl(cuenta, 50);
// Se aplican a un stack
var ivk = new Invoker();
ivk.recibirOperacion(opDepositar);
ivk.recibirOperacion(opRetirar);
// Y luego se ejecuta las operaciones
ivk.realizarOperaciones();

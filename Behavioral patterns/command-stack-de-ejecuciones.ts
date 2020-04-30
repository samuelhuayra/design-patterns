
// Receiver
class Cuenta {

    private id:number
    private saldo:number

    constructor(id:number,saldo:number) {
        this.id = id
        this.saldo=saldo
    }

    public retirar(monto:number):void{
        this.saldo = this.saldo - monto
        console.log(`[COMANDO RETIRAR] Cuenta: ${this.id} saldo: ${this.saldo}`);
    }

    public depositar(monto:number):void{
        this.saldo = this.saldo + monto
        console.log(`[COMANDO DEPOSITAR] Cuenta: ${this.id} saldo: ${this.saldo}`);
    }
}

// >>Command
interface IOperacion {
    execute():void
}

class DepositarImpl implements IOperacion {
    private cuenta:Cuenta
    private monto:number

    constructor(cuenta:Cuenta,monto:number) {
        this.cuenta = cuenta
        this.monto = monto
    }
    execute(): void {
        this.cuenta.depositar(this.monto)
    }
}
class RetirarImpl implements IOperacion {
    private cuenta:Cuenta
    private monto:number

    constructor(cuenta:Cuenta,monto:number) {
        this.cuenta = cuenta
        this.monto = monto
    }
    execute(): void {
        this.cuenta.retirar(this.monto)
    }
}

class Invoker {

    private operaciones:Array<IOperacion> = new Array<IOperacion>()

    recibirOperacion(operacion:IOperacion){
        this.operaciones.push(operacion)
    }

    realizarOperaciones(){
        this.operaciones.map(x=>x.execute())
        this.operaciones = new Array<IOperacion>()
    }
}

var cuenta:Cuenta = new Cuenta(1,200);
// Todos son comandos
var opDepositar:DepositarImpl = new DepositarImpl(cuenta,100)
var opRetirar:RetirarImpl = new RetirarImpl(cuenta,50)

// Se aplican a un stack
var ivk:Invoker = new Invoker()
ivk.recibirOperacion(opDepositar)
ivk.recibirOperacion(opRetirar)

// Y luego se ejecuta las operaciones
ivk.realizarOperaciones()
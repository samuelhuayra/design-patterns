//#-asignar-funcionalidad-extra-a-existente
class Cuenta {
    private id:Number
    private cliente:string

    constructor(id:Number,cliente:string) {
        this.id = id;
        this.cliente = cliente;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getCliente(): string {
        return this.cliente;
    }

    public setCliente(cliente: string): void {
        this.cliente = cliente;
    }
}

interface ICuentaBancaria{
    abrirCuenta(cuenta:Cuenta):void 
}

class CuentaAhorro implements ICuentaBancaria {
    abrirCuenta(cuenta:Cuenta){
        console.log('-----------------');
        console.log('Se abrió una CUENTA DE AHORROS');
        console.log(`Cliente: ${cuenta.getCliente()}`);
    }
}
class CuentaCorriente implements ICuentaBancaria {
    abrirCuenta(cuenta:Cuenta){
        console.log('-----------------');
        console.log('Se abrió una CUENTA CORRIENTE');
        console.log(`Cliente: ${cuenta.getCliente()}`);
    }
}

// 
abstract class CuentaDecorador implements ICuentaBancaria {

    protected cuentaDecorada:ICuentaBancaria

    constructor(cuentaDecorada:ICuentaBancaria){
        this.cuentaDecorada=cuentaDecorada
    }
    // Metodo de la interfaz
    public abrirCuenta(c:Cuenta){
        this.cuentaDecorada.abrirCuenta(c)
    }
}

// El abstract no tiene valores abstractos
class SeguroDecorador extends CuentaDecorador {

    constructor(cuentaDecorada:ICuentaBancaria) {
        super(cuentaDecorada)
    }

    // Usa abrir cuenta del pabre
    abrirCuenta(c:Cuenta) {
        this.cuentaDecorada.abrirCuenta(c)
        this.agregarSeguro(c)
    }

    //IMPORTANTE Agrega Algo nuevo a lo que ya existe
    agregarSeguro(c:Cuenta){
        console.log(`Se agregró un seguro a la cuenta del cliente ${c.getCliente()}`);
    }
}

var c:Cuenta = new Cuenta(1,'Wendy Waters Wiegand')
var cuenta:ICuentaBancaria = new CuentaAhorro()
var cuentaConSeguro:ICuentaBancaria = new SeguroDecorador(cuenta)

cuentaConSeguro.abrirCuenta(c)

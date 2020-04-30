// #Tener un capa superior para acceder al objeto real
// Debemos encapsular este para que nadie acceda a el y solo usar el proxy
class Cuenta {

    private idCuenta:number
    private usuario:string
    private saldoInicial:number

    constructor(idCuenta:number,usuario:string,saldoInicial:number) {
        this.idCuenta = idCuenta
        this.usuario = usuario
        this.saldoInicial=saldoInicial
    }

    public getIdCuenta(): number {
        return this.idCuenta;
    }

    public setIdCuenta(idCuenta: number): void {
        this.idCuenta = idCuenta;
    }

    public getUsuario(): string {
        return this.usuario;
    }

    public setUsuario(usuario: string): void {
        this.usuario = usuario;
    }

    public getSaldoInicial(): number {
        return this.saldoInicial;
    }

    public setSaldoInicial(saldoInicial: number): void {
        this.saldoInicial = saldoInicial;
    }
}

interface ICuenta {
    retirarDinero(cuenta:Cuenta,monto:number):Cuenta
    depositarDinero(cuenta:Cuenta,monto:number):Cuenta
    mostrarSaldo(cuenta:Cuenta):void
}

// Existente
class CuentaBancoAImpl implements ICuenta{
    retirarDinero(cuenta: Cuenta, monto: number): Cuenta {
        var saldoActual:number = cuenta.getSaldoInicial() - monto;
        cuenta.setSaldoInicial(saldoActual)
        console.log(`Saldo actual: ${cuenta.getSaldoInicial()}`);
        return cuenta;
    }
    depositarDinero(cuenta: Cuenta, monto: number): Cuenta {
        var saldoActual:number = cuenta.getSaldoInicial() + monto;
        cuenta.setSaldoInicial(saldoActual)
        console.log(`Saldo actual: ${cuenta.getSaldoInicial()}`);
        return cuenta;
    }
    mostrarSaldo(cuenta: Cuenta): void {
        console.log(`Saldo actual: ${cuenta.getSaldoInicial()}`);
    }
}

// Proxy
class CuentaProxy implements ICuenta {

    private cuentaReal:CuentaBancoAImpl;
    
    // se sobre carga la clase y se meten codigo adicionales
    retirarDinero(cuenta: Cuenta, monto: number): Cuenta {
        if(this.cuentaReal){
            return this.cuentaReal.retirarDinero(cuenta,monto)
        }else{
            this.cuentaReal = new CuentaBancoAImpl()
            return this.cuentaReal.retirarDinero(cuenta,monto)
        }
    }
    depositarDinero(cuenta: Cuenta, monto: number): Cuenta {
        if(this.cuentaReal){
            return this.cuentaReal.depositarDinero(cuenta,monto)
        }else{
            this.cuentaReal = new CuentaBancoAImpl()
            return this.cuentaReal.depositarDinero(cuenta,monto)
        }
    }
    mostrarSaldo(cuenta: Cuenta): void {
        if(this.cuentaReal){
            return this.cuentaReal.mostrarSaldo(cuenta)
        }else{
            this.cuentaReal = new CuentaBancoAImpl()
            return this.cuentaReal.mostrarSaldo(cuenta)
        }
    }
}

// Main
var c:Cuenta = new Cuenta(1,'Samuel',100) 

var cuenta:ICuenta = new CuentaProxy()
cuenta.mostrarSaldo(c)
c = cuenta.depositarDinero(c,50)
c = cuenta.retirarDinero(c,20)
cuenta.mostrarSaldo(c)

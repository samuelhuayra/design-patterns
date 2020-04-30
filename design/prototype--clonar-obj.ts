// # Clonar instancia
//  IMPORTANTE LE DECIMOS QUE TENGA UN METODO CLONAR CON ESTA INTERFAZ
// Este es el prototype
interface ICuenta {
    clonar():ICuenta
}

class CuentaAHImlp implements ICuenta {

    private tipo:string
    private monto:Number

    constructor() {
        this.tipo = 'AHORRO'
    }

    clonar(): CuentaAHImlp {
        return (<any>Object).assign({}, this)
    }  

    public toString():string{
        return `CuentaAHImlp: tipo=${this.tipo} monto=${this.monto}`
    }

    public getTipo(): string {
        return this.tipo;
    }

    public setTipo(tipo: string): void {
        this.tipo = tipo;
    }

    public getMonto(): Number {
        return this.monto;
    }

    public setMonto(monto: Number): void {
        this.monto = monto;
    }
}

// main
var cuentaAhorro:CuentaAHImlp = new CuentaAHImlp();
cuentaAhorro.setMonto(200)
var cuentaClonada:CuentaAHImlp = cuentaAhorro.clonar()
var cuentaAhorro2:CuentaAHImlp = cuentaAhorro;
console.log('cuentaAhorro',cuentaAhorro);
console.log('cuentaClonada',cuentaClonada);
// false: No apuntan al mismo lugar en memoria
console.log(cuentaAhorro == cuentaClonada);
// true: Si apuntan al mismo lugar en memoria
console.log(cuentaAhorro == cuentaAhorro2);
// tsc prototype--clonar-obj.ts && node prototype--clonar-obj.js

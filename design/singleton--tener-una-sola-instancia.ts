// #Unico objeto
class Conexion {

    // Static podemos acceder al static sin crear objeto Clase.instancia
    private static instancia:Conexion;

    // private para evitar que creen un objeto
    private constructor() {}

    // static para obtener la instacia estatic
    // el metodo tiene que ser static para que retorne static Clase.metodo
    public static getInstancia():Conexion{
        if(!this.instancia) this.instancia = new Conexion()
        return this.instancia;
    }

    public conectar():void{
        console.log('Me conecté a la BD');
    }
    public desconectar():void{
        console.log('Me desconecté de la BD');
    }
}

//no se puede porque es privado
// var con:Conexion = new Conexion();

// Por estatic se puede acceder directo
var con:Conexion = Conexion.getInstancia();
con.conectar();
con.desconectar();

// instanceof Es una instancia de : Conexion
var rpta:Boolean = con instanceof Conexion
console.log(rpta);
// tsc singleton.ts && node singleton.js
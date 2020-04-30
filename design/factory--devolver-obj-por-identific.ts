// #Devolver un objeto dependiendo de un identificador

//IMPORTANT SE COLOCA UNA INTERFAS ENCIMA DE LAS CLASSES PARA QUE LA FABRICA RETORNE 1 U OTRO
interface IConexion {
    //Interfas no necesita public
    conectar():void
    desconectar():void
}


//Instancias
class ConexionMySQL implements IConexion {

    private host:string
    private port:string
    private user:string
    private password:string    

    constructor() {
        this.host = 'localhost'
        this.port = '3306'
        this.user = 'root'
        this.password = '123'    
    }

    public conectar():void{
        console.log('Se conectó a MySQL');
    }
    public desconectar():void{
        console.log('Se desconectó a MySQL');
    }
}
//Instancias
class ConexionOracle implements IConexion {

    private host:string
    private port:string
    private user:string
    private password:string    

    constructor() {
        this.host = 'localhost'
        this.port = '1521'
        this.user = 'admin'
        this.password = '123'    
    }

    public conectar():void{
        console.log('Se conectó a Oracle');
    }
    public desconectar():void{
        console.log('Se desconectó a Oracle');
    }
}
//Instancias
class ConexionSQLServer implements IConexion {

    private host:string
    private port:string
    private user:string
    private password:string    

    constructor() {
        this.host = 'localhost'
        this.port = '1433'
        this.user = 'sqlserver'
        this.password = '123'    
    }

    public conectar():void{
        console.log('Se conectó a SQLServer');
    }
    public desconectar():void{
        console.log('Se desconectó a SQLServer');
    }
}
//Instancias
class ConexionVacia implements IConexion {
    public conectar():void{
        console.log('No se especificó proveedor');
    }
    public desconectar():void{
        console.log('No se especificó proveedor');
    }
}

//Fabrica
class ConexionFabrica {
    
    public getConexion(motor:string): IConexion{
        switch (motor) {
            case 'MYSQL':
                return new ConexionMySQL();
            case 'ORACLE':
                return new ConexionOracle();
            case 'MSSQL':
                return new ConexionSQLServer();
            default:
                return new ConexionVacia();
        }
    }
}

var fabrica:ConexionFabrica = new ConexionFabrica()

var cx1:IConexion = fabrica.getConexion('MYSQL')
cx1.conectar()
cx1.desconectar()
var cx2:IConexion = fabrica.getConexion('ORACLE')
cx2.conectar()
cx2.desconectar()
var cx3:IConexion = fabrica.getConexion('TEST')
cx3.conectar()
cx3.desconectar()
// tsc factory.ts && node factory.js
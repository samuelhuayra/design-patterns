// Fabrica de fabricas
// Fabrica 1 Conexion
interface IConexionDB {
    //Interfas no necesita public
    conectar():void
    desconectar():void
}


//Instancias
class ConexionMySQL implements IConexionDB {

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
class ConexionOracle implements IConexionDB {

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
class ConexionSQLServer implements IConexionDB {

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
class ConexionVacia implements IConexionDB {
    public conectar():void{
        console.log('No se especificó proveedor');
    }
    public desconectar():void{
        console.log('No se especificó proveedor');
    }
}

//Fabrica Conexion
class ConexionDBFabrica implements FabricaAbstracta{
    
    public getDB(motor:string): IConexionDB{
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

    // Vacio porque este hace DB no REST
    public getREST(area: string): IConexionREST {
        return null
    }
}
// Fabrica 2 REST
interface IConexionREST {
    leerURL(url:string):void
}

class ConexionRESTCompras implements IConexionREST {
    
    leerURL(url:string):void{
        console.log('Compras Conectandose a '+url)
    }
}

class ConexionRESTVentas implements IConexionREST {
    
    leerURL(url:string):void{
        console.log('Ventas Conectandose a '+url)
    }
}

class ConexionRESTNoArea implements IConexionREST {
    
    leerURL(url:string):void{
        console.log('AREA NO ELEGIDA')
    }
}

//Fabrica Conexion
class ConexionRESTFabrica implements FabricaAbstracta{

    // Vacio porque este hace REST no DB
    public getDB(motor: string): IConexionDB {
        return null
    }
    
    public getREST(area:string): IConexionREST{
        switch (area) {
            case 'COMPRAS':
                return new ConexionRESTCompras();
            case 'VENTAS':
                return new ConexionRESTVentas();
            default:
                return new ConexionRESTNoArea();
        }
    }
}

// -------Fabrica Abstracta-------
//IMPORTANT SE COLOCA UNA INTERFAS ENCIMA DE LAS FABRICAS PARA QUE RETORNE 1 U OTRO
interface FabricaAbstracta{
    getDB(motor:string):IConexionDB
    getREST(area:string):IConexionREST
}

class FabricaProductor {
    public static getFactory(tipoFabrica:string):FabricaAbstracta{
        switch (tipoFabrica) {
            case 'DB':
                return new ConexionDBFabrica();
            case 'REST':
                return new ConexionRESTFabrica();
            default:
                return null
        }
    }
}


// main
var fabricaDB:FabricaAbstracta = FabricaProductor.getFactory('DB')
var cxBD1:IConexionDB = fabricaDB.getDB('MYSQL')
cxBD1.conectar()

var fabricaREST:FabricaAbstracta = FabricaProductor.getFactory('REST')
var cxREST1:IConexionREST = fabricaREST.getREST('COMPRAS')
cxREST1.leerURL('http://localhos:8080')

//tsc abstract-factory.ts && node abstract-factory.js
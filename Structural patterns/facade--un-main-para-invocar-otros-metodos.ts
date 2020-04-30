class AvionAPI {
    public buscarVuelos(fechaIda:string,fechaVuelta:string,origen:string,destino:string){
        console.log('==============================================');
        console.log(`Vuelos encontrados para ${destino} desde ${origen}`);
        console.log(`Fecha IDA: ${fechaIda} Fecha vuelta: ${fechaVuelta}`);
        console.log('==============================================');
    }
}

class HotelAPI {
    public buscarHoteles(fechaIda:string,fechaVuelta:string){
        console.log('==============================================');
        console.log('Hoteles encontrados');
        console.log(`Entrada: ${fechaIda} Salida: ${fechaVuelta}`);
        console.log('A');
        console.log('B');
        console.log('C');
        console.log('==============================================');
    }
}

// Fachada
// IMPORTANTE INVOCA A LOS METODOS DE LAS OTRAS CLASES
class CheckFacade {
    private avionAPI: AvionAPI
    private hotelAPI: HotelAPI
 
    constructor() {
        this.avionAPI = new AvionAPI()
        this.hotelAPI = new HotelAPI()
    }

    buscar(fechaIda:string,fechaVuelta:string,origen:string,destino:string){
        this.avionAPI.buscarVuelos(fechaIda,fechaVuelta,origen,destino)
        this.hotelAPI.buscarHoteles(fechaIda,fechaVuelta)
    }
}

var cliente1:CheckFacade = new CheckFacade()
cliente1.buscar('02/07/2020','02/07/2020','Bolivia','Cancún')
var cliente2:CheckFacade = new CheckFacade()
cliente2.buscar('02/07/2020','02/07/2020','Bolivia','Quito')
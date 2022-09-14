/* tasas de cambio a peso chileno */

class Divisa{
    constructor(nombre, valor){
        this.nombre = nombre.toUpperCase();
        this.valor = parseFloat(valor);
    }
}
 
const divisas = [];
divisas.push(new Divisa("Dolares US", 882.51));
divisas.push(new Divisa("Euros", 882.35));
divisas.push(new Divisa("Pesos Mexicanos", 44.06));
divisas.push(new Divisa("Pesos Argentinos", 6.38));
divisas.push(new Divisa("Pesos Colombianos", 0.20));
divisas.push(new Divisa("Soles Peruanos", 230.29));

/* funcion para calcular precio en pesos chilenos */
const precioClp = (cambio, cantidad) => {
    let precio = cambio*cantidad;
    return precio;
}

/* funcion para calcular precio en otras divisas */
const precioDiv = (divCom, divPag, cantidad) => {
    let precio = (cantidad*divCom)/divPag;
    return precio;
}

/*divisa que desea comprar */
let divisacom = prompt(`Por favor seleccione la divisa que desea adquirir: 1-${divisas[0].nombre} / 2-${divisas[1].nombre} / 3-${divisas[2].nombre} / 4-${divisas[3].nombre} / 5-${divisas[4].nombre} / 6-${divisas[5].nombre}`);
divisacom = parseInt(divisacom);
switch (divisacom) {
    case 1:
        divisacom = divisas[0];      
        break;

    case 2:
        divisacom = divisas[1];      
        break;

    case 3:
        divisacom = divisas[2];      
        break;    
    
    case 4:
        divisacom = divisas[3];      
        break; 
        
    case 5:
        divisacom = divisas[4];      
        break;   
        
    case 6:
        divisacom = divisas[5];      
        break;

    default:
        alert("La opcion seleccionada es invalida")
        break;
}

/* cantidad a comprar */
let cantidad = prompt("Ingrese la cantidad que desea comprar: ");

/* divica con la que va a pagar y costo */
let divisapag = prompt("Por favor seleccione la divisa con la que paga: 1-Peso CLP / 2-Dolar US / 3-Euro / 4-Peso Mex / 5-Peso Arg / 6-Peso Col / 7-Sol");
divisapag = parseInt(divisapag);
switch (divisapag) {
    
    case 1:
        costo = precioClp(divisacom.valor, cantidad);
        alert (`Por la compra de ${cantidad} ${divisacom.nombre} debe pagar ${costo} PESOS CHILENOS.`);
        break;
    
    case 2:
        divisapag = divisas[0]; 
        costo = precioDiv(divisacom.valor, divisapag.valor ,cantidad);
        alert (`Por la compra de ${cantidad} ${divisacom.nombre} debe pagar ${costo} ${divisapag.nombre}`);   
        break;

    case 3:
        divisapag = divisas[1]; 
        costo = precioDiv(divisacom.valor, divisapag.valor ,cantidad);
        alert (`Por la compra de ${cantidad} ${divisacom.nombre} debe pagar ${costo} ${divisapag.nombre}`);      
        break;

    case 4:
        divisapag = divisas[2];
        costo = precioDiv(divisacom.valor, divisapag.valor ,cantidad);
        alert (`Por la compra de ${cantidad} ${divisacom.nombre} debe pagar ${costo} ${divisapag.nombre}`);      
        break;    
    
    case 5:
        divisapag = divisas[3]; 
        costo = precioDiv(divisacom.valor, divisapag.valor ,cantidad);
        alert (`Por la compra de ${cantidad} ${divisacom.nombre} debe pagar ${costo} ${divisapag.nombre}`);      
        break; 
        
    case 6:
        divisapag = divisas[4];
        costo = precioDiv(divisacom.valor, divisapag.valor ,cantidad);
        alert (`Por la compra de ${cantidad} ${divisacom.nombre} debe pagar ${costo} ${divisapag.nombre}`);        
        break;   
        
    case 7:
        divisapag = divisas[5];    
        costo = precioDiv(divisacom.valor, divisapag.valor ,cantidad);
        alert (`Por la compra de ${cantidad} ${divisacom.nombre} debe pagar ${costo} ${divisapag.nombre}`); 
        break;

    default:
        alert("La opcion seleccionada es invalida")
        break;
}

let parrafo = document.createElement("h2");
parrafo.innerHTML = `Por la compra de ${cantidad} ${divisacom.nombre} debe pagar ${costo} ${divisapag.nombre}`;
document.body.append(parrafo);
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
divisas.push(new Divisa("pesos Chilenos", 1));

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
let divisacom;
let divisaComp = document.getElementById("divisaCompra");
divisaComp.addEventListener('input', () => {
    divisacom = parseInt(divisaComp.value);
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

        case 7:
            divisacom = divisas[6];      
            break;    
    
        default:
            break;
    }
})

/* cantidad a comprar */
let cantidad;
let cantidadCom = document.getElementById("cantidadCompra");
cantidadCom.addEventListener('input', () => {
    cantidad = parseInt(cantidadCom.value);
    localStorage.setItem('can', cantidadCom.value);
})


/* divisa con la que va a pagar y costo */
let costo;
let divisapag;
let divisaPaga = document.getElementById("divisaPaga");
divisaPaga.addEventListener('input', () => {
    divisapag = parseInt (divisaPaga.value); 
    switch (divisapag) {
    
        case 1:
            divisapag = divisas[6];
            costo = precioClp(divisacom.valor, cantidad);
            break;
        
        case 2:
            divisapag = divisas[0]; 
            costo = precioDiv(divisacom.valor, divisapag.valor ,cantidad);  
            break;
    
        case 3:
            divisapag = divisas[1]; 
            costo = precioDiv(divisacom.valor, divisapag.valor ,cantidad); 
            break;
    
        case 4:
            divisapag = divisas[2];
            costo = precioDiv(divisacom.valor, divisapag.valor ,cantidad); 
            break;    
        
        case 5:
            divisapag = divisas[3]; 
            costo = precioDiv(divisacom.valor, divisapag.valor ,cantidad);
            break; 
            
        case 6:
            divisapag = divisas[4];
            costo = precioDiv(divisacom.valor, divisapag.valor ,cantidad);  
            break;   
            
        case 7:
            divisapag = divisas[5];    
            costo = precioDiv(divisacom.valor, divisapag.valor ,cantidad);
            break;
    
        default:
            break;
    }
})

/* let transa = document.getElementById("transaccion"); */
let botonEnv = document.getElementById("enviar");
botonEnv.addEventListener("click", respuesta);
/* let botonConf = document.getElementById("confirmar");
botonEnv.addEventListener("click", finTransaccion); */

function respuesta() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de realizar la transacción?',
        text: `Por la compra de ${cantidad} ${divisacom.nombre} debe pagar ${costo} ${divisapag.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, realizar transacción!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Felicitaciones!',
            'La transacción se realizo exitosamente.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelada',
            'La transacción fue cancelada',
            'error'
          )
        }
      })
    /* transa.innerText = `Por la compra de ${cantidad} ${divisacom.nombre} debe pagar ${costo} ${divisapag.nombre}`;
    document.body.append(parrafo); */
}

/* function finTransaccion() {

} */
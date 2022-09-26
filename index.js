/* tasas de cambio a peso chileno */

class Divisa{
    constructor(nombre, valor){
        this.nombre = nombre.toUpperCase();
        this.valor = parseFloat(valor);
    }
}
 
class Transaccion{
    constructor(id, cantidad, divisaCompra, valor, divisaPaga){
        this.id = id;
        this.cantidad = cantidad;
        this.divisaCompra = divisaCompra;
        this.valor = valor;
        this.divisaPaga = divisaPaga;
    }
}
let idTransaccion = 0;
const divisas = [];
const transacciones = [];

const contenedorWallet = document.querySelector("#items");
const contenedorFooterWatller = document.querySelector("#footer")

divisas.push(new Divisa("Dolares US", 882.51));
divisas.push(new Divisa("Euros", 882.35));
divisas.push(new Divisa("Pesos Mexicanos", 44.06));
divisas.push(new Divisa("Pesos Argentinos", 6.38));
divisas.push(new Divisa("Pesos Colombianos", 0.20));
divisas.push(new Divisa("Soles Peruanos", 230.29));
divisas.push(new Divisa("pesos Chilenos", 1));

const actualizarWallet = () => {
    contenedorWallet.innerHTML = "";
    transacciones.forEach(
        (elemento) => {
            let filaWallet = document.createElement("tr");
            filaWallet.innerHTML = `
                <td>${elemento.id}</td>
                <td>${elemento.cantidad}</td>
                <td>${elemento.divisaCompra}</td>
                <td>${elemento.valor}</td>
                <td>${elemento.divisaPaga}</td>
            `;
            contenedorWallet.append(filaWallet);
        }
    );
    transacciones == 0 ? contenedorFooterWatller.innerHTML = `<th scope="row" colspan="6">No has realizado ninguna transacción!</th>` : contenedorFooterWatller.innerHTML = `<th scope="row" colspan="6">Total de transacciones: ${idTransaccion}</th>`;
}

const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor)};
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

let botonEnv = document.getElementById("enviar");
botonEnv.addEventListener("click", respuesta);

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
            idTransaccion ++;
            transacciones.push(new Transaccion(idTransaccion ,cantidad, divisacom.nombre, costo, divisapag.nombre));
            actualizarWallet();
            guardarLocal("ListaTnsansacciones", JSON.stringify(transacciones));
          swalWithBootstrapButtons.fire(
            'Felicitaciones!',
            'La transacción se realizo exitosamente.',
            'success'
          )
            const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
            const modalToggle = document.getElementById('toggleMyModal'); 
            myModal.show(modalToggle);
            console.log(transacciones[0]);
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
}

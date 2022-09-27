let botonEnv = document.getElementById("btn_submit");
botonEnv.addEventListener("click", enviarCorreo);

function enviarCorreo() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })   
      swalWithBootstrapButtons.fire({
        title: 'Enviar?',
        text: `Está seguro de enviar el mensaje?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, enviar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Enviado!',
            'Mensaje enviado.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Se cancelo el envío del mensaje.',
            'error'
          )
        }
      })
}
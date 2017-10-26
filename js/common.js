$(document).ready(function(){
  $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens,
    });
  $('.center').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
  $('.parallax').parallax();
    window.onload = function() {
      animateprogress("#html5",91);
      animateprogress("#bbt",86);
      animateprogress("#css",86);
      animateprogress("#wd",52);
      animateprogress("#javascript",32);
      animateprogress("#ang",26);
      animateprogress("#qa",62);
      animateprogress("#c",30);
    }

  document.querySelector ("#boton").addEventListener ("click", function() {
    animateprogress("#html5",91);
    animateprogress("#bbt",86);
    animateprogress("#css",86);
    animateprogress("#wd",52);
    animateprogress("#javascript",32);
    animateprogress("#ang",26);
    animateprogress("#qa",62);
    animateprogress("#c",30);
  });
  function animateprogress (id, val){


    var getRequestAnimationFrame = function () {  /* <------- Declaro getRequestAnimationFrame intentando obtener la máxima compatibilidad con todos los navegadores */
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function ( callback ){
            window.setTimeout(enroute, 1 / 60 * 1000);
        };

    };

    var fpAnimationFrame = getRequestAnimationFrame();   /* <--- Declaro una instancia de getRequestAnimationFrame para llamar a la función animación */
    var i = 0;
    var animacion = function () {

    if (i<=val)
        {
            document.querySelector(id).setAttribute("value",i);      /* <----  Incremento el valor de la barra de progreso */
            document.querySelector(id+"+ span").innerHTML = i+"%";     /* <---- Incremento el porcentaje y lo muestro en la etiqueta span */
            i++;
            fpAnimationFrame(animacion);          /* <------------------ Mientras que el contador no llega al porcentaje fijado la función vuelve a llamarse con fpAnimationFrame     */
        }

    }

        fpAnimationFrame(animacion);   /*  <---- Llamo la función animación por primera vez usando fpAnimationFrame para que se ejecute a 60fps  */
  }

  $('#contactForm').on('submit', function(e){
  e.preventDefault();
  var $this = $(this),
    data = $(this).serialize(),
    name = $this.find('#contact_name'),
    email = $this.find('#email'),
    message = $this.find('#textarea1'),
    loader = $this.find('.form-loader-area'),
    submitBtn = $this.find('button, input[type="submit"]');

  loader.show();
  submitBtn.attr('disabled', 'disabled');

  function success(response) {
    swal("Gracias!", "¡Tu mensaje ha sido enviado exitosamente!", "success");
    $this.find("input, textarea").val("");
  }

  function error(response) {
    $this.find('input.invalid, textarea.invalid').removeClass('invalid');
    if ( response.name ) {
      name.removeClass('valid').addClass('invalid');
    }

    if ( response.email ) {
      email.removeClass('valid').addClass('invalid');
    }

    if ( response.message ) {
      message.removeClass('valid').addClass('invalid');
    }
  }

  $.ajax({
    type: "POST",
    url: "inc/sendEmail.php",
    data: data
  }).done(function(res){

    var response = JSON.parse(res);
    console.log(response);
    if ( response.OK ) {
      success(response);
    } else {
      error(response);
    }


    var hand = setTimeout(function(){
      loader.hide();
      submitBtn.removeAttr('disabled');
      clearTimeout(hand);
    }, 1000);

  }).fail(function(){
    sweetAlert("Oops...", "Algo salió mal, ¡Vuelva a intentarlo!", "error");
    var hand = setTimeout(function(){
      loader.hide();
      submitBtn.removeAttr('disabled');
      clearTimeout(hand);
    }, 1000);
  });
});


});

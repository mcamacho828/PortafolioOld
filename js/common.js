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
    animateprogress("#php",72);
    animateprogress("#css",86);
    animateprogress("#python",52);
    animateprogress("#javascript",79);
    animateprogress("#nodejs",36);
  }
  document.querySelector ("#boton").addEventListener ("click", function() {
    animateprogress("#html5",91);
    animateprogress("#php",72);
    animateprogress("#css",86);
    animateprogress("#python",52);
    animateprogress("#javascript",79);
    animateprogress("#nodejs",36);
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
});

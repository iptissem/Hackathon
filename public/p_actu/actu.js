$(document).ready(function(){
    $('#number').click(function(){ /*1*/
      var nombre=$('#number').text(); /*2*/
      var nombreplus1=parseInt(nombre)+1; /*3*/
       $('#number').html(nombreplus1); /*4*/
    });
  });


// cuando carga la página llamamos a la primera función.
$(document).ready(cambiarColor)

function cambiarColor()
{//seleccionamos la clase del estilo título
  $(".main-titulo").animate(
    {//con animate accedemos a la propiedad color del texto
      color: "#FFFFFF"        
    }, 1000,function()//se ejecuta en 1 segundo y llama 
    {//a la función que vuelve al color anterior
      $(".main-titulo").animate(
        {
          color: "#DCFF0E"        
        }, 1000,cambiarColor)
    })
}
function juegoTerminado()
{   
  $(".time").hide()
  $(".panel-tablero").hide("fold",1000,function()
  {
    $(".score").animate(
      {      
        height:"20%",
        width: "400%"  
      },1000, function()
      {
        $(".moves").animate(
          {      
            height:"20%",
            width: "400%"  
          },1000,function()
          {
            $(".buttons").animate(
              {      
                height:"20%",
                width: "400%"  
              },1000,function()
              {
                $(".panel-score").append("<h1 class='main-titulo'>Juego Terminado</h1>")                
              })
          })
      }) 
  })          
}

//definimos un valor para conocer el estado del botón iniciar = 0
var contadorReinicio=0;
$(".btn-reinicio").on("click", function()
{//al hacer click verificamos si esta en Iniciar (0) y determinamos el texto a Reiniciar
  if(contadorReinicio==0)
  {
    $(".btn-reinicio").text("Reiniciar",inicio())    
    cargarImagenes()
    verificarIguales()
    contadorReinicio=1       
  }
  else
  {//al hacer click verificamos si esta en Reiniciar (1) y determinamos el texto a Iniciar (0)
    $(".btn-reinicio").text("Iniciar",reinicio(),vaciarImagenes())    
    contadorclics=0
    document.getElementById("movimientos-text").innerHTML=contadorclics
    contadorReinicio=0    
    contadorpuntos=0
    document.getElementById("score-text").innerHTML=contadorpuntos  
    document.location.reload()
  }  
})
var matriz = []
function cargarImagenes()
{    
  ;

  for (var r = 0; r < 6; r++)
  {
     matriz[r]=[];
     for (var c =0; c< 7; c++) 
     {      
      matriz[r][c]=""
     }
  }
  
  for(var i=1;i<8;i++)
  {    
    namecol=".col-"+i    // se le asigna el nombre de la columna mas i
    for(var j=0;j<6;j++)
    {       
      imagen= Math.floor(Math.random() * (5 - 1)) + 1; //se genera un randómico entre 1 y 4 que son las imagenes existentes
      $(namecol).append("<img src='image/"+imagen+".png'/>").sortable();//añade una nueva imagen            
      matriz[j][i-1]="image/"+imagen+".png"      
    }   
  }  
}
//cuando cualquier hijo es clickeado se evalua que 3 o mas sean iguales
var contadorclics=0
var contadorpuntos=0
$(".panel-tablero").children().on("click", function()
{  
  contadorclics++  
  document.getElementById("movimientos-text").innerHTML=contadorclics
  verificarIguales()
})

function verificarIguales()
{
  var columnaactual
  var columnasiguiente
  var contadoriguales=1 
  var siguiente 
  for(var i=0; i<6; i++)//i es el número de la fila
  {     
    contadoriguales=1
    for(var j=1;j<8;j++)//j es el número de la columna
    { 
      columnaactual=$(".col-"+j).children();  
      siguiente=j+1 
      if(siguiente<8)
      {
        //alert("J= "+j+"I= "+i+"Sig= "+siguiente)
        columnasiguiente=$(".col-"+siguiente).children();   
        if(columnaactual[i].src==columnasiguiente[i].src)
        {     
          contadoriguales++    
          //alert("Contador= "+contadoriguales)          
        }
        else if(contadoriguales>=3)
        {
          eliminarIguales(contadoriguales,j,i)
          contadoriguales=1
        }   
        else
        {
          contadoriguales=1
        }                     
      }
      if(siguiente==8 && contadoriguales>=3)      
      {
        eliminarIguales(contadoriguales,j,i)
      }
    }       
  }
}

function eliminarIguales(cont,varj,vari)
{
  var desde=(varj-cont)+1
  var hasta=varj 
  var fila=vari  
  for(var i=desde;i<=hasta;i++)
  {              
    columnaactual=$(".col-"+i).children();                  
    matriz[fila][i-1]="-"    
    $(columnaactual[vari]).hide( "pulsate",2000,reOrdenar);                  
  }     
  contadorpuntos=contadorpuntos+cont*10
  document.getElementById("score-text").innerHTML=contadorpuntos   
}
function vaciarImagenes()
{
  /*for(var col=1;col<8;col++)
  {     
    $("#col"+col).effect("explode",500);             
  }*/     
  for(var col=1;col<8;col++)
  { 
    $("#col"+col).empty()     
  }       
}

function reOrdenar()
{ 
  for(var col=1;col<8;col++)
  {
    for(var fil=0;fil<6;fil++)
    {
      $("#col"+col).empty()  
      //$("#col"+col).hide( "drop", { direction: "down" }, "slow")  
    }    
  } 
  for(var i=0;i<7;i++)
  {
    for(var j=0;j<6;j++)
    {
      if(matriz[j][i]=="-")
      {
        if(j==0)
        {
          var imagen= Math.floor(Math.random() * (5 - 1)) + 1; //se genera un randómico entre 1 y 4 que son las imagenes existentes        
          matriz[j][i]="image/"+imagen+".png"      
        }
        else
        {
          matriz[j][i]=matriz[j-1][i]
        }        
      }
    }
  }
  for(var i=1;i<8;i++)
  {    
    namecol=".col-"+i    // se le asigna el nombre de la columna mas i
    for(var j=0;j<6;j++)
    {       
      var src=matriz[j][i-1]
      $(namecol).append("<img src='"+src+"'/>").sortable();//añade una nueva imagen                       
    }   
  }    
  
  
}  
/*
var numeroClicks = 0;
function inicioJuego(){
  hideAll();
  bloqueHandler();
  ordenarBloques();
  numeroClicks=0;


}

function primerClick(){
  if(numeroClicks==1){
    return true;
  }else return false;
}
function ultimoClick(){
  if($$('.cuadro').length==2){
    var numMostrados=0;
    $$('.cuadro .contenido').each(function(item){
      if (item.visible()) {
        numMostrados++;
      }
    })
    if (numMostrados==2) {
      return true;
    }else return false;


  }else return false;
}

function bloqueHandler(){
  if ($('activarJuego').getValue()=='on') {

      $('tablero').observe('click', mostrarImg)

  }else{
    $('tablero').stopObserving('click');
    parar();
    reinicio();
    resetCuadros();
  }
}


function hideAll(){
  $$('.contenido').each(function(item){
    item.hide();
    bloqueHandler()
  })
}

function check2Clicks(){
  if (getMostrados().length==2) {
    return true;
  }else return false;
}

function getMostrados(){
  var imgMostradas = new Array()
  var i = 0;
  $$('.contenido').each(function(item, index){
    if(item.visible()){
      imgMostradas[i]=item;
      i++;
    }
  });
  return imgMostradas;
}

function mostrarImg(event){
  var bloqueClickeado = event.findElement();
  numeroClicks++;
  bloqueClickeado.down().show();
  decisionBloques();
  if (primerClick()) {
    inicio();
  }else if (ultimoClick()) {
    parar();

  }
}

function decisionBloques(){
  if (check2Clicks()) {
    $('tablero').stopObserving('click');
    if (matchSeleccionados()) {
      exitoMatch.delay(1);
    }else {
      hideAll.delay(1);
    }
  }
}

function matchSeleccionados(){
  var seleccionados = getMostrados();
  if (seleccionados[0].readAttribute('src')==seleccionados[1].readAttribute('src')) {
    return true;
  }else return false;
}

function exitoMatch(){
  var seleccionados = getMostrados();
  seleccionados.each(function(item){
    item.hide();
    item.up().removeClassName('cuadro');
    item.up().addClassName('cuadroExito');
  })
  bloqueHandler()
}

function resetCuadros(){
  $$('.contenido').each(function(item){
    item.up().addClassName('cuadro');
    item.up().removeClassName('cuadroExito');

  })
}

function ordenarBloques(){
  $$('.cuadro').each(function(item){
    item.setStyle({order: makeUniqueRandom()})
  })
}
var uniqueRandoms = [];
var numRandoms = 20;
function makeUniqueRandom() {
    // refill the array if needed
    if (!uniqueRandoms.length) {
        for (var i = 0; i < numRandoms; i++) {
            uniqueRandoms.push(i);
        }
    }
    var index = Math.floor(Math.random() * uniqueRandoms.length);
    var val = uniqueRandoms[index];

    // now remove that value from the array
    uniqueRandoms.splice(index, 1);

    return val;

}




document.observe("dom:loaded", function(){
  inicioJuego();
  $('activarJuego').observe('change', inicioJuego);




})
*/
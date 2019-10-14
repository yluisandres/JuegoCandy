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
    guardarMatriz()  
    verificarIguales()
    verificarIgualesVertical()
    evaluarTodo()
    contadorReinicio=1       
  }
  else
  {//al hacer click verificamos si esta en Reiniciar (1) y determinamos el texto a Iniciar (0)
    $(".btn-reinicio").text("Iniciar",reinicio())    
    contadorclics=0
    document.getElementById("movimientos-text").innerHTML=contadorclics
    contadorReinicio=0    
    contadorpuntos=0
    document.getElementById("score-text").innerHTML=contadorpuntos  
    document.location.reload()
  }  
})
var matriz = []
function definirMatriz()
{
  for (var r = 0; r < 6; r++)
  {
     matriz[r]=[];
     for (var c =0; c< 7; c++) 
     {      
      matriz[r][c]=""
     }
  }
}
function cargarImagenes()
{     
  definirMatriz()
  for(var i=1;i<8;i++)
  {    
    namecol=".col-"+i    // se le asigna el nombre de la columna mas i
    for(var j=0;j<6;j++)
    {       
      var imagen= Math.floor(Math.random() * (5 - 1)) + 1; //se genera un randómico entre 1 y 4 que son las imagenes existentes
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
  guardarMatriz()  
  verificarIguales()
  verificarIgualesVertical()
  var fila=""
  for(var i=0;i<6;i++)//i es fila
  {
    
    for(var j=1;j<8;j++)//j es columna
    {   
      var columnaact=$(".col-"+j).children();
      fila=fila+"//"+matriz[i][j-1]   
      
      if(matriz[i][j-1]=="-")//buscamos si existen campos vacios en la matriz y si los iguales parten de la fila 0
      {                     
        $(columnaact[i]).hide("pulsate",4000,reOrdenar)        
      }                 
    }                 
    fila=fila+"\n"
  }
  guardarMatriz()
  verificarIguales()
  verificarIgualesVertical()
})

function evaluarTodo()
{
  var fila=""
  for(var i=0;i<6;i++)//i es fila
  {
    
    for(var j=1;j<8;j++)//j es columna
    {   
      var columnaact=$(".col-"+j).children();
      fila=fila+"//"+matriz[i][j-1]   
      
      if(matriz[i][j-1]=="-")//buscamos si existen campos vacios en la matriz y si los iguales parten de la fila 0
      {                     
        $(columnaact[i]).hide("pulsate",4000,reOrdenar)        
      }                 
    }                 
    fila=fila+"\n"
  }
    
  verificarIguales()
  verificarIgualesVertical()
  
}

function guardarMatriz()
{   
  for(var i=1;i<8;i++)
  {    
    var columnaact=$(".col-"+i).children();      
    for(var j=0;j<6;j++)
    {      
      var sourceactual=columnaact[j].src      
      var srcreal=sourceactual.substring(sourceactual.length-11,sourceactual.length)
      matriz[j][i-1]=srcreal
    }   
  }   
}

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
  for(var i=desde;i<=hasta;i++)
  {              
    var columnaactual=$(".col-"+i).children();                  
    matriz[vari][i-1]="-"    
    //$(columnaactual[vari]).hide( "pulsate",2000,reOrdenar)                  
  }       
  contadorpuntos=contadorpuntos+cont*10
  document.getElementById("score-text").innerHTML=contadorpuntos     
}
function verificarIgualesVertical()
{
  var columnaactual  
  var contadoriguales=1 
  var siguiente 
  for(var i=1; i<8; i++)//i es el número de la columna
  {     
    contadoriguales=1
    columnaactual=$(".col-"+i).children();  
    for(var j=0;j<6;j++)//j es el número de la fila
    {       
      siguiente=j+1 
      if(siguiente<6)
      {        
        if(columnaactual[j].src==columnaactual[siguiente].src)
        {     
          contadoriguales++    
//          alert("Contador= "+contadoriguales+" Fila "+j+" Columna "+i)          
        }
        else if(contadoriguales>=3)
        {
          eliminarIgualesVertical(contadoriguales,i,j)
          contadoriguales=1
        }   
        else
        {
          contadoriguales=1
        }                     
      }
      if(siguiente==6 && contadoriguales>=3)      
      {
        eliminarIgualesVertical(contadoriguales,i,j)
      }
    }       
  }
}
function eliminarIgualesVertical(cont,vari,varj)
{//vari es columna varj es fila
  var desde=(varj-cont)+1
  var hasta=varj    
  //var columnaactual=$(".col-"+vari).children();                    
  for(var k=desde;k<=hasta;k++)
  {                  
    matriz[k][vari-1]="-"    
    //$(columnaactual[i]).hide( "pulsate",2000,reOrdenarVerticales)                  
  }       
  contadorpuntos=contadorpuntos+cont*10
  document.getElementById("score-text").innerHTML=contadorpuntos       
}

function reOrdenar()
{ 
  for(var col=1;col<8;col++)
  {
    $("#col"+col).empty() //vaciamos todos los elementos que se encuentran en las columnas           
  } 
  //alert(matriz)
  
  for(var i=0;i<7;i++)//i es columna
  {
    for(var j=0;j<6;j++)//j es fila
    {
      var imagen= Math.floor(Math.random() * (5 - 1)) + 1; //se genera un randómico entre 1 y 4 que son las imagenes existentes        
      if(matriz[j][i]=="-" && j==0)//buscamos si existen campos vacios en la matriz y si los iguales parten de la fila 0
      {                 
        matriz[j][i]="image/"+imagen+".png"         
      }
      else if(matriz[j][i]=="-")
      {        
        for(var k=j;k>0;k--)
        {
          matriz[k][i]=matriz[k-1][i]        
        }            
        matriz[0][i]="image/"+imagen+".png"      
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
  guardarMatriz()
  //verificarIgualesVertical()
}




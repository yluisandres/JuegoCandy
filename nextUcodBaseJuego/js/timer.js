
var segundos = 60;
var minutos = 1;
var control;

function inicio () 
{	
	control = setInterval(cronometro,1000);
}
function parar () 
{
	clearInterval(control);
	timer.innerHTML = minutos+":"+segundos
}
function reinicio () 
{
	clearInterval(control);	
	segundos = 0
	minutos = 2	
	timer.innerHTML = "2:00"	
}
function cronometro () 
{		
	if (segundos == 0) 
	{
		if(minutos>0)
		{
			minutos--
			segundos=60
			timer.innerHTML = "2:00"	
		}	
		else
		{			
			parar()
			juegoTerminado()
			timer.innerHTML = "2:00"
		}
	}	
	segundos--	
	timer.innerHTML = minutos+":"+segundos	
}

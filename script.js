
$('#calcular').click(simulador);

$('#myForm').submit(guardarDatos);

$('#inputDni').change(controlarDato);

$('#numberMonto.monto').focus(limpiar);

$('#inputName').focus(limpiar).keypress(verificarTeclas);
$('#inputLastName').focus(limpiar).keypress(verificarTeclas);
$('#inputDni').focus(limpiar);
$('#inputEmail').focus(limpiar);
$('#inputAddress').focus(limpiar);
$('#inputCity').focus(mostrarProvincias).focus(limpiarLocalidad).focus(limpiar);
$('#inputCity2').focus(mostrarLocalidad).focus(limpiar);
$('#inputCp').focus(limpiar);

var datos = localStorage.getItem('solicitante');

var datosParse = JSON.parse(datos);

var datoDni = datosParse.dni;

function simulador(){
borrar();
	var moneda = $('.moneda:checked').val();
		if(moneda==undefined){
			if($('#selecMsj1').length==0){
			noSeleccion1();
			}
		}
	
	var monto = $('.monto').val();
	monto = monto.replace('.','');
	monto = monto.replace(',','');
	console.log(monto)
	monto = parseInt(monto);
	if(isNaN(monto) || monto < 100){
		msjeError()
	$('#mensaje').hide();

};

var cuotas = $('.cuotas:checked').val();
if(cuotas==undefined){
	if($('#selecMsj2').length==0){
		noSeleccion2();
	}
};
	var valorCuota = valorDeCuota(cuotas,monto);

if(moneda!=undefined && Number.isInteger(monto) && cuotas!=undefined){
	var prestamo = new Object();
	prestamo.moneda = moneda;
	prestamo.monto = monto;
	prestamo.cuotas = cuotas;
	prestamo.valorCuota = valorCuota

	$('#mensaje').text('Usted solicito un prestamo de $'+ prestamo.monto + ' en ' + prestamo.moneda + ' a pagar en '+ prestamo.cuotas + ' cuotas de $' +prestamo.valorCuota + ' cada una').show();	
		}
	
}

function valorDeCuota(valor1, valor2){
			if(valor1 == 6){
				return parseInt((valor2 * 1.5) / 6);
			}
			else if(valor1 == 12){
				return parseInt((valor2 * 2) / 12);
			}
			else if(valor1 == 24){
				return parseInt((valor2 * 2.5) / 24);
			}
			else if(valor1 == 36){
				return parseInt((valor2 * 3) / 36);
			}
			else if(valor1 == 48){
				return parseInt((valor2 * 3.5) / 48);
			}
		}

function guardarDatos(evento){
borrar();
evento.preventDefault();
	var nombre = $('#inputName').val();
		if(nombre.length == 0) {
			error1();
			$('#inputName').css('background-color','F99090')
		return ;}
	var apellido = $('#inputLastName').val();
		if(apellido.length == 0) {
			error1();
			$('#inputLastName').css('background-color','F99090')
	 	return ;}
	var dni = $('#inputDni').val();
		if(dni.length !==8) {
			error2();
			$('#inputDni').css('background-color','F99090')	
		return;}
	var email = $('#inputEmail').val();
		if(email.length == 0) {
			error3();
			$('#inputEmail').css('background-color','F99090')
	 	return ;}
	var domicilio = $('#inputAddress').val();
		if(domicilio.length == 0) {
			error4();
			$('#inputAddress').css('background-color','F99090')			
	 	return ;}
	var provincia = $('#inputCity').val();
		if(provincia.length == 0) {
			error5();
			$('#inputCity').css('background-color','F99090')
		return ;}
		
	var localidad = $('#inputCity2').val();
		if(localidad.length == 0) {
			error5();
			$('#inputCity2').css('background-color','F99090')
		return ;}
		
	var codigoPost = $('#inputCp').val();
		if(codigoPost.length == 0) {
			error5();
			$('#inputCp').css('background-color','F99090')
	 	return ;}

			var solicitante = { 
				nombre:nombre,
				apellido:apellido,
				dni:dni,
				mail:email,
				domicilio:domicilio,
				provincia:provincia,
				localidad:localidad,
				codigoPost:codigoPost
			}
this.submit();			
localStorage.setItem('solicitante', JSON.stringify(solicitante));
};

function controlarDato(){
		if(this.value == datoDni){
		mostrarRespuestas();
		}
	}


function mostrarRespuestas(){
			$('#inputEmail').val(datosParse.mail); 
			$('#inputAddress').val(datosParse.domicilio);  
}

function limpiar(){
	$('#numberMonto.monto').val('');
	$(this).val('').css('background-color',
'FFFFFF');
}
function msjeError(){
	if($('#msje').length ==0){
		var h6 = document.createElement('h6')
		h6.id = 'msje'
		var msje = document.createTextNode('Por favor complete los campos correctamente');
		h6.appendChild(msje)
		$('#msjValidacion').append(h6).show()
		$('h6').css('color','red');}
}

function noSeleccion1(){
	var msjeNoSeleccion = document.createElement('h6')
	msjeNoSeleccion.id = 'selecMsj1'; 
	var selecMsje1 = document.createTextNode('Por favor seleccione un campo');
	msjeNoSeleccion.appendChild(selecMsje1)
	$('.msjUndefined').append(msjeNoSeleccion)
	$('.msjUndefined').css('color','red').show();
}
function noSeleccion2(){
	var msjeNoSeleccion2 = document.createElement('h6')
	msjeNoSeleccion2.id = 'selecMsj2'; 
	var selecMsje2 = document.createTextNode('Por favor seleccione un campo');
	msjeNoSeleccion2.appendChild(selecMsje2)
	$('.msjUndefined2').append(msjeNoSeleccion2)
	$('.msjUndefined2').css('color','red').show();
}
function borrar(){
	$('#selecMsj1').remove();
	$('#selecMsj2').remove();
	$('#msje').remove();
	$('#error1').remove();
	$('#error2').remove();
	$('#error3').remove();
	$('#error4').remove();
	$('#error5').remove();
}

function error1(){
	if($('#error1').length == 0){
	var error1 = document.createElement('h6')
	error1.id = 'error1'; 
	var msjeError1 = document.createTextNode('Nombre No aceptado');
	error1.appendChild(msjeError1)
	$('#nombreError').append(error1)
	$('#nombreError').css('color','red').show();}
}
function error2(){
	if($('#error2').length == 0){
	var error2 = document.createElement('h6')
	error2.id = 'error2'; 
	var msjeError2 = document.createTextNode
('Complete de forma correcta');
	error2.appendChild(msjeError2)
	$('#dniError').append(error2)
	$('#dniError').css('color','red').show();
	}
}
function error3(){
	if($('#error3').length == 0){
	var error3 = document.createElement('h6')
	error3.id = 'error3'; 
	var msjeError3 = document.createTextNode
('Valor No aceptado');
	error3.appendChild(msjeError3)
	$('#emailError').append(error3)
	$('#emailError').css('color','red').show();
	}
}
function error4(){
	if($('#error4').length == 0){
	var error4 = document.createElement('h6')
	error4.id = 'error4'; 
	var msjeError4 = document.createTextNode
('Valor No aceptado');
	error4.appendChild(msjeError4)
	$('#domicilioError').append(error4)
	$('#domicilioError').css('color','red').show();
	}
}
function error5(){
	if($('#error5').length ==0){
	var error5 = document.createElement('h6')
	error5.id = 'error5'; 
	var msjeError5 = document.createTextNode
('Complete de forma correcta');
	error5.appendChild(msjeError5)
	$('#domicilio2Error').append(error5)
	$('#domicilio2Error').css('color','red').show();
	}
}
function limpiarLocalidad(){
	$('#inputCity2').children('#nodoLocalidad').remove()
}
function verificarTeclas(e){
	if(e.which >= 47 && e.which<=58 ){
	return false;}	
}
function mostrarProvincias(){

	$.ajax({
		url:"https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre",
		type: "GET",
		dataType: "json"
	}).done (function(respuestaJson){
		if($('#nodoProvincias').length ==0){
			for(var i= 0; i< respuestaJson.provincias.length; i++){
				console.log(respuestaJson);
				var nodo= document.createElement('option')
				nodo.id='nodoProvincias'
				var txt = document.createTextNode((respuestaJson.provincias[i].nombre))
				nodo.appendChild(txt);
				$('#inputCity').append(nodo)
		}
	}
	}).fail (function(xhr, status, error){

		console.log(xhr)
		console.log(status)
		console.log(error)
	})
}
function mostrarLocalidad(){

	var provincia= $('#inputCity').val();
		$.ajax({
			url:"https://apis.datos.gob.ar/georef/api/municipios?provincia="
		+provincia+"&campos=id,nombre&max=100",
			type: "GET",
			dataType: "json"
		}).done (function(respuestaJson){
			var nodo= document.createElement('option')
			nodo.id='nodoLocalidad';
			var txt = document.createTextNode((provincia));
			nodo.appendChild(txt);
			$('#inputCity2').append(nodo)
			
			for(var i= 0; i< respuestaJson.municipios.length; i++){
			var nodo= document.createElement('option')
			nodo.id='nodoLocalidad';
			var txt = document.createTextNode((respuestaJson.municipios[i].
			nombre));
			nodo.appendChild(txt);
			$('#inputCity2').append(nodo)}
	
		}).fail (function(xhr, status, error){
			console.log(xhr)
			console.log(status)
			console.log(error)
		})
}



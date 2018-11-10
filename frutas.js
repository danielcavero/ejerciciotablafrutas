document.addEventListener('DOMContentLoaded', init);
function init(){
    setTimeout(function (){alert('OFERTA DEL MES')},3000);
    var valorTotalCompra = 0;
    let frutas = document.getElementsByClassName('fpeque');

    for (let index = 0; index < frutas.length; index++) {
        //establecemos un evento para cada elemento de la tabla
        frutas[index].ondblclick = function () {                     
            
            //en cada elemento buscamos donde estan los datos
            var id = frutas[index].getElementsByTagName('span');
            var fruta = id[0].textContent;//fruta nombre
            var precio = id[1].textContent;//precio fruta
            //colocamos los valores en los campos de la factura. 
            var ref = document.getElementById('ref').value=fruta;            
            var precio = document.getElementById('precio').value=precio;
            //buscamos cada ruta del elemento para mostrar la foto.
            var foto = document.getElementsByClassName('peque')[index].src;            
            //metodo para mostrar la foto, la ruta como argumento. 
            ponerfoto(foto);           
            
        }  
        
    }    
    function ponerfoto(foto){
        // vemos si existe ya una foto anterior y la eliminamos 
        if (document.getElementById('copia')){
            document.getElementById('ffac').removeChild(document.getElementById('copia'));
        }
        //creamos un elemento img
        var img = document.createElement('img');
        //le asignamos un atributo y su valor id=copia
        img.setAttribute('id','copia');
        //lo añadimos al elemento contenedor y le damos la direccion de la foto, pasada
        //como argumento en la funcion. 
        document.getElementById('ffac').appendChild(img).setAttribute('src', foto );
    }

    // creamos los eventos para grabar y cancelar 
    var btngrabar = document.getElementById('grabar');
    btngrabar.addEventListener('click', grabar);

    function grabar(){
        if(document.getElementById('ref').value.length>0){
            if(document.getElementById('dni').value && document.getElementById('cantidad').value){
                var cantidad = document.getElementById('cantidad').value;
                var dni = document.getElementById('dni').value;
                var dnicorrecto = nif(dni);
                if (dnicorrecto){
                   // alert('dni valido');
                    if(isNaN(cantidad)){
                        alert('cantidad erronea');      
                    }
                    else
                    {   //todo correcto realizamos acciones. crear linea de compra                   
                        
                        var tr = document.createElement('tr'); //creacion de la linea                        
                        var td1 = document.createElement('td');//contenido 1 celda
                        td1.innerText=document.getElementById('dni').value;
                        var td2 = document.createElement('td');//contenido 2 celda
                        td2.innerText=document.getElementById('ref').value;
                        var td3 = document.createElement('td');//contenido 3 celda
                        td3.innerText=document.getElementById('precio').value;
                        var td4 = document.createElement('td');//contenido 4 celda
                        td4.innerText=document.getElementById('cantidad').value;
                        var td5 = document.createElement('td');//contenido 5 celda
                        td5.innerText=parseInt(td3.innerText*td4.innerText);

                        valorTotalCompra+=parseInt(td5.innerText); //acumulador del total 

                        var botonBorrar = document.createElement('button');// creacion del boton de borrado de la linea              
                        botonBorrar.innerText='BORRAR';                        
                        botonBorrar.addEventListener('click', function(){                                                        
                            tr.remove(td1);  
                            valorTotalCompra-=parseInt(td5.innerText);
                            total.innerHTML=valorTotalCompra;                          
                        })
                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);
                        tr.append(td5);
                        tr.append(botonBorrar);
                        document.getElementById('lineas').append(tr);
                        borrado();
                        var total = document.getElementsByClassName('total a_derecha')[0];                        
                        total.innerHTML=valorTotalCompra;    
                    }
                }
                else
                {
                    alert('dni no valido');
                }            
    
            }
            else
            {            
                alert('debe rellenar dni y cantidad');
            }            
            
        }else{
            alert('Seleccione un articulo');
        }
        
    }

    //boton borrar limpia el formulario totalmente.     
    var btncancelar = document.getElementById('cancelar');
    btncancelar.addEventListener('click', borrado);
    //verificacion de validez del dni
    function nif(dni) {
        var dni = dni.toUpperCase();
        numero = dni.substr(0,dni.length-1);
        let = dni.substr(dni.length-1,1);
        numero = numero % 23;
        letra='TRWAGMYFPDXBNJZSQVHLCKET';
        letra=letra.substring(numero,numero+1);
        if (letra!=let) return false;
        else return true;
          
    }
    //limpieza de los campos de la factura 
    function borrado(){
        document.getElementById('ref').value='';
        document.getElementById('precio').value='';
        document.getElementById('dni').value='';
        document.getElementById('cantidad').value='';
        if(document.getElementById('copia')) document.getElementById('copia').remove();
    }
    
}
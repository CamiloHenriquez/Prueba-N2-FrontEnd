var registrar = () =>{ /* La variable registrar esta guardando la funcion flecha que contiene variables de los elementos obtenidos a traves del id, 
                        en este caso corresponde al id de cada uno de los campos del formulario, tambien se crean variables donde se guarda el valor de los elementos*/
    let eNombre=document.getElementById("nombre");
    let eApellido=document.getElementById("apellido");
    let eCorreo=document.getElementById("correo");
    let eNacimiento=document.getElementById("nacimiento");
    let eSi=document.getElementById("si");
    let eNo=document.getElementById("no");
    if (eSi.checked == true){ /* Este if valida si el elemento obtenido del id= "si" esta marcado para luego guardar en la variable eje el valor a traves del .value */
        var eje=document.getElementById("si").value ;
    }
    else if (eNo.checked == true){/* Y en caso de que no se cumpla lo del if, valida si el elemento obtenido del id= "no" esta marcado para luego guardar en la variable eje el valor a traves del .value */
        var eje=document.getElementById("no").value ;
    }
    let eNumero=document.getElementById("numero");
    let eEdad = document.getElementById("edad");
    let eRango = document.getElementById("rango")
    let nombre = eNombre.value;
    let apellido = eApellido.value;
    let correo = eCorreo.value;
    let nacimiento = eNacimiento.value;
    let numero = eNumero.value;
    let edad= eEdad.value;
    let rango = eRango.value ;
    var validacion= document.getElementById("validacion")

    let eValidar = validar()
    console.log(eValidar)
    if (eValidar == true) { /* Este if valida si la variable eValidar == true , si se cumple crear varibales como listadoAntiguoStr y listadoAntiguo,
                             una de estas obtiene del localStorage "personas", mientras que la otra almacena la transformacion de la obtencion de la variable anterior*/
        let listadoAntiguoStr = localStorage.getItem("personas");
        let listaAntiguo = JSON.parse(listadoAntiguoStr);
        console.log(listaAntiguo)
        if(listaAntiguo==null){  /* Este if valida si listaAntiguo == null, si se cumple crea un objeto persona que contiene los campos recuperados del formulario y
                                 la variable listadoNuevo almacena un diccionario con el objeto dentro*/
            let persona = {"id":0,"nombre":nombre,"apellido":apellido,"correo":correo,"nacimiento":nacimiento,"eje": eje,"telefono": numero,"edad":edad,"rango":rango};
            var listadoNuevo = [persona]
        }else{ /* Si el if no se cumple, crea un objeto persona que contiene los campos recuperados del formulario y en la variable listadoNuevo destructura el listaAntiguo y
                 le agrega persona porque ya existe alguien dentro de listaAntiguo, todo esto dentro del diccionario */
            let persona = {"id":listaAntiguo.length,"nombre":nombre,"apellido":apellido,"correo":correo,"nacimiento":nacimiento,"eje": eje,"telefono": numero,"edad":edad,"rango":rango};
            var listadoNuevo = [...listaAntiguo,persona]
        }
        console.log(listadoNuevo)
        localStorage.setItem("personas",JSON.stringify(listadoNuevo));  
        //Tabla
        cargarTabla(listadoNuevo) /* Se llama la funcion flecha cargarTabla con el parametro listadoNuevo */
    }else{ /* Si eValidar != true, inserta en el html esa cadena de texto explicando que faltan campos por completar para poder registrar */
        validacion.innerHTML = "Faltan campos por registrar o requisitos del campo" 
    }
}

function validar() { /* Esta funcion guarda en variables los elementos a traves del id y evalua cada valor a traves de if para validarlos */
    let eNombre=document.getElementById("nombre");
    let eApellido=document.getElementById("apellido");
    let eCorreo=document.getElementById("correo");
    let eNacimiento=document.getElementById("nacimiento");
    let eSi=document.getElementById("si");
    let eNo=document.getElementById("no");
    if (eSi.checked == true){
        var eje=document.getElementById("si").value ;
    }
    else if (eNo.checked == true){
        var eje=document.getElementById("no").value ;
    }
    let eNumero=document.getElementById("numero");
    let eEdad = document.getElementById("edad");
    let eRango = document.getElementById("rango")
    let nombre = eNombre.value;
    let apellido = eApellido.value;
    let correo = eCorreo.value;
    let nacimiento = eNacimiento.value;
    let numero = eNumero.value;
    let edad= eEdad.value;
    let rango = eRango.value ;
    let expresionRegular = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;



    if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) { /* Este if valida si el valor de nombre es igual a null, si el largo es = 0, 
                                                                            o testea el valor de nombre en la expresion regular, si se cumple alguna de estas retorna false*/
        return false  
    }

    else if(apellido == null || apellido.length == 0 || /^\s+$/.test(apellido)) { /* Este else if valida si el valor de apellido es igual a null, si el largo es = 0, 
                                                                                    o testea el valor de apellido en la expresion regular, si se cumple alguna de estas retorna false*/
        return false  
    }


    else if (!isNaN(nacimiento)) {  /* Este else if valida si el valor de nacimiento no es un numero, si es asi retorna false */
        return false
    }

    else if( !(/^\d{9}$/.test(numero)) ) {  /* Este else if valida si el valor de numero no cumple con la expresion regular y lo testea,si es asi retorna false */
        return false;
    }


    else if( edad<1 ) { /* Este else if valida si el valor de edad es menor a 1, si es asi retorna false */

        return false;
    }
    else if( expresionRegular.test(correo) ) { /* Este else if valida si el valor de correo cumple con la expresion regular y lo testea, si es asi retorna true */
        return true;
    }
}


var obtenerDatos = () =>{ /* esta funcion flecha funciona para mantener la tabla cargada en la pagina */
    let listadoAntiguoStr = localStorage.getItem("personas");
    let listaAntiguo = JSON.parse(listadoAntiguoStr);
    cargarTabla(listaAntiguo)
}

var cargarTabla = (listadoNuevo) =>{ /* Esta funcion flecha recupera los elementos a traves del id */
    let eSBtnAccion= document.getElementById("sBtnAccion");
    let eTabla=document.getElementById("tabla");
    let eNombre=document.getElementById("nombre");
    let eApellido=document.getElementById("apellido");
    let eCorreo=document.getElementById("correo");
    let eNacimiento=document.getElementById("nacimiento");
    let eSi=document.getElementById("si");
    let eNo=document.getElementById("no");
    if (eSi.checked == true){
        var eje=document.getElementById("si").value

    }else if (eNo.checked == true){
        var eje=document.getElementById("no").value ;
    }
    let eNumero=document.getElementById("numero")
    let eEdad=document.getElementById("edad")
    let eRango = document.getElementById("rango")
    


    render = "<table>"/* La variable render sirve para concatenar estructura html que corresponde a la tabla para poder realizarle un innerHTML mas adelante */
    render+= "<tr> <th>Nombre </th>"
    render+= "<th>Apellido</th>"
    render+= "<th>Correo</th>"
    render+= "<th>Fecha de nacimiento</th>"
    render+= "<th>Realiza ejercicio</th>"
    render+= "<th>Telefono</th>"
    render+= "<th>Edad</th>"
    render+= "<th>Rango</th>"
    render+= "<th>Accion </th> </tr>"
    
    for (let i = 0; i < listadoNuevo.length; i++) { /* Este for recorre el diccionario que almacena listadoNuevo y con la variable render sigue concatenando 
                                                        html para ir agregando los datos que se van ingresando. element."key" hace referencia a cada valor asociado a su clave(key) 
                                                        mientras recorre cada objeto(element) en el diccionario. Tambien se agregan botones de editar y eliminar en la tabla*/
        const element = listadoNuevo [i];
        render+= "<tr>" ;
        render+= "<td>"+ element.nombre +"</td>" ;
        render+= "<td>"+ element.apellido +"</td>" ;
        render+= "<td>"+ element.correo +"</td>" ;
        render+= "<td>"+ element.nacimiento +"</td>" ;
        render+= "<td>"+ element.eje +"</td>" ;
        render+= "<td>"+ element.telefono +"</td>"
        render+= "<td>"+ element.edad+"</td>" ;
        render+= "<td>"+ element.rango+"</td>" ;
        render+= "<td>" ;
        render+= "<button id='btnEditar"+i+"' type='button'>Editar</button>" ;
        render+= "<button id='btnEliminar"+i+"' type='button'>Eliminar</button>" ;
        render+= "</td>";
        render+= "</tr>";
    }

    render+= "</table>"
    eTabla.innerHTML= render ; /* se agrega todo lo guardado en render a la pagina */
    for (let i = 0; i < listadoNuevo.length; i++) { /* Este for recorre el diccionario que almacena listadoNuevo */
        const element = listadoNuevo[i];
        var eBtnEditar = document.getElementById("btnEditar"+i)
        eBtnEditar.addEventListener("click",()=>{ /* Se recupera el elemento a traves del id del boton editar para agregarle un evento que esta a la espera de un click
                                                     para que ejecute la funcion flecha, la funcion flecha crea una variable que almacena una etiqueta html para luego hacerle un inner
                                                     y crear un boton de editar nuevo en la pagina */
            let sBtn = "<button type='button' id='btnEditar' value='"+i+"'>Editar</button>"
            eSBtnAccion.innerHTML = sBtn

            let eBtnEditarNuevo = document.getElementById("btnEditar");/* Se recupera el elemento del nuevo boton de editar a traves del id para luego agregarle un evento
                                                                         que esta a la espera de un click para llamar a la funcion flecha modificar con el parametro listadoNuevo */
            eBtnEditarNuevo.addEventListener("click",()=>modificar(listadoNuevo))

            eNombre.value = element.nombre ; /* recupera el valor de todos los campos y los muestra en el formulario*/
            eApellido.value = element.apellido ;
            eCorreo.value = element.correo ;
            eNacimiento.value = element.nacimiento ;
            if (element.eje == eSi.value){
                eSi.checked = element.eje
            }else{
                eNo.checked = element.eje
            }
            
            eNumero.value = element.telefono ;
            eEdad.value = element.edad
            eRango.value = element.rango

            eNombre.disabled = false /* valida que al apretar el boton editar no bloquee los campos*/
            eApellido.disabled = false
            eCorreo.disabled = false
            eNacimiento.disabled = false
            eSi.disabled = false
            eNo.disabled = false
            eNumero.disabled = false
            eEdad.disabled = false
            eRango.disabled = false
            
        })}
    
    for (let i = 0; i < listadoNuevo.length; i++) { /* Este for recorre el diccionario que almacena listadoNuevo */
        const element = listadoNuevo[i];
        
        var eBtnEliminar = document.getElementById("btnEliminar"+i)
        eBtnEliminar.addEventListener("click",()=>{ /* Se recupera el elemento a traves del id del boton eliminar para agregarle un evento que esta a la espera de un click
                                                    para que ejecute la funcion flecha, la funcion flecha crea una variable que almacena una etiqueta html para luego hacerle un inner
                                                    y crear un boton de eliminar nuevo en la pagina */
            let sBtn = "<button type ='button' id='btnEliminar' value= '"+i+"'>Eliminar </button>"
            eSBtnAccion.innerHTML = sBtn

            let eBtnEliminarNuevo = document.getElementById("btnEliminar") ; /* Se recupera el elemento del nuevo boton de eliminar a traves del id para luego agregarle un evento
                                                                                que esta a la espera de un click para llamar a la funcion flecha eliminar con el parametro listadoNuevo */
            eBtnEliminarNuevo.addEventListener('click',()=>eliminar(listadoNuevo))


            eNombre.value = element.nombre ; /* recupera el valor de todos los campos y los muestra en el formulario*/
            eApellido.value = element.apellido ;
            eCorreo.value = element.correo ;
            eNacimiento.value = element.nacimiento ;
            if (element.eje == eSi.value){
                eSi.checked = element.eje
            }else{
                eNo.checked = element.eje
            }
            eNumero.value = element.telefono ;
            eEdad.value = element.edad
            eRango.value = element.rango
            

            eNombre.disabled = true /* valida que al apretar el boton eliminar bloquee los campos*/
            eApellido.disabled = true
            eCorreo.disabled = true
            eNacimiento.disabled = true
            eSi.disabled = true
            eNo.disabled = true
            eNumero.disabled = true
            eEdad.disabled = true
            eRango.disabled = true
    
        }
        )
    }
}

var modificar =(listadoNuevo) =>{ /* la funcion flecha recupera los elementos en variables a traves del id, tambien variables con el valor del elemento */
    let eNombre=document.getElementById("nombre");
    let eApellido=document.getElementById("apellido");
    let eCorreo=document.getElementById("correo");
    let eNacimiento=document.getElementById("nacimiento");
    let eSi=document.getElementById("si");
    let eNo=document.getElementById("no");
    if (eSi.checked == true){
        var eje=document.getElementById("si").value;
    }
    else if (eNo.checked == true){
        var eje=document.getElementById("no").value;
    }
    let eNumero=document.getElementById("numero") ;
    let eEdad = document.getElementById("edad") ;
    let eRango = document.getElementById("rango") ;
    let eBtnEditarNuevo= document.getElementById("btnEditar") ;

    console.log("Editando...")

    let nombre = eNombre.value; 
    let apellido = eApellido.value;
    let correo = eCorreo.value;
    let nacimiento = eNacimiento.value;
    let numero = eNumero.value;
    let edad = eEdad.value ;
    let rango = eRango.value ;
    let indice = eBtnEditarNuevo.value

    listadoNuevo[indice].nombre = nombre; /* En las siguientes lineas el diccionario listadoNuevo se posiciona en el indice recuperado el cual corresponde al elemento del boton editar nuevo
                                             y reemplaza los nuevos valores ingresados por el usuario */
    listadoNuevo[indice].apellido = apellido;
    listadoNuevo[indice].correo = correo;
    listadoNuevo[indice].nacimiento = nacimiento;
    listadoNuevo[indice].eje = eje;
    listadoNuevo[indice].telefono = numero;
    listadoNuevo[indice].edad = edad
    listadoNuevo[indice].rango = rango
    localStorage.setItem('personas',JSON.stringify(listadoNuevo)) 
    cargarTabla(listadoNuevo)
}

var eliminar = (listadoNuevo)=>{ /* La funcion flecha recupera el elemento del boton eliminar nuevo a traves de su id para luego utilizar un .filter y
                                     validar si el id es distinto del indice (el indice es el valor del elemento del boton eliminar nuevo), luego se le aplica un .map para ordenar los id*/
    let eBtnEliminarNuevo = document.getElementById("btnEliminar");
    let indice= eBtnEliminarNuevo.value
    let lista = listadoNuevo.filter((p)=>p.id!=indice)
    let listaFinal = lista.map((p,index)=>{return {...p,'id':index }})

    localStorage.setItem("personas",JSON.stringify(listaFinal))
    cargarTabla(listaFinal)
}

document.getElementById("get").addEventListener("click",registrar) /* a traves del id="get" que corresponde al boton de Enviar se le agrega un evento que esta esperando a ser clickeado
                                                                     para llamar a la funcion flecha registar */
addEventListener('load', obtenerDatos) /* Se agrega un evento que al hacer click se llame a la funcion flecha obtenerDatos */


var cambioContraste = () => { /* Esta funcion flecha recupera el elemento a traves del id del boton de contraste y su valor*/
    let btn = document.getElementById('btnContraste')
    let estado = btn.value;
    if(estado=='o') { /* Este if valida si la variable estado(el valor del elemento) == "o" , si esto se cumple el valor del elemnto cambia a "c" y se recupera en la variable elements
                         los elementos de la clase negro que proviene del css, finalmente remueve de la lista la clase negro y agrega blanco*/
        btn.value = 'c';
        let elements = document.getElementsByClassName('negro');
        console.log(elements)
        console.log(elements[0].classList)
        elements[0].classList.add('blanco');
        elements[0].classList.remove('negro');

    }
    else if(estado=='c') { /* Este else if valida si la variable estado(el valor del elemento) == "c" , si esto se cumple el valor del elemnto cambia a "o" y se recupera en la variable elements
                            los elementos de la clase blanco que proviene del css, finalmente remueve de la lista la clase blanco y agrega negro, lo inverso al if*/
        btn.value = 'o';
        let elements = document.getElementsByClassName('blanco');
        console.log(elements)
        console.log(elements[0])
        elements[0].classList.add('negro');
        elements[0].classList.remove('blanco');

    }

}

var cambioFuente = () => { /* Esta funcion flecha recupera el elemento a traves del id del boton de fuente y su valor*/
    let btn = document.getElementById("btnFuente");
    let estado = btn.value;
    if (estado == "0") { /* Este if valida si estado == "0", si se cumple el valor de btn cambia a "1" y crea una variable elements con los elementos de la clase small de css,
                            luego la variable largo contiene el la cantidad de elementos que tiene para que no se vayan eliminando*/
      btn.value = '1';
      let elements = document.getElementsByClassName("small");
      const largo = elements.length;
      for (let index = 0; index < largo; index++) {/* Este for recorre hasta largo y en cada vuelta agrega la clase medium y remueve small*/
          const element = elements[0];
         element.classList.add("medium");
         element.classList.remove("small");
      }
    } else if (estado == "1") {  /* Este else if valida si estado == "1", si se cumple el valor de btn cambia a "2" y crea una variable elements con los elementos de la clase medium de css,
                                    luego la variable largo contiene el la cantidad de elementos que tiene para que no se vayan eliminando*/
      btn.value = "2";
      let elements = document.getElementsByClassName("medium");
      const largo = elements.length;
      for (let index = 0; index < largo; index++) { /* Este for recorre hasta largo y en cada vuelta agrega la clase large y remueve medium*/
          const element = elements[0];
          element.classList.add("large");
          element.classList.remove("medium");
      }
    } else if (estado == "2") { /* Este else if valida si estado == "2", si se cumple el valor de btn cambia a "0" y crea una variable elements con los elementos de la clase large de css,
                                    luego la variable largo contiene el la cantidad de elementos que tiene para que no se vayan eliminando*/
      btn.value = "0";
      let elements = document.getElementsByClassName("large");
      const largo = elements.length;
      for (let index = 0; index < largo; index++) { /* Este for recorre a largo y en cada vuelta agrega la clase small y remueve large*/
          const element = elements[0];
         element.classList.add("small");  
         element.classList.remove("large");
      }
    }
  }


document.getElementById("btnContraste").addEventListener('click', cambioContraste) /* A traves del id del boton de contraste se le agrega un evento que al hacer click
                                                                                     llama a la funcion flecha cambioContraste*/
document.getElementById("btnFuente").addEventListener('click', cambioFuente) /* A traves del id del boton de fuente se le agrega un evento que al hacer click
                                                                                llama a la funcion flecha cambioFuente*/
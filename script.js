var registrar = () =>{
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
    var validacion= document.getElementById("validacion")

    let eValidar = validar()
    console.log(eValidar)
    if (eValidar == true) {
        let listadoAntiguoStr = localStorage.getItem("personas");
        let listaAntiguo = JSON.parse(listadoAntiguoStr);
        console.log(listaAntiguo)
        if(listaAntiguo==null){
            let persona = {"id":0,"nombre":nombre,"apellido":apellido,"correo":correo,"nacimiento":nacimiento,"eje": eje,"telefono": numero,"edad":edad,"rango":rango};
            var listadoNuevo = [persona]
        }else{
            let persona = {"id":listaAntiguo.length,"nombre":nombre,"apellido":apellido,"correo":correo,"nacimiento":nacimiento,"eje": eje,"telefono": numero,"edad":edad,"rango":rango};
            var listadoNuevo = [...listaAntiguo,persona]
        }
        console.log(listadoNuevo)
        localStorage.setItem("personas",JSON.stringify(listadoNuevo));
        //Tabla
        cargarTabla(listadoNuevo)
    }else{
        validacion.innerHTML = "Faltan campos por registrar o requisitos del campo"
    }
}

function validar() {
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



    if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
        return false  
    }

    else if(apellido == null || apellido.length == 0 || /^\s+$/.test(apellido)) {
        return false  
    }


    else if (!isNaN(nacimiento)) {
        return false
    }

    else if( !(/^\d{9}$/.test(numero)) ) {
        return false;
    }


    else if( isNaN(edad) || edad<1 ) {

        return false;
    }
    else if( expresionRegular.test(correo) ) {
        return true;
    }
}


var obtenerDatos = () =>{
    let listadoAntiguoStr = localStorage.getItem("personas");
    let listaAntiguo = JSON.parse(listadoAntiguoStr);
    cargarTabla(listaAntiguo)
}

var cargarTabla = (listadoNuevo) =>{
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
    


    render = "<table>"
    render+= "<tr> <th>Nombre </th>"
    render+= "<th>Apellido</th>"
    render+= "<th>Correo</th>"
    render+= "<th>Fecha de nacimiento</th>"
    render+= "<th>Realiza ejercicio</th>"
    render+= "<th>Telefono</th>"
    render+= "<th>Edad</th>"
    render+= "<th>Rango</th>"
    render+= "<th>Accion </th> </tr>"
    
    for (let i = 0; i < listadoNuevo.length; i++) {
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
    eTabla.innerHTML= render ;
    for (let i = 0; i < listadoNuevo.length; i++) {
        const element = listadoNuevo[i];
        var eBtnEditar = document.getElementById("btnEditar"+i)
        eBtnEditar.addEventListener("click",()=>{
            let sBtn = "<button type='button' id='btnEditar' value='"+i+"'>Editar</button>"
            eSBtnAccion.innerHTML = sBtn

            let eBtnEditarNuevo = document.getElementById("btnEditar");
            eBtnEditarNuevo.addEventListener("click",()=>modificar(listadoNuevo))

            eNombre.value = element.nombre ;
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

            eNombre.disabled = false
            eApellido.disabled = false
            eCorreo.disabled = false
            eNacimiento.disabled = false
            eSi.disabled = false
            eNo.disabled = false
            eNumero.disabled = false
            eEdad.disabled = false
            eRango.disabled = false
            
        })}
    
    for (let i = 0; i < listadoNuevo.length; i++) {
        const element = listadoNuevo[i];
        
        var eBtnEliminar = document.getElementById("btnEliminar"+i)
        eBtnEliminar.addEventListener("click",()=>{
            let sBtn = "<button type ='button' id='btnEliminar' value= '"+i+"'>Eliminar </button>"
            eSBtnAccion.innerHTML = sBtn

            let eBtnEliminarNuevo = document.getElementById("btnEliminar") ;
            eBtnEliminarNuevo.addEventListener('click',()=>eliminar(listadoNuevo))


            eNombre.value = element.nombre ;
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
            

            eNombre.disabled = true
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

var modificar =(listadoNuevo) =>{
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

    listadoNuevo[indice].nombre = nombre;
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

var eliminar = (listadoNuevo)=>{
    let eBtnEliminarNuevo = document.getElementById("btnEliminar");
    let indice= eBtnEliminarNuevo.value
    let lista = listadoNuevo.filter((p)=>p.id!=indice)
    let listaFinal = lista.map((p,index)=>{return {...p,'id':index }})

    localStorage.setItem("personas",JSON.stringify(listaFinal))
    cargarTabla(listaFinal)
}






















document.getElementById("get").addEventListener("click",registrar)
addEventListener('load', obtenerDatos)








































var cambioContraste = () => {
    let btn = document.getElementById('btnContraste')
    let estado = btn.value;
    if(estado=='o') {
        btn.value = 'c';
        let elements = document.getElementsByClassName('negro');
        console.log(elements)
        console.log(elements[0].classList)
        elements[0].classList.add('blanco');
        elements[0].classList.remove('negro');

    }
    else if(estado=='c') {
        btn.value = 'o';
        let elements = document.getElementsByClassName('blanco');
        console.log(elements)
        console.log(elements[0])
        elements[0].classList.add('negro');
        elements[0].classList.remove('blanco');

    }

}

var cambioFuente = () => {
    let btn = document.getElementById("btnFuente");
    let estado = btn.value;
    if (estado == "0") {
      btn.value = '1';
      let elements = document.getElementsByClassName("small");
      const largo = elements.length;
      for (let index = 0; index < largo; index++) {
          const element = elements[0];
         element.classList.add("medium");
         element.classList.remove("small");
      }
    } else if (estado == "1") {
      btn.value = "2";
      let elements = document.getElementsByClassName("medium");
      const largo = elements.length;
      for (let index = 0; index < largo; index++) {
          const element = elements[0];
          element.classList.add("large");
          element.classList.remove("medium");
      }
    } else if (estado == "2") {
      btn.value = "0";
      let elements = document.getElementsByClassName("large");
      const largo = elements.length;
      for (let index = 0; index < largo; index++) {
          const element = elements[0];
         element.classList.add("small");  
         element.classList.remove("large");
      }
    }
  }


document.getElementById("btnContraste").addEventListener('click', cambioContraste)
document.getElementById("btnFuente").addEventListener('click', cambioFuente)
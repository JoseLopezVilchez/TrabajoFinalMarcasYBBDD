import "./feed/referencias.js"
import { toggleDropdown } from "./feed/estetica.js"
import "./feed/logica.js"
import { infoLoader } from "./feed/logica.js"

//Hago comprobacion de si el perfil esta completo por si alguien
//accediese via url en vez de a traves de login
let comprobador = true

fetch("http://localhost:3000/api/perfil" , {
    method : 'GET',
    headers : {
        'session_id' : sessionStorage.getItem("session_id")
    }
    })
.then(res => {
    if(res){
        console.log(res.json)
        return res.json()
    }else{
        console.log("No ha habido respuesta")
    }
})
.then(res => {
    if (
        res !== null &&
        res.nombre_perfil !== null && res.nombre_perfil !== "" &&
        res.imagen_perfil !== null && res.imagen_perfil !== "" &&
        res.banner !== null && res.banner !== "" &&
        res.bio !== null && res.bio !== ""
    ) {
        // Si el perfil esta completo, falsifica la variable
        comprobador = false
    }
})

// Si el usuario tiene session_id, no esta vacia, y su perfil esta hecho, se queda en feed
// De lo contrario, lo manda a perfil
/*if (sessionStorage.getItem("session_id") === null || sessionStorage.getItem("session_id") === "" || comprobador) {
    window.location.href = "http://127.0.0.1:5500/src/profile.html"
}*/

// -----------------------------------
// Funciones esteticas
// -----------------------------------

//Abre todas las cajas cuando carga la pagina
document.addEventListener("DOMContentLoaded" , () => {
    toggleDropdown(dropdownporhacer)
    toggleDropdown(dropdownfeed)
    toggleDropdown(dropdownsugerenciasamigos)
    toggleDropdown(dropdownsugerenciasthingos)
    toggleDropdown(dropdowntrending)
})

//Lista de listeners para abrir y cerrar cajas
buttonporhacer.addEventListener('click', () => {
    toggleDropdown(dropdownporhacer)
})

buttonfeed.addEventListener('click', () => {
    toggleDropdown(dropdownfeed)
})

buttonsugerenciasamigos.addEventListener('click', () => {
    toggleDropdown(dropdownsugerenciasamigos)
})

buttonsugerenciasthingos.addEventListener('click', () => {
    toggleDropdown(dropdownsugerenciasthingos)
})

buttontrending.addEventListener('click', () => {
    toggleDropdown(dropdowntrending)
})

// -----------------------------------------
// Logica de carga de datos
// -----------------------------------------

// Carga inicial de datos
infoLoader()


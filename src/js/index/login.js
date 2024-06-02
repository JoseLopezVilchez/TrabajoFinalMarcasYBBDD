let url = "http://localhost:3000/api/login"

export async function loginhandler() {

    let ip = ""

    // Primero hago una llamada a una api externa para recibir la IP del usuario
    await fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(json => {
        ip = json.ip
    })

    // Tomo los datos a enviar desde el formulario y la anterior llamada para la IP
    const datos = {
        usuario : usuario.value,
        password : contrasenya.value,
        device_ip : ip
    }

    // Llamada a la APi propia para comprobar si el usuario existe
    fetch(url , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body :JSON.stringify(datos)
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
        if (res) {
            // Recibo un session_id, el cual almaceno para mas tarde
            sessionStorage.setItem("session_id" , res.session_id)
        } else {
            console.log("Error - session id vacio")
        }
    })

    // Compruebo si he conseguido un session_id
    if (sessionStorage.getItem("session_id") === null || sessionStorage.getItem("session_id").toString() === "") {
        console.log("Error - navegacion detenida")
    } else {
        //Si tengo un session_id, compruebo si el usuario tiene un perfil completo
        fetch("http://localhost:3000/api/perfil" , { //TODO - ESTO DA ERROR

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
                // Si el perfil esta completo, lo mando a la pagina de feed
                window.location.href = "http://127.0.0.1:5500/src/feed.html"
            } else {
                // Si el perfil esta incompleto, lo mando a perfil para que lo rellene
                window.location.href = "http://127.0.0.1:5500/src/profile.html"
            }
        })
    }
}
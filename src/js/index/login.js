let url = "http://localhost:3000/api/login"

export async function loginhandler() {

    let ip = ""

    await fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(json => {
        ip = json.ip
    })

    console.log(ip)
 

    const datos = {
        usuario : usuario.textContent,
        password : contrasenya.textContent,
        device_ip : ip
    }

    console.log(datos.device_ip)

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
    .then(res => console.log('Llamada terminada'))
}
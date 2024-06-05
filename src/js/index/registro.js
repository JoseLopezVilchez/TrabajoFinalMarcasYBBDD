let url = "http://localhost:3000/api/register"

export function registrohandler() {

    const datos = {
        user : username.value,
        pass : password.value,
        email : email.value
    }

    fetch(url , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(datos)
    })
    .then(res => {
        if(res){
            console.log(res.json.toString())
            return res.json()
        }else{
            console.log("No ha habido respuesta")
        }
    })
    .then(res => console.log('Llamada terminada'))
}
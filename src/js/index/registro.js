let url = "http://localhost:3000/api/"

export function registrohandler() {

    const datos = {
        username : username.textContent,
        password : password.textContent,
        repeatpassword : repeatpassword.textContent,
        email : email.textContent
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
            console.log(res.json)
            return res.json()
        }else{
            console.log("No ha habido respuesta")
        }
    })
    .then(res => console.log('Llamada terminada'))
}
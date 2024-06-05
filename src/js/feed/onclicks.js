import { numeralHandler, profileLoader } from "./datos.js"

function anyadirThingo (idthingo) {
    fetch("http://localhost:3000/api/" , {
    method : 'POST',
    headers : {
        'session_id' : sessionStorage.getItem("session_id")
    },
    body : {

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
        
    })

    profileLoader()
}

function mentira (idthingo) {
    fetch("http://localhost:3000/api/" , {
    method : 'POST',
    headers : {
        'session_id' : sessionStorage.getItem("session_id")
    },
    body : {
        'thingo_id' : idthingo,
        'reacthingo' : 'mentira'
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
        
    })
}

function locura (idthingo) {
    fetch("http://localhost:3000/api/" , {
    method : 'POST',
    headers : {
        'session_id' : sessionStorage.getItem("session_id")
    },
    body : {
        'thingo_id' : idthingo,
        'reacthingo' : 'queloco'
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
        
    })
}

function eliminarThingo (idthingo) {
    fetch("http://localhost:3000/api/" , {
    method : 'POST',
    headers : {
        'session_id' : sessionStorage.getItem("session_id")
    },
    body : {
        'thingo_id' : idthingo
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
        
    })

    profileLoader()
}

function confirmarThingo (idthingo) {
    fetch("http://localhost:3000/api/" , {
    method : 'POST',
    headers : {
        'session_id' : sessionStorage.getItem("session_id")
    },
    body : {
        'thingo_id' : idthingo,
        'reacthingo' : 'confilmo'
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
        
    })

    profileLoader()
}

function anyadirAmigo (idamigo) {
    fetch("http://localhost:3000/api/" , {
    method : 'GET',
    headers : {
        'session_id' : sessionStorage.getItem("session_id")
    },
    body : {
        'amigo_id' : idthingo
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
        
    })
}
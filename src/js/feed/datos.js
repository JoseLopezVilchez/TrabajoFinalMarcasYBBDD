import { dropdownfeed, dropdownporhacer, dropdownsugerenciasamigos, dropdownsugerenciasthingos, dropdowntrending, perfilbanner, perfilbio, perfilfoto, perfilnick, perfilnumamigos, perfilnummentiras, perfilnumthingos, perfilnumverificaciones, perfilusername } from "./referencias.js"

export function infoLoader() {
    profileLoader()

    dropdownporhacer.innerHTML = ``
    thingoLoader(1)

    dropdownfeed.innerHTML = ``
    feedLoader(1)

    sugerAmigosLoader()
    sugerThingosLoader()
    trendingLoader()
}

// Carga info en el perfil
export function profileLoader() {
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
        perfilbanner.style.backgroundImage = `url(${res.banner})`
        perfilfoto.src = res.imagen_perfil
        perfilnick.textContent = res.nombre_perfil
        perfilusername.textContent = res.nombre_usuario
        perfilbio.textContent = res.bio

        perfilnumverificaciones.textContent = numeralHandler(res.confirmaciones.length)
        perfilnumamigos.textContent = numeralHandler(res.mutuals.length)
        perfilnumthingos.textContent = numeralHandler(res.thingos)
        perfilnummentiras.textContent = numeralHandler(res.mentiras)
    })
}

// Carga los thingos con scrolling
//TODO - A falta de api
export function thingoLoader(pagina) {
    fetch('http://localhost:3000/api/thingos'+pagina+'' , {
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
        
        res.results.forEach(element => {
            dropdownporhacer.innerHTML = `
                <li id="porhacerentrada0" class="py-3 sm:py-4 ps-4 bg-gray-100 dark:bg-gray-700 border-gray-200 rounded-xl">
                    <div class="flex items-center">
                        <div class="flex-shrink-0"> <!-- hay que meter img de categoria aqui -->
                            <img class="w-8 h-8 rounded-full" src="${element.imagen_categoria}">
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                            <!-- nombre thingo -->
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                ${element.nombre_thingo}
                            </p>
                            <!-- nombre categoria -->
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                ${element.nombre_categoria}
                            </p>
                        </div>

                        <div class="inline-flex items-center"> <!-- contenedor botones -->
                            <a onclick="${confirmarThingo (element.thingo_id)}" class="inline-flex items-center justify-center w-10 h-10 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                </svg>
                            </a>
                            <a onclick="${eliminarThingo (element.thingo_id)}" class="inline-flex items-center justify-center w-10 h-10 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </li>
            `
        })
    })
}

// Carga entradas del feed dandole una pagina
export function feedLoader(pagina) {

    fetch('http://localhost:3000/api/feed/'+pagina+'' , {
    method : 'GET',
    headers : {
        'session_id' : sessionStorage.getItem("session_id")
    }
    })
    .then(res => {
    if(res){
        //console.log(res.json)
        return res.json()
    }
    })
    .then(res => {
        //console.log("respuesta del servidor")

        //console.log(res.results)
        
        for (let element of res.results) {
            
            dropdownfeed.innerHTML +=
            
            `
            <li class="py-3 sm:py-4">
                <div class=""> <!-- ejemplo de entrada del feed -->
                    <div class="flex items-center space-x-2 rtl:space-x-reverse"> <!-- fecha del thingo -->
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">${element.fecha_hecho_por_otro}</span>
                    </div>
                    <div class="flex flex-col justify-between w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                
                        <div class="w-full dark:text-white flex justify-start">
                            <div class="min-w-max"> <!-- img del usuario que hizo el thingo -->
                                <img class="w-20 h-20 rounded-full mr-6" src="${getImage(element.id_de_quien_lo_ha_hecho)}">
                            </div>
                            <div class="flex flex-col justify-between">
                                <div><!-- nickname del usuario -->
                                    <span class="mb-2 text-xl font-extrabold"></span>
                                    <!-- Mensaje -->
                                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                                </div>
                                <span class="mb-2 text-xl font-extrabold text-red-600">Y tu</span>
                            </div> 
                        </div>
                    
                        <div class="flex justify-between">
                            <a onclick="" class="inline-flex items-center justify-center w-10 h-10 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                                </svg> 
                            </a>
                            <div>
                                <a onclick="" class="inline-flex items-center justify-center w-10 h-10 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z"/>
                                    </svg>
                                </a>
                                <a onclick="" class="inline-flex items-center justify-center w-10 h-10 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11.4401 2.24219C9.2088 2.24219 7.16896 3.50383 5.6563 5.62188C5.41732 5.95547 5.19255 6.31094 4.9831 6.68828C5.03943 6.79766 5.09521 6.90703 5.15044 7.02187C5.69458 8.16484 6.24474 9.5375 5.77114 10.6859C5.57974 11.1453 5.192 11.4352 4.79169 11.6156C4.39193 11.7906 3.96153 11.8672 3.56669 11.8672C3.48685 11.8672 3.40482 11.8617 3.32278 11.8562C3.232 12.5508 3.18442 13.2672 3.18442 14C3.18442 17.2867 4.14091 20.2563 5.6563 22.3781C7.16896 24.4945 9.2088 25.7578 11.4401 25.7578C13.6713 25.7578 15.7111 24.4945 17.226 22.3781C17.7783 21.6016 18.2541 20.7156 18.6369 19.7422H11.4401V18.7578H26.3151C27.4088 18.7578 27.4088 16.2422 26.3151 16.2422H11.4401V15.2578H19.6486C19.6815 14.8477 19.6979 14.4266 19.6979 14C19.6979 10.7133 18.7408 7.74375 17.226 5.62188C15.7111 3.50383 13.6713 2.24219 11.4401 2.24219ZM3.56724 6.16875C3.36161 6.50781 3.10896 6.95078 2.87216 7.44844C2.3663 8.50391 2.04255 9.75625 2.27224 10.3141C2.3313 10.4563 2.49099 10.6039 2.74036 10.7133C2.98974 10.8227 3.30966 10.8828 3.56724 10.8828C3.82482 10.8828 4.14474 10.8227 4.39411 10.7133C4.64403 10.6039 4.80318 10.4563 4.86278 10.3141C5.09193 9.75625 4.76818 8.50391 4.26286 7.44844C4.02552 6.95078 3.77286 6.50781 3.56724 6.16875ZM7.94005 11.7578C8.68927 11.7578 9.30724 12.3758 9.30724 13.125C9.30724 13.8742 8.68927 14.4922 7.94005 14.4922C7.19083 14.4922 6.57286 13.8742 6.57286 13.125C6.57286 12.3758 7.19083 11.7578 7.94005 11.7578ZM14.9401 11.7578C15.6893 11.7578 16.3072 12.3758 16.3072 13.125C16.3072 13.8742 15.6893 14.4922 14.9401 14.4922C14.1908 14.4922 13.5729 13.8742 13.5729 13.125C13.5729 12.3758 14.1908 11.7578 14.9401 11.7578ZM11.4401 20.9453C12.0252 20.9453 12.5611 21.1203 12.9713 21.4266C13.3869 21.7383 13.6822 22.2086 13.6822 22.75C13.6822 23.2914 13.3869 23.7617 12.9713 24.0734C12.5611 24.3797 12.0252 24.5547 11.4401 24.5547C10.8549 24.5547 10.319 24.3797 9.9088 24.0734C9.49318 23.7617 9.19786 23.2914 9.19786 22.75C9.19786 22.2086 9.49318 21.7383 9.9088 21.4266C10.319 21.1203 10.8549 20.9453 11.4401 20.9453Z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            `
        }
    })
}

// Sugerencias de amigos
export function sugerAmigosLoader() {
    dropdownsugerenciasamigos.innerHTML = ``

    fetch("http://localhost:3000/api/suggestions/friendsuggestions" , {
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
        res.forEach(element => {
            dropdownsugerenciasamigos.innerHTML += `
                <li class="py-3 sm:py-4 ps-4">
                    <div class="flex flex-row justify-center align-middle items-center w-full p-2 min-h-max dark:text-white">
                        <div class="min-w-max z-10 -mr-16">
                            <img class="w-32 h-32 rounded-full" src="${element.profile_photo}">
                        </div>
                        <div class="flex flex-row lg:flex-col-reverse w-full max-h-max p-2 ps-20 bg-gray-100 dark:bg-gray-700 border-gray-200 rounded-r-xl">
                            <div class="flex flex-col lg:flex-row justify-center lg:justify-end align-middle">
                                <a onclick="${anyadirAmigo (idamigo)}" class="inline-flex items-center justify-center w-10 h-10 sm:me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                                    </svg> 
                                </a>
                            </div>
                            <div>
                                <!-- nickname del usuario -->
                                <span class="mb-1 text-xl font-extrabold">${element.apodo}</span>
                            </div>
                        </div> 
                    </div>
                </li>
                `
        });
    })
}

// Sugerencias de amigos
export function sugerThingosLoader() {
    dropdownsugerenciasthingos.innerHTML = ``

    fetch("http://localhost:3000/api/suggestions/sugerenciasthingos" , {
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
        res.forEach(element => {
            dropdownsugerenciasthingos.innerHTML = `
                <li class="py-3 sm:py-4 ps-4 bg-gray-100 dark:bg-gray-700 border-gray-200 rounded-xl">
                    <div class="flex flex-col">
                        <div class="flex flex-row mb-4">
                            <div class=""> <!-- hay que meter img de categoria aqui -->
                                <img class="w-8 h-8 rounded-full" src="${element.imagen_categoria_thingo}">
                            </div>
                            <div class="flex flex-col ms-4">
                                <!-- nombre thingo -->
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    ${element.nombre_thingo}
                                </p>
                                <!-- nombre categoria -->
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    ${element.nombre_categoria_thingo}
                                </p>
                            </div>
                        </div>
                                                    
                        <div class="flex flex-row justify-between">
                            <div>
                                <p class="font-normal text-gray-700 dark:text-gray-400">Hecho por</p>
                                <span class="mb-2 text-xl font-extrabold text-gray-700 dark:text-white">${element.nombre_de_quien_lo_ha_hecho}</span>
                            </div>
                                                        
                            <div class="inline-flex items-end"> <!-- contenedor botones -->
                                <a onclick="${anyadirThingo (idthingo)}" class="inline-flex items-center justify-center w-10 h-10 sm:me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                                    </svg> 
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                `
        });
    })
}

// Trending
export function trendingLoader() {
    dropdowntrending.innerHTML = ``

    /*
    thingo_id
    nombre_thingo
    nombre_categoria
    imagen_categoria
    puntos_de_insanidad
    */

    fetch("http://localhost:3000/api/trending" , {
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
        res.forEach(element => {
            dropdowntrending.innerHTML = `
                <li class="py-3 sm:py-4 ps-4 bg-gray-100 dark:bg-gray-700 border-gray-200 rounded-xl">
                    <div class="flex items-center">
                        <div class="flex-shrink-0"> <!-- hay que meter img de categoria aqui -->
                            <img class="w-8 h-8 rounded-full" src="${element.imagen_categoria}">
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                            <!-- nombre thingo -->
                            <p class="text-md font-medium text-gray-900 truncate dark:text-white">
                                ${element.nombre_thingo}
                            </p>
                            <!-- nombre categoria -->
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                ${element.nombre_categoria}
                            </p>
                            <p class="text-sm text-gray-900 truncate dark:text-white">
                                ${numeralHandler(element.puntos_de_insanidad)} PLs
                            </p>
                        </div>

                        <div class="inline-flex items-center"> <!-- contenedor botones -->
                            <a onclick="${anyadirThingo (idthingo)}" class="inline-flex items-center justify-center w-10 h-10 sm:me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                                </svg> 
                            </a>
                            <a onclick="${mentira (idthingo)}" class="inline-flex items-center justify-center w-10 h-10 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z"/>
                                </svg>
                            </a>
                            <a onclick="${locura (idthingo)}" class="inline-flex items-center justify-center w-10 h-10 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.4401 2.24219C9.2088 2.24219 7.16896 3.50383 5.6563 5.62188C5.41732 5.95547 5.19255 6.31094 4.9831 6.68828C5.03943 6.79766 5.09521 6.90703 5.15044 7.02187C5.69458 8.16484 6.24474 9.5375 5.77114 10.6859C5.57974 11.1453 5.192 11.4352 4.79169 11.6156C4.39193 11.7906 3.96153 11.8672 3.56669 11.8672C3.48685 11.8672 3.40482 11.8617 3.32278 11.8562C3.232 12.5508 3.18442 13.2672 3.18442 14C3.18442 17.2867 4.14091 20.2563 5.6563 22.3781C7.16896 24.4945 9.2088 25.7578 11.4401 25.7578C13.6713 25.7578 15.7111 24.4945 17.226 22.3781C17.7783 21.6016 18.2541 20.7156 18.6369 19.7422H11.4401V18.7578H26.3151C27.4088 18.7578 27.4088 16.2422 26.3151 16.2422H11.4401V15.2578H19.6486C19.6815 14.8477 19.6979 14.4266 19.6979 14C19.6979 10.7133 18.7408 7.74375 17.226 5.62188C15.7111 3.50383 13.6713 2.24219 11.4401 2.24219ZM3.56724 6.16875C3.36161 6.50781 3.10896 6.95078 2.87216 7.44844C2.3663 8.50391 2.04255 9.75625 2.27224 10.3141C2.3313 10.4563 2.49099 10.6039 2.74036 10.7133C2.98974 10.8227 3.30966 10.8828 3.56724 10.8828C3.82482 10.8828 4.14474 10.8227 4.39411 10.7133C4.64403 10.6039 4.80318 10.4563 4.86278 10.3141C5.09193 9.75625 4.76818 8.50391 4.26286 7.44844C4.02552 6.95078 3.77286 6.50781 3.56724 6.16875ZM7.94005 11.7578C8.68927 11.7578 9.30724 12.3758 9.30724 13.125C9.30724 13.8742 8.68927 14.4922 7.94005 14.4922C7.19083 14.4922 6.57286 13.8742 6.57286 13.125C6.57286 12.3758 7.19083 11.7578 7.94005 11.7578ZM14.9401 11.7578C15.6893 11.7578 16.3072 12.3758 16.3072 13.125C16.3072 13.8742 15.6893 14.4922 14.9401 14.4922C14.1908 14.4922 13.5729 13.8742 13.5729 13.125C13.5729 12.3758 14.1908 11.7578 14.9401 11.7578ZM11.4401 20.9453C12.0252 20.9453 12.5611 21.1203 12.9713 21.4266C13.3869 21.7383 13.6822 22.2086 13.6822 22.75C13.6822 23.2914 13.3869 23.7617 12.9713 24.0734C12.5611 24.3797 12.0252 24.5547 11.4401 24.5547C10.8549 24.5547 10.319 24.3797 9.9088 24.0734C9.49318 23.7617 9.19786 23.2914 9.19786 22.75C9.19786 22.2086 9.49318 21.7383 9.9088 21.4266C10.319 21.1203 10.8549 20.9453 11.4401 20.9453Z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </li>
                `
        });
    })
}

// Convierte numeros a string y miles y millones a letras
export function numeralHandler(numero) {
    let numeroString = ""

    if (numero > 999999) {
        numeroString = "" + (numero/1000000) + "M"
    } else if (numero > 999) {
        numeroString = "" + (numero/1000) + "K"
    } else {
        numeroString = numero
    }

    return numeroString
}

function getImage (idUsuario) {
    fetch('http://localhost:3000/api/perfil/'+idUsuario+'' , {
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
        return res.imagen_perfil
    })
}
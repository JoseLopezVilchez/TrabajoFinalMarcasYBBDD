
import * as htmlRef from './references.js'




// Asignar variables a las ID del HTML



// --------------------------------------
/** Conseguir la info del usuario que ha iniciado sesión.
 * esto se hace mandando la session ID en el heades
 * dicha id se consigue al iniciar sesión  */
// --------------------------------------



// ----------------
/* datos que me hacen falta  */
// ----------------

 let nombre_user

 let listaMutuals

 let userChartData

 let mutualChartData

 htmlRef.table.innerHTML =``





const getInfoSesion = () => {

  fetch("http://localhost:3000/api/perfil", {
    method: 'GET',
    headers: {
      "session_id": sessionStorage.getItem("session_id")
    }
  }).then(function (res) {
    if (res) {
      return res.json()
    } else {
      throw new Error('Error en la petición')
    }
  }).then(function (userdata) {

    console.log(userdata)

    // Relleno los datos del perfil
    htmlRef.nombre_usuario.textContent = userdata.nombre_usuario
    htmlRef.nombre_perfil.textContent = '@'+userdata.nombre_perfil
    htmlRef.imagen_perfil.src = userdata.imagen_perfil
    htmlRef.banner.style.backgroundImage = `url(${userdata.banner})`
    htmlRef.bio.textContent = userdata.bio
    htmlRef.thingos.textContent = parseInt(userdata.thingos, 10)
    htmlRef.confirmaciones.textContent = parseInt(userdata.confirmaciones.lenght, 10)
    htmlRef.mentiras.textContent = parseInt(userdata.mentiras, 10)
    htmlRef.mutuals.textContent = parseInt(userdata.mutuals.lenght, 10)


    // Guardo el nombre de perfil para el comparador

    nombre_user = '@'+userdata.nombre_perfil
    
    


    /* Guardo los datos que quiero usar en el comparador en un array  */ 

     userChartData = Array< Int >[
      parseInt(userdata.thingos, 10),
      parseInt(userdata.insanidad, 10),
      parseInt(userdata.seguidores, 10),
      parseInt(userdata.mutuals.lenght, 10),
      parseInt(userdata.seguidos, 10),
      parseInt(userdata.mentiras, 10),
      parseInt(userdata.confirmaciones.lenght, 10)
    ]

    /** esta lista de mutuals se usará más tarde para montar la friendList */
     listaMutuals = userdata.mutuals

  })
}



/* Obtener la info de un usuario sabiendo su id.
    la usaré para obtener los datos de los amigos y añadir esos datos a friendList */
function getInfoUsuario(id) {

  let url = `http://localhost:3000/api/perfil/${id}`;

  fetch(url, {
    method: 'GET'

  }).then(res => {
    if (res) {
      return res.json()
    } else {
      throw new Error('Error al recoger los datos de amigos')
    }
  }).then(json => {
    console.log(json)
  })
}


// --------------------------------------
/** Rellenar los mutuals con un for */
// --------------------------------------

const listarMutuals = (listaMutuals) => {


  for (let mutual of listaMutuals) {

    nombre_mutual = '@'+mutual.apodo

    var mutualData = getInfoUsuario(mutual.id)

    // Meter los datos programáticamente en la lista de amigos (mutuals)

    htmlRef.table.innerHTML += `
      <li class="py-3 sm:py-4 ps-4">
        <div class="flex flex-row justify-center align-middle items-center w-full p-2 min-h-max dark:text-white">
          <div class="min-w-max z-10 -mr-16"> 
            <!-- img del usuario que hizo el thingo -->
            <img class="w-32 h-32 rounded-full z-10" src="${mutualData.imagen_perfil}">
          </div>
          <div class="flex flex-row lg:flex-col-reverse w-full max-h-max p-2 ps-20 bg-gray-100 dark:bg-gray-700 border-gray-200 rounded-r-xl">
            <div class="flex flex-col lg:flex-row justify-center lg:justify-end align-middle">
              <a class="inline-flex items-center justify-center w-10 h-10 sm:me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                <button onClick="${bttnComparador(mutual)}" id="buttonCompare" class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600" type="button">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                  </svg>
                </button>                      
              </a>
              <a class="inline-flex items-center justify-center w-10 h-10 sm:me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                <button onClick="${bttnDeleteFrend(mutual)} id="buttonDeleteFriend" class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600" type="button">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                  </svg>
                </button>                          
              </a>
            </div>
            <div>
              <!-- nickname del usuario -->
              <span class="mb-1 text-xl font-extrabold">${mutualData.nombre_usuario}</span>
              <!-- Mensaje -->
              <p class="font-normal text-gray-700 dark:text-gray-400">@${mutualData.nombre_perfil}</p>
            </div>
          </div> 
        </div>
      </li>
    `

  }
}



function bttnComparador(mutual){

  var mutualData = getInfoUsuario(mutual.id)

  mutualChartData = Array < Int > [
    parseInt(mutualData.thingos, 10),
    parseInt(mutualData.insanidad, 10),
    parseInt(mutualData.seguidores, 10),
    parseInt(mutualData.mutuals.lenght, 10),
    parseInt(mutualData.seguidos, 10),
    parseInt(mutualData.mentiras, 10),
    parseInt(mutualData.confirmaciones.lenght, 10)
  ]

  newChart()
  

}

function bttnDeleteFrend(mutual){

  let url = `http://localhost:3000/api/friends/${id}`

  fetch(url,{
    method: 'DELETE',
    headers: {
      "session_id": sessionStorage.getItem("session_id")
    },
    body:{
      "friend":mutual.id
    }

  }).then(function (res) {
    if (res) {
      return res.json()
    } else {
      throw new Error('Error en la petición')
    }
  })

}



function newChart(){
  const dataComparada ={
    labels: htmlRef.labelsStats,
  datasets: [{
    label: nombre_user,
    data: userChartData,
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    label: nombre_mutual,
    data: mutualChartData,
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
  }

   radarChart = new Chart(htmlRef.chartComparador, {
    type: 'radar',
    data: dataComparada
  });


}


const comparatorData = {
  labels: htmlRef.labelsStats,
  datasets: [{
    label: nombre_user,
    data: userChartData,
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }]
};


var radarChart = new Chart(htmlRef.chartComparador, {
  type: 'radar',
  data: comparatorData
});


getInfoSesion()
const lista = sessionStorage.getItem('mutuals_list')
listarMutuals(lista)


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

  let nombre_mutual

  let listaMutuals = []

  let userChartData = []

  let mutualChartData = []


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

    //console.log(userdata)

    // Relleno los datos del perfil
    htmlRef.nombre_usuario.textContent = userdata.nombre_usuario
    htmlRef.nombre_perfil.textContent = '@'+userdata.nombre_perfil
    htmlRef.imagen_perfil.src = userdata.imagen_perfil
    htmlRef.imagen_comparador.src = userdata.imagen_perfil
    htmlRef.banner.style.backgroundImage = `url(${userdata.banner})`
    htmlRef.bannerComparador.style.backgroundImage = `url(${userdata.banner})`
    htmlRef.bio.textContent = userdata.bio
    htmlRef.thingos.textContent = parseInt(userdata.thingos, 10)
    htmlRef.confirmaciones.textContent = parseInt(userdata.confirmaciones.length, 10)
    htmlRef.mentiras.textContent = parseInt(userdata.mentiras, 10)
    htmlRef.mutuals.textContent = parseInt(userdata.mutuals.length, 10)



    // Guardo el nombre de perfil para el comparador

    nombre_user = '@'+userdata.nombre_perfil
    //console.log(nombre_user);
    
    


    /* Guardo los datos que quiero usar en el comparador en un array  */ 

    userChartData = [
      parseInt(userdata.thingos, 10),
      parseInt(userdata.insanidad, 10),
      parseInt(userdata.seguidores, 10),
      parseInt(userdata.mutuals.length, 10),
      parseInt(userdata.seguidos, 10),
      parseInt(userdata.mentiras, 10),
      parseInt(userdata.confirmaciones.length, 10)
    ];

    //console.log(userChartData);

    soloChart(nombre_user,userChartData)


    /** esta lista de mutuals se usará más tarde para montar la friendList */

    listaMutuals = userdata.mutuals

    //console.log(listaMutuals);
    listadoMutuals(listaMutuals)

  })
}




// --------------------------------------
/** Rellenar los mutuals con un for */
// --------------------------------------

function listadoMutuals(listaMutuals) {

  console.log(listaMutuals);

    for (let mutual of listaMutuals) {

      //console.log(mutual);

      getInfoUsuario(mutual.id)
  }
  
}

/* Obtener la info de un usuario sabiendo su id.
    la usaré para obtener los datos de los amigos y añadir esos datos a friendList */
    function getInfoUsuario(id) {

      let url = `http://localhost:3000/api/perfil/${id}`;
    
      fetch(url, {
        method: 'GET'
    
      }).then(res => {
        if (res.ok) {
          let json = res.json();
          return json;
      } else {
          console.error("Error fetching data:", res.status);
          return null;
      }
      }).then(function(mutualData) {
        console.log(mutualData)

        // Meter los datos programáticamente en la lista de amigos (mutuals)

        if (mutualData) {
          const listItem = document.createElement('li');
          listItem.className = 'py-3 sm:py-4 ps-4';
          listItem.innerHTML = `
            <div class="flex flex-row justify-center align-middle items-center w-full p-2 min-h-max dark:text-white">
              <div class="min-w-max z-10 -mr-16"> 
                <img class="w-32 h-32 rounded-full z-10" src="${mutualData.imagen_perfil}">
              </div>
              <div class="flex flex-row lg:flex-col-reverse w-full max-h-max p-2 ps-20 bg-gray-100 dark:bg-gray-700 border-gray-200 rounded-r-xl">
                <div class="flex flex-col lg:flex-row justify-center lg:justify-end align-middle">
                  <a class="inline-flex items-center justify-center w-10 h-10 sm:me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                    <button id="buttonCompare-${mutualData.id}" class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600" type="button">
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                      </svg>
                    </button>                      
                  </a>
                  <a class="inline-flex items-center justify-center w-10 h-10 sm:me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                    <button id="buttonDeleteFriend-${mutualData.id}" class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600" type="button">
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                      </svg>
                    </button>                          
                  </a>
                  <div id="popup-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-md max-h-full">
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button  type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-4 md:p-5 text-center">
                          <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                          </svg>
                          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Quieres eliminar a #nombreAmigo de tu lista de amistades?</h3>
                          <button id="buttonDeleteFriend-${mutualData.id}" data-modal-hide="popup-modal" type="button" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            ELIMINAR
                          </button>
                          <button data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span class="mb-1 text-xl font-extrabold">${mutualData.nombre_usuario}</span>
                  <p class="font-normal text-gray-700 dark:text-gray-400">@${mutualData.nombre_perfil}</p>
                </div>
              </div> 
            </div>
          `;
    
          htmlRef.table.appendChild(listItem);
    
          document.getElementById(`buttonCompare-${mutualData.id}`).addEventListener('click', () => bttnComparador(mutualData));
          document.getElementById(`buttonDeleteFriend-${mutualData.id}`).addEventListener('click', () => bttnDeleteFrend(mutualData));
        }
      })


      htmlRef.bttnComparator.addEventListener('click', () =>{
        bttnComparador(mutualData)
  
      })

      htmlRef.bttnDeleteMutual.addEventListener('click',() =>{
        bttnDeleteFrend(mutualData)
      })
    }
    
    


function bttnComparador(mutualData){

  mutualChartData = [
    parseInt(mutualData.thingos, 10),
    parseInt(mutualData.insanidad, 10),
    parseInt(mutualData.seguidores, 10),
    parseInt(mutualData.mutuals.length, 10),
    parseInt(mutualData.seguidos, 10),
    parseInt(mutualData.mentiras, 10),
    parseInt(mutualData.confirmaciones.length, 10)
  ]

  //console.log(mutualChartData);
  console.log(mutualData);

  htmlRef.comparado.classList.toggle("hidden")
  console.log(mutualData.imagen_perfil);

  htmlRef.img_comparado.src = mutualData.imagen_perfil
  
  htmlRef.nombre_comparado.textContent = nombre_mutual

  nombre_mutual = '@'+mutualData.nombre_perfil

  console.log(nombre_mutual)

  comparaChart(nombre_user,userChartData,nombre_mutual,mutualChartData)


  
  

  htmlRef.chartComparador.destroy()
  newChart()
}

function bttnDeleteFrend(mutualData){

  let url = `http://localhost:3000/api/friends/${mutualData.id}`

  fetch(url,{
    method: 'DELETE',
    headers: {
      "session_id": sessionStorage.getItem("session_id")
    },
    body:{
      "friend":mutualData.id
    }

  }).then(function (res) {
    if (res) {
      return res.json()
    } else {
      throw new Error('Error en la petición')
    }
  }).then(() => {
    document.getElementById(`buttonDeleteFriend-${mutualData.id}`).closest('li').remove();
  });

}



function comparaChart(nombre_user,userChartData,nombre_mutual,mutualChartData){

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


  let chartStatus = Chart.getChart(htmlRef.chartComparador);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  

  radarChart = new Chart(htmlRef.chartComparador, {
    type: 'radar',
    data: dataComparada
  });


}


function soloChart(nombre_user,userChartData) {
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
}


getInfoSesion()



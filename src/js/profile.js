
/* Chart de estadisticas, que compara las estadísticas de tu propio perfil con las de tus amigos */

const { json } = require("express")




/** Conseguir la info del usuario que ha iniciado sesión. */
const getInfoSesion = () =>{

  fetch("http://localhost:3000/api/perfil",{
  method: 'GET',
  headers:{
      "session_id" : sessionStorage.getItem("session_id")
  }
  }).then(res => {
    if(res){
      return res.json()
    }else{
      throw new Error('Error en la petición')
   }
  }).then( json =>{
    console.log(json)

    const userdata = res.data;

    getElement('nombre_usuario').innerHTML = userdata.nombre_usuario
    getElement('nombre_perfil').innerHTML = "@"+userdata.nombre_perfil
    getElement('imagen_perfil').innerHTML.src
    const imagen_perfil = userdata.nombre_perfil
    const banner = userdata.banner
    const bio = userdata.bio
    const thingos = userdata.thingos
    const confirmaciones = userdata.confirmaciones.lenght
    const mentiras = userdata.mentiras
    const insanidad = userdata.insanidad
    const mutuals = userdata.mutuals.lenght

    // console.log(nombre_usuario)
    // console.log(imagen_perfil)
    // console.log(banner)
    // console.log(bio)
    // console.log(thingos)
    // console.log(confirmaciones)
    // console.log(mentiras)
    // console.log(insanidad)
    // console.log(mutuals)


    




    




    
  })

}



/** Obtener la info de un usuario sabiendo su id. La id debo obtenerla de las id de los mutuals del usuario */
const getInfoUsuario = (id) => {

  let url = `http://localhost:3000/api/perfil/${id}`;

  fetch( url,{
  method:'GET'

  }).then(res =>{
    if(res){
      return res.json()
    }else{
      throw new Error('Error al recoger los datos de usuario')
    }
  }).then(json =>{
    console.log(json)
  })

} 















var dataUser1 = [1,2,3,4,5,6,7];
var dataUser2 = [7,6,5,4,3,2,1];


const labelsStats = ['Actividades','Insanidad','Seguidores','Mutuals','Siguiendo','Mentiras','Confirmaciones'];

var marksCanvas = document.getElementById("myChart");

const comparatorData = {
  labels: labelsStats,
  datasets: [{
    label: 'UserName 1',
    data: dataUser1,
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    label: 'UserName2',
    data: dataUser2,
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
};


var radarChart = new Chart(marksCanvas, {
  type: 'radar',
  data: comparatorData
});



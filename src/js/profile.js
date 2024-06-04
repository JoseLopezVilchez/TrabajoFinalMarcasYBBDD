
/* Chart de estadisticas, que compara las estadísticas de tu propio perfil con las de tus amigos */





// Asignar variables a las ID del HTML
    const nombre_usuario = document.getElementById('nombre_usuario')
    const nombre_perfil = document.getElementById('nombre_perfil')
    const imagen_perfil = document.getElementById('imagen_perfil')
    const banner = document.getElementById('banner')
    const bio = document.getElementById('bio')
    const thingos = document.getElementById('thingos')
    const confirmaciones = document.getElementById('confirmaciones')
    const mentiras = document.getElementById('mentiras')
    const mutuals = document.getElementById('mutuals')
    



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

    nombre_usuario.innerHTML = userdata.nombre_usuario
    nombre_perfil.innerHTML = userdata.nombre_perfil
    imagen_perfil.innerHTML.src = userdata.imagen_perfil
    banner
    bio.innerHTML = userdata.bio
    thingos.innerHTML = userdata.thingos
    confirmaciones.innerHTML = userdata.confirmaciones.lenght
    mentiras.innerHTML = userdata.mentiras

    insanidad = userdata.insanidad
    mutuals.innerHTML = userdata.mutuals.lenght
    listarMutuals(userdata.mutuals)

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



/** Rellenar los mutuals ¿¿ con un for each ?? */

const listarMutuals =(listaMutuals) =>{

  array.forEach(listaMutuals => {
    
  });
  
}















var dataUser1 = [1,2,5,4,5,6,7];
var dataUser2 = [7,6,5,4,3,2,1];


const labelsStats = ['Actividades','Insanidad','Seguidores','Mutuals','Siguiendo','Mentiras','Confirmaciones'];

var Canvas = document.getElementById("myChart");

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
    label: 'UserName 2',
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


var radarChart = new Chart(Canvas, {
  type: 'radar',
  data: comparatorData
});


getInfoSesion()

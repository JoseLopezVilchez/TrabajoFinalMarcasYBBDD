
import * as htmlRef from './references.js'


// Asignar variables a las ID del HTML




/** Conseguir la info del usuario que ha iniciado sesión.
 * esto se hace mandando la session ID en el heades
 * dicha id se consigue al iniciar sesión  */
const getInfoSesion = () =>{

  fetch("http://localhost:3000/api/perfil",{
  method: 'GET',
  headers:{
      "session_id" : sessionStorage.getItem("session_id")
  }
  }).then(function(res) {
    if(res){
      return res.json()
    }else{
      throw new Error('Error en la petición')
  }
  }).then(function(userdata) {

    // console.log(userdata)

    htmlRef.nombre_usuario.textContent = userdata.nombre_usuario
    htmlRef.nombre_perfil.textContent = userdata.nombre_perfil
    htmlRef.imagen_perfil.textContent.src = userdata.imagen_perfil
    htmlRef.banner.style.bacgroundImage = `url(${userdata.banner})`
    htmlRef.bio.textContent =  userdata.bio
    htmlRef.thingos.textContent = parseInt( userdata.thingos, 10)
    htmlRef.confirmaciones.textContent = parseInt(userdata.confirmaciones.lenght, 10)
    htmlRef.mentiras.textContent = parseInt(userdata.mentiras, 10)
    htmlRef.mutuals.textContent = parseInt(userdata.mutuals.lenght,10)  
    

    /** Aqui guardo la lista de mutuals para usarla más tarde */
    sessionStorage.setItem("mutual_list", userdata.mutuals)
    
  })
    

  

}



/** Obtener la info de un usuario sabiendo su id. La id debo obtenerla de las id de los mutuals del usuario */
function getInfoUsuario(id){

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

const listarMutuals = (listaMutuals) =>{

  for(let mutual of listaMutuals){

    getInfoUsuario(mutual.id).then

  }
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
const lista = sessionStorage.getItem('mutuals_list')
listarMutuals(lista)

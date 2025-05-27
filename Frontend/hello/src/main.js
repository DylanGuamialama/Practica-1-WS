let message = document.querySelector('#message')
let pingButton = document.querySelector('#pingButton')

//emparejar el boton con la funcion
pingButton.addEventListener('click', getPingFromWebService)

function getPingFromWebService(){
  const url = 'http://localhost:3000/ping'
  //Encadenar los datos de la url con la respuesta 
  fetch (url).then((response) => {
    return response.json()//solicitar respuesta en formato json
  }).then((data)=>{
    console.log(data)
    message.innerHTML = `${data.message} - Dylan`;//asignar la data retornada al message
  }).catch(function(error){
    console.log(error)
    message.innerHTML=`No se puede conectar al servidor ${url}`
  })
}
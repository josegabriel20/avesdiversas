"use strict";
//page.base('');
//page({hashbang: true });

page('/aves/:id', (ctx)=>{
  //CSA: un escudo de seguridad en caso de que ctx.state.ave no exista
let ave;
  if(ctx.state.ave){
   ave = ctx.state.ave;
                 }
  let textField = document.getElementById("crazy");
  let arr;

  /*
  1- Guardar los array completos en AvesDataSet
  2- Filtrar los que son hibridos 
  3- generar un numero al azar y seleccionar eventualmente un ave al azar
  4- cambiar la U4L con page.js 
  5- 5omar el id equivalente al nombre cientificodel ave 
  6- usar .find para encontrar el ave en AvesDataSet
  */

  if(!randomState){
  globalBird.forEach(idx=>{
  arr = globalBird.find(idx=>idx.sciName === ave);  
  });
                  }
  else{
    let birdID = ctx.params.id;
    console.log(birdID);
    if(ctx.state.arrayAve){
      console.log("este es el objeto",ctx.state.arrayAve);
      arr = ctx.state.arrayAve.bird2;
    }
 //   return;
 //   AvesDataSet.forEach(idx=>{
    //  arr = AvesDataSet.find(idx=>idx.sciName === birdID);
  //  });
                  }
  let nombreCientifico = encodeURIComponent(arr.sciName.trim());
let marco = document.getElementById("imgmarco");   marco.src="";

let imagen; let nombreComun = document.getElementById("comName000");
  let nombreCientifico2 = document.getElementById("sciName000");
  let orden = document.getElementById("orden000");
    let familia = document.getElementById("familia000");
    let enlace = document.getElementById("link000");
  let resumen = document.getElementById("resumen000");     resumen.textContent = "";
 let alerta = document.getElementById("alert000");
  if(!alerta.classList.contains('d-none')){alerta.classList.add('d-none')}
              nombreComun.textContent = "";
            nombreComun.textContent = arr.comName;
              nombreCientifico2.textContent = "";
            nombreCientifico2.textContent = arr.sciName;
            orden.textContent="";   
            orden.textContent=arr.order;
              familia.textContent="";
            familia.textContent=arr.familySciName;
            enlace.href=`https://ebird.org/species/${arr.speciesCode}`;


  //
 if(!randomState){
fetch(`./AveaDiversas.php?nombre=${nombreCientifico}`)
.then(r => r.json())
  .then(data =>{
    /*
   if(data['imagen']){imagen = data['imagen'];
            if(imagen){
  marco.src=imagen;
                      }
    else{
    marco.src=null;
  }
 if(data['resumen']){
               resumen.textContent = data.resumen;
 }
           console.log(data)}
    else(console.log(data) */
  if(data['imagen']){imagen = data['imagen'];
                          if(imagen){marco.src=imagen}else{marco.src=null}
                    }

    if(data['resumen']){
                     resumen.textContent = data.resumen;
                       }
    else              {
      alerta.classList.remove('d-none');
                      }
    
  })
  .catch(error=>{console.log(error)});

 }

  else

 {
   imagen = aveAleatoria.bird.imagen;
   if(imagen){marco.src=imagen}else{marco.src="null"}
  let resumenData = aveAleatoria.bird.resumen;
   if(resumenData){resumen.textContent = resumenData}

 }
  //
  console.log("este es el nombre cientififo enviado a php " + nombreCientifico);
  let arre = JSON.stringify(arr,null,2);
  let contenido = document.getElementById("into-main");
  let foot = document.getElementById("foot");
 // let fondo = document.getElementById("main0");
//  fondo.classList.remove('bg-fondo-ave');
//  fondo.classList.add('bg-fondo-lectura');
  let container = document.getElementById("div-modo-lectura");
  container.classList.remove("d-none");
//  let text2 = document.getElementById("infofull");

 // text2.textContent = arre;
 // foot.classList.add('d-none');
  contenido.classList.add('d-none');
  //  spinner.classList.add('d-none');

  //  textField.classList.remove('d-none');
  //  textField.textContent=arre
  

 // alert("este es ave " + ave + arre);
});

let randomState = false;
let globalBird = [];
page('/main',()=>{
    let container = document.getElementById("div-modo-lectura");
    let contenido = document.getElementById("into-main");
      let listResults = document.getElementById("contenedor-resultados");

 // alert('i am working y all');
  
  if(!container.classList.contains('d-none')){
    container.classList.add('d-none')
  }

  if(contenido.classList.contains('d-none')){
    contenido.classList.remove('d-none');
  }

//  listResults.innerHTML="";
});

page.start({hashbang:true});
/*
page({
  hashbang: true
});
 */
//page('#!/');

document.getElementById("btn-clean").addEventListener("click",(e)=>{
        let listResults = document.getElementById("contenedor-resultados");
       listResults.innerHTML="";

  let inputTxt = document.getElementById("entrada").value ="";
      e.target.classList.add('d-none');

});
document.getElementById("init000").addEventListener("click",(e)=>{
  page('/main');
  //  alert("inicie page");

});
document.addEventListener("click",(e)=>{
  if(e.target.closest('.card')){

    let tarjeta = e.target.closest('.card');
    let dataCruda = tarjeta.dataset.code;
    let data = dataCruda.replace("/"," ");
    let data2 = tarjeta.dataset.info;
    //let data3 = JSON.stringify(data2,null,2);
    page(`/aves/${encodeURIComponent(data)}`,{
      ave:dataCruda
    });
    console.log(data,data2)
  }
});
let waitScreen = document.getElementById("espera...");
let fullContent = document.getElementById("bigContainer");

fullContent.classList.add('d-none');

let fuse =null;
let aves =[];
const opciones ={
  keys:["comName","sciName"],
  threshold:0.4,
  limit: 200

};
let crazy = document.getElementById("crazy");

function regExpretion(texto){
  const patterns = /\/|\s+x\s+/i;

  let hibrid = patterns.test(texto);

  if(hibrid){
    return false;
  }
  else{
    return true;
  }
  
                            }

let aveAleatoria={};
    let countBird = -1;

function randomBird(birds){
  randomState = true;
  let azar = Math.floor(Math.random() * birds);
   let spinner = document.getElementById("search-spinner");
  let nombreCientifico = AvesDataSet[azar].sciName;
  let bird2 = AvesDataSet[azar];
   fetch(`./AveaDiversas.php?nombre=${nombreCientifico}`)
    .then(r => r.json())
     
     .then(data=>{
       if(data.Status && data.Status === "Error"){
         alert("hubo un error en wiki");
         randomBird(countBird);
       }
       aveAleatoria.bird = data
     })

     
      .catch(error=>{console.log(error)}); 
   aveAleatoria.random = azar;
  aveAleatoria.name = nombreCientifico;
  aveAleatoria.bird2 = bird2;
  // page(`/aves/${nombreCientifico}`);
 // window.location.href=`/aves/${nombreCientifico}`;
//  spinner.classList.remove('d-none');
//setTimeout(()=>{
 // page(`/aves/${nombreCientifico}`,{
//    ave:nombreCientifico
 // });
//},2000);
 // console.log(AvesDataSet[azar]); console.log(nombreCientifico);
}

function callRandom(){
  randomState = true;
  let listResults = document.getElementById("contenedor-resultados");
  let inpu5 = document.getElementById("entrada");
  inpu5.value="";
  listResults.innerHTML = "";
   page(`/aves/${aveAleatoria.name}`,{
     arrayAve: aveAleatoria
   });
  randomBird(countBird);
}


let AvesDataSet = [];

/*Todavia np voy a usar una base de datos propia voy a quitar esta condicional*/
//if(AvesDataSet.length === 0){
fetch('./AveaDiversas.php')
    .then(r => r.json())
    .then(data=>{
                // alert("funcionoFETH" + "AvesDataSet vale cero" + JSON.stringify(AvesDataSet));
            data.forEach(idx=>{
             if(regExpretion(idx.sciName)){
               countBird++;
              AvesDataSet.push(idx);
                                          }
            });
      
            fuse = new Fuse(data,opciones);
            randomBird(countBird);
      
                 waitScreen.classList.add('d-none');
                 fullContent.classList.remove('d-none');
})
    .catch(error=>{console.log(error)});
 //                           }
//else if(AvesDataSet.length > 0){
//fuse = new Fuse(AvesDataSet,opciones);
 // alert("no hubo fetch informacion del cache");
//                   waitScreen.classList.add('d-none');
//                 fullContent.classList.remove('d-none');
  //   }
  
//let temporizador;

//let button = document.getElementById("entrada").addEventListener("input",(e)=>{
//  clearTimeout(temporizador);

    

//  temporizador = setTimeout(()=>{
let searchButton = document.getElementById("search-button");
searchButton.addEventListener("click",(e)=>{
  randomState = false;
  let entrada = document.getElementById("entrada").value.trim();
 let spinner = document.getElementById("search-spinner");
      let cleantxt = document.getElementById("btn-clean");
let input = document.getElementById("entrada");
  e.target.classList.add('d-none');

  
  e.preventDefault;
 // alert(entrada);
  
      if(entrada === ""){
    let listResults = document.getElementById("contenedor-resultados");
    listResults.innerHTML ="";
  //  cleantxt.classList.remove('d-none');
    e.target.classList.remove('d-none');
      return;
    }
spinner.classList.remove('d-none');
  cleantxt.classList.add('d-none');

  setTimeout(()=>{
  let resultado = fuse.search(entrada);
  let Ave = JSON.stringify(resultado,null,2);
 // alert(resultado[0].item.comName);
  cardCreate(resultado);
  spinner.classList.add('d-none');
  cleantxt.classList.remove('d-none');
  e.target.classList.remove('d-none');

 // alert(Ave);
  },1000);
});
//  },1500);

  
  //crazy.textContent=Ave;
//});

function cardCode(title,sciName,familyComName,familySciName,fullScript){
  return `        
            <div class="col w-100">
     <div class="card h-100 shadow-sm border-0" data-code="${sciName}">
    
       <div class="card-body">
       <h5 class="card-title">${title}</h5>
         <h6 class="card-subtitle mb-2 text-muted fst-italic">${sciName}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Nombre cientifico de la familia: ${familySciName}</h6>
      
       </div>
     </div>
   </div>
`;
}

function cardCreate(resultado){
  let container = document.getElementById("contenedor-resultados");
  container.innerHTML = "";
  resultado.forEach(idx=>{
   let title = idx.item.comName;
   let sciName= idx.item.sciName;
  let familyComName = idx.item.familyComName;
  let familySciName = idx.item.familySciName;
  let fullScript = idx.item; 
    //console.log(idx.item);
  globalBird.push(idx.item);
   container.innerHTML += cardCode(title,sciName,familyComName,familySciName,fullScript);
                        });
}






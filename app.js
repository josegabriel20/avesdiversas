//page.base('');
//page({hashbang: true });

page('/aves/:id', (ctx)=>{
  let ave = ctx.state.ave;
  let textField = document.getElementById("crazy");
  let arr;

  globalBird.forEach(idx=>{
  arr = globalBird.find(idx=>idx.sciName === ave);  
  });

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
  //  textField.classList.remove('d-none');
  //  textField.textContent=arre
  

 // alert("este es ave " + ave + arre);
});

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
   // alert("inicie page");

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


let AvesDataSet = [];

/*Todavia np voy a usar una base de datos propia voy a quitar esta condicional*/
//if(AvesDataSet.length === 0){
fetch('./AveaDiversas.php')
    .then(r => r.json())
    .then(data=>{
      
                // alert("funcionoFETH" + "AvesDataSet vale cero" + JSON.stringify(AvesDataSet));
                 AvesDataSet = data;
      
            fuse = new Fuse(data,opciones);

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






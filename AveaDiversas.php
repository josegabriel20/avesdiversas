<?php 
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
/*c9508d5b-b7b8-477e-8b94-93902fbefdba*/
$clave ="c9508d5b-b7b8-477e-8b94-93902fbefdba";
$ruta = "https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&locale=es";



$nombre = isset($_GET['nombre']) ? trim($_GET['nombre']) : '';


if(!empty($nombre)){

$esHibrido = (strpos($nombre, '/') !== false) || preg_match('/\s+X\s+/i', $nombre);

if($esHibrido){
echo json_encode([
     'Origin' => 'Backend',
     'Status' => 'Error',
     'nombreWiki' => $esHibrido ? $esHibrido : 'it doesn exits',
     'Message' => 'You are trying to look for a specie which doesnt exists in Wikimedia'
]);
exit;
}

$nombreWiki = str_replace(' ','_',$nombre);

$url = "https://es.wikipedia.org/api/rest_v1/page/summary/" . urlencode($nombreWiki);	

$ch = curl_init($url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT,'AvesDiversas/1.0 (josegabrielbermudez2007@gmail.com)');
$respuestaAve = curl_exec($ch);
$httpinfo = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if( $httpinfo === 200){
	$datosOriginales = json_decode($respuestaAve,true);

	$datosLimpios = [
	        'titulo'       => $datosOriginales['title'] ?? '',
	        'resumen'      => $datosOriginales['extract'] ?? 'Sin descripción disponible.',
	        'imagen'       => $datosOriginales['thumbnail']['source'] ?? null,
	        'imagen_hd'    => $datosOriginales['originalimage']['source'] ?? null,
	        'url_original' => $datosOriginales['content_urls']['desktop']['page'] ?? ''
	    ];

	    echo json_encode($datosLimpios);
	    
                   }
else{
	echo json_encode([
	'Origin' => 'wikimedia',
	'Status' => 'Error',
	'HttpInfo' => $httpinfo,
	'nombreWiki' => $nombreWiki ? $nombreWiki : 'it doesn exits',
	'Message' => 'Error 404 file not found'
	]);
}
exit;
} 

$buzz = curl_init($ruta);
curl_setopt($buzz,CURLOPT_RETURNTRANSFER,true);
curl_setopt($buzz,CURLOPT_HTTPHEADER,["x-ebirdapitoken: $clave"]);
curl_setopt($buzz,CURLOPT_SSL_VERIFYPEER, false);
$res = curl_exec($buzz);

if($_SERVER['REQUEST_METHOD'] === "GET"){
echo $res;
exit;
}

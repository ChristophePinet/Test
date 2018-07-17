var camera; //variable qui définit la webcam
var canvas; //l'endroit où on peut dessiner
var largeur = 1980 //définit la largeur du canvas / image
var hauteur= 980 //définit la hauteur du canvas / image
var Imagedefond // Définit l'image /vidéo du fond 
var seuil = parseFloat(localStorage.getItem("ValeurSlider")) // Quand distance couleurfond est assez proche, on change l'image
var couleurfond = [parseFloat(localStorage.getItem("couleurfondR")),parseFloat(localStorage.getItem("couleurfondG")),parseFloat(localStorage.getItem("couleurfondB"))]; // Contrôle couleur supprimée
var value = 0
var secondesCR=5
var listimage=["Medias/a.jpg","Medias/b.jpg","Medias/c.jpg","Medias/d.jpg","Medias/e.png"]
var positionlist=0
var resolution = 1/2

function setup() { 
  canvas = createCanvas(); // Creer une zone pour dessiner
  canvas.size(largeur,hauteur) //Taille de la zone à dessiner
  Imagedefond = loadImage ("Medias/b.jpg") // Integre une video
  //Imagedefond.hide() // Cacher l'image de base
  camera = createCapture(VIDEO); // Active la webcam
  camera.size(largeur, hauteur); // Taille de la webcam
  //Imagedefond.stop() // Lance en boucle la vidéo / Stop la video
  camera.hide(); // Supprimer la webcam de base
  frameRate(20); // Changer le framerate (Image par seconde)
  //Imagedefond.loop()

  setupbutton()


    windowResized()

    positionbutton()
} 




function draw() { // Dessine chaque image
  drawbutton()
  //background(0) // Dessiner le fond
  image(Imagedefond, 0,0,largeur,hauteur) // Dessine l'image / La video
  loadPixels(); // Charge les pixel
  dessinerCamera() // Dessine la webcam
  updatePixels(); // Permet de charger les pixel en mouvement.
 
}

 function move (){
   localStorage.setItem("ValeurSlider", "" + seuil)
   
 }
 
function windowResized(){
largeur = windowWidth
hauteur = windowHeight
canvas.size(largeur* resolution,hauteur* resolution)
resizeCanvas(windowWidth /2, windowHeight /2);
canvas.canvas.style.width =  windowWidth+"px"
canvas.canvas.style.height =  windowHeight+"px"
camera.size(largeur* resolution, hauteur* resolution)
positionbutton()

 }


 function suivant(){
   if(positionlist<listimage.length-1){
   positionlist=positionlist+1}
   else
   {positionlist=0}
   chargerimg()
   }
 function chargerimg(){
   Imagedefond=loadImage(listimage[positionlist])
   
 }



function distance (r1,g1,b1,r2,g2,b2){ // Calcul la distance entre deux couleurs
  return (Math.abs(r2-r1)+Math.abs(g2-g1)+Math.abs(b2-b1))/3
}


function dessinerCamera(){ // affiche la webcam

if (camera.imageData && camera.width == 0) {
  camera.width = camera.imageData.width
  camera.height = camera.imageData.height
}
   camera.loadPixels() // Charge les pixel de la webcam si la largeur n'est pas égale à 0
   

  if(camera.pixels.length){ // Etre sur que la caméra est chargée
 
    const w = largeur; // Variable raccourcis pour largeur
    const h = hauteur; // Variable raccourcis pour hauteur

  // for (let i = 0; i < w; i++) { // On se balade sur les colonnes
    //  for (let j = 0; j < h; j++) { // On se balade sur les lignes
      //  const position1dCanvas = (j*w + i)*4; 
 for (let position1dCanvas = 0; position1dCanvas < camera.pixels.length; position1dCanvas++) { 
     
        const r = camera.pixels[position1dCanvas +0];
        const g = camera.pixels[position1dCanvas +1];
        const b = camera.pixels[position1dCanvas +2];        

        if (distance(r,g,b,couleurfond[0],couleurfond[1],couleurfond[2]) < seuil){ // Si la distance des couleurs est inférieur au seuil, alors...
             
        }

        else { 
        pixels[position1dCanvas +0] = r;
        pixels[position1dCanvas +1] = g;
        pixels[position1dCanvas +2] = b;

        }
      }     
   } 
  
  }  

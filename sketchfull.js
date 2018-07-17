var camera; //variable qui définit la webcam
var canvas; //l'endroit où on peut dessiner
var largeur = 1980 //définit la largeur du canvas / image
var hauteur= 980 //définit la hauteur du canvas / image
var Imagedefond // Définit l'image /vidéo du fond 
var seuil = parseFloat(localStorage.getItem("ValeurSlider")) // Quand distance couleurfond est assez proche, on change l'image
var red = [255,0,0] // Valeur du rouge
var green = [0,255,0] // Valeur du vert
var blue = [0,0,255] // Valeur de bleue
var couleurfond =green; // Définit la couleur de fond comme vert
var value = 0
var secondesCR=5
var listimage=["Medias/a.jpg","Medias/b.jpg","Medias/c.jpg","Medias/d.jpg","Medias/e.png"]
var positionlist=0
var buttonhide = true
var boutonvisible
var button
var button1

function setup() { 
  canvas = createCanvas(); // Creer une zone pour dessiner
  canvas.size(largeur,hauteur) //Taille de la zone à dessiner
  Imagedefond = loadImage ("Medias/b.jpg") // Integre une video
  //Imagedefond.hide() // Cacher l'image de base
  camera = createCapture(VIDEO); // Active la webcam
  camera.size(largeur, hauteur); // Taille de la webcam
  seuilSlider = createSlider(0,255,seuil) // Creer un slider 
  seuilSlider.position(20, 40) //Positionne le slider
  pixelDensity(1) // Densité du pixel
  //Imagedefond.stop() // Lance en boucle la vidéo / Stop la video
  camera.hide(); // Supprimer la webcam de base
  frameRate(60); // Changer le framerate (Image par seconde)
  //Imagedefond.loop()
  
 

  button = createButton('smile')
  button.mousePressed(comptearebours)
  button.position(353,900)
  textSize(32)
  button2 = createButton('hide')
  button2.mousePressed(hideshow)
  button2.position(0,900)
  textSize(32)
  button1 = createButton('next')
  button1.mousePressed(suivant)
  button1.position(300,900)
  button3 = createButton('Grandecran')
  button3.mousePressed(grandecran)
  button3.position(200, 200)
  textSize(32)
} 


function draw() { // Dessine chaque image
 //Imagedefond.volume(0)
  seuil = seuilSlider.value() // Modifie le seuil avec le slider
  seuilSlider.mouseReleased(move)
  //background(0) // Dessiner le fond
  image(Imagedefond, 0,0,largeur,hauteur) // Dessine l'image / La video
  loadPixels(); // Charge les pixel
  dessinerCamera() // Dessine la webcam
  updatePixels(); // Permet de charger les pixel en mouvement.
  if(secondesCR!=5 && secondesCR!=1){
  var character =''+secondesCR 
  text(character,largeur-105,25)
 }
}

 function move (){
   localStorage.setItem("ValeurSlider", "" + seuil)
   
 }
 
function windowResized(){
largeur = windowWidth
hauteur = windowHeight
canvas.size(largeur,hauteur)
camera.size(largeur, hauteur)
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

function hideshow(){
  if(buttonhide==true){
     button.hide()
     button1.hide()
     seuilSlider.hide()
     buttonhide=false
    
  }
  else{ 
button.show()
button1.show()
seuilSlider.show()
buttonhide=true
  }   
}


function grandecran() {
if (button3.mousePressed) {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}

function keyTyped() { // Permet de réagir quand on appuie sur le clavier
  if (key == 'b') { // Spécifie la touche
    comptearebours(); // applique la fonction Save
  }
 }

function Save(){ // Fonction sauvegarde
  saveCanvas(canvas, 'myCanvas', 'jpg')
} // Sauvegarde


function mouseClicked(e) { // Reagit au clic
  if(e.srcElement==canvas.canvas){ // Si le clic se situe dans la zone dessinable
  const position1d = (mouseY*largeur+mouseX)*4 // Localise le clic
  couleurfond[0]=camera.pixels [position1d+0]
  couleurfond[1]=camera.pixels [position1d+1]
  couleurfond[2]=camera.pixels [position1d+2]
  } 
  return false; 
  
 

}


function distance (r1,g1,b1,r2,g2,b2){ // Calcul la distance entre deux couleurs
  return (Math.abs(r2-r1)+Math.abs(g2-g1)+Math.abs(b2-b1))/3
}


function dessinerCamera(){ // affiche la webcam

if (camera.width == 0) {
  camera.width = camera.imageData.width
  camera.height = camera.imageData.height
}
   camera.loadPixels() // Charge les pixel de la webcam si la largeur n'est pas égale à 0
   

  if(camera.pixels.length){ // Etre sur que la caméra est chargée
 
    const w = largeur; // Variable raccourcis pour largeur
    const h = hauteur; // Variable raccourcis pour hauteur

    for (let i = 0; i < w; i=i+1) { // On se balade sur les colonnes
      for (let j = 0; j < h; j++) { // On se balade sur les lignes

        const position1dCanvas = (j*w + i)*4;      
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
}






function comptearebours(){
  secondesCR=secondesCR-1
  if(secondesCR==0){
    Save()
    secondesCR=5
  }
  
  else{
    setTimeout(comptearebours,1000)
  }
}

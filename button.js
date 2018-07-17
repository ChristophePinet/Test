
var buttonhide = true
var boutonvisible
var button
var button1
var secondesCR=5
var character =''+secondesCR

  
 
 function setupbutton() { 
seuilSlider = createSlider(0,255,seuil) // Creer un slider 
  seuilSlider.position(100, 40) //Positionne le slider
  pixelDensity(1) // Densité du pixel
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
  button4 = createButton('SauveColor')
  button4.position(25, 600);
  button4.mousePressed(sauveCouleur);
  textSize(32)

 }


function drawbutton() { // Dessine chaque image
 
  seuil = seuilSlider.value() // Modifie le seuil avec le slider
  seuilSlider.mouseReleased(move)
}
  if(secondesCR!=5 && secondesCR!=1){
   
  
  text(character,largeur-25,25)

 }

function hideshow(){
  if(buttonhide==true){
     button.hide()
     button1.hide()
     seuilSlider.hide()
     button3.hide()
     button4.hide()
     buttonhide=false
   
    
  }
  else{ 
button.show()
button1.show()
button3.show()
button4.show()
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


function sauveCouleur() {
  localStorage.setItem("couleurfondR",""+couleurfond[0]);
  localStorage.setItem("couleurfondG",""+couleurfond[1]); 
  localStorage.setItem("couleurfondB",""+couleurfond[2]); 
}

function mouseClicked(e) { // Reagit au clic
  if(e.srcElement==canvas.canvas){ // Si le clic se situe dans la zone dessinable
  const position1d = (Math.floor(mouseY)*largeur+Math.floor(mouseX))*4 // Localise le clic
  couleurfond[0]=camera.pixels [position1d+0]
  couleurfond[1]=camera.pixels [position1d+1]
  couleurfond[2]=camera.pixels [position1d+2]
  } 
  return false; 
  
 

}



function comptearebours(){
  secondesCR=secondesCR-1
  if(secondesCR==0){
    secondesCR=5
    Save()
  }
  else{
    setTimeout(comptearebours,1000)
  }
}

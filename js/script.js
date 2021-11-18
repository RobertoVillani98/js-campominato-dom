document.getElementById("play").addEventListener("click", function () {
 play();
});

function play() {
 document.querySelector(".container-square").innerHTML = "";

 const levelSelected = parseInt(document.getElementById("level").value);
 console.log("levelSelected =", levelSelected);

 let cellsNumber, cellForSide;
 const bombeNumber = 16;
 let disableGame = false;
 let counterBlueSquare = 0;
 switch (levelSelected) {
  case 1:
   cellsNumber = 100;
   cellForSide = 10;
   break;
  case 2:
   cellsNumber = 81;
   cellForSide = 9;
   break;
  case 3:
   cellsNumber = 49;
   cellForSide = 7;
 }

 function generateBombe() {
  const arraybombe = [];

  while (arraybombe.length < bombeNumber) {
   const numeroRandom = Math.floor(Math.random() * cellsNumber + 1);
   if (!arraybombe.includes(numeroRandom)) {
    arraybombe.push(numeroRandom);
   }
  }
  return arraybombe;
 }

 function inserisciBombe(bombe) {
  const quadratiArray = document.getElementsByClassName("square");
  for (let i = 0; i < bombe.length; i++) {
   const bomba = bombe[i];
   quadratiArray[bomba].classList.add("bomb");
  }
 }

 function generateAllBombos(bombe) {
  const quadratiArray = document.getElementsByClassName("square");
  for (let i = 0; i < bombe.length; i++) {
   quadratiArray[bombe[i]].classList.add("selected-gameover");
  }
 }

 function clickQuadrato(bombe) {
  const quadratiArray = document.getElementsByClassName("square");
  for (let i = 0; i < quadratiArray.length; i++) {
   quadratiArray[i].addEventListener("click", function () {
    if (this.classList.contains("bomb")) {
     this.classList.add("selected-gameover");
     alert("Hai perso!");
     generateAllBombos(bombe);
     console.log("hai effettuato: " + counterBlueSquare + " tentivi");
     disableGame = true;
    } else {
     if (!disableGame) {
      counterBlueSquare++;
      this.classList.add("selected");
     }
    }
   });
  }
 }

 generatePlaygorund();
 function generatePlaygorund() {
  const box = document.querySelector(".container-square");
  const size = `calc(100% / ${cellForSide})`;

  for (let i = 1; i <= cellsNumber; i++) {
   const cell = document.createElement("div");
   cell.classList.add("square");
   cell.innerHTML = i;
   cell.style.width = size;
   cell.style.height = size;
   box.appendChild(cell);
  }
  const bombe = generateBombe();
  if (bombe.length > 0) {
   inserisciBombe(bombe);
   clickQuadrato(bombe);
  }
 }
}

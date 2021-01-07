function remove_px(value) {
  let arr = [];
  for (let i = 0; i < value.length - 2 ; i++) {
    arr.push(value[i])
  }
  return arr.join('')
}

function random(max) {
  return Math.random() * max
}

function flooredRandom(max) {
  return Math.floor(Math.random() * max)
}


let center = document.querySelector('.center') // Gets the width of the center div
let center_style = getComputedStyle(center) // Gets the width of the center div
let center_width = remove_px(center_style['width']) // Gets the width of the center div
let centerLeft = (window.innerWidth/2) - (center_width / 2)
let centerRight = (window.innerWidth/2) + (center_width / 2)


let dots = [];

class dot {
  constructor() {
    this.x = random(window.innerWidth);
    this.y = window.innerHeight;
    this.color = [flooredRandom(255),flooredRandom(255),flooredRandom(255)]
    this.opacity = 0;
    this.growRate = random(2);

    if (this.x < centerLeft || this.x > centerRight ) {
      // out of center
      this.maxTop =  random(window.innerHeight/4) + window.innerHeight/1.9
      this.minTop =  random(window.innerHeight/2) + window.innerHeight/2
    } else {
      // in center
      this.minTop = random(window.innerHeight/4) + ((window.innerHeight / 4) * 3)
      this.maxTop = random(window.innerHeight/8) + ((window.innerHeight / 8) * 6)

      // OS - Not too bad, starts at bottom
      //this.minTop = window.innerHeight;
      //this.maxTop = (Math.random() * window.innerHeight / 3 ) + (/*9/12*/ 5/6 * window.innerHeight)

      // OS - Doesn't clear center, original solution, must remote all if conditions
      //this.maxTop = (Math.random() * window.innerHeight/4) + window.innerHeight/2
      //this.minTop = (Math.random() * window.innerHeight/2)+ window.innerHeight/2
    }

    this.stopped = false;
  }

  changeColor(clr) {

    let newColor = clr + (this.y / 10)

    if (newColor > 255) {
      return 255
    } else {
      return newColor
    }

  }

  checkStop() {
    if (this.y < 0) {
      this.stopped = true;
    } else {
      this.display();
      this.grow();
      this.changeOpacity()
    }
    return this.stopped
  }

  changeOpacity() {
    if (this.y < this.maxTop) {
      this.opacity -= 0.01
    } else if (this.y < this.minTop) {
      this.opacity += 0.01
    }
  }

  display() {
    colorMode(RGB, 255, 255, 255, 1)



    /* stroke() = mettre la couleur*/
    /* stroke(124,125,200) = mettre la couleur : rouge de 124, vert de 125, bleu de 200  */
    /* this.changeColor() = varier la couleur en fonction de la hauteur du point */
    /* this.color[0 ou 1 ou 2] = la couleur 0 du point, la couleur 1 du point, la couleur 2 du point (0 = 1, 1=2, 2=3)*/

    /* stroke(124, this.changeColor(this.color[0]), 0) = mettre la couleur : rouge = 124, vert = change en partant de la couleur verte de départ du point, bleu = 0  */


    /*stroke(this.changeColor(this.color[0]),40,this.changeColor(this.color[2]),this.opacity)*/

    stroke(120,this.changeColor(this.color[1]),240, this.opacity)




    point(this.x,this.y)
  }

  grow() {
    this.y-= this.growRate
  }

}

function createDots(numberOfDots) {
  for (let i = 0; i < numberOfDots; i++) {
    dots[i] = new dot()
  }
};

function setup() {
  let myCanvas = createCanvas(window.innerWidth - 20,window.innerHeight);
  myCanvas.parent("welcome");
  background(30);
  createDots(Math.floor(window.innerWidth / 2.8))


};

function draw() {

  for (eachDot of dots) {
    eachDot.checkStop()
  }

};

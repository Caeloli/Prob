
const brotherDiv = document.querySelector(".header-content");
const canvas = document.getElementById("particleCanvasLetters");
const ctxParticles = canvas.getContext('2d');
canvas.width = brotherDiv.clientWidth;
canvas.height = 400;
let particleArray = [];
let adjustx = 0; //Modify X & Y Position
let adjusty = 0;
//let rect = canvas.getBoundingClientRect();
//handle mouse

const mouse = {
    x:null,
    y:null,
    radius: 100
}


window.addEventListener("mousemove", function(evt){
    mouse.x = evt.x;
    mouse.y = evt.y;
});

ctxParticles.fillStyle = "white";
ctxParticles.textAlign = "start";
ctxParticles.font = "2.9rem Montserrat";
ctxParticles.fillText("Probabilidad y Estadística", 0, 30); //text we want to write, x coordinate in canvas, y coordinate in canvas

//scans area in a rectangle and saves each coordinate of the pixel in a data array
//ctx.strokeStyle = "white";
//ctx.strokeRect(0, 0, 100, 100);
const textCoordinates = ctxParticles.getImageData(0, 0, canvas.width, 400);


class Particle{
    constructor(x, y, canvas, color){
        this.x = x; // Position particle
        this.y = y;
        this.size = 2; //Radius for every particle
        this.baseX = this.x; //Hold the initial position for the particle
        this.baseY = this.y; //Hold the initial position for the particle
        this.density = (Math.random() * 30);
        this.ctx = canvas.getContext("2d");
        this.rect = canvas.getBoundingClientRect();
        this.color = color;
    }
    draw(){ 
        (this.ctx).fillStyle = this.color; //Color of ctx
        (this.ctx).beginPath(); //For starting to draw
        (this.ctx).arc(this.x, this.y, this.size, 0, Math.PI*2); //x, y, radius, startAngle, endAngle [, anticlockwise]); //Create a circle
        (this.ctx).closePath();
        (this.ctx).fill(); //Fills the current or given path with the current fillStyle
    }
    update(){
        let dx = mouse.x - this.x - this.rect.left;  //X distance between 2 points
        let dy = mouse.y - this.y - this.rect.top-20;
        let dz = Math.hypot(dx, dy);
        let forceDirectionx = dx/dz;
        let forceDirectiony = dy/dz;
        let maxDistance = mouse.radius; //maxDistance among mouse and particles
        let force = (maxDistance - dz) / maxDistance; //force among a particle and the cursor (100-20) / 100 = 0.8
        // particle current speed * 0.8 = particle movement is 20% slower
        let directionX = forceDirectionx * force * this.density;
        let directionY = forceDirectiony * force * this.density;
        if(dz < mouse.radius){ //Attracts or repel the particles
            this.x -= directionX;
            this.y -= directionY;
        }
        else{
            if(this.x !== this.baseX){ // We do not use else if, cause we want that there are mutually exclusive codes
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
        }
            
    }
}

function init(){ //Create particle objects from a class
    particleArray = [];
    for(let y = 0, y2 = textCoordinates.height; y < y2; y++){
        for(let x = 0, x2 = textCoordinates.width; x < x2; x++){    //textCoordinates.height .witdh .data are properties on automatically generated object by calling getImagenData
            if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 5) + 4] > 128){  //number 128 means 50% opacity, possible range for alpha value in clamped array is between 0 and 255
                let positionX = x + adjustx;
                let postionY = y + adjusty;
                particleArray.push(new Particle(positionX * 4, postionY * 4, canvas, "#05386b")); //Adjusting * 10 modifies height and width of the letters
            }
        }
    }
}
init();
console.log(particleArray);

function animate(){
    ctxParticles.clearRect(0, 0, canvas.width, canvas.height);
        for(let i=0; i < particleArray.length; i++ ){
            particleArray[i].draw();
            particleArray[i].update();
        }
        requestAnimationFrame(animate); //Create a loop of animation 
        //tells the browser that you wish to perform an animation and requests that the browser 
        //calls a specified function to update an animation before the next repaint.tells the browser that you wish to perform an animation
}

animate();

const canvasGeneralParticles = document.getElementById("particleCanvas");
const ctxGen = canvasGeneralParticles.getContext('2d');
canvasGeneralParticles.width = window.innerWidth - 20;
canvasGeneralParticles.height = window.innerHeight;

let particleArrayUniversal = [];

//handle mouse



ctxGen.fillStyle = "white";
ctxGen.font = "30px Verdana";
ctxGen.fillText("A", 0, 40); //text we want to write, x coordinate in canvas, y coordinate in canvas

//scans area in a rectangle and saves each coordinate of the pixel in a data array
//ctx.strokeStyle = "white";
//ctx.strokeRect(0, 0, 100, 100);
const data = ctxGen.getImageData(0, 0, 100, 100);

function initGen(){ //Create particle objects from a class
    particleArrayUniversal = [];
    for(let i=0; i < 1200; i++){
        let x = Math.random() * canvasGeneralParticles.width;
        let y = Math.random() * canvasGeneralParticles.height;
        particleArrayUniversal.push(new Particle(x, y, canvasGeneralParticles, "#05386b"));
    }
}

initGen();
console.log(particleArrayUniversal);


function animateGeneral(){
    ctxGen.clearRect(0, 0, canvasGeneralParticles.width, canvasGeneralParticles.height);
        for(let i=0; i < particleArrayUniversal.length; i++ ){
            particleArrayUniversal[i].draw();
            particleArrayUniversal[i].update();
        }
        requestAnimationFrame(animateGeneral); //Create a loop of animation 
        //tells the browser that you wish to perform an animation and requests that the browser 
        //calls a specified function to update an animation before the next repaint.tells the browser that you wish to perform an animation
}

animateGeneral();

//Variables usadas
var objRuleta;
var winningSegment;
var distnaciaX = 1500;
var distnaciaY = 50;
var ctx;

//Función para despliegue de mensaje de ganador
function Mensaje() {
    winningSegment = objRuleta.getIndicatedSegment();
    swal({
        title: " ¡Usted ha ganado el "+winningSegment.text+"!",
        //showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        confirmButtonText: "Reiniciar",
        //cancelButtonText: "Quitar elemento",
        closeOnConfirm: true,
        closeOnCancel: true
    },

    function (isConfirm) {
        if (isConfirm) {} else {
        $('#ListaPremios').val($('#ListaPremios').val().replace(winningSegment.text,""));
        leerElementos();
    }
    objRuleta.stopAnimation(false);
    objRuleta.rotationAngle = 0;
    objRuleta.draw();
    DibujarTriangulo();
});}

//Dibujar el triángulo de elección
function DibujarTriangulo() {
    distnaciaX = 50;
    distnaciaY = -10;
    ctx = objRuleta.ctx;
    ctx.strokeStyle = 'navy';
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(distnaciaX + 170, distnaciaY + 5);
    ctx.lineTo(distnaciaX + 230, distnaciaY + 5);
    ctx.lineTo(distnaciaX + 200, distnaciaY + 40);
    ctx.lineTo(distnaciaX + 171, distnaciaY + 5);
    ctx.stroke();
    ctx.fill();
}

//Función para dibujar la ruleta
function DibujarRuleta(ArregloElementos) {
    objRuleta = new Winwheel({
        'canvasId': 'canvas',
        'textAlignment': 'center',
        'numSegments': ArregloElementos.length, //Cantidad de divisiones
        'lineWidth':3,
        'outerRadius': 245,
        'innerRadius': 5,
        'segments':ArregloElementos,
        'pins':true,
        'animation':{
            'type': 'spinToStop',
            'duration':8, //Segundos girando
            'spins': 15, //Cantidad de vueltas
            'callbackFinished': 'Mensaje()',
            'callbackAfter': 'DibujarTriangulo()'
        },
    });
    DibujarTriangulo();
}

//Función para leer elementos de los premios
function leerElementos() {
    txtListaElementos=$('#ListaPremios').val().trim();
    var Elementos = txtListaElementos.split('\n');
    var ElementosRuleta= [];
    Elementos.forEach(function (Elemento) {
        if(Elemento){
        ElementosRuleta.push({ 'fillStyle': "#" + (Math.floor(Math.random()*16777215).toString(16)), 'text': Elemento }); //Size para modificar el tamaño
        }
    });
    DibujarRuleta(ElementosRuleta);
}

function generarProbabilidad() {
  let elementos = document.getElementById("ListaPremios").value.split("\n");
  let tirosTotales = parseInt(document.getElementById("tirosTotales").value);
  let probabilidadTotal = 1 - Math.pow((elementos.length-1)/elementos.length,tirosTotales);
  let probabilidadParticular = (1/(elementos.length));

  //Redondear a tres dígitos
  let probabilidadTotalround = probabilidadTotal.toFixed(3);
  let probabilidadParticularround = probabilidadParticular.toFixed(3);

  //Texto de probabilidad 
  let probabilidadTxt = "La probabilidad de obtener un premio en particular es de " + "<b>"+ probabilidadParticularround +"</b>.<br>"+ "La probabilidad de obtener un premio en particular en " + tirosTotales +" tiros es de <b>"+ probabilidadTotalround + "</b>.<br>";

  document.getElementById("texto").innerHTML = probabilidadTxt;
}

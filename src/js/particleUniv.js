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

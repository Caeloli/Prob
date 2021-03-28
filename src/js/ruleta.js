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

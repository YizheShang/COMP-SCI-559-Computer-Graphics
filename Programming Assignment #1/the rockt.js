function setUp(){
  var canvas = document.getElementById('myCanvas');

  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = 0;

  function draw(){
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get various parameters
    var dx = slider1.value;
    var dy = slider2.value;
    
    function drawBody(color){
      // a thick red line
      context.lineWidth = 2;
      context.strokeStyle = color;
      
      // the body of the rocket
      context.beginPath();
      context.moveTo(150,80);
      context.lineTo(250,80);
      context.lineTo(250,300);
      context.lineTo(150,300);
      context.lineTo(150,80);
      context.stroke();

      // the head of the rocket
      context.beginPath();
      context.moveTo(150,80);
      context.lineTo(200,20);
      context.lineTo(250,80);
      context.stroke();
      context.moveTo(200, 20);
      context.lineTo(200, 2);
      context.stroke();


      // Main engines
      context.moveTo(160, 300);
      context.lineTo(150, 320);
      context.lineTo(180, 320);
      context.lineTo(170, 300);
      context.lineTo(230, 300);
      context.lineTo(220, 320);
      context.lineTo(250, 320);
      context.lineTo(240, 300);
      context.stroke();

      // Left engine
      context.moveTo(150, 300);
      context.lineTo(120, 300);
      context.lineTo(120, 230);
      context.lineTo(150, 230);
      context.lineTo(150, 300);
      context.stroke();

      // Right engine
      context.moveTo(250, 300);
      context.lineTo(280, 300);
      context.lineTo(280, 230);
      context.lineTo(250, 230);
      context.lineTo(250, 300);
      context.stroke();
      }
    
    context.save();
    context.translate(dx,dy);
//    context.scale(1,-1);
    drawBody("red");
    context.restore();
    
  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  draw();
}
window.onload = setUp;











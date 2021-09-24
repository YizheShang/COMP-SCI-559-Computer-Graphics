function setUp(){
  var canvas = document.getElementById('myCanvas');

  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = 0;

  function draw(){
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    canvas.style.background = "lightblue";
    // use the sliders to get various parameters
    var dx = slider1.value;
    var dy = slider2.value;
    
    function drawBody(color){
      // a thin line
      context.lineWidth = 2;
      context.strokeStyle = color;
      
      // the body of the rocket
      context.beginPath();context.fillStyle = "white";
      context.moveTo(150,80);context.lineTo(250,80);
      context.lineTo(250,300);context.lineTo(150,300);
      context.lineTo(150,80);context.stroke();
      context.fill();

      // the head of the rocket
      context.beginPath();context.fillStyle = "red";
      context.moveTo(150,80);context.lineTo(200,20);
      context.lineTo(250,80);context.stroke();
      context.moveTo(200, 20);context.lineTo(200, 2);
      context.stroke();context.fill();
      
      // window
      context.beginPath();
      context.rect(175, 100, 50, 50);
      context.stroke();context.fillStyle = "green";
      context.fill();
      
      // Main engines
      context.beginPath();context.fillStyle = "black";
      context.moveTo(160, 300);context.lineTo(150, 320);
      context.lineTo(180, 320); context.lineTo(170, 300);
      context.lineTo(230, 300);context.lineTo(220, 320);
      context.lineTo(250, 320);context.lineTo(240, 300);
      context.stroke();context.fill();

      // Left engine
      context.beginPath();
      context.moveTo(150, 300);context.lineTo(120, 300);
      context.lineTo(120, 230);context.lineTo(150, 230);
      context.lineTo(150, 300);context.fillStyle = "blue";
      context.stroke();

      // Right engine
      context.moveTo(250, 300);context.lineTo(280, 300);
      context.lineTo(280, 230);context.lineTo(250, 230);
      context.lineTo(250, 300);context.stroke();
      context.fill()
      }
    
    function drawFlames(color){
      context.lineWidth = 1;
      context.strokeStyle = color;
      context.fillStyle = "yellow";
      
      context.beginPath();
      context.moveTo(150, 320);context.lineTo(165, 370);
      context.lineTo(180, 320);context.lineTo(150, 320);
      context.stroke();context.fill();
      
      context.moveTo(220, 320);context.lineTo(235, 370);
      context.lineTo(250, 320);context.lineTo(220, 320);
      context.stroke();context.fill();
      
      context.moveTo(150, 300);context.lineTo(135, 340);
      context.lineTo(120, 300);context.lineTo(150, 300);
      context.stroke();context.fill();
      
      context.moveTo(250, 300);context.lineTo(265, 340);
      context.lineTo(280, 300);context.lineTo(250, 300);
      context.stroke();context.fill();
      
      
    }
    
    context.save();
    
    context.translate(dx,dy);
    drawBody("black");
    drawFlames("red");
    context.restore();
    
  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  draw();
}
window.onload = setUp;

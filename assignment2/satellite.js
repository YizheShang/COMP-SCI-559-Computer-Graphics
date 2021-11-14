function setup() {
    var canvas = document.getElementById('myCanvas');
    var slider1 = document.getElementById('slider1');
    var slider2 = document.getElementById('slider2');
    var angle = 20;
    slider1.value = 0;
    slider2.value = 0;

    function draw() {
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;
        dx = slider1.value;
        dsat2 = slider2.value;

        function drawSun() {
            context.linewidth = 6;
            context.beginPath(); context.strokeStyle = "black";
            context.arc(250, 250, 45, 0, 2 * Math.PI); context.stroke();
            context.fillStyle = "yellow"; context.fill();
            context.beginPath(); context.strokeStyle = "red";
            context.arc(250, 250, 30, 0, 2 * Math.PI); context.stroke();
            context.fillStyle = "red"; context.fill();
        }

        function drawTrajectory(radius) {
            context.beginPath(); context.linewidth = 3;
            context.arc(0, 0, 50 + radius, 0, 2 * Math.PI); context.stroke();
        }

        function drawPlanet(color, radius) {
            context.linewidth = 6;
            context.beginPath(); context.strokeStyle = "black";
            context.arc(50, 50, radius, 0, 2 * Math.PI); context.stroke();
            context.fillStyle = color; context.fill();

        }

        function drawAxes() {
            context.strokeStyle = "red"; context.linewidth = 20;
            context.beginPath();
            context.moveTo(0, 0); context.lineTo(140, 0); context.stroke();
            context.moveTo(0, 0); context.lineTo(0, 140); context.stroke();
        }

        function drawSat() {
            context.beginPath();
            context.strokeStyle = "black";
            context.moveTo(50, 51); context.lineTo(70, 51);
            context.lineTo(70, 70); context.lineTo(50, 70);
            context.lineTo(50, 51); context.stroke();
            context.fillStyle = "white"; context.fill();

            context.beginPath();
            context.moveTo(58, 70); context.lineTo(62, 70);
            context.lineTo(62, 85); context.lineTo(58, 85);
            context.lineTo(58, 70); context.stroke();
            context.moveTo(40, 75); context.lineTo(80, 75);
            context.lineTo(80, 77); context.lineTo(40, 77);
            context.lineTo(40, 75); context.stroke();
            context.fillStyle = "black"; context.fill();

            context.beginPath()
            context.moveTo(45, 85); context.lineTo(75, 85);
            context.lineTo(75, 135); context.lineTo(45, 135);
            context.lineTo(45, 85); context.stroke();
            context.fillStyle = "white"; context.fill();

            context.beginPath();
            context.moveTo(40, 60); context.lineTo(40, 90);
            context.lineTo(5, 90); context.lineTo(5, 60);
            context.lineTo(40, 60); context.stroke();
            context.moveTo(80, 60); context.lineTo(80, 90);
            context.lineTo(115, 90); context.lineTo(115, 60);
            context.lineTo(80, 60); context.stroke();
            context.fillStyle = "lightblue"; context.fill();
        }

        context.translate(dx, 0);

        drawSun(); // Draw Sun
        context.save();

        context.translate(250, 250); // Center
        //drawAxes();
        drawTrajectory(60);
        drawTrajectory(190);
        context.save();

        context.save(); // Big lightcoral planet to center.
        let angleLightCoralPlanet = angle;
        angleLightCoralPlanet = (angleLightCoralPlanet + 0.00001) % 360;
        context.rotate(angleLightCoralPlanet);
        context.save();
        context.translate(120, 120);
        drawPlanet("lightcoral", 60);
        context.restore();
        context.restore();

        context.save(); // Aqua planet to center.
        let angleRedPlan = angle;
        angleRedPlan = (angleRedPlan + 0.007) % 360;
        context.rotate(angleRedPlan);
        context.save();
        drawPlanet("aqua", 20);
        drawTrajectory(20);
        context.restore();

        context.save();
        context.translate(51, 48); // Grey planet to red planet.
        let angleGreyPlanet = angleRedPlan + 0.02;
        context.rotate(angleGreyPlanet);
        drawPlanet("grey", 10);
        drawTrajectory(22);
        context.restore(); // Return to red planet
        context.restore(); // return to center.

        context.rotate(angle); // Rotate center;
        angle = (angle + 0.002) % 360;
        context.save(); // Rotating center to center.

        context.scale(1, -1); // Inclined center to rotating center.
        context.rotate((90 * Math.PI) / 180);
        context.translate(50, -60);
        context.save();


        context.save();
        context.save();
        context.translate(80, -120); // Brown planet to inclined center.
        let angleBrownPlanet = angle;
        angleBrownPlanet = (angleBrownPlanet + 0.009) % 360;
        context.rotate(angleBrownPlanet);
        drawPlanet("brown", 30);


        context.save(); // Purple planet to Brown planet.
        context.translate(30, 50);
        angle = (angle + 0.02) % 360;
        context.rotate(angle);
        drawPlanet("purple", 30);

        context.save(); // Green planet to purple planet.
        context.translate(52, 50);
        let angleGreenPlanet = angle;
        context.rotate(angleGreenPlanet);
        angleGreenPlanet = (angleGreenPlanet + 0.03) & 360;
        drawPlanet("lightgreen", 10);
        drawTrajectory(20);
        context.restore(); // Return to purple planet to brown planet.
        context.restore(); // Return to Brown planet.
        context.restore();




        drawSat(); // Inner satellite to inclined center.
        context.restore() // Return to inclined center to rotating center.


        context.restore();
        // Inclined center to center.
        context.restore(); // Return to Brown planet to Inclined center;


        context.rotate(angle);
        angle = (angle + 0.002) % 360;

        context.translate(90, -dsat2);
        context.scale(-1, 1);

        context.rotate(-(90 * Math.PI) / 180);

        drawSat();


        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
    //draw();
}
window.onload = setup;

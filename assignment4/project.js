function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1'); 
    var slider2 = document.getElementById('slider2');
    slider1.value = 10; slider2.value = 0;
    var tParam2 = 0.5;
    var tParam3 = 0.2;
    var tParam4 = 0.05;
    

    function draw() {
        canvas.width = canvas.width;
        // use the sliders to get the angles
        var tParam = slider1.value * 0.01;
        var tParam5 = slider2.value * 0.01;
        
        
        function moveToTx(loc, Tx) { var res = vec2.create(); vec2.transformMat3(res, loc, Tx); context.moveTo(res[0], res[1]); }

        function lineToTx(loc, Tx) { var res = vec2.create(); vec2.transformMat3(res, loc, Tx); context.lineTo(res[0], res[1]); }

        function arcToTx(loc, Tx, radius, sAngle, eAngle) {
            var res = vec2.create(); vec2.transformMat3(res, loc, Tx);
            context.beginPath(); context.strokeStyle = "grey";
            context.arc(res[0], res[1], radius, sAngle, eAngle); 
            context.stroke();
            context.fillStyle = "grey"; context.fill();

        }

        function drawBorders() {
            context.beginPath(); context.strokeStyle = "black"; context.lineWidth = 5;
            let len = canvas.width;
            context.moveTo(0, 0); context.lineTo(0, len); context.lineTo(len, len); context.lineTo(len, 0);
            context.lineTo(0, 0); context.stroke();
        }

        function drawCar(color, Tx) {
            context.beginPath(); context.lineWidth = 3; context.strokeStyle = "black";
            moveToTx([-10, 25], Tx); lineToTx([10, 25], Tx); lineToTx([10, -25], Tx); lineToTx([-10, -25], Tx);
            lineToTx([-10, 25], Tx); context.stroke(); context.fillStyle = "grey"; context.fill();

            //rectToTx([-10, 25], 20, 50, Tx); context.stroke(); context.fillStyle = "green"; context.fill();

            context.beginPath(); 
            moveToTx([-10, 25], Tx); lineToTx([-5, 35], Tx); lineToTx([5, 35], Tx); lineToTx([10, 25], Tx); lineToTx([-10, 25], Tx);
            context.stroke(); context.fill(); context.fillStyle = color; context.fill();

            context.beginPath(); context.lineWidth = 2;
            moveToTx([-17, 20], Tx); lineToTx([-12, 20], Tx); lineToTx([-12, 5], Tx); lineToTx([-17, 5], Tx); lineToTx([-17, 20], Tx);
            moveToTx([-17, -7], Tx); lineToTx([-12, -7], Tx); lineToTx([-12, -22], Tx); lineToTx([-17, -22], Tx); lineToTx([-17, -7], Tx);
            moveToTx([12, 20], Tx); lineToTx([17, 20], Tx); lineToTx([17, 5], Tx); lineToTx([12, 5], Tx); lineToTx([12, 20], Tx);
            moveToTx([12, -7], Tx); lineToTx([17, -7], Tx); lineToTx([17, -22], Tx); lineToTx([12, -22], Tx); lineToTx([12, -7], Tx);
            context.fillStyle = "white"; context.fill();
            context.stroke();

            context.beginPath(); context.strokeStyle = "black";
            moveToTx([-6, -20], Tx); lineToTx([-8, -33], Tx); moveToTx([6, -20], Tx); lineToTx([8, -33], Tx); context.stroke();

            context.beginPath(); moveToTx([-10, -33], Tx); lineToTx([10, -33], Tx); lineToTx([10, -38], Tx); lineToTx([-10, -38], Tx);
            lineToTx([-10, -33], Tx); context.stroke(); context.fillStyle = "black"; context.fill();


        }

        function drawStart(loc, Tx){
            context.beginPath();
            moveToTx([loc[0]-20, loc[1]-10], Tx); lineToTx([loc[0]+20, loc[1]-10]);
        }

        function drawAxes(Tx) {
            context.beginPath();
            context.strokeStyle = "black"; context.lineWidth = 2;
            moveToTx([0, 0], Tx); lineToTx([0, 100], Tx);
            moveToTx([0, 0], Tx); lineToTx([100, 0], Tx);
            context.stroke();
        }

        var Hermite = function (t) {
            return [
                2 * t * t * t - 3 * t * t + 1,
                t * t * t - 2 * t * t + t,
                -2 * t * t * t + 3 * t * t,
                t * t * t - t * t
            ];
        }

        var HermiteDerivative = function (t) {
            return [
                6 * t * t - 6 * t,
                3 * t * t - 4 * t + 1,
                -6 * t * t + 6 * t,
                3 * t * t - 2 * t
            ];
        }

        function Cubic(basis, P, t) {
            var b = basis(t);
            var result = vec2.create();
            vec2.scale(result, P[0], b[0]);
            vec2.scaleAndAdd(result, result, P[1], b[1]);
            vec2.scaleAndAdd(result, result, P[2], b[2]);
            vec2.scaleAndAdd(result, result, P[3], b[3]);
            return result;
        }

        function drawTrajectory2(t_begin, t_end, intervals, C, Tx) {
            for (var i = 1; i <= intervals; i++) {
                var t = ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
                arcToTx(C(t), Tx, 20, 0, 2 * Math.PI);
            }
        }

        function drawTrajectory1(t_begin,t_end,intervals,C,Tx,color) {
            context.strokeStyle=color;
            context.beginPath(); context.lineWidth = 2;
                moveToTx(C(t_begin),Tx);
                for(var i=1;i<=intervals;i++){
            var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
            lineToTx(C(t),Tx);
                }
                context.stroke();
        }



        var p0 = [50, 100];
        var d0 = [-10, 50];
        var p1 = [200, 200];
        var d1 = [250, 30];
        var p2 = [500, 160];
        var d2 = [200, 300];
        var p3 = [500, 500];
        var d3 = [50, 300];
        var p4 = [100, 450];
        var d4 = [500, 20];
        var d4Times2 = [1000, 40];
        var p5 = [100, 240];
        var d5 = [240, 30];
        var p6 = [50, 100];
        var d6 = [30, 600];

        var P0 = [p0, d0, p1, d1];
        var P1 = [p1, d1, p2, d2]; // Form a C1 continuity
        var P2 = [p2, d2, p3, d3];
        var P3 = [p3, d3, p4, d4];
        var P4 = [p4, d4Times2, p5, d5]; // Form a G1 continuity
        var P5 = [p5, d5, p6, d6];

        var C0 = function (t_) { return Cubic(Hermite, P0, t_); };
        var C1 = function (t_) { return Cubic(Hermite, P1, t_); };
        var C2 = function (t_) { return Cubic(Hermite, P2, t_); };
        var C3 = function (t_) { return Cubic(Hermite, P3, t_); };
        var C4 = function (t_) { return Cubic(Hermite, P4, t_); };
        var C5 = function (t_) { return Cubic(Hermite, P5, t_); };

        var C0prime = function (t_) { return Cubic(HermiteDerivative, P0, t_); };
        var C1prime = function (t_) { return Cubic(HermiteDerivative, P1, t_); };
        var C2prime = function (t_) { return Cubic(HermiteDerivative, P2, t_); };
        var C3prime = function (t_) { return Cubic(HermiteDerivative, P3, t_); };
        var C4prime = function (t_) { return Cubic(HermiteDerivative, P4, t_); };
        var C5prime = function (t_) { return Cubic(HermiteDerivative, P5, t_); };

        var Ccomp = function (t) {
            if (t < 1) {
                var u = t;
                return C0(u);
            } else if (t < 2) {
                var u = t - 1.0;
                return C1(u);
            } else if (t < 3) {
                var u = t - 2.0;
                return C2(u);
            } else if (t < 4) {
                var u = t - 3.0;
                return C3(u);
            } else if (t < 5) {
                var u = t - 4.0;
                return C4(u);
            } else {
                var u = t - 5.0;
                return C5(u);
            } 
        }


        function Cubic(basis, P, t) {
            var b = basis(t);
            var result = vec2.create();
            vec2.scale(result, P[0], b[0]);
            vec2.scaleAndAdd(result, result, P[1], b[1]);
            vec2.scaleAndAdd(result, result, P[2], b[2]);
            vec2.scaleAndAdd(result, result, P[3], b[3]);
            return result;
        }

        var Ccomp_tangent = function (t) {
            if (t < 1) {
                var u = t;
                return C0prime(u);
            } else if (t < 2) {
                var u = t - 1.0;
                return C1prime(u);
            } else if (t < 3) {
                var u = t - 2.0;
                return C2prime(u);
            } else if (t < 4) {
                var u = t - 3.0;
                return C3prime(u);
            } else if (t < 5) {
                var u = t - 4.0;
                return C4prime(u);
            } else {
                var u = t - 5.0;
                return C5prime(u);
            }
        }


        drawBorders();
        

        var Tblue_to_canvas = mat3.create();
        mat3.fromTranslation(Tblue_to_canvas, [0, 600]);
        mat3.scale(Tblue_to_canvas, Tblue_to_canvas, [1, -1]); // Flip the Y-axis
        //drawRoad([300, 300], Tblue_to_canvas);

        // Draw trajectories.
        drawTrajectory2(0.0, 1.0, 100, C0, Tblue_to_canvas);
        drawTrajectory2(0.0, 1.0, 100, C1, Tblue_to_canvas);
        drawTrajectory2(0.0, 1.0, 100, C2, Tblue_to_canvas);
        drawTrajectory2(0.0, 1.0, 100, C3, Tblue_to_canvas);
        drawTrajectory2(0.0, 1.0, 100, C4, Tblue_to_canvas);
        drawTrajectory2(0.0, 1.0, 100, C5, Tblue_to_canvas);

        drawTrajectory1(0.0, 1.0, 250, C0, Tblue_to_canvas, "white");
        drawTrajectory1(0.0, 1.0, 250, C1, Tblue_to_canvas, "white");
        drawTrajectory1(0.0, 1.0, 250, C2, Tblue_to_canvas, "white");
        drawTrajectory1(0.0, 1.0, 250, C3, Tblue_to_canvas, "white");
        drawTrajectory1(0.0, 1.0, 250, C4, Tblue_to_canvas, "white");
        drawTrajectory1(0.0, 1.0, 250, C5, Tblue_to_canvas, "white");

        // Draw Car1.
        var car1_to_blue = mat3.create(); mat3.fromTranslation(car1_to_blue, Ccomp(tParam));
        var car1_to_canvas = mat3.create();
        var tangent = Ccomp_tangent(tParam);
        var angle = Math.atan2(tangent[1], tangent[0]);
        mat3.rotate(car1_to_blue, car1_to_blue, angle);
        mat3.rotate(car1_to_blue, car1_to_blue, (-95 * Math.PI / 180));
        mat3.multiply(car1_to_canvas, Tblue_to_canvas, car1_to_blue);
        drawCar("white", car1_to_canvas); //drawAxes(car1_to_canvas);

        // Draw Car2. Color is green.
        var car2_to_blue = mat3.create(); mat3.fromTranslation(car2_to_blue, Ccomp(tParam2));
        var car2_to_canvas = mat3.create();
        var tangent2 = Ccomp_tangent(tParam2); tParam2 = (tParam2 + 0.02) % 6;
        var angle2 = Math.atan2(tangent2[1], tangent2[0]);
        mat3.rotate(car2_to_blue, car2_to_blue, angle2);
        mat3.rotate(car2_to_blue, car2_to_blue, (-95 * Math.PI / 180));
        mat3.multiply(car2_to_canvas, Tblue_to_canvas, car2_to_blue);
        drawCar("green", car2_to_canvas); //drawAxes(car2_to_canvas);

        // Draw Car3. Color is yellow.
        var car3_to_blue = mat3.create(); mat3.fromTranslation(car3_to_blue, Ccomp(tParam3));
        var car3_to_canvas = mat3.create();
        var tangent3 = Ccomp_tangent(tParam3); tParam3 = (tParam3 + 0.02) % 6;
        var angle3 = Math.atan2(tangent3[1], tangent3[0]);
        mat3.rotate(car3_to_blue, car3_to_blue, angle3);
        mat3.rotate(car3_to_blue, car3_to_blue, (-95 * Math.PI / 180));
        mat3.multiply(car3_to_canvas, Tblue_to_canvas, car3_to_blue);
        drawCar("yellow", car3_to_canvas);

        // Draw Car4. Color is red
        var car4_to_blue = mat3.create(); mat3.fromTranslation(car4_to_blue, Ccomp(tParam4));
        var car4_to_canvas = mat3.create();
        var tangent4 = Ccomp_tangent(tParam4); tParam4 = (tParam4 + 0.02) % 6;
        var angle4 = Math.atan2(tangent4[1], tangent4[0]);
        mat3.rotate(car4_to_blue, car4_to_blue, angle4);
        mat3.rotate(car4_to_blue, car4_to_blue, (-95 * Math.PI / 180));
        mat3.multiply(car4_to_canvas, Tblue_to_canvas, car4_to_blue);
        drawCar("red", car4_to_canvas); 

        // Draw Car5. Color is blue.
        var car5_to_blue = mat3.create(); mat3.fromTranslation(car5_to_blue, Ccomp(tParam5));
        var car5_to_canvas = mat3.create();
        var tangent5 = Ccomp_tangent(tParam5); 
        var angle5 = Math.atan2(tangent5[1], tangent5[0]);
        mat3.rotate(car5_to_blue, car5_to_blue, angle5);
        mat3.rotate(car5_to_blue, car5_to_blue, (-95 * Math.PI / 180));
        mat3.multiply(car5_to_canvas, Tblue_to_canvas, car5_to_blue);
        drawCar("blue", car5_to_canvas); 

        window.requestAnimationFrame(draw);
        // console.log("tParam: ", tParam);
        // console.log("tParam2: ", tParam2);

    }
    window.requestAnimationFrame(draw);

}

window.onload = setup;
function setup() {
    var canvas = document.getElementById('myCanvas');
    var angle = 10;

    function draw() {
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;

        function axes(color,Tx) {
            context.strokeStyle=color;
            context.beginPath();
            // Axes
            moveToTx(120,0,Tx);lineToTx(0,0,Tx);lineToTx(0,120,Tx);
            // Arrowheads
            moveToTx(110,5,Tx);lineToTx(120,0,Tx);lineToTx(110,-5,Tx);
            moveToTx(5,110,Tx);lineToTx(0,120,Tx);lineToTx(-5,110,Tx);
            // X-label
            moveToTx(130,-5,Tx);lineToTx(140,5,Tx);
            moveToTx(130,5,Tx);lineToTx(140,-5,Tx);
            // Y-label
            moveToTx(-5,130,Tx);lineToTx(0,135,Tx);lineToTx(5,130,Tx);
            moveToTx(0,135,Tx);lineToTx(0,142,Tx);
            context.stroke();
        }

        function moveToTx(x,y,Tx)
	        {var res=vec2.create(); vec2.transformMat3(res,[x,y],Tx); context.moveTo(res[0],res[1]);}

	    function lineToTx(x,y,Tx)
	        {var res=vec2.create(); vec2.transformMat3(res,[x,y],Tx); context.lineTo(res[0],res[1]);}

        function quadraticCurveToTx(cpx1, cpy1, x1, y1, Tx){
            var resC1 = vec2.create(); vec2.transformMat3(resC1, [cpx1, cpy1], Tx);
            var resE1 = vec2.create(); vec2.transformMat3(resE1, [x1, y1], Tx);

            context.quadraticCurveTo(resC1[0], resC1[1], resE1[0], resE1[1]);
            //context.quadraticCurveTo(resC2[0], resC2[1], resE2[0], resE2[1]); context.stroke();
            //context.fillStyle = "black"; context.fill();
        }
        
        function tomoe(cx, cy, r, sr, er, Tx) {
            var res = vec2.create(); vec2.transformMat3(res,[cx,cy],Tx);
            context.beginPath(); context.strokeStyle = "black";
            context.arc(res[0], res[1], r, sr, er); context.stroke();
            context.fillStyle="black"; context.fill();
            context.beginPath();
            moveToTx(115, 85, Tx); //lineToTx(130, 130, Tx);
            //moveToTx(res[0]+25, res[1]-5, Tx); 
            //context.quadraticCurveToTx(res[0]+40, res[1]+40, res[0], res[1]+65, Tx);
            quadraticCurveToTx(130, 130, 90, 155, Tx);
            quadraticCurveToTx(130, 118, 85, 114, Tx);          
            context.stroke();
            context.fillStyle="black"; context.fill(); 
        }

        function drawEyes() {
            context.beginPath(); context.strokeStyle = "black";
            context.arc(250, 250, 200, 0, 2 * Math.PI); context.stroke();
            context.fillStyle = "black"; context.fill();

            context.beginPath(); context.arc(250, 250, 190, 0, 2 * Math.PI); context.stroke();
            context.fillStyle = "darkred"; context.fill();

            context.beginPath(); context.arc(250, 250, 35, 0, 2 * Math.PI); context.stroke();
            context.fillStyle = "black"; context.fill();

            context.linewidth = 70;
            context.beginPath(); context.arc(250, 250, 130, 0, 2 * Math.PI); context.stroke();
        }




        var rotation_to_canvas = mat3.create();
        mat3.fromTranslation(rotation_to_canvas, [250, 250]);
        mat3.rotate(rotation_to_canvas, rotation_to_canvas, -angle);
        angle = (angle + 0.01) % 360;

        var base_to_rotation = mat3.create();
        mat3.fromTranslation(base_to_rotation, [-250, -250]);
        mat3.multiply(base_to_rotation, base_to_rotation, rotation_to_canvas);
        drawEyes(); //axes("yellow", rotation_to_canvas); 

        var tomoe1Base_to_rotation = mat3.create();
        mat3.fromTranslation(tomoe1Base_to_rotation, [0, 0]);
        mat3.multiply(tomoe1Base_to_rotation, tomoe1Base_to_rotation, rotation_to_canvas);
        var tomoe1_to_tomoe1Base = mat3.create();
        mat3.fromTranslation(tomoe1_to_tomoe1Base, [0, 0]);
        mat3.multiply(tomoe1_to_tomoe1Base, tomoe1_to_tomoe1Base, tomoe1Base_to_rotation);
        //axes("green", tomoe1_to_tomoe1Base);
        tomoe(90, 90, 25, 0, 2 * Math.PI, tomoe1_to_tomoe1Base);

        var tomoe2_to_base = mat3.create();
        mat3.fromTranslation(tomoe2_to_base, [0, 0]);
        mat3.multiply(tomoe2_to_base, tomoe2_to_base, rotation_to_canvas);
        mat3.rotate(tomoe2_to_base, tomoe2_to_base, -(125 * Math.PI / 180));
        //axes("blue", tomoe2_to_base);
        tomoe(90, 90, 25, 0, 2 * Math.PI, tomoe2_to_base);

        var tomoe3_to_base = mat3.create();
        mat3.fromTranslation(tomoe3_to_base, [0, 0]);
        mat3.multiply(tomoe3_to_base, tomoe3_to_base, rotation_to_canvas);
        mat3.rotate(tomoe3_to_base, tomoe3_to_base, (115 * Math.PI / 180));
        //axes("blue", tomoe3_to_base);
        tomoe(90, 90, 25, 0, 2 * Math.PI, tomoe3_to_base);

    
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
    //draw();



}

window.onload = setup;
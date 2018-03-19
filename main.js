var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
var paintting = false;
var lastPoint = {x:undefined,y:undefined}

canvas.onmousedown = function (aaa) {
    paintting = true
    var x = aaa.clientX
    var y = aaa.clientY
    lastPoint = {x: x,y: y}
    drawCircle(x,y)
}
canvas.onmousemove = function (bbb) {
    if(paintting) {
        var x = bbb.clientX
        var y = bbb.clientY
        var newPoint = {x: x,y: y}
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
    }
}
canvas.onmouseup = function () {
    paintting = false
}

function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 5;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.stroke();
}
function drawCircle(x,y) {
    ctx.beginPath();
    ctx.arc(x,y,5,0,Math.PI*2,);
    ctx.fill();
}
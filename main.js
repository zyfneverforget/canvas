var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
getSize();
window.onresize = function() {
    getSize();
}
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
        lastPoint = newPoint //importent
    }
}
canvas.onmouseup = function () {
    paintting = false
}
/*----------------*/


function getSize () {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}
function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 6;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.stroke();
}
function drawCircle(x,y) {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(x,y,3,0,Math.PI*2,);
    ctx.fill();
}
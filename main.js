var canvas = document.getElementById('canvas');
var eraser = document.getElementById('eraser');
var ctx = canvas.getContext('2d');
//var action = document.getElementById('action');
//var brush = document.getElementById('brush');

getSize();
window.onresize = function() {
    getSize();
}
var mouseDown = false;
var lastPoint = {x:undefined,y:undefined}


canvas.onmousedown = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    lastPoint = {x: x,y: y}
    mouseDown = true
    if(eraserEnable){
        ctx.clearRect(x-5,y-5,10,10);
    } else {
        drawCircle(x,y)
    } 
}
canvas.onmousemove = function (bbb) {
    var x = bbb.clientX
    var y = bbb.clientY
    var newPoint = {x: x,y: y}
    if(eraserEnable && mouseDown){
            ctx.clearRect(x-5,y-5,10,10);
    } else {
        if (mouseDown) {
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
            lastPoint = newPoint //importent
        }
    }
}

canvas.onmouseup = function () {
    mouseDown = false
}

var eraserEnable = false;
eraser.onclick = function () {
    eraserEnable = true
    action.className = 'action work'
}

brush.onclick = function () {
    eraserEnable = false
    action.className = 'action'
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
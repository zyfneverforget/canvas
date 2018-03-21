var canvas = document.getElementById('canvas');
var eraser = document.getElementById('eraser');
var ctx = canvas.getContext('2d');

getSize();
window.onresize = function() {
    getSize();
}

listenToDevice (canvas);

var eraserEnable = false;
eraser.onclick = function () {
    eraserEnable = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}

brush.onclick = function () {
    eraserEnable = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}

red.onclick = function () {
    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    black.classList.remove('active')
    blue.classList.remove('active')
}

green.onclick = function () {
    ctx.strokeStyle = 'green'
    ctx.fillStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    blue.classList.remove('active')
}

blue.onclick = function () {
    ctx.strokeStyle = 'blue'
    ctx.fillStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    green.classList.remove('active')
}
black.onclick = function() {
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}

clear.onclick = function() {
    ctx.clearRect(0,0,canvas.width,canvas.height);  //清除canvas 
}

download.onclick = function () {
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    window.location.href=image;
}



//document.body.ontouchstart 如果是 undefined 设备不支持触摸 如果是true支持触摸





/*----------------*/

//监听函数
function listenToDevice (canvas) {
    var mouseDown = false;
    var lastPoint = {x:undefined,y:undefined}
    if (document.body.ontouchstart !== undefined) {
        // 设备特性检测
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            lastPoint = {x: x,y: y}
            mouseDown = true
            if(eraserEnable){
                ctx.clearRect(x-5,y-5,10,10);
            } else {
                drawCircle(x,y)
            } 
        }
        canvas.ontouchmove = function (bbb) {
            var x = bbb.touches[0].clientX
            var y = bbb.touches[0].clientY
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
        canvas.ontouchend = function () {
            mouseDown = false
        }
    } else {
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            lastPoint = {x: x,y: y}
            if (aaa.button !==2) { //判断是否按下鼠标右键
                mouseDown = true
            }
            if(eraserEnable){
                ctx.clearRect(x-5,y-5,10,10);
            } else if(mouseDown) {
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
    }

}//function end
/*-----------*/


function getSize () {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}
function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.stroke();
}
function drawCircle(x,y) {
    ctx.beginPath();
    ctx.arc(x,y,3,0,Math.PI*2);
    ctx.fill();
}
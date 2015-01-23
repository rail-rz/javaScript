/**
 * Инициализирующая проект функция
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

// избавиться от глобальных переменных
var gameCanvas, player, gun, element1;

function Init() {
    var canvas = document.getElementById('namga-game');
    var context = canvas.getContext("2d");
    var canvasParam = { color:'grey', realWidth:640, realHeight:480 }
    // задаем размеры и разрешение canvas
    canvas.style.width = canvasParam.realWidth + 'px';
    canvas.style.height = canvasParam.realHeight + 'px';
    canvas.width = canvasParam.realWidth;
    canvas.height = canvasParam.realHeight;

    // TODO: GLOBAL? It`s not Global
    gameCanvas = new Rect( context, canvasParam);
    var playerParams = { path:'image/nlo.png', x:0, y:0, imageWidth:300, imageHeight:300, realWidth:100, realHeight:100, frameX:3, frameY:2, currentFrameX:0, currentFrameY:0, speedX:5, speedY:5 }
    player = new AnimatePerson( context, playerParams);
    var gunParams = {color:'yellow', speedY:2, opacity:0.3}
    gun = new Rect(context, gunParams);
    var element1Params = {color:'red', x:250, y:460, realWidth:10, realHeight:20, speedX:2}
    element1 = new Rect(context, element1Params);

    // функции слушатили
//  canvas.onmousemove = mouseMove;
    window.addEventListener( "keydown", doKeyDown, false);
    window.addEventListener( "keyup", doKeyUp, false);

    setInterval(PlayGame, 1000 / 50);
}
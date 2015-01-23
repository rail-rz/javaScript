/**
 * Функции управления с клавиатуры и мыши
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

var keysMap = {}

// управление мышью
function mouseMove(e) {
    player.y = e.pageY;
    player.x = e.pageX;
}

// управление клавиатурой
function doKeyDown(e) {
    keysMap[e.keyCode] = 1;
}

function doKeyUp(e) {
    keysMap[e.keyCode] = 0;
}
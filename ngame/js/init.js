/**
 * Инициализирующая проект функция
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function Init() {
    var canvas = document.getElementById('namga-game');
	// инициализируем контекст для фабрики
	NElement.context = canvas.getContext("2d");

    // функции слушатили
//  canvas.onmousemove = mouseMove;
    window.addEventListener( "keydown", doKeyDown, false);
    window.addEventListener( "keyup", doKeyUp, false);

    PlayGame(canvas);
}
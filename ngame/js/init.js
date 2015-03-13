/**
 * Инициализирующая проект функция
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function init() {
    var canvas = document.getElementById('namga-game');
	// инициализируем контекст для фабрики
	NElement.context = canvas.getContext("2d");
	var constant = new NConstant();
	canvas.style.width = constant.canvasWidth() + 'px';
	canvas.style.height = constant.canvasHeight() + 'px';
	// задаем размеры и разрешение canvas
	canvas.width = constant.canvasWidth();
	canvas.height = constant.canvasHeight();

    // функции слушатили
//  canvas.onmousemove = mouseMove;
    window.addEventListener( "keydown", doKeyDown, false);
    window.addEventListener( "keyup", doKeyUp, false);

	delete constant;
    playGame(canvas);
}
/**
 * Инициализирующая проект функция
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function init() {
	var Constants = new NConstant(),
    	canvas = document.getElementById('namga-game');

	// инициализируем контекст для фабрики
	NElement.context = canvas.getContext("2d");
	canvas.style.width = Constants.canvasWidth() + 'px';
	canvas.style.height = Constants.canvasHeight() + 'px';
	// задаем размеры и разрешение canvas
	canvas.width = Constants.canvasWidth();
	canvas.height = Constants.canvasHeight();


    // функции слушатили
//  canvas.onmousemove = mouseMove;
    window.addEventListener( "keydown", doKeyDown, false);
    window.addEventListener( "keyup", doKeyUp, false);

	delete Constants;
    newGame();
}

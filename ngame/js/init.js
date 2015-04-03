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
	canvas.style.top = canvas.offsetTop + 'px';
	canvas.style.left = canvas.offsetLeft + 'px';
	// задаем размеры и разрешение canvas
	canvas.width = Constants.canvasWidth();
	canvas.height = Constants.canvasHeight();

	var menu = document.getElementById('ngame-menu');
	menu.style.width = Constants.canvasWidth() + 'px';
	menu.style.height = Constants.canvasHeight() + 'px';
	menu.style.top = canvas.offsetTop + 'px';
	menu.style.left = canvas.offsetLeft + 'px';

    // функции слушатили
//  canvas.onmousemove = mouseMove;
    window.addEventListener( "keydown", doKeyDown, false);
    window.addEventListener( "keyup", doKeyUp, false);

    playGame();
	startGame();
}

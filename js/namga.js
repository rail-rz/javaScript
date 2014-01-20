/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

// Создаем канвас
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 450;
// добавляет элемент последним в список детей
document.body.appendChild(canvas);

// цикл игры
var lastTime;
function main() {
	var now = Date.now();
	var dt = (now - lastTime) / 1000.0;

	// метод для обнавления изображения
	update(dt);
	// метод для нового рендера
	render();

	lastTime = now;
	//используем requestAnimationFrame для постановки в очередь следующего цикла
	requestAnimFrame(main);
};
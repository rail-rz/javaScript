/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

// Создаем канвас
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 450;
canvas.style.border =  "1px solid black";
// добавляет элемент последним в список детей
document.body.appendChild(canvas);

//начало отрисовки квадрата
context.beginPath();
//закрашенный квадрат, х y width height
context.fillRect(100, 100, 100, 100);
context.closePath();


context.strokeRect(18, 18, 260, 260);
context.fillRect(20, 20, 256, 256);
for (i = 0; i < 8; i += 2)
	for (j = 0; j < 8; j += 2) {
		context.clearRect(20 + i * 32, 20 + j * 32, 32, 32);
		context.clearRect(20 + (i + 1) * 32, 20 + (j + 1) * 32, 32, 32);
	}
/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

// Создаем канвас
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 450;
//canvas.style.backgroundColor = 'black';
canvas.style.border = "1px solid black";
// добавляет элемент последним в список детей
document.body.appendChild(canvas);

// создаем класс Rect для отрисовки прямоугольников
function Rect(color, x, y, width, height) {
	this.color = color;	// цвет прямоугольника
	this.x = x; // координата х
	this.y = y; // координата у
	this.width = width; // ширина
	this.height = height; // высота
	// Метод рисующий прямоугольник
	this.drawing = function () {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}

computer = new Rect("black", 0, canvas.height / 2 - 40, 20, 80);
player = new Rect("black", canvas.width - 20, canvas.height / 2 - 40, 20, 80);
ball = new Rect("black", canvas.width / 2 - 10, canvas.height / 2 - 10, 20, 20);

computer.drawing();
player.drawing();
ball.drawing();
/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */
function Init() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	var rect = new Element(0, 0, 10, 100);
	rect.elementColor(context, 'blue');
	rect.rectDrawing(context);

	var nlo = new Element(200, 200, 10, 10);
	nlo.imageDrawing(context, 'image/mod1.png');
}

// создаем класс Element для отрисовки прямоугольников
function Element(x, y, width, height) {
	this.x = x; // координата х
	this.y = y; // координата у
	this.width = width; // ширина
	this.height = height; // высота
}



// Метод для отрисовки прямоугольников
Element.prototype.rectDrawing = function (context) {
	context.fillRect(this.x, this.y, this.width, this.height);
}

// метод для задания цвета элемента
Element.prototype.elementColor = function (context, color) {
	context.fillStyle = color;
}

Element.prototype.imageDrawing = function (context, way) {
	var x = this.x;
	var y = this.y;
	var img = new Image();
	img.src = way;
	img.onload = function() {    // Событие onLoad, ждём момента пока загрузится изображение
		context.drawImage(img, x,  y);  // Рисуем изображение от точки с координатами 0, 0
	}
}
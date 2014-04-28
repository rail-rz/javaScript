/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */
function Init() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	var rect = new Element(0, 0, 10, 100);
	rect.elementColor(context, 'blue');
	rect.rectDrawing(context);

//	var nlo = new Element(20, 0, 100, 100);
//	nlo.imageDrawing(context, 'image/mod1.png');

	var nlo = new Element(10, 10, 300, 300);
	nlo.spriteDrawing(context, 'image/nlo.png');
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
	var w = this.width;
	var h = this.height;
	var img = new Image();
	img.src = way;
	img.onload = function() {    // Событие onLoad, ждём момента пока загрузится изображение
		context.drawImage(img, x,  y);  // Рисуем изображение от точки с координатами 0, 0
	}
}

Element.prototype.spriteDrawing = function(context, way) {
	var x = this.x;
	var y = this.y;
	var w = this.width;
	var h = this.height;
	var frames = 4;
	var currentFrame = 0;

	var img = new Image();
	img.src = way;
	img.onload = function() {
		Element.prototype.spriteDrawingFPS(context, img, w, h, frames, currentFrame);
	}


}

Element.prototype.spriteDrawingFPS = function(context,img,  w, h, frames, currentFrame) {
	context.clearRect(0, 0, w, h);
	context.drawImage(img, 0, h * currentFrame, w, h, 0, 0, w, h);
	if (currentFrame == frames) {
		currentFrame = 0;
	} else {
		currentFrame++;
	}
	console.log(1);
	Element.prototype.drawing();
}

Element.prototype.drawing = function(){
	setInterval(Element.prototype.spriteDrawingFPS, 100);
}
//setInterval(Element.prototype.spriteDrawingFPS, 100);

/**
 * Фабрика для создания элементов
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

var NElement = {

	// элемент прямоугольников
    rect: function(params) {
		this.color = params.color;	// цвет прямоугольника
		this.x = params.x || 0; // координата х
		this.y = params.y || 0; // координата у
		this.width = params.realWidth || 0; // ширина
		this.height = params.realHeight || 0; // высота
		this.speedX = params.speedX || 0; // скорость по X
		this.speedY = params.speedY || 0; // скорость по Y
		this.opacity = params.opacity || 1;
		// Метод рисующий прямоугольник
		this.drawing = function () {
			NElement.context.fillStyle = this.color;
			NElement.context.globalAlpha = this.opacity;
			NElement.context.fillRect(this.x, this.y, this.width, this.height);
		}
    },

	// анимированный спрайт
	sprite: function(params) {
		this.x = params.x; // координата х
		this.y = params.y; // координата у
		this.width = params.realWidth; // ширина
		this.height = params.realHeight; // высота
		this.speedX = params.speedX;
		this.speedY = params.speedY;
		var image = new Image();
		image.src = params.path;

		this.drawing = function(){
			NElement.context.drawImage(image, params.imageWidth * params.currentFrameX, params.imageHeight*params.currentFrameY , params.imageWidth, params.imageHeight, this.x, this.y, params.realWidth, params.realHeight);

			if (params.currentFrameX == params.frameX) {
				params.currentFrameX = 0;
				if(params.currentFrameY == params.frameY) {
					params.currentFrameY =0;
				} else {
					params.currentFrameY ++;
				}
			} else {
				params.currentFrameX ++;
			}
		}
    },

	image:function(params) {
		this.x = params.x || 0; // координата х
		this.y = params.y || 0; // координата у
		this.width = params.realWidth || 0; // ширина
		this.height = params.realHeight || 0; // высота
		this.speedX = params.speedX || 0;
		this.speedY = params.speedY || 0;

		var image = new Image();
		image.src = params.path;
		this.drawing = function() {
			NElement.context.drawImage(image,this.x, this.y, params.imageWidth, params.imageHeight);
		}
	}
};

// TODO: избавиться от постоянного вызова фабрики
function NElementFactory(params) {
    this.params = params;
}

NElementFactory.prototype = {
    constructor:NElementFactory,
    makeRect:function() {return new NElement.rect( this.params)},
    makeSprite:function() {return new NElement.sprite( this.params)},
	makeImage:function() {return new NElement.image( this.params)}
};

function NCreateElements(params) {
	// TODO: временно через if/else
	if(params.method == 'makeRect') {
		return new NElementFactory(params).makeRect();
	} else if(params.method == 'makeSprite') {
		return new NElementFactory(params).makeSprite();
	} else if(params.method == 'makeImage') {
		return new NElementFactory(params).makeImage();
	}
}
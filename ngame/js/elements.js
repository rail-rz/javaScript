/**
 * Фабрика для создания элементов
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

var NElement = {

	// элемент прямоугольников
    rect: function(params) {
		this.type = params.type;
		this.color = params.color;	// цвет прямоугольника
		this.x = params.x || 0; // координата х
		this.y = params.y || 0; // координата у
		this.width = params.realWidth || 0; // ширина
		this.height = params.realHeight || 0; // высота
		this.speedX = params.speedX || 0; // скорость по X
		this.speedY = params.speedY || 0; // скорость по Y
		this.opacity = params.opacity || 1;
		this.is_killed = params.is_killed || 0;
		this.is_crash = params.is_crash || 0;
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
		this.opacity = params.opacity || 1;
		this.is_killed = params.is_killed || 0;
		this.is_crash = params.is_crash || 1;
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
		this.opacity = params.opacity || 1;
		this.is_killed = params.is_killed || 0;
		this.is_crash = params.is_crash || 1;
		var image = new Image();
		image.src = params.path;

		this.drawing = function() {
			NElement.context.drawImage(image,this.x, this.y, params.imageWidth, params.imageHeight);
		}
	}

};

function NElementFactory() {}

NElementFactory.prototype = {
    constructor:NElementFactory,
	createElement:function(params) {
		return new NElement[params.method](params);
	}
};

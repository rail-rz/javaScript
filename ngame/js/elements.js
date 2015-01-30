/**
 * Фабрика для создания элементов
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

var NElement = {

	// элемент прямоугольников
    rect: function(context, params) {
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
			context.fillStyle = this.color;
			context.globalAlpha = this.opacity;
//                this.x += this.speedX;
//                this.y += this.speedY;
			context.fillRect(this.x, this.y, this.width, this.height);
		}
    },

	// анимированный спрайт
	sprite: function(context, params) {
		this.x = params.x; // координата х
		this.y = params.y; // координата у
		this.width = params.realWidth; // ширина
		this.height = params.realHeight; // высота
		this.speedX = params.speedX;
		this.speedY = params.speedY;
		image = new Image();
		image.src = params.path;

		this.drawing = function(){
			context.drawImage(image, params.imageWidth * params.currentFrameX, params.imageHeight*params.currentFrameY , params.imageWidth, params.imageHeight, this.x, this.y, params.realWidth, params.realHeight);

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

//	image:function(context, params) {
//		this.x = params.x || 0; // координата х
//		this.y = params.y || 0; // координата у
////		this.width = params.realWidth || 0; // ширина
////		this.height = params.realHeight || 0; // высота
////		this.speedX = params.speedX || 0;
////		this.speedY = params.speedY || 0;
//
//		image = new Image();
//		image.src = params.path;
//		console.log(params);
//		this.drawing = function(){
//			context.drawImage(image,this.x, this.y);
//		}
//	}
};

function NElementFactory(context, params) {
    this.context = context;
    this.params = params;
}

NElementFactory.prototype = {
    constructor:NElementFactory,
    makeRect:function() {return new NElement.rect(this.context, this.params)},
    makeSprite:function() {return new NElement.sprite(this.context, this.params)},
	makeImage:function() {return new NElement.sprite(this.context, this.params)}
};

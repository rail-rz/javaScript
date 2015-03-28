/**
 * Фабрика для создания элементов
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */
function NPropertyForElements(params) {
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
	this.is_kill = params.is_kill || 0;
	this.is_attack = params.is_attack || 0;
	this.is_crash = params.is_crash || 0;
	this.health = params.health || 1;
	this.is_event = params.is_event || 0; // событие на элементе
	this.timer = 0;

	this.update = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
}

var NElement = {
	// элемент прямоугольников
    rect: function(params) {
		var property = new NPropertyForElements(params);
		// Метод рисующий прямоугольник
		property.drawing = function () {
			NElement.context.fillStyle = this.color;
			NElement.context.globalAlpha = this.opacity;
			NElement.context.fillRect(this.x, this.y, this.width, this.height);
		};
		return property;
    },
	// анимированный спрайт
	sprite: function(params) {
		var property = new NPropertyForElements(params);
		var image = new Image();
		image.src = params.path;

		property.drawing = function(){
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
		};
		return property;
    },
	image:function(params) {
		var property = new NPropertyForElements(params);
		var image = new Image();
		image.src = params.path;

		property.drawing = function() {
			NElement.context.drawImage(image,this.x, this.y, params.imageWidth, params.imageHeight);
		};
		return property;
	}

};

function NElementFactory() {}

NElementFactory.prototype = {
    constructor:NElementFactory,
	createElement:function(params) {
		if( params.method in NElement ) {
			return new NElement[params.method](params);
		} else {
			throw 'Невозможно создать элемент. Данного метода не существует';
		}
	}
};

function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomValueFromArray(arr) {
	return arr[Math.floor( Math.random() * arr.length )];
}

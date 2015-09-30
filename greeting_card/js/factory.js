/**
 * Фабрика для создания элементов div
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function NPropertyForElements(params) {
    var newDiv = document.createElement(params.type);
    var Constants = new NConstant();

    //params.type;
    newDiv.style.position = 'absolute';
    newDiv.style.backgroundColor = params.color;	// цвет прямоугольника
    this.x = params.x;
    newDiv.style.left = this.x + 'px'; // координата х
    this.y = params.y; // координата у
    newDiv.style.top = this.y + 'px';
    this.width = params.realWidth;
    newDiv.style.width = this.width + 'px'; // ширина
    this.height = params.realHeight;
    newDiv.style.height = this.height + 'px'; // высота
    this.speedX = params.speedX || 0; // скорость по X
    this.speedY = params.speedY || 0; // скорость по Y
    newDiv.style.opacity = params.opacity || 1;
    //newDiv.style.is_killed = params.is_killed || 0;
    //newDiv.style.is_kill = params.is_kill || 0;
    //newDiv.style.is_attack = params.is_attack || 0;
    //newDiv.style.is_crash = params.is_crash || 0;
    //newDiv.style.health = params.health || 1;
    //newDiv.style.is_event = params.is_event || 0; // событие на элементе
    //newDiv.style.timer = 0;

    this.update = function() {
        this.x += this.speedX;
        if(this.x > Constants.canvasWidth()) {
            this.x = 0 - this.width;
        }
        newDiv.style.left = this.x + 'px';
        this.y += this.speedY;
        if(this.y > Constants.canvasHeight()) {
            this.y = 0 - this.height;
        }
        newDiv.style.top = this.y + 'px';
    };
    NElement.context.appendChild(newDiv);
}

var NElement = {
    // элемент прямоугольников
    rect: function(params) {
        var property = new NPropertyForElements(params);


        // Метод рисующий прямоугольник
        property.drawing = function () {

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
    },
    text:function(params){
        var property = new NPropertyForElements(params);
        property.message = params.message;
        property.name = '';
        if(params.name ) {
            property.name = params.name + ': '
        }
        property.drawing = function() {
            NElement.context.font = "15pt Arial";
            NElement.context.fillStyle = property.color;
            NElement.context.fillText(property.name + property.message, property.x, property.y)
        };
        return property;
    }

};

function NElementFactory() {}

NElementFactory.prototype = {
    constructor:NElementFactory,
    createElement:function(params) {
        //console.log(params.method);
        if( params.method in NElement ) {
            return new NElement[params.method](params);
        } else {
            throw 'Невозможно создать элемент. Данного метода не существует';
        }
    }
};

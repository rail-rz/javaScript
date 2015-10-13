/**
 * Фабрика для создания элементов div
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function NPropertyForElements(params) {
    var Constants   = new NConstant(),
        opacityFlag = 1
        ;
    // общие свойства объекта
    this.type        = params.type;
    this.left        = params.left;
    this.top         = params.top; // координата у
    this.width       = params.width;
    this.height      = params.height;
    this.rotate      = params.rotate || 0;
    this.speedX      = params.speedX || 0; // скорость по X
    this.speedY      = params.speedY || 0; // скорость по Y
    this.speedRotate = params.speedRotate || 0;
    this.opacityMin  = params.opacityMin || 0;
    this.opacityMax  = params.opacityMax || 0;
    this.opacity     = params.opacity || 1;

    if(this.opacityMin > 0) {
        this.opacity = params.opacityMin + 0.01;

    }


    console.log(params.opacity );
    // объявляем документ и добавляем ему свойства
    this.nElement = document.createElement(this.type);

    this.nElement.style.position = 'absolute';
    this.nElement.style.left     = this.left + 'px'; // координата х
    this.nElement.style.top      = this.top + 'px';
    this.nElement.style.width    = this.width + 'px'; // ширина
    this.nElement.style.height   = this.height + 'px'; // высота
    this.nElement.style.opacity  = this.opacity;
    if(this.rotate != 0) {
        this.nElement.style.mozTransform    = 'rotate(' + this.rotate + 'deg)';
        this.nElement.style.msTransform     = 'rotate(' + this.rotate + 'deg)';
        this.nElement.style.webkitTransform = 'rotate(' + this.rotate + 'deg)';
        this.nElement.style.oTransform      = 'rotate(' + this.rotate + 'deg)';
        this.nElement.style.transform       = 'rotate(' + this.rotate + 'deg)';
    }

    this.update = function() {
        if(this.speedX != 0) {
            this.left += this.speedX;
            if(this.left > Constants.canvasWidth()) {
                this.left = 0 - this.width;
            } else if(this.left < -this.width) {
                this.left = Constants.canvasWidth();
            }
            this.nElement.style.left = this.left + 'px';
        }

        if(this.speedY != 0) {
            this.top += this.speedY;
            if(this.top > Constants.canvasHeight()) {
                this.top = 0 - this.height;
            } else if(this.top < -this.height) {
                this.top = Constants.canvasHeight();
            }
            this.nElement.style.top = this.top + 'px';
        }

        if(this.speedRotate != 0) {
            this.rotate += this.speedRotate;
            this.nElement.style.mozTransform    = 'rotate(' + this.rotate + 'deg)';
            this.nElement.style.msTransform     = 'rotate(' + this.rotate + 'deg)';
            this.nElement.style.webkitTransform = 'rotate(' + this.rotate + 'deg)';
            this.nElement.style.oTransform      = 'rotate(' + this.rotate + 'deg)';
            this.nElement.style.transform       = 'rotate(' + this.rotate + 'deg)';
        }

        if(this.opacityMin != this.opacityMax) {
            if((this.opacity > this.opacityMax) || (this.opacity < this.opacityMin)) {
                opacityFlag *= -1;
            }
            if(opacityFlag > 0) {
                this.opacity += 0.01;
            } else {
                this.opacity -= 0.01;
            }

            this.nElement.style.opacity = this.opacity;
        }
    };


}

NPropertyForElements.prototype.update = function() {

};

var NElement = {
    // элемент прямоугольников
    rect: function(params) {
        var property = new NPropertyForElements(params),
            newDiv   = property.nElement;

        newDiv.style.backgroundColor = params.color;	// цвет прямоугольника

        property.updateUnique = function() {
            // если нужны какие-то персональные изменения
            // по обновлению, тебе сюда
        };
        NElement.context.appendChild(newDiv);

        return property;
    },
    // анимированный спрайт
    sprite: function(params) {
        var property = new NPropertyForElements(params),
            newDiv   = property.nElement;

        newDiv.style.backgroundImage = 'url(' + params.path + ')';
        property.bSizeX = params.width * params.frameX;
        property.bSizeY = params.height * params.frameY;

        newDiv.style.backgroundSize = property.bSizeX + 'px ' + property.bSizeY + 'px';
        newDiv.style.backgroundPosition = -property.bSizeX + 'px ' + -property.bSizeY +'px';

        property.updateUnique = function() {
            if (params.currentFrameX == (params.frameX - 1)) {
                params.currentFrameX = 0;
                if(params.currentFrameY == (params.frameY -1)) {
                    params.currentFrameY = 0;
                } else {
                    params.currentFrameY ++;
                }
                newDiv.style.backgroundPositionY = (-params.height * params.currentFrameY) +'px';

            } else {
                params.currentFrameX ++;

            }
            newDiv.style.backgroundPositionX = (-params.width * params.currentFrameX) + 'px ';
        };

        NElement.context.appendChild(newDiv);

        return property;
    },
    image:function(params) {
        var property = new NPropertyForElements(params),
            newDiv   = property.nElement;

        newDiv.src = params.path;

        property.updateUnique = function() {
            // если нужны какие-то персональные изменения
            // по обновлению, тебе сюда
        };

        NElement.context.appendChild(newDiv);

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

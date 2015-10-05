/**
 * Фабрика для создания элементов div
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function NPropertyForElements(params) {
    this.type   = params.type;
    this.x      = params.x;
    this.y      = params.y; // координата у
    this.width  = params.width;
    this.height = params.height;
    this.speedX = params.speedX || 0; // скорость по X
    this.speedY = params.speedY || 0; // скорость по Y

    this.newElement = function() {
        var nElement = document.createElement(this.type);

        nElement.style.position = 'absolute';
        nElement.style.left     = this.x + 'px'; // координата х
        nElement.style.top      = this.y + 'px';
        nElement.style.width    = this.width + 'px'; // ширина
        nElement.style.height   = this.height + 'px'; // высота
        nElement.style.opacity  = this.opacity || 1;

        return nElement;
    }

}

var NElement = {
    // элемент прямоугольников
    rect: function(params) {
        var property  = new NPropertyForElements(params),
            newDiv    = property.newElement(params),
            Constants = new NConstant();

        newDiv.style.backgroundColor = params.color;	// цвет прямоугольника

        property.update = function() {
            this.x += this.speedX;
            if(this.x > Constants.canvasWidth()) {
                this.x = 0 - this.width;
            } else if(this.x < -this.width) {
                this.x = Constants.canvasWidth();
            }
            newDiv.style.left = this.x + 'px';
            this.y += this.speedY;
            if(this.y > Constants.canvasHeight()) {
                this.y = 0 - this.height;
            } else if(this.y < -this.height) {
                this.y = Constants.canvasHeight();
            }
            newDiv.style.top = this.y + 'px';
        };
        NElement.context.appendChild(newDiv);

        return property;
    },
    // анимированный спрайт
    sprite: function(params) {
        var property  = new NPropertyForElements(params),
            newDiv    = property.newElement(params),
            Constants = new NConstant();

        newDiv.style.backgroundImage = 'url(' + params.path + ')';
        property.bSizeX = params.width * params.frameX;
        property.bSizeY = params.height * params.frameY;

        newDiv.style.backgroundSize = property.bSizeX + 'px ' + property.bSizeY + 'px';
        newDiv.style.backgroundPosition = -property.bSizeX + 'px ' + -property.bSizeY +'px';

        property.update = function() {
            this.x += this.speedX;
            if(this.x > Constants.canvasWidth()) {
                this.x = 0 - this.width;
            } else if(this.x < -this.width) {
                this.x = Constants.canvasWidth();
            }
            newDiv.style.left = this.x + 'px';
            this.y += this.speedY;
            if(this.y > Constants.canvasHeight()) {
                this.y = 0 - this.height;
            } else if(this.y < -this.height) {
                this.y = Constants.canvasHeight();
            }
            newDiv.style.top = this.y + 'px';

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
        var property  = new NPropertyForElements(params),
            image     = property.newElement(params),
            Constants = new NConstant();

        image.src = params.path;

        property.update = function() {
            this.x += this.speedX;
            if(this.x > Constants.canvasWidth()) {
                this.x = 0 - this.width;
            } else if(this.x < -this.width) {
                this.x = Constants.canvasWidth();
            }
            image.style.left = this.x + 'px';
            this.y += this.speedY;
            if(this.y > Constants.canvasHeight()) {
                this.y = 0 - this.height;
            } else if(this.y < -this.height) {
                this.y = Constants.canvasHeight();
            }
            image.style.top = this.y + 'px';
        };
        NElement.context.appendChild(image);

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

/**
 * Классы для создания элементов
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function ElementsFactory(context, params) {
//    console.log(params.length);
    var allElements = [];
    for(var i = 0; i < params.length; i++) {
         var Name =  params[i]['methodName'];
        console.log(params[i]['methodName']);
//        allElements[i] = new Name(context, params[i]);
    }
    return allElements;
}

// создаем класс Rect для отрисовки прямоугольников
function Rect( context, params) {
    console.log(params);
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
}

// создание анимированных спрайтов
function AnimatePerson(context, params) {
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
}
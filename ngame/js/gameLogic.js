/**
 * Логика игры
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function PlayGame(canvas) {

	// временная переменная, для создания элементов
	var elementCreator;

    var canvasParam = { color:'grey', realWidth:640, realHeight:480 };
    canvas.style.width = canvasParam.realWidth + 'px';
    canvas.style.height = canvasParam.realHeight + 'px';
    // задаем размеры и разрешение canvas
    canvas.width = canvasParam.realWidth;
    canvas.height = canvasParam.realHeight;
    var context = canvas.getContext("2d");

    var playerParams = { path:'image/nlo.png', x:0, y:0, imageWidth:300, imageHeight:300, realWidth:100, realHeight:100, frameX:3, frameY:2, currentFrameX:0, currentFrameY:0, speedX:5, speedY:5 };
    var gunParams = {color:'yellow', speedY:2, opacity:0.3, realWidth:30};
	var otherElements = [
		{ color:'red', x:250, y:460, realWidth:10, realHeight:20, speedX:2},
		{ color:'green', x:250, y:460, realWidth:10, realHeight:20, speedX:-2},
		{ color:'black', x:250, y:460, realWidth:10, realHeight:20, speedX:-3},
	];

	elementCreator = new NElementFactory(context, canvasParam);
    this.gameCanvas = elementCreator.makeRect();
	elementCreator = new NElementFactory(context, playerParams);
	this.player = elementCreator.makeAnimatePerson();
	elementCreator = new NElementFactory(context, gunParams);
    this.gun = elementCreator.makeRect();

	this.elements = [];
	for(var i = 0; i < otherElements.length; i++) {
		elementCreator = new NElementFactory(context, otherElements[i]);
		this.elements[i] = elementCreator.makeRect();
	}

    // отрисовывающая функуия
    this.drawingGame = function() {
        this.gameCanvas.drawing();
        this.player.drawing();
        this.gun.drawing();

        //player move
        if(keysMap[32]) {
            if(this.gun.height <= this.player.height) {
                this.gun.height += this.gun.speedY;
            }
            this.gun.x = this.player.x + this.player.width/2 - this.gun.width/2;
            this.gun.y = this.player.y + this.player.height ;
        } else {
            this.gun.height = 0;
            if(keysMap[68]) {
                this.player.x += this.player.speedX;
            }
            if(keysMap[65]) {
                this.player.x -= this.player.speedX;
            }
            if(keysMap[87]) {
                this.player.y -= this.player.speedY;
            }
            if(keysMap[83]) {
                this.player.y += this.player.speedY;
            }
        }

		// столкновение со стеной
		if(WallController(this.player)) {
			if(this.player.x < 0) {
				this.player.x = 0;
			} else if(this.player.x + this.player.width > this.gameCanvas.width) {
				this.player.x = this.gameCanvas.width - this.player.width;
			}
			if(this.player.y <0 ) {
				this.player.y = 0;
			} else if(player.y + this.player.height > this.gameCanvas.height) {
				this.player.y = this.gameCanvas.height - player.height;
			}
		}

		// обработка игровых элементов
		for(var i = 0; i < this.elements.length; i++) {
			this.elements[i].drawing();
			this.elements[i].x += this.elements[i].speedX;
			this.elements[i].y += this.elements[i].speedY;

			if(CrashController(this.gun, this.elements[i])) {
				this.elements[i].speedX = 0;
				this.elements[i].y -= this.gun.speedY;
			}

			if(WallController(this.elements[i])) {
				this.elements[i].speedX = -this.elements[i].speedX;
			}

			// тестовая модель столкновения
			if(CrashController(this.player, this.elements[i])) {
	            this.elements.splice(i, 1);
			}
		}



	}

    setInterval(this.drawingGame, 1000 / 50);
}

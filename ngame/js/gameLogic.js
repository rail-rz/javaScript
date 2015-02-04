/**
 * Логика игры
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function PlayGame(canvas) {

	this.setIntervalId = null;
	// TODO:временная переменная, для создания элементов
	var elementCreator;

    var canvasParam = { method:'makeImage', path:'image/background.png', realWidth:640, realHeight:480, imageWidth:800, imageHeight:600 };
	//var canvasParam = {color:'grey', realWidth:640, realHeight:480, imageWidth:800, imageHeight:600, method:'makeRect' };
    canvas.style.width = canvasParam.realWidth + 'px';
    canvas.style.height = canvasParam.realHeight + 'px';
    // задаем размеры и разрешение canvas
    canvas.width = canvasParam.realWidth;
    canvas.height = canvasParam.realHeight;


    var playerParams = { path:'image/nlo.png', x:0, y:0, imageWidth:300, imageHeight:300, realWidth:100, realHeight:100, frameX:3, frameY:2, currentFrameX:0, currentFrameY:0, speedX:5, speedY:5, method:'makeSprite' };
    var gunParams = {color:'yellow', speedY:2, opacity:0.3, realWidth:30, method:'makeRect'};
	var otherElements = [
		{ color:'red', x:250, y:440, realWidth:10, realHeight:20, speedX:2, speedY:9.8, method:'makeRect' },
		{ color:'green', x:250, y:440, realWidth:10, realHeight:20, speedX:-2, speedY:9.8, method:'makeRect'},
		{ color:'black', x:250, y:440, realWidth:10, realHeight:20, speedX:-3, speedY:9.8, method:'makeRect'}
	];
	var groundParams = {color:'black', x:0, y:460, realHeight:20, realWidth:640, method:'makeRect'};

    this.gameCanvas = NCreateElements(canvasParam);
	this.player = NCreateElements(playerParams);
    this.gun = NCreateElements(gunParams);
	this.ground = NCreateElements(groundParams);

	this.elements = [];
	for(var i = 0; i < otherElements.length; i++) {
		this.elements[i] = new NCreateElements(otherElements[i]);
	}

    // отрисовывающая функуия
    this.drawingGame = function() {
        this.gameCanvas.drawing();
        this.player.drawing();
        this.gun.drawing();
		this.ground.drawing();

		if(keysMap[27]) {
			this.stop();
		}
        //player move
        if(keysMap[32]) {
            if(this.gun.height <= 2 * this.player.height) {
                this.gun.height += this.gun.speedY;
				if(WallController(this.gun)) {
					this.gun.height -= this.gun.speedY;
				}
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

		// столкновение с землей
		if(CrashController(this.ground, this.player)) {
			if(this.player.y + this.player.height > this.ground.y) {
				this.player.y = this.ground.y - this.player.height;
			}
		}

		// обработка игровых элементов
		for(var i = 0; i < this.elements.length; i++) {
			this.elements[i].drawing();
			this.elements[i].x += this.elements[i].speedX;
			this.elements[i].y += this.elements[i].speedY;

//			if(((this.gun.x + this.gun.width == this.elements[i].x - this.elements[i].width) || (this.gun.x == this.elements[i].x + this.elements[i].width - this.elements[i].speedX)) && keysMap[32]) {
//				this.elements[i].speedX = -this.elements[i].speedX;
//			}
			// столкновение с оружием
			if(CrashController(this.gun, this.elements[i]) && keysMap[32]) {
				this.elements[i].x -= this.elements[i].speedX;
				this.elements[i].y -= this.gun.speedY + this.elements[i].speedY;

				if(CrashController(this.player, this.elements[i])) {
					this.elements.splice(i, 1);
					if(this.elements.length <= 10) {
						this.elements.push(NCreateElements({ color:'blue', x:0, y:440, realWidth:10, realHeight:20, speedX:3, speedY:9.8, method:'makeRect'}));
						this.elements.push(NCreateElements({ color:'orange', x:630, y:440, realWidth:10, realHeight:20, speedX:-1, speedY:9.8, method:'makeRect'}));
					}
				}
			}

			if(WallController(this.elements[i])) {
				this.elements[i].speedX = -this.elements[i].speedX;
			}

			if(CrashController(this.ground, this.elements[i])) {
				if(this.elements[i].y + this.elements[i].height > this.ground.y) {
					this.elements[i].y = this.ground.y - this.elements[i].height;
				}
			}
		}



	};

	this.start = function() {
		this.setIntervalId = setInterval(this.drawingGame, 1000 / 50);
	};

	this.stop = function() {

	};


	this.start();
}

/**
 * Логика игры
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function PlayGame(canvas) {
	var factory = new NElementFactory();

	var canvasParam = {  method:'image', path:'image/background.jpg', color:'grey', realWidth:800, realHeight:600, imageWidth:800, imageHeight:600};
    canvas.style.width = canvasParam.realWidth + 'px';
    canvas.style.height = canvasParam.realHeight + 'px';
    // задаем размеры и разрешение canvas
    canvas.width = canvasParam.realWidth;
    canvas.height = canvasParam.realHeight;
	var groundParams = { method:'rect', color:'black', y:canvasParam.realHeight-20, realHeight:20, realWidth:canvasParam.realWidth};

	var playerParams = { method:'sprite', type:'player', path:'image/nlo.png', x:0, y:0, imageWidth:300, imageHeight:300, realWidth:100, realHeight:100, frameX:3, frameY:2, currentFrameX:0, currentFrameY:0, speedX:5, speedY:5};
	var otherElements = [
		{ method:'rect', type:'police', color:'red', x:250, y:canvasParam.realHeight, realWidth:10, realHeight:20, speedX:2, speedY:9.8, is_killed:1, is_crash:0 },
		{ method:'rect', type:'people', color:'green', x:250, y:canvasParam.realHeight, realWidth:10, realHeight:20, speedX:-2, speedY:9.8, is_killed:1, is_crash:0},
		{ method:'rect', color:'black', x:250, y:canvasParam.realHeight, realWidth:10, realHeight:20, speedX:-3, speedY:9.8, is_killed:1, is_crash:0},
		{ method:'rect', color:'black', x:canvasParam.realWidth/2 - playerParams.realWidth/2, y:canvasParam.realHeight,realHeight:playerParams.realHeight, realWidth:playerParams.realWidth, is_killed:0,
			is_crash:1},
		{ method:'rect', color:'orange', x:canvasParam.realWidth/3, y:canvasParam.realHeight/3,realHeight:50, realWidth:80, is_killed:0,
			is_crash:1}

	];
	var gunParams = {method:'rect', color:'yellow', speedY:2, opacity:0.3, realWidth:30};

    this.gameCanvas = factory.createElement(canvasParam);
	this.player = factory.createElement(playerParams);
    this.gun = factory.createElement(gunParams);
	this.ground = factory.createElement(groundParams);

	this.elements = [];
	for(var i = 0; i < otherElements.length; i++) {
		this.elements[i] = factory.createElement(otherElements[i]);
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
				if(CrashController(this.ground, this.gun) || WallController(this.gun)) {
					this.gun.height = this.ground.y - this.gun.y;
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
				this.player.y = this.gameCanvas.height - this.player.height;
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

			// TODO: временный костыль, для предотвращения столкновения
			if(
				(this.gun.x + this.gun.width > this.elements[i].x - this.elements[i].width
					&& this.gun.x < this.elements[i].x + 2*this.elements[i].width
					&& this.gun.y + this.gun.height > this.elements[i].y
					&& this.gun.y < this.elements[i].y + this.elements[i].height)
				&& keysMap[32]
				) {
				this.elements[i].speedX = -this.elements[i].speedX;
			}

			if(this.elements[i].is_crash == 1) {
				// TODO: временное решение
				var crash = penetration(this.player, this.elements[i]);
				if(crash){
					if(crash.x <= this.player.speedX) {
						if(crash.direction.x <0) {
							this.player.x -= crash.x;
						} else if(crash.direction.x > 0) {
							this.player.x += crash.x;
						}
					}
					if(crash.y <= this.player.speedY) {
						if(crash.direction.y < 0) {
							this.player.y -= crash.y;
						} else if(crash.direction.y > 0) {
							this.player.y += crash.y;
						}
					}
				}
			}
			// столкновение с оружием
			if(CrashController(this.gun, this.elements[i]) && keysMap[32] && this.gun.height) {
				if(this.elements[i].is_killed) {
					this.elements[i].x += this.elements[i].speedX;
					this.elements[i].y -= this.gun.speedY + this.elements[i].speedY;

					if(CrashController(this.player, this.elements[i])) {
						this.elements.splice(i, 1);
						if(this.elements.length <= 5) {
							this.elements.push(factory.createElement({ method:'rect', color:'blue', x:0, y:gameCanvas.height, realWidth:10, realHeight:20, speedX:3, speedY:9.8, is_killed:1, is_crash:0}));
							this.elements.push(factory.createElement({ method:'rect', color:'orange', x:gameCanvas.width-10, y:gameCanvas.height, realWidth:10, realHeight:20, speedX:-1, speedY:9.8, is_killed:1, is_crash:0}));
						}
					}
				} else {
					this.gun.height = this.elements[i].y - this.gun.y;
				}
			}



			if(WallController(this.elements[i])) {
				if(this.elements[i].x < 0 || this.elements[i].x + this.elements[i].width > this.gameCanvas.width) {
					this.elements[i].speedX = -this.elements[i].speedX;
				}
				if(this.elements[i].y <0 ) {
					this.elements[i].y = 0;
				} else if(elements[i].y + this.elements[i].height > this.gameCanvas.height) {
					this.elements[i].y = this.gameCanvas.height - elements[i].height;
				}
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
		clearInterval(this.setIntervalId);
	};


	this.start();
}

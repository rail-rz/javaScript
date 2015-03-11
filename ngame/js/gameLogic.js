/**
 * Логика игры
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function playGame(canvas) {
	var timer = 0,
		Constant = new NConstant(),
		randomBotParams = {
			method:'rect',
			color:[ 'red', 'green', 'blue', 'darkBlue', 'black', 'grey', 'orange', 'yellow'],
			x:[ 0, (Constant.canvasWidth()-10)],
			y:Constant.canvasHeight()-40,
			realWidth:10,
			realHeight:20,
			speedX:[ 1, 2, 3, 4],
			speedY:9.8,
			is_attack:[0,1],
			is_killed: 1
		},
		factory = new NElementFactory();

	var canvasParam = {  method:'rect', path:'image/background.jpg', color:'grey', realWidth:Constant.canvasWidth(), realHeight:Constant.canvasHeight(), imageWidth:800, imageHeight:600};
	var botMoveSizeConstant = canvasParam.realWidth/6;
	var groundParams = { method:'rect', color:'black', y:canvasParam.realHeight-20, realHeight:20, realWidth:canvasParam.realWidth};
	var playerParams = { method:'sprite', type:'player', health:10, path:'image/nlo.png', x:canvasParam.realWidth/2 - 100/2, y:0, imageWidth:300, imageHeight:300, realWidth:100, realHeight:100, frameX:3, frameY:2, currentFrameX:0, currentFrameY:0, speedX:5, speedY:5};
	var otherElements = [
		{ method:'rect', type:'build', health:100, color:'black', x:canvasParam.realWidth/2 - playerParams.realWidth/2, y:canvasParam.realHeight,realHeight:playerParams.realHeight, realWidth:playerParams.realWidth, is_killed:0,
			is_crash:1, is_event:1}
	];
	var gunParams = {method:'rect', color:'yellow', speedY:2, opacity:0.3, realWidth:30, is_kill:0};

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
		++timer;
        this.gameCanvas.drawing();
        this.player.drawing();
        this.gun.drawing();
		this.ground.drawing();

		this.keyboardControl();

		// столкновение со стеной
		if(WallController(this.player)) {
			if(this.player.x < 0) {
				this.player.x = 0;
			} else if(this.player.x + this.player.width > this.gameCanvas.width) {
				this.player.x = this.gameCanvas.width - this.player.width;
			}
			if(this.player.y <0 ) {
				this.player.y = 0;
			} else if(this.player.y + this.player.height > this.gameCanvas.height) {
				this.player.y = this.gameCanvas.height - this.player.height;
			}
		}

		if(this.player.y + this.player.height > this.gameCanvas.height - this.player.height) {
			this.player.y = this.gameCanvas.height - 2* this.player.height;
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

			if(this.elements[i].is_attack) {
				if(this.player.x - botMoveSizeConstant >= this.elements[i].x || this.player.x + this.player.width + botMoveSizeConstant <= this.elements[i].x) {
					this.elements[i].x -= this.elements[i].speedX;

					if(++this.elements[i].timer%100 ==0) {

						var plx = this.player.x + this.player.width/2 - this.elements[i].x;
						var ply = this.player.y + this.player.height/2 - this.elements[i].y;
						this.elements.push(factory.createElement(
							{
								method:'rect',
								type:'bullet',
								color:'white',
								x:this.elements[i].x,
								y:this.elements[i].y,
								realWidth:5,
								realHeight:5,
								speedX: plx/50,
								speedY: ply/50,
								is_killed:1,
								is_kill:1,
								is_crash:0
							}));

					}
				} else {
					this.elements[i].timer = 0;
				}
			}

			// логика при столкновении с элементами
			if(this.elements[i].is_crash ) {
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

			// столкновение пули с персонажем
			if(this.elements[i].is_kill) {
				if(CrashController(this.player, this.elements[i])) {
					--this.player.health;
					this.elements.splice(i, 1);
					if(this.player.health <= 0) {
						this.stop();
					}
				}
			}

			// столкновение с оружием
			if(CrashController(this.gun, this.elements[i]) && keysMap[32] && this.gun.height) {
				if(this.elements[i].is_event) {
					this.elements[i].is_event = 0;
					if(this.elements.length <= 5) {
						this.elements.push(factory.createElement({ method:'rect', color:'red', x:(this.elements[i].x + this.elements[i].width/2), y:this.gameCanvas.height-40, realWidth:10, realHeight:20, speedX:getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0, is_attack:1}));
						this.elements.push(factory.createElement({ method:'rect', color:'blue', x:(this.elements[i].x + this.elements[i].width/2), y:this.gameCanvas.height-40, realWidth:10, realHeight:20, speedX:-getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0, is_attack:1}));
						this.elements.push(factory.createElement({ method:'rect', color:'green', x:(this.elements[i].x + this.elements[i].width/2), y:this.elements[i].y-20, realWidth:10, realHeight:20, speedX:-getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0}));
					}
				}

				if(this.gun.is_kill) {
					if(--this.elements[i].health <= 0) {
						this.elements.splice(i, 1);
						if(this.elements.length <= 5) {
							this.elements.push(factory.createElement({ method:'rect', color:'blue', x:0, y:this.gameCanvas.height, realWidth:10, realHeight:20, speedX:getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0, is_attack:1}));
							this.elements.push(factory.createElement({ method:'rect', color:'orange', x:this.gameCanvas.width-10, y:this.gameCanvas.height, realWidth:10, realHeight:20, speedX:-getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0, is_attack:1}));
						}
					} else {
						this.gun.height = this.elements[i].y - this.gun.y;
					}

				} else {
					if(this.elements[i].is_killed) {
						this.elements[i].x -= this.elements[i].speedX;
						this.elements[i].y -= this.gun.speedY + this.elements[i].speedY;

						if(CrashController(this.player, this.elements[i])) {
							this.elements.splice(i, 1);
							if(this.elements.length <= 5) {
								this.elements.push(factory.createElement({ method:'rect', color:'blue', x:0, y:this.gameCanvas.height, realWidth:10, realHeight:20, speedX:getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0, is_attack:1}));
								this.elements.push(factory.createElement({ method:'rect', color:'orange', x:this.gameCanvas.width-10, y:this.gameCanvas.height, realWidth:10, realHeight:20, speedX:-getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0, is_attack:1}));
							}
						}
					} else {
						this.gun.height = this.elements[i].y - this.gun.y;
					}
				}

			}


			if(CrashController(this.ground, this.elements[i])) {
				if(this.elements[i].y + this.elements[i].height > this.ground.y) {
					this.elements[i].y = this.ground.y - this.elements[i].height;
				}
			}

			if(WallController(this.elements[i])) {
				if(this.elements[i].is_kill) {
					this.elements.splice(i, 1);
				} else {
					if(this.elements[i].x < 0 || this.elements[i].x + this.elements[i].width > this.gameCanvas.width) {
						this.elements[i].speedX = -this.elements[i].speedX;
					}
					if(this.elements[i].y <0 ) {
						this.elements[i].y = 0;
					} else if(this.elements[i].y + this.elements[i].height > this.gameCanvas.height) {
						this.elements[i].y = this.gameCanvas.height - this.elements[i].height;
					}
				}
			}
		}



	};

	this.keyboardControl = function() {
		if(keysMap[27]) {
			this.stop();
		}
		if(keysMap[69]) {
			// хардкор
			this.gun.width = 2;
			this.gun.speedY = 100;
			this.gun.is_kill = 1;
			this.gun.color = 'red';
			this.gun.opacity = 0.7;
		}
		if(keysMap[81]) {
			this.gun.height = 0;
			this.gun.width = gunParams.realWidth;
			this.gun.speedY = gunParams.speedY;
			this.gun.is_kill = gunParams.is_kill;
			this.gun.color = gunParams.color;
			this.gun.opacity = gunParams.opacity;
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

	};

	this.start = function() {
		this.setIntervalId = setInterval(this.drawingGame, 1000 / 50);
	};

	this.stop = function() {
		clearInterval(this.setIntervalId);
	};

	this.start();
}

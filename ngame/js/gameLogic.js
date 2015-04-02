/**
 * Логика игры
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function playGame() {
	var timer = 0,
		setIntervalId = null,
		Constant = new NConstant(),
		startParams = {},
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
		factory = new NElementFactory(),
		gameCanvas,
		player,
		gun,
		ground,
		elements,
		score,
		healthInfo,
		drawingGame;

    // отрисовывающая функуия
    drawingGame = function() {
		++timer;
        gameCanvas.drawing();
        player.drawing();
        gun.drawing();
		ground.drawing();
		score.drawing();
		healthInfo.drawing();

		keyboardControl();
		playerLogic();

		// обработка игровых элементов
		for(var i = 0; i < elements.length; i++) {
			elements[i].update();
			elements[i].drawing();

			// логика стреляющих ботов
			if(elements[i].is_attack) {
				if(player.x - Constant.botMoveSizeConstant() >= elements[i].x || player.x + player.width + Constant.botMoveSizeConstant() <= elements[i].x) {
					elements[i].x -= elements[i].speedX;

					if(++elements[i].timer%100 == 0) {
						elements.push(factory.createElement( {
								method:'rect',
								type:'bullet',
								color:'white',
								x:elements[i].x,
								y:elements[i].y,
								realWidth:5,
								realHeight:5,
								speedX: (player.x + player.width/2 - elements[i].x)/50,
								speedY: (player.y + player.height/2 - elements[i].y)/50,
								is_killed:1,
								is_kill:1,
								is_crash:0
							}));

					}
				} else {
					elements[i].timer = 0;
				}
			}

			// логика при столкновении с элементами
			if(elements[i].is_crash ) {
				var crash = penetration(player, elements[i]);
				if(crash){
					if(crash.x <= player.speedX) {
						if(crash.direction.x <0) {
							player.x -= crash.x;
						} else if(crash.direction.x > 0) {
							player.x += crash.x;
						}
					}
					if(crash.y <= player.speedY) {
						if(crash.direction.y < 0) {
							player.y -= crash.y;
						} else if(crash.direction.y > 0) {
							player.y += crash.y;
						}
					}
				}
			}

			// столкновение пули с персонажем
			if(elements[i].is_kill) {
				if(CrashController(player, elements[i])) {
					--player.health;
					elements.splice(i, 1);
					if(player.health <= 0) {
						stopGame();
					}
				}
			}

			// столкновение с оружием
			if(CrashController(gun, elements[i])) {
				if(elements[i].is_event) {
					elements[i].is_event = 0;
					if(elements.length <= 5) {
						elements.push(factory.createElement({ method:'rect', color:'red', x:(elements[i].x + elements[i].width/2), y:gameCanvas.height-40, realWidth:10, realHeight:20, speedX:getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0, is_attack:1}));
						elements.push(factory.createElement({ method:'rect', color:'blue', x:(elements[i].x + elements[i].width/2), y:gameCanvas.height-40, realWidth:10, realHeight:20, speedX:-getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0, is_attack:1}));
						elements.push(factory.createElement({ method:'rect', color:'green', x:(elements[i].x + elements[i].width/2), y:elements[i].y-20, realWidth:10, realHeight:20, speedX:-getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0}));
					}
				}
				if(gun.is_kill) {
					if(--elements[i].health <= 0) {
						elements.splice(i, 1);
						score.message += 10;
						if(elements.length <= 5) {
							elements.push(factory.createElement({ method:'rect', color:'blue', x:0, y:gameCanvas.height, realWidth:10, realHeight:20, speedX:getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0, is_attack:1}));
							elements.push(factory.createElement({ method:'rect', color:'orange', x:gameCanvas.width-10, y:gameCanvas.height, realWidth:10, realHeight:20, speedX:-getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0, is_attack:1}));
						}
					} else {
						gun.height = elements[i].y - gun.y;
					}
				} else {
					if(elements[i].is_killed) {
						elements[i].x -= elements[i].speedX;
						elements[i].y -= gun.speedY + elements[i].speedY;
						++elements[i].timer;

						if(CrashController(player, elements[i])) {
							score.message += (10 + elements[i].timer);
							elements.splice(i, 1);
							if(elements.length <= 5) {
								elements.push(factory.createElement({ method:'rect', color:'blue', x:0, y:gameCanvas.height, realWidth:10, realHeight:20, speedX:getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0, is_attack:1}));
								elements.push(factory.createElement({ method:'rect', color:'orange', x:gameCanvas.width-10, y:gameCanvas.height, realWidth:10, realHeight:20, speedX:-getRandomValueFromArray(randomBotParams.speedX), speedY:9.8, is_killed:1, is_crash:0, is_attack:1}));
							}
						}
					} else {
						gun.height = elements[i].y - gun.y;
					}
				}
			}

			// столкновение ботов с землей
			if(CrashController(ground, elements[i])) {
				if(elements[i].y + elements[i].height > ground.y) {
					elements[i].y = ground.y - elements[i].height;
				}
			}

			// столкновение ботов со стенами
			if(WallController( gameCanvas, elements[i] )) {
				if(elements[i].is_kill) {
					elements.splice(i, 1);
				} else {
					if(elements[i].x < 0 || elements[i].x + elements[i].width > gameCanvas.width) {
						elements[i].speedX = -elements[i].speedX;
					}
					if(elements[i].y <0 ) {
						elements[i].y = 0;
					} else if(elements[i].y + elements[i].height > gameCanvas.height) {
						elements[i].y = gameCanvas.height - elements[i].height;
					}
				}
			}
		}

		healthInfo.message = player.health;
	};

	keyboardControl = function() {
		if(keysMap[27]) {
			stopGame();
		}
		if(keysMap[69]) {
			// хардкор
			gun.width = 2;
			gun.speedY = 100;
			gun.is_kill = 1;
			gun.color = 'red';
			gun.opacity = 0.7;
		}
		if(keysMap[81]) {
			gun.height = 0;
			gun.width = startParams.gunParams.realWidth;
			gun.speedY = startParams.gunParams.speedY;
			gun.is_kill = startParams.gunParams.is_kill;
			gun.color = startParams.gunParams.color;
			gun.opacity = startParams.gunParams.opacity;
		}
		//player move
		if(keysMap[32]) {
			if(gun.height <= 2 * player.height) {
				gun.height += gun.speedY;
				if(CrashController(ground, gun) || WallController(gameCanvas, gun)) {
					gun.height = ground.y - gun.y;
				}
			}
			gun.x = player.x + player.width/2 - gun.width/2;
			gun.y = player.y + player.height ;
		} else {
			gun.height = 0;
			if(keysMap[68]) {
				player.x += player.speedX;
			}
			if(keysMap[65]) {
				player.x -= player.speedX;
			}
			if(keysMap[87]) {
				player.y -= player.speedY;
			}
			if(keysMap[83]) {
				player.y += player.speedY;
			}
		}

	};

	playerLogic = function() {
		// столкновение со стеной
		if(WallController(gameCanvas, player)) {
			if(player.x < 0) {
				player.x = 0;
			} else if(player.x + player.width > gameCanvas.width) {
				player.x = gameCanvas.width - player.width;
			}
			if(player.y <0 ) {
				player.y = 0;
			} else if(player.y + player.height > gameCanvas.height) {
				player.y = gameCanvas.height - player.height;
			}
		}

		if(player.y + player.height > gameCanvas.height - player.height) {
			player.y = gameCanvas.height - 2* player.height;
		}

		// столкновение с землей
		if(CrashController(ground, player)) {
			if(player.y + player.height > ground.y) {
				player.y = ground.y - player.height;
			}
		}
	};

	this.startGame = function() {
		this.stopGame();
		startParams = {
			canvasParam: {  method:'image', path:'image/background.jpg', color:'grey', realWidth:Constant.canvasWidth(), realHeight:Constant.canvasHeight(), imageWidth:800, imageHeight:600},
			groundParams: { method:'rect', color:'black', y:Constant.canvasHeight()-20, realHeight:20, realWidth:Constant.canvasWidth()},
			playerParams: { method:'sprite', type:'player', health:10, path:'image/nlo.png', x:Constant.canvasWidth()/2 - 100/2, y:0, imageWidth:300, imageHeight:300, realWidth:100, realHeight:100, frameX:3, frameY:2, currentFrameX:0, currentFrameY:0, speedX:5, speedY:5},
			otherElements: [
				{ method:'rect', type:'build', health:100, color:'black', x:Constant.canvasWidth()/2 - 100/2, y:Constant.canvasWidth(),realHeight:100, realWidth:100, is_killed:0, is_crash:1, is_event:1}
			],
			gunParams: {method:'rect', color:'yellow', speedY:2, opacity:0.3, realWidth:30, is_kill:0},
			scoreParams: {method:'text', message:0, name:"score", x:25, y:35, color:'white'},
			healthInfoParams: {method:'text', message:0, name:"health", x:25, y:60, color:'white'}
		};
		gameCanvas = factory.createElement(startParams.canvasParam);
		player = factory.createElement(startParams.playerParams);
		gun = factory.createElement(startParams.gunParams);
		ground = factory.createElement(startParams.groundParams);
		score = factory.createElement(startParams.scoreParams);
		healthInfo = factory.createElement(startParams.healthInfoParams);

		elements = [];
		for(var i = 0; i < startParams.otherElements.length; i++) {
			elements[i] = factory.createElement(startParams.otherElements[i]);
		}
		setIntervalId = setInterval(drawingGame, 1000 / 50);
		return true;
	};

	this.continueGame = function() {
		this.stopGame();
		setIntervalId = setInterval(drawingGame, 1000 / 50);
		return true;
	};

	this.stopGame = function() {
		if(setIntervalId != null ) {
			clearInterval(setIntervalId);
		}
		return true;
	};

}

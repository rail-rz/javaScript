/**
 * Логика игры
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function playGame() {
	var setIntervalId = null,
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
		factory = new NElementFactory(),
		menu = document.getElementById('ngame-menu'),
		gameCanvas,
		player,
		elements,
		score,
		healthInfo,
		drawingGame,
		crash,
		stratTime,
		endTime,
		bots
		;

    // отрисовывающая функуия
    drawingGame = function() {
		stratTime = new Date().getTime();
        gameCanvas.drawing();
        player.drawing();
		score.drawing();
		healthInfo.drawing();

		keyboardControl();
		playerLogic();

		// обработка игровых элементов
		for(var i = 0; i < elements.length; i++) {
			elements[i].update();
			elements[i].drawing();

			// логика при столкновении с элементами
			if(elements[i].is_crash) {
				crash = penetration(player, elements[i]);
				if(crash){
					//console.log(elements[i].name);
					// если меньше то упасть
					// сраная заглушка
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
							player.canJump = true;
						} else if(crash.direction.y > 0) {
							// вот тут возможно перепрыгнуть снизу на вверх
							//player.y += crash.y;
						}
					}
				}
			}

			// столкновение ботов со стенами
			if(WallController( gameCanvas, elements[i] )) {
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

		// обработка ботов
		for(var j = 0; j < bots.length; j++) {
			bots[j].update();
			bots[j].drawing();

			// столкновение ботов со стенами
			if(WallController( gameCanvas, bots[j] )) {
				if(bots[j].x < 0 || bots[j].x + bots[j].width > gameCanvas.width) {
					bots[j].speedX = -bots[j].speedX;
				}
				if(bots[j].y <0 ) {
					bots[j].y = 0;
				} else if(bots[j].y + bots[j].height > gameCanvas.height) {
					bots[j].y = gameCanvas.height - bots[j].height;
				}
			}
			crash = penetration(player, bots[j]);
			if(crash) {
				--player.health;
			}

			// столкновение ботов с строениями
			for(var k = 0; k < elements.length; k++) {
				if (CrashController(elements[k], bots[j])) {
					if (bots[j].y + bots[j].height > elements[k].y) {
						if(bots[j].speedY < 0)
						{
							bots[j].speedY = -bots[j].speedY;
						}
						bots[j].y = elements[k].y - bots[j].height;
						if(elements[k].name != 'block-0' && bots[j].restartWay)
						{
							if(elements[k].name == 'block-1' && bots[j].x + bots[j].width >= elements[1].x + elements[1].width/2)
							{
								bots[j].speedY = - bots[j].speedY;
							}
							if(elements[k].name == 'block-2' && bots[j].x + bots[j].width <= elements[2].x + elements[2].width/2)
							{
								bots[j].speedY = - bots[j].speedY;
							}
							if(elements[k].name == 'block-3' && bots[j].x + bots[j].width/2 == elements[3].x + elements[3].width/2)
							{
								bots[j].speedY = - bots[j].speedY;
							}
							if(elements[k].name == 'block-6' && bots[j].x + bots[j].width/2 == elements[6].x + elements[6].width/2)
							{
								bots[j].speedY = - bots[j].speedY;
							}
							if(elements[k].name == 'block-7' && bots[j].x + bots[j].width/2 == elements[7].x + elements[7].width/2)
							{
								bots[j].speedY = - bots[j].speedY;
							}
							if(elements[k].name == 'block-9' && bots[j].x == elements[9].x) {
								bots[j].speedX = -bots[j].speedX;
							}
							if(elements[k].name == 'block-9' && bots[j].x + bots[j].width >= elements[9].x + elements[9].width) {
								if(bots[j].speedX > 0) {
									bots[j].speedY = - bots[j].speedY;
								}
							}
							if(elements[k].name == 'block-10' && bots[j].x + bots[j].width >= elements[10].x + elements[10].width) {
								bots[j].speedX = -bots[j].speedX;
							}
							if(elements[k].name == 'block-10' && bots[j].x + bots[j].width/2 == elements[10].x)
							{
								if(bots[j].speedX < 0)
								{
									bots[j].speedY = - bots[j].speedY;
								}
							}
							if(elements[k].name == 'block-12' && bots[j].x <= elements[12].x)
							{
								bots[j].speedY = - bots[j].speedY;
							}
							if(elements[k].name == 'block-15' && bots[j].x  <= elements[15].x )
							{
								bots[j].speedY = - bots[j].speedY;
							}
							if(elements[k].name == 'block-13' && bots[j].x + bots[j].width/2 >= elements[13].x)
							{
								bots[j].speedY = - bots[j].speedY;
							}
							if(elements[k].name == 'block-17' || elements[k].name == 'block-16')
							{
								bots[j].restartWay = false;
							}
						} else if(elements[k].name == 'block-0') {
							bots[j].restartWay = true;
						}
					}
				}
			}
		}

		healthInfo.message = player.health;
		endTime = new Date().getTime();
	};

	keyboardControl = function() {
		if(keysMap[27]) {
			stopGame();
		}
		if(keysMap[68]) {
			player.x += player.speedX;
		}
		if(keysMap[65]) {
			player.x -= player.speedX;
		}


		if(keysMap[32]) {
			if( player.startJump < 9) {
				if(player.canJump) {
					player.y -= 2 * player.speedY;
				}
				player.startJump += 1;
			}
			//else
			//{
			//	player.startJump = 20;
			//}
		} else {
			player.startJump = 0;
			player.canJump = false;
		}

		if(keysMap[83]) {
			console.log(endTime, new Date().getTime());
			console.log(new Date().getTime() - stratTime);
		}
		player.y += 10;
	};

	playerLogic = function() {
		// Запрет на выход из рамки канваса
		if(WallController(gameCanvas, player)) {
			if(player.x < 0) {
				player.x = 0;
			} else if(player.x + player.width > gameCanvas.width) {
				player.x = gameCanvas.width - player.width;
			}
			if(player.y < 0) {
				player.y = 0;
			} else if(player.y + player.height > gameCanvas.height) {
				player.y = gameCanvas.height - player.height;
			}
		}
	};

	this.startGame = function() {
		this.stopGame();
		startParams = {
			canvasParam: { method:'image', path:'image/background.png', color:'grey', realWidth:Constant.canvasWidth(), realHeight:Constant.canvasHeight(), imageWidth:800, imageHeight:600},
			playerParams: { method:'rect', type:'player', health:10, color:'red', x:Constant.canvasWidth()/2, y:0, realWidth:40, realHeight:40, speedX:5, speedY:10},
			otherElements: [
				{ method:'rect', type:'build', color:'grey', y:Constant.canvasHeight(), realHeight:25, realWidth:Constant.canvasWidth(), is_killed:0, is_crash:1, is_event:1, name:'block-0' },
				{ method: "rect", color: "#f81414",  realHeight: 65, x: 222, y: 508, realWidth: 80,  is_crash:1, name:'block-1' },
				{ method: "rect", color: "#f81414",  realHeight: 65, x: 495, y: 508, realWidth: 80,  is_crash:1, name:'block-2' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 357, y: 460, realWidth: 70,  is_crash:1, name:'block-3' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 63,  y: 443, realWidth: 138, is_crash:1, name:'block-4' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 610, y: 451, realWidth: 129, is_crash:1, name:'block-5' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 241, y: 415, realWidth: 80,  is_crash:1, name:'block-6' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 484, y: 416, realWidth: 80,  is_crash:1, name:'block-7' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 371, y: 368, realWidth: 79,  is_crash:1, name:'block-8' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 129, y: 347, realWidth: 112, is_crash:1, name:'block-9' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 530, y: 351, realWidth: 138, is_crash:1, name:'block-10' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 288, y: 297, realWidth: 89,  is_crash:1, name:'block-11' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 466, y: 305, realWidth: 57,  is_crash:1, name:'block-12' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 220, y: 254, realWidth: 65,  is_crash:1, name:'block-13' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 518, y: 242, realWidth: 74,  is_crash:1, name:'block-14' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 383, y: 215, realWidth: 55,  is_crash:1, name:'block-15' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 476, y: 182, realWidth: 60,  is_crash:1, name:'block-16' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 289, y: 167, realWidth: 67,  is_crash:1, name:'block-17' },
				{ method: "rect", color: "#f81414",  realHeight: 3,  x: 378, y: 111, realWidth: 67,  is_crash:1, name:'block-18' }

			],
			bots : [
				{ method:'rect', type:'bot',   color:'blue', x:0, y:550, realWidth:40, realHeight:40, speedX:3, speedY:5, is_crash:1, is_kill:1},
				{ method:'rect', type:'bot',   color:'blue', x:720, y:550, realWidth:40, realHeight:40, speedX:-3, speedY:5, is_crash:1, is_kill:1}
				// { method:'rect', type:'bot',   color:'green', x:380, y:550, realWidth:40, realHeight:40, speedX:4, speedY:4, is_crash:1, is_kill:1}
			],
			scoreParams: {method:'text', message:0, name:"score", x:25, y:35, color:'white'},
			healthInfoParams: {method:'text', message:0, name:"health", x:25, y:60, color:'white'}
		};
		gameCanvas = factory.createElement(startParams.canvasParam);
		player = factory.createElement(startParams.playerParams);
		player.startJump = 0;
		score = factory.createElement(startParams.scoreParams);
		healthInfo = factory.createElement(startParams.healthInfoParams);

		elements = [];
		for(var i = 0; i < startParams.otherElements.length; i++) {
			elements[i] = factory.createElement(startParams.otherElements[i]);
			elements[i].opacity = 0;
		}
		bots = [];
		for(var j = 0; j < startParams.bots.length; j++) {
			bots[j] = factory.createElement(startParams.bots[j]);
			bots[j].restartWay = true;
		}
		setIntervalId = setInterval(drawingGame, 1000 / 60);
		menu.style.display = 'none';

		return true;
	};

	this.continueGame = function() {
		this.stopGame();
		if(player.health <= 1) {
			this.startGame();
		} else {
			setIntervalId = setInterval(drawingGame,  1000 / 60);
			menu.style.display = 'none';
			return true;
		}
	};

	this.stopGame = function() {
		menu.style.display = 'block';
		if(score) {
			menu.childNodes[1].innerHTML = "Score: " + score.message;
		}
		if(setIntervalId != null ) {
			clearInterval(setIntervalId);
		}
		return true;
	};

}

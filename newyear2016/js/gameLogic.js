/**
 * Логика игры
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function playGame() {
	var setIntervalId = null,
		Constant = new NConstant(),
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
		bots,
		toys,
		eventsBlogs
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
						}
						// else if(crash.direction.y > 0) {
							// вот тут возможно перепрыгнуть снизу на вверх
							//player.y += crash.y;
						// }
					}
				}
			}
		}

		for(var z = 0; z < toys.length; z++) {
			toys[z].drawing();
			if(player.bag.length == 0 && toys[z].is_up && penetration(player, toys[z])) {
				if(keysMap[70]) {
					player.bag[0] = toys[z];
					toys.splice(z, 1);
				}
			}
		}

		if(player.bag.length > 0){
			for(var a = 0; a < eventsBlogs.length; a++) {
				eventsBlogs[a].drawing();
				if(keysMap[70] && penetration(player, eventsBlogs[a])) {
					player.bag[0].x = eventsBlogs[a].x + eventsBlogs[a].width/2 - player.bag[0].width/2;
					player.bag[0].y = eventsBlogs[a].y + eventsBlogs[a].height;
					if(toys.length == 8) {
						player.bag[0].x = 390;
						player.bag[0].y = 0;
					}
					player.bag[0].is_up = false;
					toys.push(player.bag[0]);
					player.bag.splice(0, 1);
					eventsBlogs.splice(a,1);
					if(eventsBlogs.length == 0 && toys.length < 9) {
						var toy = factory.createElement({ method:'rect', type:'toy', color:'white',  x:385 , y:520, realWidth:30, realHeight:60 });
						toy.is_up = true;
						toys.push(toy);
						eventsBlogs.push(factory.createElement({method:'rect', color:'white',realWidth:30, realHeight:60, x:385, y: 50, opacity:0.5}));
					}
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
			if(crash && player.shieldTimer > 100) {
				--player.health;
				player.shieldTimer = 0;
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


		// щит игрока
		++player.shieldTimer;
		if(player.shieldTimer <= 100) {
			player.opacity = 0.6;
		}
		else {
			player.opacity = 1;
		}

		if(player.health <= 0) {
			score.message = "Fail!";
			stopGame();
		} else if(toys.length == 9 && eventsBlogs.length == 0) {
			score.message = "Cool!";
			stopGame();
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
		} else {
			player.startJump = 0;
			player.canJump = false;
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
			playerParams: { method:'rect', type:'player', health:3, color:'red', x:Constant.canvasWidth()/2, y:70, realWidth:40, realHeight:40, speedX:5, speedY:10, opacity:1},
			otherElements: [
				{ method:'rect', type:'build', color:'grey', y:Constant.canvasHeight() - 25, realHeight:25, realWidth:Constant.canvasWidth(), is_killed:0, is_crash:1, is_event:1, name:'block-0' },
				{ method: "rect", color: "#f81414",  realHeight: 65, x: 215, y: 508, realWidth: 80,  is_crash:1, name:'block-1' },
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
				{ method:'rect', type:'bot', color:'blue', x:0, y:550, realWidth:40, realHeight:40, speedX:3, speedY:5, is_crash:1, is_kill:1},
				{ method:'rect', type:'bot', color:'green', x:720, y:550, realWidth:40, realHeight:40, speedX:-3, speedY:5, is_crash:1, is_kill:1},
				{ method:'rect', type:'bot',   color:'green', x:350, y:550, realWidth:40, realHeight:40, speedX:2, speedY:9, is_crash:1, is_kill:1}
			],
			toys: [
				{ method:'rect', type:'toy', color:'green',  x:0, y:550, realWidth:30, realHeight:30 },
				{ method:"rect", type:'toy', color:'blue',   x:50, y:550, realWidth:30, realHeight:30 },
				{ method:'rect', type:'toy', color:'red',    x:100, y:550, realWidth:30, realHeight:30 },
				{ method:'rect', type:'toy', color:'grey',   x:150, y:550, realWidth:30, realHeight:30 },
				{ method:'rect', type:'toy', color:'orange', x:620, y:550, realWidth:30, realHeight:30 },
				{ method:"rect", type:'toy', color:'purple', x:670, y:550, realWidth:30, realHeight:30 },
				{ method:'rect', type:'toy', color:'pink',   x:720, y:550, realWidth:30, realHeight:30 },
				{ method:'rect', type:'toy', color:'black',  x:770, y:550, realWidth:30, realHeight:30 }
			],
			eventsBlogs: [
				{method:'rect', color:'white',realWidth:40, realHeight:40, x: 700, y: 410},
				{method:'rect', color:'white',realWidth:40, realHeight:40, x: 367, y: 423},
				{method:'rect', color:'white',realWidth:40, realHeight:40, x: 261, y: 378},
				{method:'rect', color:'white',realWidth:40, realHeight:40, x: 109, y: 310},
				{method:'rect', color:'white',realWidth:40, realHeight:40, x: 530, y: 314},
				{method:'rect', color:'white',realWidth:40, realHeight:40, x: 570, y: 205},
				{method:'rect', color:'white',realWidth:40, realHeight:40, x: 385, y: 170},
				{method:'rect', color:'white',realWidth:40, realHeight:40, x: 269, y: 130}
			],
			scoreParams: {method:'text', message:'', name:"score", x:25, y:35, color:'white'},
			healthInfoParams: {method:'text', message:0, name:"health", x:25, y:60, color:'white'}
		};
		gameCanvas = factory.createElement(startParams.canvasParam);

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
		toys = [];
		for(var z = 0; z < startParams.toys.length; z++) {
			toys[z] = factory.createElement(startParams.toys[z]);
			toys[z].is_up = true;
		}
		eventsBlogs = [];
		for(var a = 0; a < startParams.eventsBlogs.length; a++) {
			eventsBlogs[a] = factory.createElement(startParams.eventsBlogs[a]);
			eventsBlogs[a].opacity = 0.2;
		}
		player = factory.createElement(startParams.playerParams);
		player.startJump = 0;
		player.shieldTimer = 0;
		player.bag = [];
		setIntervalId = setInterval(drawingGame, 1000 / 50);
		menu.style.display = 'none';

		return true;
	};

	this.continueGame = function() {
		this.stopGame();
		if(player.health <= 1) {
			this.startGame();
		} else {
			setIntervalId = setInterval(drawingGame,  1000 / 50);
			menu.style.display = 'none';
			return true;
		}
	};

	this.stopGame = function() {
		menu.style.display = 'block';
		if(score) {
			menu.childNodes[1].innerHTML = score.message;
		}
		if(setIntervalId != null ) {
			clearInterval(setIntervalId);
		}
		return true;
	};

}

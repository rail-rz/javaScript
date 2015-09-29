/**
 * Логика игры
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function playGame() {
	var setIntervalId = null,
		Constant = new NConstant(),
		startParams = {},
		factory = new NElementFactory(),
		gameCanvas,
		elements,
		drawingGame;

    // отрисовывающая функуия
    drawingGame = function() {
        //gameCanvas.drawing();

       	// обработка игровых элементов
		for(var i = 0; i < elements.length; i++) {
			elements[i].update();
			elements[i].drawing();

			// логика при столкновении с элементами
			/*if(elements[i].is_crash ) {
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
			}*/

		}
	};


	this.startGame = function() {
		this.stopGame();
		startParams = {
			//canvasParam: {  method:'image', path:'image/background.jpg', color:'grey', realWidth:Constant.canvasWidth(), realHeight:Constant.canvasHeight(), imageWidth:800, imageHeight:600},
			otherElements: [
				{ method:'rect', type:'div', health:100, color:'red', x:Constant.canvasWidth()/2 - 100/2, y:Constant.canvasWidth(),realHeight:100, realWidth:100, is_killed:0, is_crash:1, is_event:1, speedX:1}
			]
		};
		//gameCanvas = factory.createElement(startParams.canvasParam);

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

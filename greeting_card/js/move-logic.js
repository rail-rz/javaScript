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
            elements[i].updateUnique();
		}
	};


	this.startGame = function() {
		this.stopGame();
		startParams = {
			otherElements: [
				{ method:'rect',   type:'div', color:'red',   left:2,   top:100, width:100, height:100, speedX:4, speedRotate:1},
                { method:'rect',   type:'div', color:'blue',  left:500, top:0,   width:100, height:100, speedY:4, opacityMin:0.5, opacityMax:0.7, opacity:1 },
                { method:'rect',   type:'div', color:'green', left:0,   top:0,   width:100, height:100, speedY:5, speedX:5, rotate:40},
                { method:'image',  type:'img', path:'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQL82tckOtHxX4LwHGEFCJ1OxL2JcHWCrJ_FMF8La0FLFlqw-h2cgn2KyZj', left:50, top:50, width:100, height:100, speedY:-3, speedX:-2, opacityMin:0.3, opacityMax:0.5},
                { method:'sprite', type:'div', path:'images/nlo.png', left:700, top:500, width:100, height:100, speedY:-1, speedX:2, frameX:4, frameY:3, currentFrameX:0,currentFrameY:0, rotate:40, opacityMin:0, opacityMax:1}
			]
		};

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

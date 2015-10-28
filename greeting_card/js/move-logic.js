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
				/*{ method:'rect',   type:'div', color:'red',   left:2,   top:100, width:100, height:100, speedX:4, speedRotate:1},
                { method:'rect',   type:'div', color:'blue',  left:500, top:0,   width:100, height:100, speedY:4, opacityMin:0.1, opacityMax:0.9, opacity:1 },
                { method:'rect',   type:'div', color:'green', left:0,   top:0,   width:100, height:100, speedY:5, speedX:5, rotate:40},
                { method:'image',  type:'img', path:'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQL82tckOtHxX4LwHGEFCJ1OxL2JcHWCrJ_FMF8La0FLFlqw-h2cgn2KyZj', left:50, top:50, width:100, height:100, speedY:-3, speedX:-2, opacityMin:0.3, opacityMax:0.5},*/
                { method:'rect',   type:'div', color:'#ffffff', left:300, top:390, width:200, height:190},
                { method:'sprite', type:'div', path:'images/candel_relise.png', left:325, top:100, width:150, height:300, frameX:7, frameY:3, currentFrameX:0,currentFrameY:0, opacityMin:0.4, opacityMax:0.7, opacitySpeed:0.01}
			]
		};

		elements = [];
		for(var i = 0; i < startParams.otherElements.length; i++) {
			elements[i] = factory.createElement(startParams.otherElements[i]);
		}
		setIntervalId = setInterval(drawingGame, 1000 / 25);

		return true;
	};

	this.continueGame = function() {
		this.stopGame();
        setIntervalId = setInterval(drawingGame, 1000 / 25);
			return true;
	};

	this.stopGame = function() {
		if(setIntervalId != null ) {
			clearInterval(setIntervalId);
		}
		return true;
	};

}

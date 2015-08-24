/**
 * Константы
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

var NConstant = function () {
	var canvasWidth  = 800,
		canvasHeight = 600,
        heightWindow = window.innerHeight,
        widthWindow  = window.innerWidth;

	this.canvasWidth  = function () { return canvasWidth; };
	this.canvasHeight = function () { return canvasHeight; };
    this.heightWindow = function () { return heightWindow; };
    this.widthWindow  = function () { return widthWindow; };

    this.botMoveSizeConstant = function() { return canvasWidth/6 };
};

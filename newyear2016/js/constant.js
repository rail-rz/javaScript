/**
 * Константы
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

var NConstant = function () {
	var canvasWidth = 800,
		canvasHeight = 600;

	this.canvasWidth = function () { return canvasWidth; };
	this.canvasHeight = function () { return canvasHeight; };
	this.botMoveSizeConstant = function() { return canvasWidth/6 };
};

/**
 * Инициализирующая проект функция
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */
//var NSingletone;

function Init() {
    var canvas = document.getElementById('namga-game');

    // функции слушатили
//  canvas.onmousemove = mouseMove;
    window.addEventListener( "keydown", doKeyDown, false);
    window.addEventListener( "keyup", doKeyUp, false);

//	var NSingletone = (function () {
//		var instance;
//
//		return function ConstructSingletone () {
//			if (instance) {
//				return instance;
//			}
//			if (this && this.constructor === ConstructSingletone) {
//				return instance = canvas.getContext("2d");
//			} else {
//				return new ConstructSingletone();
//			}
//		}
//	}());

    PlayGame(canvas);
}
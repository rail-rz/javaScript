/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function Init() {
	cloudOfSnow();
	fireElements();
	initDeer();
	watch();
}

// метод для получения рандомного значения из массива
function getRandomVarFromArray(array) {
	var random = Math.floor(Math.random() * array.length);
	return array[random];
}

// метод для получения рандомного значения
function getRandom(max, min) {
	return Math.random() * (max - min) + min;
}
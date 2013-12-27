/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */
// определние макс высоты и ширины
// решение представленно для Хрома и Лисы
var heightWindow = window.innerHeight; //максимальная высота браузера
var widthWindow = window.innerWidth; // макс ширина браузера

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

// условие для автоматической подстройки под новый формат
function controlSizeWindow() {
	if( window.innerHeight ) {
		heightWindow = window.innerHeight;
		widthWindow = window.innerWidth;
	}
}

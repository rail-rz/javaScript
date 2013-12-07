/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */
var amountSnow = 30; // кол-во снежинок
var speedSnow = 0.5; // скорость
var elementSnow = "*" // то, что мы будем назвыать снежинкой
var maxSizeSnow = 30; // макс. вес снежинки
var minSizeSnow = 5; // минимальный вес снижинки
var heightWindow; //максимальная высота браузера
var widthWindow; // макс ширина браузера

var snow = new Array(); // тут будет снег

// метод для получения рандомного значения
function getRandom(max, min) {
	return Math.random() * (max - min) + min;
}

function cloudOfSnow() {
	// определние макс высоты и ширины
	// решение представленно для Хрома и Лисы
	heightWindow = window.innerHeight;
	widthWindow = window.innerWidth;

	for(i=0;i<=amountSnow;i++) {
		snow[i] = document.getElementById("snow"+i);
		// определяем вес и скорость падения снежинки
		snow[i].size=getRandom(maxSizeSnow,minSizeSnow);
		snow[i].speed=speedSnow*snow[i].size/5;
		// начальная позиция снежинок
		snow[i].positionOnX=getRandom(widthWindow-snow[i].size, 0);
		snow[i].positionOnY=0;
	}
	snowFall();
}

function snowFall() {
	for(i=0;i<=amountSnow;i++) {
		snow[i].positionOnY+=snow[i].speed;
		snow[i].style.left=snow[i].positionOnX+'px';
		snow[i].style.top=snow[i].positionOnY+'px';
		// определяет,не ушела ли за пределы экрана снежинка и создает новую если это так
		if (snow[i].positionOnY>=heightWindow-maxSizeSnow) {
			snow[i].positionOnX=getRandom(widthWindow-snow[i].size,0);
			snow[i].positionOnY=0;
		}
	}
	// обнавляет snowFall каждые 50 миллисекунды
	setTimeout("snowFall()",50);
}

// создаем армию снежинок
for(i=0;i<=amountSnow;++i) {
	document.write("<span id='snow"+i+"' style='position: absolute;color: white; z-index:100'>"+elementSnow+"</span>");
}
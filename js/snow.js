/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 *
 * Для того, чтобы использовать только этот скрипт на снегопад,
 * также может понадобиться скачать скрипт initial.js
 * и/или перенести методы getRandom и getRandomVarFromArray
 * и поставить <body onLoad = "cloudOfSnow()" >
 */
var amountSnow = 50; // кол-во снежинок
var speedSnow = 0.5; // скорость
var maxSizeSnow = 30; // макс. вес снежинки
var minSizeSnow = 5; // минимальный вес снижинки
var snowColor = new Array('#FFFAFA', '#F8F8FF', '#FFFFF0', '#EEE9E9', '#FFFFF0', '#E6E6FA', '#8B8989', '#CDC9C9'); // цвет снежинок
// определние макс высоты и ширины
// решение представленно для Хрома и Лисы
var heightWindow = window.innerHeight; //максимальная высота браузера
var widthWindow = window.innerWidth; // макс ширина браузера

var snow = new Array(); // тут будет снег
var elementSnow = new Array('*', '&#10052;', '&#10053;', '&#10054;');// то, что мы будем назвыать снежинкой

function cloudOfSnow() {
	for(i=0;i<=amountSnow;i++) {
		snow[i] = document.getElementById("snow-"+i);
		// определяем вес и скорость падения снежинки
		snow[i].size=getRandom(maxSizeSnow,minSizeSnow);
		snow[i].style.color = getRandomVarFromArray(snowColor);
		snow[i].style.fontSize = snow[i].size + 'px';
		snow[i].speed=speedSnow*snow[i].size/5;
		// начальная позиция снежинок
		snow[i].positionOnX=getRandom(widthWindow-snow[i].size, 0);
		snow[i].positionOnY=getRandom(heightWindow-snow[i].size, 0);
	}
	snowFall();
}

function snowFall() {
	for(i=0;i<=amountSnow;i++) {
		snow[i].positionOnY+=snow[i].speed;
		snow[i].style.left=snow[i].positionOnX+'px';
		snow[i].style.top=snow[i].positionOnY+'px';
		// определяет,не ушела ли за пределы экрана снежинка и создает новую если это так
		// умноженное на два,
		// всязи с тем, что иначе он будет пролитать лишнее растояние
		if (snow[i].positionOnY>=heightWindow-2*snow[i].size) {
			snow[i].positionOnX=getRandom(widthWindow-snow[i].size,0);
			snow[i].positionOnY=0;
		}
	}
	// обнавляет snowFall каждые 50 миллисекунды
	setTimeout("snowFall()",50);
}

// создаем армию снежинок
for(i=0;i<=amountSnow;++i) {
	document.write("<span id='snow-"+i+"' style='position: absolute;color: white; z-index:100'>"+getRandomVarFromArray(elementSnow)+"</span>");
}

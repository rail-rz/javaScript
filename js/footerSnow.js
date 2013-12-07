/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */
var amountFooterSnow = 40; // кол-во сугробов
var maxFooterSnowSize = 200; // максимальная ширина сугроба
var minFooterSnowSize = 50; // минимальная ширина сугроба
var footerSnowColor = new Array('#FFFAFA', '#F8F8FF', '#FFFFF0', '#EEE9E9', '#FFFFF0'); // цвет сугроба

var footerSnow = new Array();

function getRandomVarFromArray(array){
	var random = Math.floor( Math.random() * array.length );
	return array[random];
}

function initFooterSnow() {
	for(i=0; i<=amountFooterSnow; i++) {
		footerSnow = document.getElementById('footer-snow-'+i);
		footerSnow.size = getRandom(maxFooterSnowSize,minFooterSnowSize);
		footerSnow.style.width = footerSnow.size+'px';
		footerSnow.style.left = getRandom(window.innerWidth-footerSnow.size, 0)+'px';
		footerSnow.style.background = getRandomVarFromArray(footerSnowColor);
		footerSnow.style.borderColor = 'black';
	}
}

// создаем армию сугробов
for(i=0;i<=amountFooterSnow;++i) {
	document.write("<div id='footer-snow-"+i+"'\n\
style='position:absolute; bottom: 0;  height:28px; border-radius: 100% 100% 0 0; z-index:7'></div>");
}
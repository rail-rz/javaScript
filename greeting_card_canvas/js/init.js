/**
 * Инициализирующая проект функция
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function init() {
	var Constants = new NConstant(),
    	canvas = document.getElementById('greeting-card');

    console.log(Constants.widthWindow());
    console.log( Constants.widthWindow() - Constants.canvasWidth() - 5);

    var work_zone = document.getElementById('work-zone');
    work_zone.style.width =  Constants.canvasWidth() + 5 + 'px';
    work_zone.style.height =  Constants.canvasHeight() + 5 + 'px';

    var right_zone = document.getElementById('right-zone');
    right_zone.style.width =  Constants.widthWindow() - Constants.canvasWidth() - 5 + 'px';
    right_zone.style.height = Constants.canvasHeight() + 5 + 'px';

    var bottom_left_zone = document.getElementById('bottom-left-zone');
    bottom_left_zone.style.width = Constants.canvasWidth() + 5 + 'px';
    bottom_left_zone.style.height = Constants.heightWindow() - Constants.canvasHeight() - 5 + 'px';

    var bottom_right_zone = document.getElementById('bottom-right-zone');
    bottom_right_zone.style.width = right_zone.style.width;
    bottom_right_zone.style.height = bottom_left_zone.style.height;

	// инициализируем контекст для фабрики
	NElement.context = canvas.getContext("2d");
	canvas.style.width = Constants.canvasWidth() + 'px';
	canvas.style.height = Constants.canvasHeight() + 'px';
	//canvas.style.top = canvas.offsetTop + 'px';
	//canvas.style.left = canvas.offsetLeft + 'px';
	// задаем размеры и разрешение canvas
	canvas.width = Constants.canvasWidth();
	canvas.height = Constants.canvasHeight();

//  функции слушатили
    canvas.onmousemove = mouseMove;
    canvas.onmousedown = mouseDown;
//    window.addEventListener( "keydown", doKeyDown, false);
//    window.addEventListener( "keyup", doKeyUp, false);

    CreateElements();
}


// управление мышью
function mouseMove(e) {
    elements[0].y = e.pageY;
    elements[0].x = e.pageX;
    //elements[0].drawing();
}

function mouseDown(e) {
    console.log(elements);
}
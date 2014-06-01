/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 *
 * за основу взято http://javascript.ru/ui/draganddrop
 */

var dragMaster = (function () {

	var dragObject;
	var mouseOffset;
	var sizeButton;

	// получить сдвиг target относительно курсора мыши
	function getMouseOffset(target, e) {
		var docPos = getPosition(target);
		return {x: e.pageX - docPos.x, y: e.pageY - docPos.y}
	}

	function mouseUp() {
		dragObject = null;

		// очистить обработчики, т.к перенос закончен
		document.onmousemove = null;
		document.onmouseup = null;
		document.ondragstart = null;
		document.body.onselectstart = null;
	}

	function mouseMove(e) {
		e = fixEvent(e);

		with (dragObject.style) {
			position = 'absolute';

			//TODO: эта часть кода обязательна для переписки!
			if ((e.pageY - mouseOffset.y) > 0 && (e.pageY - mouseOffset.y + dragObject.offsetHeight) < sizeControl(window.innerHeight, 75)) {
				top = e.pageY - mouseOffset.y + 'px'
			}

			if ((e.pageX - mouseOffset.x) >= 0 && (e.pageX - mouseOffset.x + dragObject.offsetWidth) <= sizeControl(window.innerWidth, 75)) {
				left = e.pageX - mouseOffset.x + 'px'
			}

			buttonPosition();

//            TODO: второй вариант, чтобы пол элемента можно было спрятать за экран
//            if(elementTop + dragObject.offsetHeight/2>=0 && (elementTop + dragObject.offsetHeight/2)<= sizeControl(window.innerHeight, 75)) {
//                top = elementTop + 'px'
//            }
//            if((elementLeft + dragObject.offsetWidth/2)>=0 && (elementLeft + dragObject.offsetWidth/2)<= sizeControl(window.innerWidth, 75)) {
//                left = elementLeft + 'px'
//            }

		}
		return false
	}


	function mouseDown(e) {
		e = fixEvent(e);
		if (e.which != 1) return;

		dragObject = this;
		sizeButton = document.getElementById('bottom-right-button')

		// получить сдвиг элемента относительно курсора мыши
		mouseOffset = getMouseOffset(this, e);

		// эти обработчики отслеживают процесс и окончание переноса
		document.onmousemove = mouseMove;
		document.onmouseup = mouseUp;

		// отменить перенос и выделение текста при клике на тексте
		document.ondragstart = function () {return false};
		document.body.onselectstart = function () {return false};

		// устанавливаем кнопку ресайза блока вниз эл-та
		buttonPosition(e);

		// вот отсюда начинается доступ к новому классу на обработку и вывод инфы
		infoBlock.getInfo(dragObject);
		resizeBlock.resize(dragObject);

		return false
	}

	function buttonPosition() {
		sizeButton.style.top = dragObject.offsetTop + dragObject.offsetHeight + 'px';
		sizeButton.style.left = dragObject.offsetLeft + dragObject.offsetWidth + 'px';
	}

	return {
		makeDraggable: function (element) {
			element.onmousedown = mouseDown;
		}
	}

}());

function DragObject(element) {
	dragMaster.makeDraggable(element);
}

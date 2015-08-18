/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */


var workZone = (function () {

	var workZoneObject;

	function mouseDown(e) {
//		e = fixEvent(e);
//		if (e.which != 1) return;

		workZoneObject = this;

		// отменить перенос и выделение текста при клике на тексте
		document.ondragstart = function () {return false};
		document.body.onselectstart = function () {return false};

		// вот отсюда начинается доступ к новому классу на обработку и вывод инфы
		infoBlock.getInfo(workZoneObject);

		return false
	}
    


	return {
		getInfo: function (element) {
			element.onmousedown = mouseDown;
		}
	}

}());

function WorkZone(element) {
	workZone.getInfo(element);
}

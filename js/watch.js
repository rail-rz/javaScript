/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */
function watch() {
	var date = new Date();
	var d = date.getTime();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();

	document.getElementById('clock').innerHTML = h + ":" + viewControl(m) + ":" + viewControl(s);
	setTimeout("watch()", 1000);
}

function viewControl(i) {
	return (i < 10) ? '0' + i : i;
}
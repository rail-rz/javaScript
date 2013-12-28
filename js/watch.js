/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */
function watch() {
	var date = new Date();
	var y= date.getFullYear();
	var d = date.getDate();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();

	if(y==2013)
		document.getElementById('last-day').innerHTML = 31-d;
	else {
		document.getElementById('new-year').innerHTML = "С новым"
		document.getElementById('last-day').innerHTML = "годом";
	}
	document.getElementById('clock').innerHTML = h + ":" + viewControl(m) + ":" + viewControl(s);
	setTimeout("watch()", 1000);
}

function viewControl(i) {
	return (i < 10) ? '0' + i : i;
}
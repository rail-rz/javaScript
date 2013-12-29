/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */
var footer = new Array();
var deer;

function initDeer() {
	footer[0] = document.getElementById("deer-left-footer-1");
	footer[1] = document.getElementById("deer-left-footer-2");
	footer[2] = document.getElementById("deer-right-footer-1");
	footer[3] = document.getElementById("deer-right-footer-2");

	footer[0].start =40;
	footer[1].start =10;
	footer[2].start =40;
	footer[3].start =10;

	footControl(0,0);
	footControl(1,0);
	footControl(2,0);
	footControl(3,0);

	deerPosition();
}

function footControl(i, position){
	footer[i].style.webkitTransform = "rotate("+footer[i].start+"deg)";
	footer[i].style.MozTransform = "rotate("+footer[i].start+"deg)";
	footer[i].style.tsransform = "rotate("+footer[i].start+"deg)";
	if(position == 0) {
		(footer[i].start-- <= -25) ? setTimeout("footControl("+i+", 1)",40) : setTimeout("footControl("+i+", 0)",40);
	} else {
		(footer[i].start++ >= 40) ? setTimeout("footControl("+i+", 0)",40) : setTimeout("footControl("+i+", 1)",40);
	}
}

function deerPosition() {
	deer = document.getElementById("deer-sledge");
	deer.startPosition = widthWindow-350;
	moveDeer();
}

function moveDeer() {
	controlSizeWindow();
	deer.style.left = deer.startPosition+"px";
	deer.startPosition -=3;
	if(deer.startPosition <= -350)
		deer.startPosition = widthWindow-350;
	setTimeout("moveDeer()",50);
}
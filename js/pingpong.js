/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

// Создаем канвас
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 450;
//canvas.style.backgroundColor = 'black';
canvas.style.border = "1px solid black";
// добавляет элемент последним в список детей
document.body.appendChild(canvas);

var gameCanvas, computer, player, ball;

Init();

// создаем класс Rect для отрисовки прямоугольников
function Rect(color, x, y, width, height) {

	this.color = color;	// цвет прямоугольника
	this.x = x; // координата х
	this.y = y; // координата у
	this.width = width; // ширина
	this.height = height; // высота
	// Метод рисующий прямоугольник
	this.drawing = function () {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}

function Init() {
	gameCanvas = new Rect('white', 0, 0, canvas.width, canvas.height)
	computer = new Rect("black", 0, canvas.height / 2 - 40, 20, 80);
	player = new Rect("black", canvas.width - 20, canvas.height / 2 - 40, 20, 80);//
	ball = new Rect("black", canvas.width / 2 - 10, canvas.height / 2 - 10, 20, 20);

	ball.vX = 2; // скорость по оси х
	ball.vY = 2; // скорость по оси у

	computer.vY = 0;

	canvas.onmousemove = PlayerMove;
	setInterval(PlayGame, 1000 / 50);
}

function Drawing() {
	gameCanvas.drawing();
	computer.drawing();
	player.drawing();
	ball.drawing();
}

function Update() {
	ComputerMovie();
	if (ball.y < 0 || (ball.y + ball.height) > canvas.height) {
		ball.vY = -ball.vY;
	} else if ((ball.x + ball.width) > canvas.width || (ball.x + ball.width) < 0) {
		RestartGame();
	} else if ((PushControl(computer, ball) && ball.vX < 0) || (PushControl(player, ball) && ball.vX > 0)) {
		if (ball.vX < 9 && -9 < ball.vX) {
			if (ball.vX < 0) {
				ball.vX--;
			} else {
				ball.vX++;
			}
			if (ball.vY < 0) {
				ball.vY--;
			} else {
				ball.vY++;
			}
		}
		computer.vY += 2;// костыль
		ball.vX = -ball.vX;
	}
	ball.x += ball.vX;
	ball.y += ball.vY;
}

function PlayerMove(e) {
	var y = e.pageY;
	if (player.height / 2 < y && y < canvas.height - player.height / 2) {
		player.y = y - player.height / 2;
	}
}

function PlayGame() {
	Drawing();
	Update();
}

function PushControl(objA, objB) {
	if (objA.x + objA.width > objB.x &&
		objA.x < objB.x + objB.width &&
		objA.y + objA.height > objB.y &&
		objA.y < objB.y + objB.height)
		return true;
	else
		return false;
}

function RestartGame() {
//	ball.vX = ball.vY = 2;
	ball.x = canvas.width / 2 - 10;
	ball.y = canvas.height / 2 - 10;
}

function ComputerMovie() {
	// вышитываем середину платформу, куда попадает шарик
	computer.y = ball.y - 30 - computer.vY;
	// далее ставим ограничители,чтобы платформа не уходила за пределы
	if(computer.y < 0)
		computer.y = 0;
	else if(computer.y + computer.height> canvas.height)
		computer.y = canvas.height - computer.height;

}



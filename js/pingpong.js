/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */


// добавляет элемент последним в список детей
//document.body.appendChild(canvas);

var canvas, context, gameCanvas, computer, player, ball;


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
	// Создаем канвас
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	gameCanvas = new Rect('white', 0, 0, canvas.width, canvas.height)
	computer = new Rect("black", 0, canvas.height / 2 - 40, (canvas.height * 3) / 100, (canvas.height * 15) / 100);
	player = new Rect("black", canvas.width - 20, canvas.height / 2 - 40, (canvas.height * 3) / 100, (canvas.height * 15) / 100);
//	player = new Rect("black", canvas.width - 20, 0, (canvas.height * 3) / 100, canvas.height);
	ball = new Rect("black", canvas.width / 2 - 10, canvas.height / 2 - 10, 20, 20);


	computer.score = 0;
	player.score = 0;

	ball.vX = GetRandomCeil(5, 2); // скорость по оси х
	ball.vY = GetRandomCeil(5, 2); // скорость по оси у

	computer.vY = 0;

	canvas.onmousemove = PlayerMove;
	setInterval(PlayGame, 1000 / 50);
}

// метод для получения рандомного значения
function GetRandom(max, min) {
	return Math.random() * (max - min) + min;
}

// получение целочисленного рандомного значения
function GetRandomCeil(max, min) {
	return Math.ceil(GetRandom(max, min));
}

function Drawing() {
	gameCanvas.drawing();
	computer.drawing();
	player.drawing();
	ball.drawing();

	context.font = "italic 30pt Arial";
	context.textAlign = 'center';
	context.textBaseline = 'top';
	context.fillStyle = 'black';
	context.fillText(computer.score, 100, 0);
	context.fillText(player.score, gameCanvas.width - 100, 0);
}

function Update() {
	ComputerMovie();
	if (ball.y < 0 || (ball.y + ball.height) > canvas.height) {
		ball.vY = -ball.vY;
	} else if ((ball.x + ball.width) > canvas.width) {
		computer.score++;
		RestartGame();
	} else if ((ball.x + ball.width) < 0) {
		player.score++;
		RestartGame();
	} else if ((PushControl(computer, ball) && ball.vX < 0) || (PushControl(player, ball) && ball.vX > 0)) {
		if (ball.vY < 10 && -10 < ball.vY) {
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
	ball.vX = GetRandomCeil(5, 2);
	ball.vY = GetRandomCeil(5, 2);
	computer.vY = 0;
	ball.x = canvas.width / 2 - 10;
	ball.y = canvas.height / 2 - 10;
}

function ComputerMovie() {
	// если скорость шарика ровна 10 уменьшаем скорость ИИ на три
	computer.vY = ball.vY;
	if (ball.vY == 10) {
		computer.vY -= 3;
	} else if (ball.vY == -10) {
		computer.vY += 3;
	}
	computer.y += computer.vY;

	// далее ставим ограничители,чтобы платформа не уходила за пределы
	if (computer.y < 0)
		computer.y = 0;
	else if (computer.y + computer.height > canvas.height)
		computer.y = canvas.height - computer.height;
}



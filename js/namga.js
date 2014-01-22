/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

// Создаем канвас
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 450;
canvas.style.border =  "1px solid black";
// добавляет элемент последним в список детей
document.body.appendChild(canvas);

//начало отрисовки квадрата
context.beginPath();
//задаем цвет
context.fillStyle = 'darkblue';
//закрашенный квадрат, х y width height
context.fillRect(100, 100, 50, 50);
context.closePath();



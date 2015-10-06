/**
 * Инициализирующая проект функция
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function init() {
    var Constants = new NConstant(),
        elements = document.getElementById('ngame');

    // инициализируем контекст для фабрики

    elements.style.width = Constants.canvasWidth() + 'px';
    elements.style.height = Constants.canvasHeight() + 'px';
    NElement.context = elements;

    // функции слушатили
//  canvas.onmousemove = mouseMove;
//    window.addEventListener( "keydown", doKeyDown, false);
//    window.addEventListener( "keyup", doKeyUp, false);

    playGame();
    // времнное решение
    startGame();
    //stopGame();
}

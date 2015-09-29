/**
 * Инициализирующая проект функция
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function init() {
    var Constants = new NConstant(),
        elements = document.getElementById('ngame');
        //canvas = document.getElementById('namga-game');

    // инициализируем контекст для фабрики

    elements.style.width = Constants.canvasWidth() + 'px';
    elements.style.height = Constants.canvasHeight() + 'px';
    NElement.context = elements;

    //canvas.style.top = canvas.offsetTop + 'px';
    //canvas.style.left = canvas.offsetLeft + 'px';
    // задаем размеры и разрешение canvas
    //canvas.width = Constants.canvasWidth();
    //canvas.height = Constants.canvasHeight();

    // функции слушатили
//  canvas.onmousemove = mouseMove;
//    window.addEventListener( "keydown", doKeyDown, false);
//    window.addEventListener( "keyup", doKeyUp, false);

    playGame();
    // времнное решение
    startGame();
    //stopGame();
}

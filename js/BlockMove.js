/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

var dragObject = null;
//отлов самого движения, без этой строчки ничего работать не будет
document.onmousemove = mouseMove

// нажатие кнопки мыши
element.onmousedown = function(e){
    // запомнить переносимый объект
    // в переменной dragObject
    dragObject  = this
 
    // остановить обработку события
    return false
}

// отпускание кнопки мыши
document.onmouseup = function() {
    // опустить переносимый объект
    dragObject = null
    alert(1);
}



// Кроссбраузерное решение на отлов движения
function fixEvent(e) {
    // получить объект событие для IE
    e = e || window.event;

    // добавить pageX/pageY для IE
    if ( e.pageX == null && e.clientX != null ) {
        var html = document.documentElement;
        var body = document.body;
        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
    }

    // добавить which для IE
    // which - кнопка мыши - 1: левая, 2: средняя, 3: правая
    // pageX/pageY - координаты курсора относительно верхнего-левого угла документа (с учетом прокрутки)
    if (!e.which && e.button) {
        e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) );
    }

    return e;
}

// отслеживания движения мыши 
function mouseMove(event){
    event = fixEvent(event)
    document.getElementById('mouseX').value = event.pageX
    document.getElementById('mouseY').value = event.pageY
}



/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

//var dragObject;
//
//отлов самого движения, без этой строчки ничего работать не будет
document.onmousemove = mouseMove

// отслеживания движения мыши 
// тестовое отслеживание 
function mouseMove(event){
    event = fixEvent(event)
    document.getElementById('param-x').innerHTML = event.pageX
    document.getElementById('param-y').innerHTML = event.pageY
}

// эл-нт который нужно отловить
element = document.getElementById('moving-element');

// отлов определенного элемента
element.onmousedown = function(e){
    // запомнить переносимый объект
    // в переменной dragObject
    dragObject  = this
    document.getElementById('moving-element').style.backgroundColor = 'Red';
    
    // остановить обработку события
    return false
}

document.onmouseup = function() {
    // опустить переносимый объект
    document.getElementById('moving-element').style.backgroundColor = 'green';
    dragObject = null
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


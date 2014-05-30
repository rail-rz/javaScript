/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 * 
 * за основу взято http://javascript.ru/ui/draganddrop
 */

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

function getPosition(e){
    var left = 0
    var top  = 0
 
    while (e.offsetParent){
        left += e.offsetLeft
        top  += e.offsetTop
        e    = e.offsetParent
    }
    
    left += e.offsetLeft
    top  += e.offsetTop

    return {x:left, y:top}
}

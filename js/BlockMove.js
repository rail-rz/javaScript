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

var dragMaster = (function() {
 
    var dragObject
    var mouseOffset
 
    // получить сдвиг target относительно курсора мыши
    function getMouseOffset(target, e) {
        var docPos  = getPosition(target)
        return {x:e.pageX - docPos.x, y:e.pageY - docPos.y}
    }
 
    function mouseUp(){
        dragObject = null
 
  
        // очистить обработчики, т.к перенос закончен
        document.onmousemove = null
        document.onmouseup = null
        document.ondragstart = null
        document.body.onselectstart = null
    }
 
    function mouseMove(e){
        e = fixEvent(e)
        
        with(dragObject.style) {
            position = 'absolute'
            if((e.pageY - mouseOffset.y)>=0 && (e.pageY - mouseOffset.y + dragObject.offsetHeight)<= sizeControl(window.innerHeight, 75)) {
                top = e.pageY - mouseOffset.y + 'px'
            }
            if((e.pageX - mouseOffset.x)>=0 && (e.pageX - mouseOffset.x + dragObject.offsetWidth)<= sizeControl(window.innerWidth, 75)) {
                left = e.pageX - mouseOffset.x + 'px'
            }
        }
        return false
    }
 
    function mouseDown(e) {
        e = fixEvent(e)
        if (e.which!=1) return
 
        dragObject  = this
 
        // получить сдвиг элемента относительно курсора мыши
        mouseOffset = getMouseOffset(this, e)
 
        // эти обработчики отслеживают процесс и окончание переноса
        document.onmousemove = mouseMove
        document.onmouseup = mouseUp
 
        // отменить перенос и выделение текста при клике на тексте
        document.ondragstart = function() { return false }
        document.body.onselectstart = function() { return false }
        
//        this.style.backgroundColor = 'Black';
 
        return false
    }
 
    return {
        makeDraggable: function(element){
            element.onmousedown = mouseDown
        }
    }
 
}())
 
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

function DragObject(element) {
	dragMaster.makeDraggable(element);
}

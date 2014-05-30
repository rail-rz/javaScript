/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 * 
 * основа http://myrusakov.ru/javascript-resize-div.html
 */


var resizeBlock = (function() {

    var block; // Основной блок
    var block_r; // Блок для изменения размеров
    var delta_w = 0; // Изменение по ширине
    var delta_h = 0; // Изменение по высоте

    // получить сдвиг target относительно курсора мыши
    function getMouseOffset(target, e) {
        var docPos  = getPosition(target)
        return {x:e.pageX - docPos.x, y:e.pageY - docPos.y}
    }
    
    /* При отпускании кнопки мыши отключаем обработку движения курсора мыши */
    function mouseUp() {
        document.onmousemove = null;
    }
    
    function mouseMove(e){
        e = fixEvent(e)
        
        with(block_r.style) {
            position = 'absolute'
            
            //TODO: эта часть кода обязательна для переписки!
            if( (e.pageY - mouseOffset.y) >= 0 && (e.pageY - mouseOffset.y + block_r.offsetHeight)<= sizeControl(window.innerHeight, 75)) {
                top = e.pageY - mouseOffset.y + 'px'
            }
            
            if( (e.pageX - mouseOffset.x) >= 0 && (e.pageX - mouseOffset.x + block_r.offsetWidth)<= sizeControl(window.innerWidth, 75)) {
                left = e.pageX - mouseOffset.x + 'px'
            }
            
            
//            TODO: второй вариант, чтобы пол элемента можно было спрятать за экран
//            if(elementTop + dragObject.offsetHeight/2>=0 && (elementTop + dragObject.offsetHeight/2)<= sizeControl(window.innerHeight, 75)) {
//                top = elementTop + 'px'
//            }
//            if((elementLeft + dragObject.offsetWidth/2)>=0 && (elementLeft + dragObject.offsetWidth/2)<= sizeControl(window.innerWidth, 75)) {
//                left = elementLeft + 'px'
//            }

        }
        return false
    }
    

    function mouseDown(e) {
         e = fixEvent(e)
        if (e.which!=1) return
        
        // получить сдвиг элемента относительно курсора мыши
        mouseOffset = getMouseOffset(this, e)
        
        // эти обработчики отслеживают процесс и окончание переноса
        document.onmousemove = mouseMove
        document.onmouseup = mouseUp
 
        // отменить перенос и выделение текста при клике на тексте
        document.ondragstart = function() { return false }
        document.body.onselectstart = function() { return false }
 
        // Получаем блок для изменения размеров
        block_r = this; 
        
        return false;
    }


    return {
        resize: function(element){
            // изменяемый блок
            block = element;
            document.getElementById("bottom-right-button").onmousedown = mouseDown
                
        }
    }
 
}())
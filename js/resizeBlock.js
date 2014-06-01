/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 * 
 * основа http://myrusakov.ru/javascript-resize-div.html
 */


var resizeBlock = (function() {

    var block; // Основной блок
    var resizeBlock; // Блок для изменения размеров

    // получить сдвиг target относительно курсора мыши
    function getMouseOffset(target, e) {
        var docPos  = getPosition(target);
        return {x:e.pageX - docPos.x, y:e.pageY - docPos.y}
    }
    
    /* При отпускании кнопки мыши отключаем обработку движения курсора мыши */
    function mouseUp() {
        document.onmousemove = null;
    }
    
    function mouseMove(e){
        e = fixEvent(e);
        
        with(resizeBlock.style) {
            position = 'absolute';
            
            //TODO: эта часть кода обязательна для переписки!
            if( (e.pageY - mouseOffset.y) >= 0 && (e.pageY - mouseOffset.y)<= sizeControl(window.innerHeight, 75)) {
                top = e.pageY - mouseOffset.y + 'px';
	            block.style.height = e.pageY - mouseOffset.y - block.offsetTop > 4 ? e.pageY - mouseOffset.y - block.offsetTop + 'px' : 5 + 'px';
            }

            if( (e.pageX - mouseOffset.x) >= 0 && (e.pageX - mouseOffset.x)<= sizeControl(window.innerWidth, 75)) {
                left = e.pageX - mouseOffset.x + 'px';
	            block.style.width =  e.pageX - mouseOffset.x - block.offsetLeft >4 ? e.pageX - mouseOffset.x - block.offsetLeft + 'px' : '5px';
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
         e = fixEvent(e);
        if (e.which!=1) return;

        // Получаем блок для изменения размеров
	    resizeBlock = this;

	    // получить сдвиг элемента относительно курсора мыши
        mouseOffset = getMouseOffset(this, e);


        
        // эти обработчики отслеживают процесс и окончание переноса
        document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
 
        // отменить перенос и выделение текста при клике на тексте
        document.ondragstart = function() { return false };
        document.body.onselectstart = function() { return false };
 
        return false;
    }


    return {
        resize: function(element){
            // изменяемый блок
            block = element;
            document.getElementById("bottom-right-button").onmousedown = mouseDown;
                
        }
    }
 
}())
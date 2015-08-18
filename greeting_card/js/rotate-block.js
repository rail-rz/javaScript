/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 * 
 * http://habrahabr.ru/sandbox/62771/
 */

//footer[i].style.webkitTransform = "rotate("+footer[i].start+"deg)";
//	footer[i].style.MozTransform = "rotate("+footer[i].start+"deg)";
//	footer[i].style.tsransform = "rotate("+footer[i].start+"deg)";

var rotateBlock = (function() {

    var block; // Основной блок
    var rotateBlock; // Блок поворота
    var rotateValue;

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
        
        with(rotateBlock.style) {
            position = 'absolute';
            
            top = block.offsetTop + block.offsetWidth * Math.cos( (e.pageX + e.pageY) * 2 * Math.PI / 180) + 'px';
            left = block.offsetLeft + block.offsetWidth * Math.sin( (e.pageX + e.pageY) * 2  * Math.PI / 180) + 'px';
                
//            console.log(Math.sin((block.offsetWidth/rotateBlock.offsetTop)*(180/Math.PI)))
//            block.style.webkitTransform = "rotate("+Math.asin(rotateBlock.offsetTop/block.offsetWidth) +"deg)";
//            block.style.MozTransform = "rotate("+Math.asin(rotateBlock.offsetTop/block.offsetWidth) +"deg)";
//            block.style.tsransform = "rotate("+Math.asin(rotateBlock.offsetTop/block.offsetWidth) +"deg)";

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
	    rotateBlock = this;
        
//        console.log(block.style.webkitTransform);
        if(block.style.webkitTransform == '') {
            rotateValue = 45;
        } else {
            rotateValue += 45;
        }
        // ставлю заглушку и использую пока как кнопку
        block.style.webkitTransform = "rotate("+rotateValue+"deg)";
        block.style.MozTransform = "rotate("+rotateValue+"deg)";
        block.style.tsransform = "rotate("+rotateValue+"deg)";


//	    // получить сдвиг элемента относительно курсора мыши
//        mouseOffset = getMouseOffset(this, e);
//
//
//        
//        // эти обработчики отслеживают процесс и окончание переноса
//        document.onmousemove = mouseMove;
//        document.onmouseup = mouseUp;
// 
//        // отменить перенос и выделение текста при клике на тексте
//        document.ondragstart = function() { return false };
//        document.body.onselectstart = function() { return false };
 
        return false;
    }


    return {
        goRotate: function(element){
            // изменяемый блок
            block = element;
            document.getElementById("rotate-button").onmousedown = mouseDown;
                
        }
    }
 
}())
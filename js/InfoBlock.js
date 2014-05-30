/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 * 
 */

var infoBlock = (function() {
    
    function resizeBlock(element) {
        var height = document.getElementById('element-size-height');

        height.oninput = function() {
          element.style.height = height.value + 'px';
          document.getElementById('bottom-right-button').style.top = height.value + 'px';
        }
        
        var width = document.getElementById('element-size-width');

        width.oninput = function() {
          element.style.width = width.value + 'px';
          document.getElementById('bottom-right-button').style.left = e.pageX - mouseOffset.x +width.value + 'px';
        }
    }
    

    
    
    return {
        getInfo: function(element){
            // костыль на отображение 
            // обнуляет значения
//            var dragObjects = document.getElementById('all-elements').getElementsByTagName('div');
//            for(var i=0; i<dragObjects.length; i++) {
//                dragObjects[i].style.border = 'none';
//            }
            
            resizeBlock(element)

//            document.getElementById('top-left-button').style.top = element.offsetTop + 'px';
//            document.getElementById('top-left-button').style.left = element.offsetLeft + 'px';
            document.getElementById('element-size-height').value = element.offsetHeight;
            document.getElementById('element-size-width').value = element.offsetWidth;
                
        }
    }
 
}())
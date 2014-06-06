/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 * 
 */

var infoBlock = (function() {
    
    var block;
    var height;
    var width;
    var zIndex;
    var background;
    var opacity;
    var text;
    
    function updateBlock() {
//        height = document.getElementById('element-size-height');
//        width = document.getElementById('element-size-width');
//        background = document.getElementById('element-background');


        height.oninput = function() {
            block.style.height = height.value + 'px';
        }
        

        width.oninput = function() {
            block.style.width = width.value + 'px';
        }
        
        background.oninput = function() {
            block.style.background = background.value;
        }
        
        zIndex.oninput = function() {
            block.style.zIndex = zIndex.value;
        }
        
        opacity.oninput = function() {
            block.style.opacity = opacity.value;
        }
        
//        text.oninput = function() {
//            block.innerHtml = text.value;
//        }
//        
    }
    
    function setting(element) {
        block = element;
        
        height = document.getElementById('element-size-height');
        width = document.getElementById('element-size-width');
        background = document.getElementById('element-background');
        zIndex = document.getElementById('element-zindex');
        opacity = document.getElementById('element-opacity');
//        text = document.getElementById('element-text');

        height.value = block.offsetHeight;
        width.value = block.offsetWidth;
        background.value = block.style.backgroundColor;
        zIndex.value = block.style.zIndex;
        opacity.value = block.style.opacity;
//        text.value = block.innerHTML;
        
        updateBlock();
    }
    

    
    
    return {
        getInfo: function(element){
            setting(element);
//            resizeBlock(element);
        }
    }
 
}())
/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 * 
 */

var infoBlock = (function() {
    
    var block;
    var sizeButton;
    var height;
    var width;
    var zIndex;
    var background;
    var opacity;
    var text;
    var remove;
    var textColor;
    var selectColor;
    var nElement;
    
    function updateBlock() {
        height.oninput = function() {
            block.style.height = height.value + 'px';
            sizeButton.style.top = block.offsetTop + block.offsetHeight + 'px';
        };

        width.oninput = function() {
            block.style.width = width.value + 'px';
            sizeButton.style.left = block.offsetLeft + block.offsetWidth + 'px';
        };

        background.onclick = function() {
            selectColor.style.display = 'block';
            selectColor.type = 'background';
        };
        background.oninput = function() {
            block.style.background = background.value;
        };
        
        zIndex.oninput = function() {
            block.style.zIndex = zIndex.value;
        };
        
        opacity.oninput = function() {
            block.style.opacity = opacity.value;
        };

        remove.onclick = function() {
            if (!block) return;

            if (confirm("Вы подтверждаете удаление?")) {
                block.parentNode.removeChild(block);
            } else {
                return false;
            }
        };
        text.oninput = function() {
            block.innerHTML = text.value;
        };
        textColor.oninput = function () {
            block.style.color = textColor.value;
        };
        textColor.onclick = function () {
            block.style.color = textColor.value;
            selectColor.style.display = 'block';
            selectColor.type = 'textColor';
        };

        selectColor.onclick = function(event) {
            if(selectColor.type == 'background') {
                background.value = block.style.background = event.srcElement.style.backgroundColor;
            }
            else if(selectColor.type == 'textColor') {
                textColor.value = block.style.color = event.srcElement.style.backgroundColor;
            }
        };
    }
    
    function setting(element) {
        block = element;
        nElement = getGlobalElementById(element.id);
        console.log( nElement);
        sizeButton = document.getElementById("bottom-right-button");

        height = document.getElementById('element-size-height');
        width = document.getElementById('element-size-width');
        background = document.getElementById('element-background');
        zIndex = document.getElementById('element-zindex');
        opacity = document.getElementById('element-opacity');
        text = document.getElementById('element-text');
        textColor = document.getElementById('element-text-color');

        selectColor = document.getElementById('select-color');
        selectColor.style.display = 'none';

        height.value = block.offsetHeight;
        width.value = block.offsetWidth;
        background.value = block.style.backgroundColor;
        zIndex.value = block.style.zIndex;
        opacity.value = block.style.opacity;
        remove = document.getElementById('element-delete');
        text.value = block.innerHTML;
        textColor.value = block.style.color;

        nElement.height = height.value;
        updateBlock();
    }
    

    
    
    return {
        getInfo: function(element){
            setting(element);
//            resizeBlock(element);
        }
    }
 
}());
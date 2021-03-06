/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 * 
 */

var infoBlock = (function() {
    
    var block,
        sizeButton,
        height,
        width,
        zIndex,
        backgroundColor,
        opacity,
        text,
        remove,
        textColor,
        nElement,
        rotate,
        speedX,
        speedY,
        speedRotate,
        opacityMin,
        opacityMax,
        opacitySpeed
    ;
    
    function updateBlock() {
        height.oninput = function() {
            block.style.height = height.value + 'px';
            sizeButton.style.top = block.offsetTop + block.offsetHeight + 'px';
            nElement.height = height.value;
        };

        width.oninput = function() {
            block.style.width = width.value + 'px';
            sizeButton.style.left = block.offsetLeft + block.offsetWidth + 'px';
            nElement.width  = width.value;
        };
        backgroundColor.oninput = function() {
            block.style.backgroundColor = backgroundColor.value;
            nElement.background_color = backgroundColor.value;
        };
        
        zIndex.oninput = function() {
            block.style.zIndex = zIndex.value;
            nElement.z_index = zIndex.value;
        };
        
        opacity.oninput = function() {
            block.style.opacity = opacity.value;
            nElement.opacity = opacity.value;
        };
        opacityMin.oninput = function() {
            nElement.opacityMin = opacityMin.value;
        };
        opacityMax.oninput = function() {
            nElement.opacityMax = opacityMax.value;
        };
        opacitySpeed.oninput = function() {
            nElement.opacitySpeed = opacitySpeed.value;
        };
        rotate.oninput = function() {
            block.style.mozTransform = 'rotate(' + rotate.value + 'deg)';
            block.style.msTransform = 'rotate(' + rotate.value + 'deg)';
            block.style.webkitTransform = 'rotate(' + rotate.value + 'deg)';
            block.style.oTransform = 'rotate(' + rotate.value + 'deg)';
            block.style.transform = 'rotate(' + rotate.value + 'deg)';
            nElement.rotate = rotate.value;
        };
        speedX.oninput = function () {
            nElement.speedX = speedX.value;
        };
        speedY.oninput = function () {
            nElement.speedY = speedY.value;
        };
        speedRotate.oninput = function () {
            nElement.speedRotate = speedRotate.value;
        };

        remove.onclick = function() {
            if (!block) return;

            if (confirm("Вы подтверждаете удаление?")) {
                block.parentNode.removeChild(block);
                deleteGlobalElementById(block.id);
            } else {
                return false;
            }
        };
        text.oninput = function() {
            nElement.text = block.innerHTML = text.value;
        };
        textColor.oninput = function () {
            block.style.color = textColor.value;
            nElement.color = textColor.value;
        };

    }
    
    function setting(element) {
        block = element;
        nElement = getGlobalElementById(element.id);

        if(!sizeButton) {
            sizeButton = document.getElementById("bottom-right-button");

            height          = document.getElementById('element-size-height');
            width           = document.getElementById('element-size-width');
            backgroundColor = document.getElementById('element-background-color');
            zIndex          = document.getElementById('element-zindex');
            opacity         = document.getElementById('element-opacity');
            rotate          = document.getElementById('element-rotate');
            text            = document.getElementById('element-text');
            textColor       = document.getElementById('element-text-color');
            speedX          = document.getElementById('element-speed-x');
            speedY          = document.getElementById('element-speed-y');
            speedRotate     = document.getElementById('element-speed-rotate');
            opacityMin      = document.getElementById('element-opacity-min');
            opacityMax      = document.getElementById('element-opacity-max');
            opacitySpeed    = document.getElementById('element-opacity-speed');
            remove          = document.getElementById('element-delete');

        }

        height.value          = block.offsetHeight;
        width.value           = block.offsetWidth;
        backgroundColor.value = nElement.background_color;
        zIndex.value          = block.style.zIndex;
        opacity.value         = block.style.opacity;
        rotate.value          = nElement.rotate;
        speedX.value          = nElement.speedX;
        speedY.value          = nElement.speedY;
        speedRotate.value     = nElement.speedRotate;
        text.value            = block.innerHTML;
        textColor.value       = nElement.color;
        opacityMin.value      = nElement.opacityMin;
        opacityMax.value      = nElement.opacityMax;
        opacitySpeed.value    = nElement.opacitySpeed;

        nElement.height = height.value;
        nElement.width  = width.value;

        updateBlock();
    }

    return {
        getInfo: function(element){
            setting(element);
//            resizeBlock(element);
        }
    }
 
}());
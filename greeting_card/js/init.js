/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function Init() {
    var Constants = new NConstant();

    // сразу задаем полную нужным блокамы
    var work_zone_border = document.getElementById('work-zone-border');
    work_zone_border.style.width  = Constants.canvasWidth() + 5 + "px";
    work_zone_border.style.height = Constants.canvasHeight() + 5 + "px";
    var work_zone = document.getElementById('content-left-workzone');
    work_zone.style.width  = Constants.canvasWidth() + "px";
    work_zone.style.height = Constants.canvasHeight() + "px";

    var content_left_helperzone = document.getElementById('content-left-helperzone');
    content_left_helperzone.style.height = Constants.heightWindow() - Constants.canvasHeight() - 5 + "px";
    content_left_helperzone.style.width  = Constants.canvasWidth() + 'px';

    var content_right = document.getElementById('content-right-elements');
    var content = document.getElementById('content');
    content_right.style.width = content.offsetWidth - Constants.canvasWidth() - 5 + "px";
    content_right.style.height = Constants.canvasHeight() + "px";
    var content_right_bottom = document.getElementById('content-right-bottom');
    content_right_bottom.style.width = content_right.style.width;
    content_right_bottom.style.height = content_left_helperzone.style.height;

    CreateElements();
    var nElements = getGlobalElements();
    // опеределение какие эл-ты можно двигать а какие нет
    var dragObjects = document.getElementById('all-elements').childNodes;
    for(var i=0; i<dragObjects.length; i++) {
        if((dragObjects[i].tagName == 'DIV') || (dragObjects[i].tagName == 'IMG')) {
            dragObjects[i].id = 'old-element-' + i;
            new DragObject(dragObjects[i]);
            nElements[dragObjects[i].id] = {
				"type":dragObjects[i].tagName,
                "top":dragObjects[i].offsetTop,
                "left":dragObjects[i].offsetLeft,
                "height":dragObjects[i].offsetHeight,
                "width":dragObjects[i].offsetWidth,
                "background_color":dragObjects[i].backgroundColor,
                "text":dragObjects[i].innerHTML,
                "text_color":dragObjects[i].color,
                "opacity":dragObjects[i].opacity,
                "z_index":dragObjects[i].zIndex,
				"rotate":dragObjects[i].style.transform
            }
        }
    }
//TODO: создание канвасом треогальника, подумать как
//        var canvas = document.getElementById('triangle');
//        var context = canvas.getContext('2d');
//
//        context.beginPath();
//        context.moveTo(0, 0);
//        context.lineTo(100, 0);
//        context.lineTo(50, 100);
//
//        context.closePath();
//
//        context.fillStyle = "rgb(78, 193, 243)";
//        context.opacity = 0.2;
//        context.fill();
//
//    new DragObject(document.getElementById('bottom-right-button'));
}

//контроль за размером hundredPercentSize - 100% размер в px, percentage - процент уменьшения
// возвращает размер в пикселах
function sizeControl( hundredPercentSize, percentage) {
    return (hundredPercentSize * percentage / 100);
}

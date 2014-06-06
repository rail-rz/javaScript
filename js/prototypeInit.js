/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function Init() {
    // сохраняем макс высоту и ширину
    var heightWindow = window.innerHeight;
    var widthWindow = window.innerWidth; 
    
    // сразу задаем полную нужным блокамы
    document.getElementById('content-right').style.height = heightWindow+'px';
    document.getElementById('content-left-workzone').style.height = sizeControl(heightWindow, 75) -2 + "px";
    document.getElementById('content-left-workzone').style.width = sizeControl(widthWindow, 75) + "px";
    document.getElementById('content-left-helperzone').style.height = sizeControl(heightWindow, 25) - 2 + "px";
    document.getElementById('content-left-helperzone').style.width = sizeControl(widthWindow, 75) + "px";
    document.getElementById('content-right').style.width = sizeControl(widthWindow, 20) + "px";
    // опеределение какие эл-ты можно двигать а какие нет
    var dragObjects = document.getElementById('all-elements').childNodes;
    for(var i=0; i<dragObjects.length; i++) {
        new DragObject(dragObjects[i]);
        
    }
//    new WorkZone(document.getElementById('content-left-workzone'));

    
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
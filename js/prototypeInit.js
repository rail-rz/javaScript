/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function Init() {
    // сохраняем макс высоту и ширину
    var heightWindow = window.innerHeight;
    var widthWindow = window.innerWidth; 
    
    // сразу задаем полную нужным блокамы
    document.getElementById('content-right').style.height = heightWindow+'px';
    document.getElementById('content-left-workzone').style.height = sizeControl(heightWindow, 75) + "px";
    document.getElementById('content-left-helperzone').style.height = sizeControl(heightWindow, 25) + "px";
}

//контроль за размером hundredPercentSize - 100% размер в px, percentage - процент уменьшения
// возвращает размер в пикселах
function sizeControl( hundredPercentSize, percentage) {
    return (hundredPercentSize * percentage / 100);
}
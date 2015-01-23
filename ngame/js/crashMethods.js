/**
 * Столкновения в игре
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function CrashController(objA, objB) {
    if (objA.x + objA.width > objB.x && objA.x < objB.x + objB.width && objA.y + objA.height > objB.y && objA.y < objB.y + objB.height) {
        return true;
    } else {
        return false;
    }
}

function WallController(obj) {
    // запрет на выход за пределы экрана
    if(obj.x < 0 || obj.x + obj.width > gameCanvas.width || obj.y <0 || obj.y + obj.height > gameCanvas.height) {
        return true;
    }
    return false;
}
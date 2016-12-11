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

function WallController(gameCanvas, obj) {
    // запрет на выход за пределы экрана
    if(obj.x < 0 || obj.x + obj.width > gameCanvas.width || obj.y <0 || obj.y + obj.height > gameCanvas.height) {
        return true;
    }
    return false;
}

/**
 * @author <Alexey-Bakhirev@yandex.ru>
 * @param A
 * @param B
 * @returns {*}
 */
function penetration(A, B) {
	var dx = A.width + 2 * A.x - 2 * B.x - B.width,
		dy = 2 * A.y + A.height - 2 * B.y - B.height,
		x = (A.x + A.width - A.x + B.x + B.width - B.x - Math.abs(dx)) / 2,
		y = (A.y + A.height - A.y + B.y + B.height - B.y - Math.abs(dy)) / 2;
	if (x > 0 && y > 0) return {
		x: x,
		y: y,
		direction: {
			x: dx / Math.abs(dx),
			y: dy / Math.abs(dy)
		}
	};
	return null;
}
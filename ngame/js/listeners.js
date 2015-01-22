/**
 * Функции управления с клавиатуры и мыши
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

// управление мышью
function mouseMove(e) {
    player.y = e.pageY;
    player.x = e.pageX;
}

// управление клавиатурой
function doKeyDown(e) {
    if(e.keyCode == 32) {
        gun.width = 30;
        gun.height = gun.height + gun.speedY;

        gun.x = player.x + player.width/2 - gun.width/2;
        gun.y = player.y + player.height ;

        console.log(gun);
    }
    if(e.keyCode == 68) {
        player.x = player.x + player.speedX;
    } else if(e.keyCode == 65) {
        player.x = player.x - player.speedX;
    } else if(e.keyCode == 87) {
        player.y = player.y - player.speedY;
    } else if(e.keyCode == 83) {
        player.y = player.y + player.speedY;
    }

    if(WallController(player)) {
        if(player.x < 0) {
            player.x = 0;
        } else if(player.x + player.width > gameCanvas.width) {
            player.x = gameCanvas.width - player.width;
        }
        if(player.y <0 ) {
            player.y = 0;
        } else if(player.y + player.height > gameCanvas.height) {
            player.y = gameCanvas.height - player.height;
        }
    }

}
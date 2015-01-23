/**
 * Логика игры
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function PlayGame() {
    Drawing();
}

function Drawing() {
    gameCanvas.drawing();
    player.drawing();
    element1.drawing();
    gun.drawing();

    element1.x += element1.speedX;
    element1.y += element1.speedY;

    //player move
    if(keysMap[32]) {
        gun.width = 30;
        if(gun.height <= player.height) {
            gun.height = gun.height + gun.speedY;
        }
        gun.x = player.x + player.width/2 - gun.width/2;
        gun.y = player.y + player.height ;
    } else {
        gun.height = 0;
        if(keysMap[68]) {
            player.x = player.x + player.speedX;
        }
        if(keysMap[65]) {
            player.x = player.x - player.speedX;
        }
        if(keysMap[87]) {
            player.y = player.y - player.speedY;
        }
        if(keysMap[83]) {
            player.y = player.y + player.speedY;
        }
    }

    // столкновение со стеной
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

    if(CrashController(gun, element1)) {
        element1.speedX = 0;
        element1.y -= gun.speedY;
    }

    // тестовая модель столкновения
    if(CrashController(player, element1)) {
//        delete element1;
    }
    if(WallController(element1)) {
        element1.speedX = -element1.speedX;
//        element1.y = element1.y - element1.speedY;
    }
}
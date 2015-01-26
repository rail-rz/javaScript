/**
 * Логика игры
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function PlayGame(canvas) {

    var canvasParam = { color:'grey', realWidth:640, realHeight:480 };
    canvas.style.width = canvasParam.realWidth + 'px';
    canvas.style.height = canvasParam.realHeight + 'px';
    // задаем размеры и разрешение canvas
    canvas.width = canvasParam.realWidth;
    canvas.height = canvasParam.realHeight;
    var context = canvas.getContext("2d");

    var playerParams = { path:'image/nlo.png', x:0, y:0, imageWidth:300, imageHeight:300, realWidth:100, realHeight:100, frameX:3, frameY:2, currentFrameX:0, currentFrameY:0, speedX:5, speedY:5 };
    var gunParams = {color:'yellow', speedY:2, opacity:0.3, realWidth:30};
    var element1Params = {methodName:'Rect', color:'red', x:250, y:460, realWidth:10, realHeight:20, speedX:2};
    var element2Params = {methodName:'Rect', color:'green', x:250, y:460, realWidth:10, realHeight:20, speedX:-2};

    this.gameCanvas = new Rect( context, canvasParam);
    this.player = new AnimatePerson( context, playerParams);
    this.gun = new Rect(context, gunParams);

    this.elements = ElementsFactory(context, [ element1Params, element2Params] );
//    console.log(this.elements);

    this.element1 = new Rect(context, element1Params);
    this.element2 = new Rect(context, element2Params);

    // отрисовывающая функуия
    this.drawingGame = function() {
        this.gameCanvas.drawing();
        this.player.drawing();
        this.gun.drawing();

        //player move
        if(keysMap[32]) {
            if(this.gun.height <= this.player.height) {
                this.gun.height += this.gun.speedY;
            }
            this.gun.x = this.player.x + this.player.width/2 - this.gun.width/2;
            this.gun.y = this.player.y + this.player.height ;
        } else {
            this.gun.height = 0;
            if(keysMap[68]) {
                this.player.x += this.player.speedX;
            }
            if(keysMap[65]) {
                this.player.x -= this.player.speedX;
            }
            if(keysMap[87]) {
                this.player.y -= this.player.speedY;
            }
            if(keysMap[83]) {
                this.player.y += this.player.speedY;
            }
        }

        this.element1.drawing();
        this.element2.drawing();
        this.element1.x += this.element1.speedX;
        this.element1.y += this.element1.speedY;
        this.element2.x += this.element2.speedX;
        this.element2.y += this.element2.speedY;

        // столкновение со стеной
        if(WallController(this.player)) {
            if(this.player.x < 0) {
                this.player.x = 0;
            } else if(this.player.x + this.player.width > this.gameCanvas.width) {
                this.player.x = this.gameCanvas.width - this.player.width;
            }
            if(this.player.y <0 ) {
                this.player.y = 0;
            } else if(player.y + this.player.height > this.gameCanvas.height) {
                this.player.y = this.gameCanvas.height - player.height;
            }
        }

        if(CrashController(this.gun, this.element1)) {
            this.element1.speedX = 0;
            this.element1.y -= this.gun.speedY;
        }

        if(CrashController(this.gun, this.element2)) {
            this.element2.speedX = 0;
            this.element2.y -= this.gun.speedY;
        }

        // тестовая модель столкновения
        if(CrashController(this.player, this.element1)) {
//            delete this.element1;
        }

        if(WallController(this.element1)) {
            this.element1.speedX = -this.element1.speedX;
        }
        if(WallController(this.element2)) {
            this.element2.speedX = -this.element2.speedX;
        }
    }

    setInterval(this.drawingGame, 1000 / 50);
}

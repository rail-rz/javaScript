/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */


function Init() {
    var params = {
        width: 600,
        height: 600,
        frameX:4,
        frameY:3,
        currentFrameX:0,
        currentFrameY:0
    };
    var nElement = document.getElementById('sprite');
    nElement.style.backgroundImage = 'url(image/nlo.png)';
    //nElement.style.backgroundSize = 'cover';
    var bSizeX = params.width * params.frameX;
    var bSizeY = params.height * params.frameY;
    var stringSize = (params.width * params.frameX) + 'px ' + (params.height * params.frameY) + 'px';
    nElement.style.backgroundSize = stringSize;
    //nElement.style.backgroundColor = 'blue';
    nElement.style.width = params.width + 'px';
    nElement.style.height = params.height + 'px';
    nElement.style.backgroundPosition = -bSizeX + 'px ' + -bSizeY +'px';
    //nElement.style.overflow = 'hidden';

    start(params, nElement);
}

function start(params, nElement) {
    if (params.currentFrameX == (params.frameX - 1)) {
        params.currentFrameX = 0;
        if(params.currentFrameY == (params.frameY -1)) {
            params.currentFrameY = 0;
        } else {
            params.currentFrameY ++;
        }
        nElement.style.backgroundPositionY = (-params.height * params.currentFrameY) +'px';

    } else {
        params.currentFrameX ++;

    }
    nElement.style.backgroundPositionX = (-params.width * params.currentFrameX) + 'px ';

    setInterval(start(params, nElement), 1000/50);
}

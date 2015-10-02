/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */


function Init() {
    var params = {
        width: 100,
        height: 100,
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
    var stringSize = bSizeX + 'px ' + bSizeY + 'px';
    nElement.style.backgroundSize = stringSize;
    //nElement.style.backgroundColor = 'blue';
    nElement.style.width = params.width + 'px';
    nElement.style.height = params.height + 'px';
    nElement.style.backgroundPosition = -100 + 'px ' + -100 +'px';
    nElement.style.overflow = 'hidden';

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

    console.log(nElement.style.backgroundPosition);
    setInterval(start(params, nElement), 1000/50);


}

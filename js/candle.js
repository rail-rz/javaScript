/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

var amountFireCircle = 1000; // из скольки кругов будет состоять огонь
var maxSizeCircle = 8; // макс. размер спрайта
var minSizeCircle = 1; // минимальный размер спрайта
var fireElementsColor = new Array(
        '#FFFF00',
        '#CD5C5C',
        '#B22222',
        '#FF3030',
        '#EE2C2C',
        '#CD2626',
        '#8B1A1A',
        '#FF7F00',
        '#EE7600',
        '#CD6600',
        '#FF0000',
        '#EE0000',
        '#CD0000',
        '#8B0000',
        '#FF4500',
        '#EE4000',
        '#CD3700',
        '#FF4500'
); // цвета огня

var fire = new Array();

function fireElements() {
    for(i=0;i<=amountFireCircle;++i) {
        fire[i] = document.getElementById("fire-element-"+i); // получение элемента
        fire[i].size = getRandom(minSizeCircle,maxSizeCircle); // рандомный размер
        fire[i].style.background = getRandomVarFromArray(fireElementsColor); // рандомный цвет круга
        fire[i].speedInY = (fire[i].size-maxSizeCircle)*getRandom(0.9,0.1); // скорость горения, или скорость подъема круга
        fire[i].style.width = fire[i].style.height = fire[i].size+'px'; // присвоение размера
        fire[i].positionOnX=(maxSizeCircle-fire[i].size)/2; // центровка пламени
        fire[i].positionOnY=0;
    }
    actionFire();
}

function actionFire() {
    for(i=0;i<=amountFireCircle;i++) {

        fire[i].positionOnY+=fire[i].speedInY ;
        fire[i].style.left=fire[i].positionOnX+'px';
        fire[i].style.top=fire[i].positionOnY+'px';
        // чем меньше эл-т тем выше он поднимется 
        if (fire[i].positionOnY <= -5*(maxSizeCircle-fire[i].size)/2) {
            fire[i].positionOnX=(maxSizeCircle-fire[i].size)/2;
            fire[i].positionOnY=0;
        }
    }
    setTimeout("actionFire()",50);
}

// функция создания пламени
function getFireElement(max, min) {
    for(i=min;i<=max;++i) {
        document.write("<div id='fire-element-"+i+"' class='fire-element'></div>");
    }
}
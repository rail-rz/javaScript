/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

// глобальная переменная - костыль 
var counter = 0;

// добавление блока 
function NewBlock(elementId) {
    var element;
    ++counter;
    
    if(elementId == 2) {
        element = document.createElement('div');
        element.id = 'name-'+counter;
        element.style.width = '100px';
        element.style.height = '50px';
        element.style.position = 'absolute';
        element.className = 'circule-element';

    } else if(elementId == 1) {
        element = document.createElement('div');
        element.id = 'name-'+counter;
        element.style.width = '100px';
        element.style.height = '50px';
        element.style.position = 'absolute';
        element.style.backgroundColor = 'red';
    } else if( elementId == 3) {
        element = document.createElement('img');
        element.id = 'name-'+counter;
        element.style.position = 'absolute';
        element.src = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQL82tckOtHxX4LwHGEFCJ1OxL2JcHWCrJ_FMF8La0FLFlqw-h2cgn2KyZj';
    } else if(elementId == 4) {
        element = document.createElement('p');
        element.id = 'name-'+counter;
        element.style.position = 'absolute';
    }
//    https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQL82tckOtHxX4LwHGEFCJ1OxL2JcHWCrJ_FMF8La0FLFlqw-h2cgn2KyZj
    document.getElementById('all-elements').appendChild(element);
    
    if(elementId == 4) {
        element.innerHTML = 'text';
    }
    

    // опеределение какие эл-ты можно двигать а какие нет
    var dragObject = document.getElementById(element.id);
    new DragObject(dragObject);
}

/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

// глобальная переменная - костыль 
var counter = 0;

// добавление блока 
function NewBlock(elementId) {
    var newDiv = document.createElement('div');
    ++counter;
    newDiv.id = 'name-'+counter;
    newDiv.style.width = '100px';
    newDiv.style.height = '50px';
    newDiv.style.position = 'absolute';
    if(elementId == 2) {
        newDiv.className = 'circule-element';
    } else {
        newDiv.style.backgroundColor = 'red';
    }
    document.getElementById('all-elements').appendChild(newDiv);

    // опеределение какие эл-ты можно двигать а какие нет
    var dragObject = document.getElementById(newDiv.id);
    new DragObject(dragObject);
}

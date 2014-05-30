/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

// глобальная переменная - костыль 
var counter = 0;

// добавление блока 
function NewBlock(name) {
    var newDiv = document.createElement('div');
    ++counter;
    newDiv.id = name+'-'+counter;
    newDiv.style.backgroundColor = 'red';
    newDiv.style.width = '100px';
    newDiv.style.height = '50px';
    newDiv.style.position = 'absolute';
    document.getElementById('all-elements').appendChild(newDiv);

    // опеределение какие эл-ты можно двигать а какие нет
    var dragObject = document.getElementById(newDiv.id);
    new DragObject(dragObject);
}
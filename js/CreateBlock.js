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
	var dragObjects = document.getElementById('all-elements').getElementsByTagName('div')
                for(var i=0; i<dragObjects.length; i++) {
                    new DragObject(dragObjects[i])
                }
//            var dragObject = document.getElementById('name-1');
//            new DragObject(dragObject);
}
/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

// глобальная переменная - костыль 
//var counter = 0;

// добавление блока 
//function NewBlock(elementId) {
//    var element,
//        elements = {};
//
//
//    ++counter;
//
//    if(elementId == 2) {
//        element = document.createElement('div');
//        element.id = 'name-'+counter;
//        element.style.width = '100px';
//        element.style.height = '50px';
//        element.style.backgroundColor = 'green';
//        element.className = 'circule-element';
//
//    } else if(elementId == 1) {
//        element = document.createElement('div');
//        element.id = 'name-'+counter;
//        element.style.width = '100px';
//        element.style.height = '50px';
//        element.style.backgroundColor = 'red';
//    } else if( elementId == 3) {
//        element = document.createElement('img');
//        element.id = 'name-'+counter;
//        element.src = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQL82tckOtHxX4LwHGEFCJ1OxL2JcHWCrJ_FMF8La0FLFlqw-h2cgn2KyZj';
//    } else if(elementId == 4) {
//        element = document.createElement('div');
//        element.id = 'name-'+counter;
//    }
//
//    element.style.position = 'absolute';
//
////    https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQL82tckOtHxX4LwHGEFCJ1OxL2JcHWCrJ_FMF8La0FLFlqw-h2cgn2KyZj
//    document.getElementById('all-elements').appendChild(element);
//
//    if(elementId == 4) {
//        element.innerHTML = 'text';
//    }
//
//
//    // опеределение какие эл-ты можно двигать а какие нет
//    var dragObject = document.getElementById(element.id);
//    new DragObject(dragObject);
//}



function CreateElements() {
    var element,
        elements = {},
        newElement,
        counter = 0
    ;

    this.addElement = function(id) {
        ++counter;
        if(id == 2) {
            element = document.createElement('div');
            newElement = {
                'id':'element-'+counter,
                'width': 100,
                'height': 50,
                'background_color': 'green'
            };
            element.id = 'element-'+counter;
            element.style.width = '100px';
            element.style.height = '50px';
            element.style.backgroundColor = 'green';
            element.className = 'circule-element';

        } else if(id == 1) {
            element = document.createElement('div');
            newElement = {
                'id':'element-'+counter,
                'width': 100,
                'height': 50,
                'background_color': 'red'
            };
            element.id = 'element-'+counter;
            element.style.width = '100px';
            element.style.height = '50px';
            element.style.backgroundColor = 'red';
        } else if( id == 3) {
            element = document.createElement('img');
            newElement = {
                'id':'element-'+counter,
                'width': 100,
                'height': 50
            };
            element.id = 'element-'+counter;
            element.src = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQL82tckOtHxX4LwHGEFCJ1OxL2JcHWCrJ_FMF8La0FLFlqw-h2cgn2KyZj';
        } else if(id == 4) {
            element = document.createElement('div');
            element.id = 'element-'+counter;
        }

        elements[element.id] = newElement;
        element.style.position = 'absolute';

//    https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQL82tckOtHxX4LwHGEFCJ1OxL2JcHWCrJ_FMF8La0FLFlqw-h2cgn2KyZj
        document.getElementById('all-elements').appendChild(element);
        //elements.push(pushElement);
        if(id == 4) {
            element.innerHTML = 'text';
        }


        // опеределение какие эл-ты можно двигать а какие нет
        var dragObject = document.getElementById(element.id);
        new DragObject(dragObject);
    };

    this.getGlobalElementById = function(id) {
        return elements[id];
    };

    this.getGlobalElements = function() {
        return elements;
    };

    this.deleteGlobalElementById = function(id) {
        delete(elements[id]);
    }
}


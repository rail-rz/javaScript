/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

function Init() {
    // получаем элемент
    var element = document.getElementById('moving-element');
    onmouseOver=element.style.background='red';
    onmouseOut=element.style.background='blues';
}

function NewBlock(name) {
    var newDiv = document.createElement('div');
//    newDiv.className = 'my-class'
    newDiv.id = name;
    newDiv.style.backgroundColor = 'red';
    newDiv.style.width = '100px';
    newDiv.style.height = '10px';
    document.getElementById('all-elements').appendChild(newDiv);


}
